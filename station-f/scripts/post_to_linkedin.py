#!/usr/bin/env python3
"""
Playwright Automation Script to publish central tracker posts to LinkedIn.
Uses your existing logged-in browser state to bypass OAuth, 2FA, and API limits.
"""

import os
import sys
import re
import argparse
from playwright.sync_api import sync_playwright

# Configuration
TRACKER_PATH = "/Users/alexphoenix/projects/atelier-synesthesie/CENTRAL_POST_TRACKER.md"
SESSION_PATH = "/Users/alexphoenix/.config/playwright_linkedin_state.json"

def get_post_data(channel_id):
    """Parses CENTRAL_POST_TRACKER.md to extract text and video path for a given channel."""
    if not os.path.exists(TRACKER_PATH):
        print(f"Error: Tracker file not found at {TRACKER_PATH}", file=sys.stderr)
        sys.exit(1)

    with open(TRACKER_PATH, 'r') as f:
        content = f.read()

    # Find the LinkedIn Copy block for the requested channel
    pattern = rf"### 📌 {channel_id} — .*?\n```text\n(.*?)\n```"
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        print(f"Error: Could not find LinkedIn copy block for {channel_id} in {TRACKER_PATH}", file=sys.stderr)
        sys.exit(1)
    
    text_copy = match.group(1).strip()

    # Extract the local file path from the Markdown table
    table_pattern = rf"\| \*\*{channel_id}\*\* \| .*? \| .*? \| `(.*?)` \|"
    table_match = re.search(table_pattern, content)
    if not table_match:
        print(f"Error: Could not find local file path for {channel_id} in the tracker table.", file=sys.stderr)
        sys.exit(1)
    
    video_path = table_match.group(1).strip()
    return text_copy, video_path

def save_auth_state():
    """Launches headed browser once to let the user log in and saves the session cookies/state."""
    print("\n--- INITIAL LOGIN SESSION CREATION ---")
    print("Launching Chromium. Please log into LinkedIn, complete any 2FA/auth.")
    print("Once logged in and on the homepage, close the browser or press Enter here.")
    
    with sync_playwright() as p:
        # Launch headed browser
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()
        page.goto("https://www.linkedin.com/login")
        
        input("\nPress Enter here AFTER you have successfully logged in on the opened browser...")
        
        # Save storage state (cookies, local storage)
        os.makedirs(os.path.dirname(SESSION_PATH), exist_ok=True)
        context.storage_state(path=SESSION_PATH)
        print(f"Success: Auth state saved to {SESSION_PATH}")
        browser.close()

def execute_post(channel_id, headless=False):
    """Automates the browser to upload the video and paste the text."""
    text, video = get_post_data(channel_id)
    
    if not os.path.exists(SESSION_PATH):
        print(f"Auth state not found at {SESSION_PATH}. Creating session first...")
        save_auth_state()

    print(f"\nPosting {channel_id} to LinkedIn...")
    print(f"Video file: {video}")
    print(f"Copy length: {len(text)} chars\n")

    with sync_playwright() as p:
        # Launch using saved state
        browser = p.chromium.launch(headless=headless)
        context = browser.new_context(storage_state=SESSION_PATH)
        page = context.new_page()
        
        # Navigate to homepage
        page.goto("https://www.linkedin.com/feed/")
        
        # 1. Click "Start a post" / "Share video"
        try:
            # Click the main share box trigger
            page.wait_for_selector(".share-box-feed-entry__trigger", timeout=10000)
            page.click(".share-box-feed-entry__trigger")
            
            # 2. Wait for the editor modal to open
            page.wait_for_selector(".ql-editor", timeout=10000)
            
            # 3. Enter the text copy
            page.fill(".ql-editor", text)
            
            # 4. Click the "Add media" / Video upload button inside the editor
            # Locate the media input element
            page.wait_for_selector("input[type='file']", timeout=5000)
            file_input = page.locator("input[type='file']").first
            
            # 5. Upload the video file
            file_input.set_input_files(video)
            
            # Wait for video processing dialog/modal "Done" button to activate
            print("Video uploading. Waiting for processing...")
            done_button_selector = "button:has-text('Done'), button:has-text('Terminer')"
            page.wait_for_selector(done_button_selector, timeout=60000)
            page.click(done_button_selector)
            
            # 6. Click the final "Post" button
            post_button_selector = "button:has-text('Post'), button:has-text('Publier')"
            page.wait_for_selector(post_button_selector, timeout=10000)
            page.click(post_button_selector)
            
            print(f"🎉 Success: {channel_id} successfully posted to LinkedIn!")
            
        except Exception as e:
            print(f"Error during automation: {str(e)}", file=sys.stderr)
            print("If login expired, delete state file and log in again: rm " + SESSION_PATH)
            
        finally:
            browser.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Programmatically post tracker files to LinkedIn.")
    parser.add_argument("--login", action="store_true", help="Launch browser to log in and save session.")
    parser.add_argument("--channel", choices=["Ch. 01", "Ch. 02", "Ch. 03"], help="Channel ID to post from the tracker.")
    parser.add_argument("--headed", action="store_true", help="Run headed browser instead of headless to watch progress.")
    
    args = parser.parse_args()
    
    if args.login:
        save_auth_state()
    elif args.channel:
        execute_post(args.channel, headless=not args.headed)
    else:
        parser.print_help()
