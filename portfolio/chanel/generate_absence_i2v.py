#!/usr/bin/env python3
"""Generate Absence clips via Open Design i2v (JSON-driven).

Requires:
  - Open Design daemon running (Node ~24): cd open-design && pnpm tools-dev
  - Video provider configured in OD Settings (seedance-2.0 or grok-imagine-video)
  - OD project opened on portfolio/chanel (or pass --project-id)

Usage:
  python3 generate_absence_i2v.py --shot 01        # one shot
  python3 generate_absence_i2v.py --all              # all 9
  python3 generate_absence_i2v.py --all --assemble   # then trim + concat
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
VIDEO_JSON = ROOT / "absence-video.json"
OD_BIN = Path(os.environ.get("OD_BIN", "/Users/alexphoenix/open-design/apps/daemon/dist/cli.js"))
OD_NODE = os.environ.get("OD_NODE_BIN", "node")


def run(cmd: list[str], *, cwd: Path | None = None) -> str:
    print("+", " ".join(cmd))
    return subprocess.check_output(cmd, cwd=cwd, text=True).strip()


def daemon_url() -> str:
    return os.environ.get("OD_DAEMON_URL", "http://127.0.0.1:7456")


def od_generate(shot: dict, model: str, project_id: str) -> Path:
    out_name = shot["output"]
    prompt = shot["prompt"]
    img = shot["image"]
    length = shot.get("length_sec", 6)
    aspect = shot.get("aspect", "16:9")

    raw = run(
        [
            OD_NODE,
            str(OD_BIN),
            "media",
            "generate",
            "--surface",
            "video",
            "--model",
            model,
            "--project",
            project_id,
            "--prompt",
            prompt,
            "--image",
            img,
            "--length",
            str(length),
            "--aspect",
            aspect,
            "--output",
            out_name,
            "--daemon-url",
            daemon_url(),
        ],
        cwd=ROOT,
    )
    data = json.loads(raw)
    rel = data.get("file", {}).get("name") or out_name
    return ROOT / rel


def trim_clip(src: Path, ms: int, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    sec = ms / 1000
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
            f"{sec:.3f}",
            "-c",
            "copy",
            "-movflags",
            "+faststart",
            str(dest),
        ],
        check=True,
    )


def assemble(trimmed: list[Path], out: Path) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    list_file = out.parent / "concat-i2v.txt"
    list_file.write_text("".join(f"file '{p.resolve()}'\n" for p in trimmed), encoding="utf-8")
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
            str(list_file),
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
    ap.add_argument("--shot", help="Generate one shot id, e.g. 01")
    ap.add_argument("--all", action="store_true", help="Generate all shots")
    ap.add_argument("--assemble", action="store_true", help="Trim to duration_ms and concat")
    ap.add_argument("--project-id", default=os.environ.get("OD_PROJECT_ID", ""))
    ap.add_argument("--model", default="")
    args = ap.parse_args()

    spec = json.loads(VIDEO_JSON.read_text(encoding="utf-8"))
    model = args.model or spec.get("model", "seedance-2.0")

    if not args.project_id:
        print("Set --project-id or OD_PROJECT_ID (Open Design project for portfolio/chanel).", file=sys.stderr)
        return 1

    shots = spec["shots"]
    if args.shot:
        shots = [s for s in shots if s["id"] == args.shot]
        if not shots:
            print(f"Unknown shot {args.shot}", file=sys.stderr)
            return 1
    elif not args.all:
        ap.print_help()
        return 1

    generated: list[tuple[dict, Path]] = []
    for shot in shots:
        path = od_generate(shot, model, args.project_id)
        generated.append((shot, path))
        shot["generated_i2v"] = str(path.relative_to(ROOT))

    if args.assemble:
        trimmed: list[Path] = []
        for shot, src in generated:
            dest = ROOT / "clips" / f"{shot['id']}.mp4"
            trim_clip(src, shot["duration_ms"], dest)
            trimmed.append(dest)
        out = ROOT / spec["assembly"]["output"]
        assemble(trimmed, out)
        print(f"Assembled {out}")

    return 0


if __name__ == "__main__":
    sys.exit(main())