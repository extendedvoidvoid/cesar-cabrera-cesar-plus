# CraftCut Sovereign Channel Archive System: Agent & Architect Guide

This document defines the raw architecture, schemas, and operational instructions for managing our high-scale vertical video archive across hundreds of channels and platforms inside "the sweet sweet simulation".

---

## 1. System Architecture

The archive operates as a detached, high-performance local-first system to bypass heavy API limits, security checkpoints, and cloud-provider ToS blocks.

```
┌──────────────────────────────────────────────┐
│       Single Source of Truth Database        │
│          (archive_posts_db.json)             │
└──────────────────────┬───────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
┌──────────────────┐       ┌──────────────────┐
│ Interactive UI   │       │ Custom CLI Tools │
│ (Dashboard HTML) │       │ (Python/Playwright)
└──────────────────┘       └──────────────────┘
```

1. **The Database (`archive_posts_db.json`):** A clean JSON database storing structured records for all handmade and automated assets.
2. **The View Layer (`archive_dashboard.html`):** A premium, local-first interactive spreadsheet dashboard. Supports quick filtering, real-time live search, metadata verification, and a high-performance one-click copying mechanic for publishing copy.
3. **The Script Layer:** Programmatic CLI and Playwright scripts that parse the database to automate staging and posting (e.g. `post_to_linkedin.py`).

---

## 2. Database Schema (`archive_posts_db.json`)

All entries inside `archive_posts_db.json` must strictly adhere to the following schema. No unstructured fields or arbitrary keys allowed.

```json
{
  "id": "CH-[Three-digit padding, e.g., 001]",
  "title": "String — Descriptive visual title of the handmade/compiled asset",
  "platform": "String — Target network: [YouTube|LinkedIn|Facebook|Instagram|TikTok]",
  "theme": "String — Semicolon-split categorizations, e.g., 'Fashion / Cinema'",
  "local_path": "String — Absolute Unix file path on macOS filesystem",
  "cdn_url": "String — Live public URL for CDN or GitHub Pages tracking",
  "description": "String — The precise, unlinked, peer-to-peer copywriting text block",
  "tags": ["Array of Strings — Pure keywords without the '#' character"],
  "status": "String — Status flag: [Ready|Draft|Published]",
  "created_at": "String — ISO Date YYYY-MM-DD"
}
```

---

## 3. Playbook for Agents: Reading and Updating the Archive

When a new automated or handmade video is staged, agents must update the repository in a structured, atomic sequence:

### Step 1: Validate local assets
Verify that the target MP4 file exists at the correct absolute path on the macOS filesystem and matches premium rendering specifications (9:16 vertical, beat-synced).

### Step 2: Append to the JSON Database
Open `/Users/alexphoenix/projects/atelier-synesthesie/archive_posts_db.json`, parse the JSON array, insert the new record preserving alphabetical ID order, and format with standard 2-space indentation.

### Step 3: Run the Auto-Sync Command
To push updates to the live CDN (GitHub Pages), execute:
```bash
git add archive_posts_db.json && git commit -m "feat(archive): register CH-[ID] - [Title]" && git push origin main
```

---

## 4. Automated Python Insertion script
To append records programmatically without manual file editing, future agents or scripts can execute this local Python automated helper:

```python
#!/usr/bin/env python3
import json
from pathlib import Path
from datetime import date

DB_PATH = Path("/Users/alexphoenix/projects/atelier-synesthesie/archive_posts_db.json")

def append_archive(id_val, title, platform, theme, local_path, cdn_url, description, tags):
    if not DB_PATH.exists():
        data = []
    else:
        with open(DB_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            
    # Check duplicate
    if any(item["id"] == id_val for item in data):
        print(f"Error: Asset ID {id_val} already exists in database.")
        return False

    new_item = {
        "id": id_val,
        "title": title,
        "platform": platform,
        "theme": theme,
        "local_path": local_path,
        "cdn_url": cdn_url,
        "description": description.strip(),
        "tags": [tag.strip() for tag in tags.split(",") if tag.strip()],
        "status": "Ready",
        "created_at": str(date.today())
    }
    
    data.append(new_item)
    # Maintain strict ascending numerical ID ordering
    data.sort(key=lambda x: x["id"])
    
    with open(DB_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully registered {id_val} in archive.")
    return True
```

---

## 5. Security & Verification
Before marking an asset as `Ready` inside the dashboard:
1. Confirm visual typography coordinates do not trigger any UI collision on mobile safe zones.
2. Confirm the exact video file path points to local or mapped external storage drives.
3. Keep raw private credentials and session state files outside of public git commits using the standard `.gitignore` rules.
