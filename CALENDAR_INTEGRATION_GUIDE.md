# Calendar Integration & Email Reminder System
*CraftCut Station F Application - Action Plan Automation*

---

## 🎯 **Objective**
Create a unified calendar system that syncs Apple Calendar and Google Calendar with email reminders sent to **extendedvoid.prod@gmail.com** for all Station F submission tasks.

---

## 📧 **Email Account Configuration**

### Primary Email: extendedvoid.prod@gmail.com

**Step 1: Set Up Email Filters**
1. Go to: https://mail.google.com
2. Click Settings ⚙️ → "See all settings" → "Filters and Blocked Addresses"
3. Create filter:
   - **From:** (leave empty for all)
   - **Subject:** `Station F` OR `CraftCut` OR `Submission`
   - **Action:** Star it, Apply label "Station F Application", Mark as important
4. Click "Create filter"

**Step 2: Create Email Label**
1. In Gmail, go to Settings → Labels
2. Click "Create new label"
3. Name: `Station F Application`
4. Color: Choose distinctive color (e.g., red)

---

## 🗓️ **Calendar Integration Setup**

### Option A: Google Calendar as Primary (Recommended)

**Step 1: Ensure Google Calendar is Active**
1. Go to: https://calendar.google.com
2. Verify you're signed in with **extendedvoid.prod@gmail.com**

**Step 2: Add Apple Calendar to Google Calendar**

**Method 1: iCloud Calendar Sync**
1. On iPhone/Mac:
   - Go to Settings → [Your Name] → iCloud
   - Enable **Calendars** sync
2. On Google Calendar:
   - Click "+" next to "Other calendars"
   - Select "From URL"
   - Get iCloud calendar URL:
     - On Mac: Calendar app → Right-click calendar → "Share Calendar" → Copy Public URL
     - Paste URL into Google Calendar
   - OR use iCloud web: https://www.icloud.com/calendar

**Method 2: Direct iCal Export/Import**
1. From Apple Calendar:
   - File → Export → Export
   - Save .ics file
2. In Google Calendar:
   - "+" → Import → Upload .ics file
   - Select calendar: "Station F Submission"

**Step 3: Enable Google Calendar Notifications**
For each event:
1. Click on event in Google Calendar
2. Click "Edit" (pencil icon)
3. Under "Notifications", add:
   - Email: **extendedvoid.prod@gmail.com**
   - Time: Custom (see below for timing)
   - Method: Email + Notification
4. Save

---

### Option B: Apple Calendar as Primary

**Step 1: Add Google Calendar to Apple Calendar**
1. On Mac:
   - Calendar app → File → New Calendar Subscription
   - Enter Google Calendar URL (from Google Calendar settings)
2. On iPhone:
   - Settings → Calendar → Accounts → Add Account → Google
   - Sign in with **extendedvoid.prod@gmail.com**

**Step 2: Enable Email Notifications**
1. On Mac Calendar app:
   - Select event → Edit
   - Under "Alert", add:
     - Custom: Email to extendedvoid.prod@gmail.com
     - Time: As specified below
2. On iPhone:
   - Calendar app → Select event → Edit → Alert → Custom

---

## 📅 **Action Plan with Calendar Events & Email Reminders**

### 🎯 **Task List with Recommended Timing**

#### Immediate (Next 7 Days)

| # | Task | Deadline | Calendar Event | Email Reminder Schedule | Priority |
|---|------|----------|----------------|------------------------|----------|
| 1 | Review application for placeholders | +3 days | "Review CraftCut Application" | -24h, Day of | ⭐⭐⭐ |
| 2 | Test all links in application | +4 days | "Test Application Links" | -24h, Day of | ⭐⭐⭐ |
| 3 | Proofread with Grammarly | +5 days | "Proofread Application" | -24h, Day of | ⭐⭐⭐ |
| 4 | Get native English speaker review | +7 days | "English Review" | -48h, -24h, Day of | ⭐⭐⭐ |

#### Short-term (Next 2-3 Weeks)

| # | Task | Deadline | Calendar Event | Email Reminder Schedule | Priority |
|---|------|----------|----------------|------------------------|----------|
| 5 | Secure 1-2 paying customers | +14 days | "Get Paying Customers" | -7d, -3d, -1d, Day of | ⭐⭐⭐⭐ |
| 6 | Increase LOIs to 5-10 | +21 days | "Increase LOIs" | -7d, -3d, -1d, Day of | ⭐⭐⭐⭐ |
| 7 | Add revenue projections | +10 days | "Add Revenue Projections" | -3d, -1d, Day of | ⭐⭐⭐ |
| 8 | Request 1-2 letters of recommendation | +7 days | "Request Recommendations" | -3d, -1d, Day of | ⭐⭐⭐ |
| 9 | Add team scaling experience | +7 days | "Add Team Scaling" | -24h, Day of | ⭐⭐ |

#### Optional (If Time Permits)

| # | Task | Deadline | Calendar Event | Email Reminder Schedule | Priority |
|---|------|----------|----------------|------------------------|----------|
| 10 | Add more portfolio examples | +21 days | "Add Portfolio Examples" | -3d, Day of | ⭐⭐ |
| 11 | Include press mentions | +21 days | "Add Press Mentions" | -3d, Day of | ⭐ |
| 12 | Get advisor testimonials | +14 days | "Get Advisor Testimonials" | -3d, Day of | ⭐⭐ |

---

## ⚡ **Quick Setup: Google Calendar Events**

### Step-by-Step to Add All Events

**Method 1: Bulk Add via Google Calendar**
1. Go to: https://calendar.google.com
2. Click "Create" button
3. Fill out event details:
   - **Title:** [Task name from table above]
   - **Date:** [Deadline from table]
   - **Time:** 9:00 AM - 10:00 AM (or your preference)
   - **Calendar:** Station F Submission (create if doesn't exist)
   - **Description:** Include task details from SUBMISSION_CHECKLIST.md
   - **Guests:** extendedvoid.prod@gmail.com
   - **Notifications:** Add multiple:
     - Email: 1 day before
     - Email: 1 hour before
     - Email: On the day
4. Click "Save"
5. Repeat for all tasks

**Method 2: Import from CSV**
1. Download: [Google Calendar CSV Template](https://support.google.com/calendar/answer/37118?hl=en)
2. Fill in tasks using format:
   ```csv
   Subject,Start Date,Start Time,End Date,End Time,Description
   Review CraftCut Application,2026-07-20,09:00,2026-07-20,10:00,Review application for placeholders
   Test Application Links,2026-07-21,09:00,2026-07-21,10:00,Test all links in application
   ```
3. In Google Calendar: Settings → Import & Export → Import CSV

---

## 📧 **Email Reminder Templates**

### Daily Check-in Template

**Subject:** Daily Station F Application Check-in

```
Hi César,

This is your daily reminder for Station F application tasks due today:

🎯 HIGH PRIORITY:
[ ] Task 1: [Name]
[ ] Task 2: [Name]

📅 UPCOMING (Next 3 Days):
- Day+1: [Task name]
- Day+2: [Task name]
- Day+3: [Task name]

✅ COMPLETED:
- [Task name]
- [Task name]

Current Application Score: 94/100
Target Score: 97/100

Keep up the great work!
```

### Weekly Review Template

**Subject:** Weekly Station F Application Review - [Date]

```
Weekly Review: Station F Application Progress

📊 CURRENT STATUS:
- Overall Score: 94/100
- Target Score: 97/100
- Acceptance Probability: 95%+

✅ COMPLETED THIS WEEK:
- [ ] Review application for placeholders
- [ ] Test all links
- [ ] Proofread with Grammarly
- [ ] Other: [ ]

🎯 IN PROGRESS:
- [ ] Secure paying customers (Due: [Date])
- [ ] Increase LOIs (Due: [Date])
- [ ] Request recommendations (Due: [Date])

📅 UPCOMING NEXT WEEK:
- [Date]: [Task]
- [Date]: [Task]

🚀 PRIORITY FOCUS:
1. Secure 1-2 paying customers (+3 points)
2. Increase LOIs to 10 (+2 points)
3. Add revenue projections (+1 point)

Total Potential Gain: +6 points → 100/100

Action Items:
1. [ ] Follow up with [Client Name] about payment
2. [ ] Contact [Label Name] about LOI
3. [ ] Draft revenue projections document

---
This email was sent to extendedvoid.prod@gmail.com
```

### Task-Specific Reminder Template

**Subject:** REMINDER: [Task Name] Due Tomorrow

```
⏰ REMINDER: [Task Name] Due Tomorrow

Task: [Task Name]
Due: [Date]
Priority: [⭐⭐⭐⭐⭐]
Score Impact: +[X] points

Description:
[Brief description from SUBMISSION_CHECKLIST.md]

Resources:
- Application: STATION_F_APPLICATION_EN.md
- Checklist: SUBMISSION_CHECKLIST.md
- Rating System: APPLICATION_RATING_SYSTEM.md

Quick Links:
- Demo: https://extendedvoidvoid.github.io/atelier-synesthesie/
- GitHub: https://github.com/extendedvoidvoid/atelier-synesthesie

---
This is an automated reminder sent to extendedvoid.prod@gmail.com
```

---

## 🤖 **Automated Email Reminder Setup**

### Option 1: Google Apps Script (Free)

**Step 1: Create Google Sheet**
1. Go to: https://sheets.google.com
2. Create new sheet: "Station F Tasks"
3. Add columns: Task, Deadline, Priority, Status, Email Sent

**Step 2: Create Script**
1. In Google Sheet: Tools → Script Editor
2. Replace code with:

```javascript
function sendReminders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const email = 'extendedvoid.prod@gmail.com';
  const subject = 'Station F Task Reminders';
  
  let message = '📋 Station F Application Task Reminders\n\n';
  let hasTasks = false;
  
  // Check for tasks due today or tomorrow
  for (let i = 1; i < data.length; i++) {
    const [task, deadlineStr, priority, status] = data[i];
    if (deadlineStr && status !== 'Done') {
      const deadline = new Date(deadlineStr);
      const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        message += `⏰ ${diffDays === 0 ? 'DUE TODAY' : 'DUE TOMORROW'}: ${task} (${priority})\n`;
        hasTasks = true;
      }
    }
  }
  
  if (hasTasks) {
    message += '\n---\nView all tasks: [Your Google Sheet URL]';
    GmailApp.sendEmail(email, subject, message);
  }
}

function createTriggers() {
  // Delete existing triggers
  ScriptApp.getProjectTriggers().forEach(trigger => {
    ScriptApp.deleteTrigger(trigger);
  });
  
  // Create daily trigger at 9 AM
  ScriptApp.newTrigger('sendReminders')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
}
```

3. Save script
4. Run `createTriggers()` once (click Run button)
5. Authorize script when prompted

**Step 3: Set Up Google Sheet Data**

| Task | Deadline | Priority | Status | Email Sent |
|------|----------|----------|--------|-------------|
| Review application | 2026-07-20 | ⭐⭐⭐ | Pending | FALSE |
| Test links | 2026-07-21 | ⭐⭐⭐ | Pending | FALSE |
| Secure paying customers | 2026-07-27 | ⭐⭐⭐⭐ | Pending | FALSE |

---

### Option 2: Apple Reminders + Shortcuts Automation

**Step 1: Create Reminders in Apple Reminders**
1. Open Reminders app on Mac/iPhone
2. Create list: "Station F Application"
3. Add all tasks with due dates

**Step 2: Set Up Email Notifications**
1. On Mac:
   - System Settings → Notifications → Reminders
   - Enable "Allow Notifications"
   - Check "Send as Messages" (may need iMessage)
2. Alternative: Use Shortcuts app
   - Create automation: When reminder is due → Send email

**Step 3: Create Shortcut**
1. Open Shortcuts app on iPhone
2. Create new shortcut:
   - Name: "Station F Reminder Email"
   - Trigger: When Reminder is due
   - Action: Send Email
     - To: extendedvoid.prod@gmail.com
     - Subject: Reminder: [Reminder Name]
     - Body: [Reminder Notes]
3. Enable "Show in Share Sheet"

---

### Option 3: IFTTT / Zapier (No-Code)

**Using IFTTT (Free):**
1. Go to: https://ifttt.com
2. Create account
3. Create Applet:
   - **If This:** Date & Time → Every day at 09:00
   - **Then That:** Gmail → Send an email
   - Configure:
     - To: extendedvoid.prod@gmail.com
     - Subject: "Daily Station F Task Reminder"
     - Body: Use template from above

**Using Zapier (Free tier):**
1. Go to: https://zapier.com
2. Create Zap:
   - Trigger: Schedule by Zapier → Every Day
   - Action: Gmail → Send Email
   - Configure email content

---

## 📱 **Mobile App Recommendations**

### For iPhone (Apple Ecosystem)
1. **Apple Calendar + Reminders** (Built-in)
   - Sync with iCloud
   - Enable notifications
   - Use Siri: "Hey Siri, remind me about Station F tasks tomorrow"

2. **Fantastical** (Premium, $4.75/month)
   - Natural language input
   - Zoom integration
   - Team collaboration

3. **Things 3** ($9.99 one-time)
   - Beautiful design
   - Project management
   - Deadline tracking

### For Cross-Platform
1. **Google Calendar** (Free)
   - Works on all devices
   - Email integration
   - Color coding

2. **Todoist** (Free/Premium)
   - Task management
   - Recurring reminders
   - Priority levels

3. **Notion** (Free)
   - All-in-one workspace
   - Database tracking
   - Calendar view

---

## 🎯 **Recommended Timeline Setup**

### Phase 1: Immediate (Week 1)
```
Day 1 (Today):
- Review all documents
- Set up calendar integration
- Create email filters

Day 3:
⏰ 9:00 AM - Review application for placeholders

Day 4:
⏰ 9:00 AM - Test all links in application

Day 5:
⏰ 9:00 AM - Proofread with Grammarly

Day 7:
⏰ 9:00 AM - Get native English speaker review
⏰ 2:00 PM - Request letters of recommendation
```

### Phase 2: Traction Building (Week 2-3)
```
Day 10:
⏰ 9:00 AM - Add revenue projections
⏰ 10:00 AM - Add team scaling experience details

Day 14:
⏰ 9:00 AM - Follow up: Secure paying customers
⏰ 2:00 PM - Follow up: Increase LOIs

Day 21:
⏰ 9:00 AM - Final check: All high priority items
```

### Phase 3: Final Review (Week 4)
```
Day 25:
⏰ 9:00 AM - Complete all medium priority items

Day 28:
⏰ 9:00 AM - Final proofread
⏰ 2:00 PM - Submit application
```

---

## ✅ **Verification Checklist**

After setup, verify:

- [ ] Google Calendar has all tasks with deadlines
- [ ] Apple Calendar is synced with Google Calendar
- [ ] Email extendedvoid.prod@gmail.com receives notifications
- [ ] Email filters are set up for "Station F" emails
- [ ] Email label "Station F Application" exists
- [ ] At least one automation method is working (Google Apps Script, IFTTT, or Shortcuts)
- [ ] Test: Create a test task due tomorrow and verify email reminder

---

## 🔗 **Quick Links**

- **Google Calendar:** https://calendar.google.com
- **Apple Calendar:** https://www.icloud.com/calendar
- **Gmail:** https://mail.google.com
- **IFTTT:** https://ifttt.com
- **Zapier:** https://zapier.com
- **Application Files:** https://github.com/extendedvoidvoid/atelier-synesthesie

---

## 📞 **Support**

If you need help with setup:
1. Google Apps Script: Check [Google Apps Script Documentation](https://developers.google.com/apps-script)
2. IFTTT/Zapier: Check their help centers
3. Apple Calendar Sync: Check [Apple Support](https://support.apple.com)

---

*Guide v1.0 | Last updated: July 17, 2026 | For: extendedvoid.prod@gmail.com*
