#!/usr/bin/env python3
"""Animate Absence moodboard frames (Ken Burns) and assemble from absence-shots.json."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SHOTS_JSON = ROOT / "absence-shots.json"
CLIPS_DIR = ROOT / "clips"
OUT_VIDEO = ROOT / "video" / "absence.mp4"

FPS = 24
W, H = 1280, 720

# zoom expression per shot id
ZOOM = {
    "01": "min(zoom+0.0010,1.15)",  # push-in
    "02": "min(zoom+0.0012,1.18)",  # tight push
    "03": "1.04",                   # near-static
    "04": "min(zoom+0.0006,1.08)",  # slow drift
    "05": "1.03",
    "06": "min(zoom+0.0008,1.12)",  # rack focus feel
    "07": "min(zoom+0.0014,1.20)",  # macro
    "08": "min(zoom+0.0005,1.10)",  # warm memory
    "09": "min(zoom+0.0007,1.14)",  # return + packshot
}

def run(cmd: list[str]) -> None:
    print("+", " ".join(cmd))
    subprocess.run(cmd, check=True)


def frames_for_ms(ms: int) -> int:
    return max(1, round(ms / 1000 * FPS))


def render_clip(shot: dict, out_path: Path) -> None:
    src = ROOT / shot["moodboard"]
    if not src.exists():
        raise FileNotFoundError(src)

    sid = shot["id"]
    n = frames_for_ms(shot["duration_ms"])
    z = ZOOM.get(sid, "min(zoom+0.0008,1.10)")

    vf = (
        f"scale={W * 4}:{H * 4}:flags=lanczos,"
        f"zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
        f"d={n}:s={W}x{H}:fps={FPS},"
        f"format=yuv420p"
    )

    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-loop",
            "1",
            "-i",
            str(src),
            "-vf",
            vf,
            "-frames:v",
            str(n),
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "20",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            str(out_path),
        ]
    )


def concat_clips(clips: list[Path], out_path: Path) -> None:
    list_file = out_path.parent / "concat.txt"
    list_file.write_text(
        "".join(f"file '{c.resolve()}'\n" for c in clips),
        encoding="utf-8",
    )
    run(
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
            str(out_path),
        ]
    )


def main() -> int:
    data = json.loads(SHOTS_JSON.read_text(encoding="utf-8"))
    shots = data["shots"]

    CLIPS_DIR.mkdir(exist_ok=True)
    (ROOT / "video").mkdir(exist_ok=True)

    clips: list[Path] = []
    for shot in shots:
        out = CLIPS_DIR / f"{shot['id']}.mp4"
        render_clip(shot, out)
        clips.append(out)
        shot["generated_clip"] = f"clips/{shot['id']}.mp4"

    concat_clips(clips, OUT_VIDEO)

    total_ms = sum(s["duration_ms"] for s in shots)
    data["assembled_video"] = "video/absence.mp4"
    data["total_duration_ms"] = total_ms
    SHOTS_JSON.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    size_mb = OUT_VIDEO.stat().st_size / (1024 * 1024)
    print(f"Done: {OUT_VIDEO} ({total_ms / 1000:.1f}s, {size_mb:.1f} MB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())