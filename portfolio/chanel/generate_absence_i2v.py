#!/usr/bin/env python3
"""Generate Absence clips via xAI grok-imagine-video i2v (JSON-driven)."""

from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
VIDEO_JSON = ROOT / "absence-video.json"
AUTH_PATH = Path.home() / ".grok" / "auth.json"
API = "https://api.x.ai/v1"


def load_api_key() -> str:
    if not AUTH_PATH.exists():
        raise SystemExit(f"Missing {AUTH_PATH}")
    data = json.loads(AUTH_PATH.read_text(encoding="utf-8"))
    entry = next(iter(data.values()))
    key = entry.get("key")
    if not key:
        raise SystemExit("No xAI key in Grok auth.json")
    return key


def image_data_url(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "image/jpeg"
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{b64}"


def api_json(method: str, url: str, key: str, body: dict | None = None, retries: int = 5) -> dict:
    data = None if body is None else json.dumps(body).encode("utf-8")
    last_err: Exception | None = None
    for attempt in range(retries):
        req = urllib.request.Request(
            url,
            data=data,
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
            },
            method=method,
        )
        try:
            with urllib.request.urlopen(req, timeout=180) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            msg = e.read().decode("utf-8", errors="replace")[:800]
            raise RuntimeError(f"HTTP {e.code}: {msg}") from e
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            last_err = e
            time.sleep(min(2 ** attempt, 30))
    raise RuntimeError(f"API failed after {retries} tries: {last_err}") from last_err


def generate_i2v(shot: dict, key: str, model: str) -> str:
    img = ROOT / shot["image"]
    if not img.exists():
        raise FileNotFoundError(img)

    payload = {
        "model": model,
        "prompt": shot["prompt"],
        "duration": shot.get("length_sec", 6),
        "aspect_ratio": shot.get("aspect", "16:9"),
        "resolution": "720p",
        "image": {"url": image_data_url(img)},
    }
    print(f"[{shot['id']}] submit i2v…")
    submit = api_json("POST", f"{API}/videos/generations", key, payload)
    request_id = submit.get("request_id") or submit.get("id")
    video_url = (submit.get("video") or {}).get("url")
    if video_url:
        return video_url
    if not request_id:
        raise RuntimeError(f"No request_id: {submit}")

    started = time.time()
    while time.time() - started < 600:
        time.sleep(5)
        poll = api_json("GET", f"{API}/videos/{request_id}", key)
        status = poll.get("status", "pending")
        progress = poll.get("progress")
        print(f"[{shot['id']}] {status} {progress or ''}")
        if status in ("done", "succeeded"):
            url = (poll.get("video") or {}).get("url")
            if not url:
                raise RuntimeError(f"done but no url: {poll}")
            return url
        if status in ("failed", "expired"):
            raise RuntimeError(f"generation {status}: {poll.get('error', poll)}")

    raise TimeoutError(f"shot {shot['id']} timed out")


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=300) as resp, dest.open("wb") as f:
        f.write(resp.read())


def trim_clip(src: Path, ms: int, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(src),
            "-t",
            f"{ms / 1000:.3f}",
            "-c",
            "copy",
            "-movflags",
            "+faststart",
            str(dest),
        ],
        check=True,
    )


def assemble(clips: list[Path], out: Path) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    lst = out.parent / "concat-i2v.txt"
    lst.write_text("".join(f"file '{p.resolve()}'\n" for p in clips), encoding="utf-8")
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(lst),
            "-c",
            "copy",
            "-movflags",
            "+faststart",
            str(out),
        ],
        check=True,
    )


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--shot", help="e.g. 01")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--assemble", action="store_true")
    ap.add_argument("--skip-existing", action="store_true", help="Skip shots with raw i2v mp4")
    ap.add_argument("--from-shot", help="Start at shot id, e.g. 07")
    ap.add_argument("--model", default="grok-imagine-video")
    args = ap.parse_args()

    spec = json.loads(VIDEO_JSON.read_text(encoding="utf-8"))
    shots = spec["shots"]
    if args.shot:
        shots = [s for s in shots if s["id"] == args.shot]
    elif args.from_shot:
        shots = [s for s in shots if s["id"] >= args.from_shot]
    elif not args.all:
        ap.print_help()
        return 1

    key = load_api_key()
    raw_dir = ROOT / "clips" / "i2v" / "raw"
    trimmed: list[Path] = []

    for shot in shots:
        raw = raw_dir / f"{shot['id']}.mp4"
        if args.skip_existing and raw.exists():
            print(f"[{shot['id']}] skip existing raw")
        else:
            url = generate_i2v(shot, key, args.model)
            print(f"[{shot['id']}] download → {raw.name}")
            download(url, raw)
            shot["video_url"] = url
        shot["generated_i2v_raw"] = str(raw.relative_to(ROOT))

        if args.assemble:
            out = ROOT / "clips" / f"{shot['id']}.mp4"
            trim_clip(raw, shot["duration_ms"], out)
            trimmed.append(out)
            shot["generated_clip"] = str(out.relative_to(ROOT))

    if args.assemble:
        all_trimmed = [
            ROOT / "clips" / f"{s['id']}.mp4"
            for s in spec["shots"]
            if (ROOT / "clips" / f"{s['id']}.mp4").exists()
        ]
        if len(all_trimmed) == len(spec["shots"]):
            out = ROOT / spec["assembly"]["output"]
            assemble(all_trimmed, out)
            spec["assembled_video"] = str(out.relative_to(ROOT))
            spec["render_note"] = "grok-imagine-video i2v from absence-video.json"
        else:
            print(f"Assemble pending: {len(all_trimmed)}/{len(spec['shots'])} clips ready")

    VIDEO_JSON.write_text(json.dumps(spec, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("Done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())