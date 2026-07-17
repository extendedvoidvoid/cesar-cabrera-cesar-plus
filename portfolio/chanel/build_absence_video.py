#!/usr/bin/env python3
"""Animate Absence moodboard frames and assemble from absence-shots.json.

Uses crop-based Ken Burns (not zoompan) to avoid blown highlights on skin.
"""

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
# headroom for gentle push-in without upscaling past 2× target
SRC_W, SRC_H = 1600, 900

# pixels to crop per frame (push-in). 0 = static hold.
DRIFT = {
    "01": 3,
    "02": 4,
    "03": 0,
    "04": 2,
    "05": 0,
    "06": 2,
    "07": 3,
    "08": 2,
    "09": 2,
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
    drift = DRIFT.get(sid, 1)

    if drift <= 0:
        vf = (
            f"scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos+accurate_rnd+full_chroma_int,"
            f"crop={W}:{H},"
            f"fps={FPS},"
            f"format=yuv420p"
        )
    else:
        # crop window shrinks over time → subtle push-in, no zoompan resample burn
        vf = (
            f"scale={SRC_W}:{SRC_H}:force_original_aspect_ratio=increase:flags=lanczos+accurate_rnd+full_chroma_int,"
            f"crop={SRC_W}:{SRC_H},"
            f"crop=w='max({W},iw-{drift}*n)':h='max({H},ih-{drift}*n*9/16)':"
            f"x='(iw-ow)/2':y='(ih-oh)/2',"
            f"scale={W}:{H}:flags=lanczos+accurate_rnd+full_chroma_int,"
            f"fps={FPS},"
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
            "slow",
            "-crf",
            "17",
            "-bf",
            "0",
            "-pix_fmt",
            "yuv420p",
            "-colorspace",
            "bt709",
            "-color_primaries",
            "bt709",
            "-color_trc",
            "bt709",
            "-color_range",
            "tv",
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
    data["render_note"] = "v2 crop-based Ken Burns — no zoompan (skin-safe)"
    SHOTS_JSON.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    size_mb = OUT_VIDEO.stat().st_size / (1024 * 1024)
    print(f"Done: {OUT_VIDEO} ({total_ms / 1000:.1f}s, {size_mb:.1f} MB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())