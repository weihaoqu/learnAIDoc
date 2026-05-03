---
title: "Build a Free Online Survey with GitHub Pages + Google Sheets"
date: 2026-05-02
category: AI for Teaching
tags: [google-sheets, github-pages, apps-script, survey, data-collection, teaching, demo-day, irb]
related: ["AI Mastery Games — Teaching AI Literacy Through Interactive Games", "Anti-AI Exam Designer — A Claude Code Skill for AI-Resistant Exams", "AI in Education — Teacher's Factory, Not Student's Cheat Tool"]
icon: "📋"
image: "/assets/images/github-pages-google-sheets-survey.png"
---

A zero-cost, no-backend way to collect survey responses using a static HTML form on GitHub Pages and Google Apps Script as the glue to write data into Google Sheets. No server, no database, no paid tools — just HTML + JavaScript + a Google Sheet.

*Source: [dwyl/web-form-to-google-sheet](https://github.com/dwyl/web-form-to-google-sheet) | [levinunnink/html-form-to-google-sheet](https://github.com/levinunnink/html-form-to-google-sheet) | [Google Apps Script Docs](https://developers.google.com/apps-script/) | [LockService Concurrency Benchmark](https://tanaikech.github.io/2021/09/15/benchmark-concurrent-writing-to-google-spreadsheet-using-form/)*

## Why This Stack?

| Feature | Google Forms | This Approach |
|---------|-------------|---------------|
| Cost | Free | Free |
| Custom UI/UX | Limited | Full control (HTML/CSS) |
| Mobile-friendly | Decent | Fully customizable |
| Multi-step flows | Clunky | Native (consent → form) |
| Branding | Google branding | Your own design |
| QR code per group/section | Manual | Auto-generated |
| Conditional logic | Basic | Full JavaScript |
| Data destination | Google Sheets | Google Sheets |

**Best for:** Classroom demos, research studies (IRB-compliant), event feedback, conference surveys, workshop evaluations — anywhere you need custom UX without paying for SurveyMonkey or Typeform.

## Architecture

```
┌─────────────────┐     POST (JSON)      ┌──────────────────┐
│  GitHub Pages    │ ──────────────────►  │  Google Apps      │
│  (Static HTML)   │                      │  Script (Web App) │
│                  │  ◄──────────────────  │                  │
│  index.html      │     {status: "ok"}   │  doPost(e)       │
│  feedback.html   │                      │  doGet(e)        │
└─────────────────┘                      └────────┬─────────┘
                                                  │
                                                  │ appendRow()
                                                  ▼
                                         ┌──────────────────┐
                                         │  Google Sheet     │
                                         │                  │
                                         │  Tab: Consent    │
                                         │  Tab: Feedback   │
                                         └──────────────────┘
```

## Step-by-Step Guide

### Step 1: Create the Google Sheet

Create a new Google Sheet. You don't need to manually set up tabs — the Apps Script will do it automatically (see Step 2).

### Step 2: Set Up Google Apps Script

In your Google Sheet, go to **Extensions → Apps Script**. Paste this code:

```javascript
// Run this once to create tabs with headers
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var consent = ss.getSheetByName('Consent');
  if (!consent) consent = ss.insertSheet('Consent');
  consent.getRange('A1').setValue('Timestamp');
  consent.getRange('A1').setFontWeight('bold');

  var feedback = ss.getSheetByName('Feedback');
  if (!feedback) feedback = ss.insertSheet('Feedback');
  var headers = ['Timestamp', 'Group', 'Pre Rating', 'Post Rating',
                 'Learning', 'Accuracy', 'Usability', 'Comments'];
  feedback.getRange(1, 1, 1, headers.length).setValues([headers]);
  feedback.getRange(1, 1, 1, headers.length).setFontWeight('bold');

  var sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && sheet1.getLastRow() === 0) ss.deleteSheet(sheet1);
}

// Handles form submissions
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return corsResponse({ status: 'error', message: 'Server busy' });
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);

    if (data.type === 'consent') {
      sheet.getSheetByName('Consent').appendRow([data.timestamp]);
    } else if (data.type === 'feedback') {
      sheet.getSheetByName('Feedback').appendRow([
        data.timestamp, data.group, data.pre_rating,
        data.post_rating, data.learning, data.accuracy,
        data.usability, data.comments
      ]);
    }
    return corsResponse({ status: 'ok' });
  } catch (err) {
    return corsResponse({ status: 'error', message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return corsResponse({ status: 'ok', message: 'API is running.' });
}

function corsResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

**Deploy:**

1. Select `setupSheets` from the function dropdown → click **▶ Run** (creates tabs)
2. **Deploy → New deployment → Web app**
3. Execute as: **Me** | Who has access: **Anyone**
4. Copy the Web app URL

### Step 3: Build the HTML Form

The frontend is pure HTML + vanilla JavaScript. Key pattern for submitting to Apps Script:

```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';

async function submitForm(data) {
  const resp = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    redirect: 'follow',          // Apps Script redirects on POST
    headers: { 'Content-Type': 'text/plain' },  // Avoids CORS preflight
    body: JSON.stringify(data)
  });
  const result = await resp.json();
  if (result.status !== 'ok') throw new Error(result.message);
}
```

**Three critical gotchas:**

| Gotcha | Why | Fix |
|--------|-----|-----|
| `Content-Type: text/plain` | `application/json` triggers a CORS preflight request that Apps Script can't handle | Always use `text/plain` |
| `redirect: 'follow'` | Apps Script returns a 302 redirect on POST; without this, fetch fails | Always include `redirect: 'follow'` |
| Parse in Apps Script | Since Content-Type is `text/plain`, use `JSON.parse(e.postData.contents)` | Don't rely on `e.parameter` |

### Step 4: Deploy on GitHub Pages

1. Create a GitHub repo (e.g., `cs305-feedback`)
2. Push your HTML files to the `main` branch
3. **Settings → Pages** → enable GitHub Pages (deploy from branch or use Actions workflow)
4. Replace `YOUR_APPS_SCRIPT_URL_HERE` in HTML files with the real URL from Step 2

For GitHub Actions deployment (needed if your default branch is `main`, not `master`):

```yaml
# .github/workflows/static.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 5: Test End-to-End

1. Visit your GitHub Pages URL — consent page should load
2. Submit a test response
3. Check the Google Sheet — a row should appear
4. Delete test rows before going live

## Case Study: CS305 Demo Day Feedback

### Context

For the CS305 Advanced Computing course at Monmouth University, students build educational games/apps that teach CS theory topics (DFAs, CFGs, Turing machines, etc.). On Demo Day, ~30-45 students rotate through 15 group presentations, playing each game and giving feedback.

### Requirements

- **IRB-approved research study** — needed consent flow before data collection
- **15 groups** — each needs its own feedback channel (QR code per group)
- **Mobile-first** — students scan QR codes on their phones
- **Anonymous** — no login, no names, no tracking
- **Concurrent** — 15+ students submitting at the same time
- **Free** — university budget = $0

### What We Built

**Three-screen flow:**

```
Consent Page (index.html)
    │
    │ checkbox + submit → records timestamp in Consent tab
    ▼
Group Selector Hub (feedback.html)
    │
    │ 15 group cards, green = already submitted
    ▼
Feedback Form (feedback.html?group=N)
    │
    │ 5 Likert scales + 1 open-ended → Feedback tab
    ▼
Success Screen → auto-redirect back to hub
```

**Feedback questions (mapped to research questions):**

| # | Question | Scale | Research Purpose |
|---|----------|-------|-----------------|
| 1 | Pre-understanding rating | 1-5 | RQ3: Baseline |
| 2 | Post-understanding rating | 1-5 | RQ3: Learning gain |
| 3 | How well did it teach the concept? | 1-5 | RQ1: Educational value |
| 4 | How accurate was the CS content? | 1-5 | RQ2: Misconception detection |
| 5 | How easy/engaging to use? | 1-5 | Usability metric |
| 6 | What helped / what to improve? | Text | Qualitative feedback |

**QR code flyer:** A single HTML page that generates 15 QR codes (one per group) using the [qrcode.js](https://github.com/soldair/node-qrcode) library. Each QR encodes `feedback.html?group=N`. Print one page, tape it to the wall or project it.

### Google Sheet Structure

| Tab | Columns |
|-----|---------|
| Consent | Timestamp |
| Feedback | Timestamp, Group, Pre Rating, Post Rating, Learning, Accuracy, Usability, Comments |

### Concurrency Handling

With `LockService.getScriptLock()` and a 10-second wait timeout:

- Each `appendRow` takes ~200-500ms
- 15 serialized writes = ~3-7 seconds (well within timeout)
- [Benchmark data](https://tanaikech.github.io/2021/09/15/benchmark-concurrent-writing-to-google-spreadsheet-using-form/) shows Apps Script Web Apps handle up to ~60 concurrent users with a 20-second lock wait
- For a class of 30-45 students, this is more than sufficient

## Adapting This Template

To reuse this pattern for your own survey:

1. **Change the questions** — edit the `<fieldset>` blocks in `feedback.html`
2. **Change the data columns** — update `appendRow()` in Apps Script and `setupSheets()` headers
3. **Change group count** — set `TOTAL_GROUPS` in JavaScript (or remove the group concept entirely)
4. **Remove consent flow** — if not needed for IRB, skip `index.html` and link directly to `feedback.html`
5. **Add validation** — the `required` attribute and JavaScript checks handle client-side validation
6. **Style it** — the CSS is vanilla, no frameworks needed; customize colors and layout freely

## Limitations

| Limitation | Workaround |
|------------|-----------|
| No real-time dashboard | Use Google Sheets' built-in charts, or connect to Looker Studio |
| No file uploads | Add Google Drive integration via Apps Script |
| No authentication | Add a simple passphrase field if needed |
| Apps Script quotas (free tier) | 20,000 URL fetches/day, 30 simultaneous executions — fine for classroom scale |
| No email notifications | Add `MailApp.sendEmail()` in the Apps Script `doPost` |
| HTTPS only on GitHub Pages | GitHub Pages enforces HTTPS by default — this is a feature, not a limitation |

## Full Source Code

The complete working implementation is available at: [weihaoqu/cs305-feedback](https://github.com/weihaoqu/cs305-feedback)

| File | Purpose |
|------|---------|
| `index.html` | Consent page with IRB info |
| `feedback.html` | Group hub + feedback form + success screen |
| `apps_script.js` | Google Apps Script backend (paste into Sheet) |
| `qr_flyer.html` | QR code generator for all groups |
| `SETUP.md` | Step-by-step setup instructions |
