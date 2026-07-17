# CraftCut - AI Video Automation Platform

**Industrial Vertical Video Printing Press for Demanding Brands**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)

## Overview

CraftCut is an **AI video automation platform** that industrializes motion design for the 9:16 era. We synthesize the best of motion design—beat-sync pacing, total subtitle control, mobile safe-zones, organic grain—and encapsulate it in an automation engine that **enforces the creative brief** on every output.

Developed in Paris, CraftCut targets **demanding brands** bound by high-spec creative briefs in motion design, typography, and editorial rhythm. Our entry point is **pop culture and album covers**, with expansion into youth-targeted podcasts.

**Scale**: 350 localized vertical videos/day · 64.3M LLM tokens/month

## Features

- **Industrial Motion Design**: Beat-sync transitions, Swiss typographic compositions, organic grain
- **Total Subtitle Control**: Alignment, glyphs, safe-zones, zero UI collision
- **Multi-Language Support**: Translation + voice cloning across all European languages
- **Editorial Duo Model**: Weekly reportages (depth) + daily development videos (loyalty)
- **Smart Internationalization**: Fan/satellite pages when brands refuse to dilute official stats
- **Cloud-Deployment Ready**: Multi-agent orchestration, parallel rendering

## Installation

### Prerequisites

- Python 3.10+
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/alexphoenix/Cesar-Start-up.git
cd Cesar-Start-up

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers (for form-filling scripts)
playwright install chromium
```

## Project Structure

```
Cesar-Start-up/
├── agent_apply.py           # AI application assistant CLI
├── fill_form_autopilot.py   # Playwright form-filling copilot
├── fill_forms_autonomously.py # Autonomous form filler
├── launch_portals_desktop.py # Desktop portals launcher
├── hermes/                  # Hermes agent configuration
│   └── HERMES_CONFIG.json
├── scripts/                 # Node.js utilities
│   └── generate_pitch_deck.js
├── index.html               # Website landing page
├── .gitignore
├── README.md
└── requirements.txt
```

## Usage

### AI Application Assistant

Automatically draft high-fidelity answers to startup and credit application questions:

```bash
python agent_apply.py
```

The script loads the `AGENT_PROMPT.md` system prompt and uses your configured API key (OpenRouter or Gemini) to generate professional responses.

**Configuration**: Set `openrouter_api_key` or `gemini_api_key` in:
- `/Users/alexphoenix/projects/album-video-creator/.env`
- Or `~/.album_video_maker_config.json`

### Form-Filling Copilot

Interactive browser-based form filling:

```bash
python fill_form_autopilot.py
```

Launch a Chromium browser and auto-type your startup specs into application forms.

### Autonomous Form Filler

Fully automated form filling:

```bash
python fill_forms_autonomously.py
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
OPENROUTER_API_KEY=your_api_key_here
# or
GEMINI_API_KEY=your_api_key_here
```

### Private Details

Edit `PRIVATE_DETAILS.json` with your personal information (excluded from git):

```json
{
  "full_name": "Your Full Name",
  "address": "Your Street Address",
  "phone_number": "Your Contact Phone"
}
```

## Documentation

- [PITCH_DECK.md](PITCH_DECK.md) - Master pitch content for Station F
- [ROADMAP.md](ROADMAP.md) - Startup execution roadmap
- [HERMES_ROADMAP.md](HERMES_ROADMAP.md) - Hermes agent execution directives
- [STATION_F_STRATEGY.md](STATION_F_STRATEGY.md) - Station F application strategy
- [TECHNICAL_CASE.md](TECHNICAL_CASE.md) - Technical specifications

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CraftCut Platform                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ AI Agents   │  │ Form Fill   │  │ Local Cloud Hybrid   │  │
│  │ (Hermes)    │  │ Scripts     │  │ Architecture         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
      │              │              │
      ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Application │ │  Browser    │ │ M3 Max GPU  │
│  Drafting   │ │ Automation  │ │   Rendering  │
└─────────────┘ └─────────────┘ └─────────────┘
```

## Target Markets

1. **Pop Culture & Album Covers** - Artists and labels
2. **Youth-Targeted Podcasts** - Phase 2 expansion
3. **French Luxury Maisons** - Cultural heritage
4. **Cultural Ministries** - Institutional partnerships

## Cloud Credits Targets

- BytePlus vStart: $2,000 - $100,000 (TikTok infrastructure)
- Microsoft for Startups: $1,000 - $5,000 (Azure OpenAI)
- Google for Startups: $2,000 (LLM token scaling)
- AWS Activate: $1,000 (GPU endpoints)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For inquiries, please refer to the documentation or open an issue.
