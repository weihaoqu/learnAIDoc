---
title: "Novel to Multimedia Pipeline — From Chapter Draft to Douyin in One Session"
date: 2026-04-12
category: Creative & Media
redirect_from:
  - "/wiki/creative/novel-to-multimedia-pipeline/"
tags: [creative-writing, edge-tts, audiobook, douyin, video-generation, playwright, automation, chinese, pipeline, claude-code]
related: ["WebNovel Writer — How AI Writes 2M+ Word Novels Without Forgetting", "Toonflow — The AI Factory That Turns Novels Into Short Dramas"]
icon: "🎙️"
image: "/assets/images/novel-to-multimedia-pipeline.png"
---

Writing an AI novel is only step one. The real leverage comes when a single Claude Code session takes 150 chapters of raw markdown and converts them into multi-voice audiobooks, vertical video, and published Douyin content — with you clicking nothing but "publish." This entry documents the complete pipeline built during a live session with the 探花书房·逆袭 project.

*Source: Hands-on case study (April 11-12, 2026) | [Edge TTS](https://github.com/rany2/edge-tts) | [Playwright MCP](https://github.com/anthropics/claude-code)*

## The Pipeline at a Glance

```
Chapter .md (raw text)
    │
    ├──[1]──→ Parse: split narration vs dialogue, detect speakers
    │
    ├──[2]──→ TTS: Edge TTS multi-voice (旁白/Qing/林晚/妈/爸)
    │
    ├──[3]──→ Audiobook MP3: concatenate + 1.5x speed
    │
    ├──[4]──→ Douyin Video: text frames + fade transitions (1080×1920)
    │
    └──[5]──→ Publish: Playwright fills form, you click "发布"
```

One command per step. No manual editing. No switching between apps.

## Case Study: 探花书房·逆袭

| Metric | Result |
|--------|--------|
| **Chapters written** | 48 new chapters (103-150) in one session |
| **Writing method** | Parallel agents, 4 chapters at a time |
| **Audiobook generated** | 20 chapters, ~10 min each at 1.5x |
| **Douyin videos generated** | 20 full-chapter videos (~8-12 min each) |
| **Douyin videos published** | 20 chapters via semi-automated Playwright |
| **Total time** | ~4 hours (writing + audio + video + publishing) |

## Step 1: Multi-Voice Audiobook with Edge TTS

### Why Edge TTS?

| Option | Cost | Quality | Chinese Voices |
|--------|------|---------|----------------|
| **Edge TTS** | Free | 7/10 | 6 standard voices |
| CosyVoice (Alibaba) | Free (open-source) | 8.5/10 | Voice cloning |
| Fish Audio | Pay per use | 9/10 | Many character voices |
| 火山引擎 TTS | Free tier | 9/10 | Industry standard |

Edge TTS wins for prototyping — zero cost, zero setup, good enough quality to validate the concept before investing in premium voices.

### Voice Configuration (The Key Decision)

Finding the right voice required iteration. We generated 15+ demo clips before landing on this configuration:

| Role | Edge TTS Voice | Rate | Pitch | Why This Works |
|------|---------------|------|-------|----------------|
| **Narrator** | YunxiNeural | -5% | +0Hz | Warm, novel-reading tone |
| **Qing (male lead)** | YunyangNeural | -8% | -2Hz | Professional, calm — matches the character |
| **林晚 (female lead)** | XiaoyiNeural | -10% | +0Hz | Clear, youthful with distance |
| **Mom (50s)** | XiaoxiaoNeural | -12% | -8Hz | Pitch down + slow = aged voice |
| **Dad (50s)** | YunjianNeural | -10% | -3Hz | Deep, tired, working-class |

**Key insight:** Edge TTS voices are all "young professional" by default. To age a voice, drop pitch 5-8Hz and slow rate 10-12%. To differentiate characters on the same base voice, vary both pitch AND rate — changing only one makes them sound like the same person at a different speed.

### The Parsing Challenge

Chinese webnovel dialogue uses `""` (curly quotes). Speaker detection uses a simple heuristic:

```python
# Look 30 chars before the quote for character names
def detect_speaker(context_before):
    for name, voice in CHAR_MAP.items():
        if name in context_before[-30:]:
            return voice
    return 'narrator'  # fallback
```

This works ~90% of the time for the novel's writing style (speaker name almost always precedes dialogue). The 10% misattribution goes to narrator voice, which sounds natural enough.

### Generation Pipeline

```bash
# Install
python3 -m venv /tmp/tts-env
/tmp/tts-env/bin/pip install edge-tts Pillow

# Generate chapters 1-20
/tmp/tts-env/bin/python batch_audiobook.py 1 20
```

Each chapter: parse → generate segments (8 parallel) → add silence gaps → concatenate → apply 1.5x speed → output MP3.

**Output:** ~10 minutes per chapter at 1.5x speed. 20 chapters in ~15 minutes.

## Step 2: Douyin Vertical Video

### Format Iteration (What We Learned)

| Version | Format | User Feedback |
|---------|--------|---------------|
| **v1** | 1-min clips, static text cards, chapter split into 8-12 videos | "Too short, too many to publish" |
| **v2 (final)** | Full chapter (~10 min), text fade in/out, 1 video = 1 chapter | "Perfect, much less work" |

**The lesson:** Start simple, iterate fast. v1 took 30 minutes to build, revealed the wrong assumption (short = better for Douyin), and v2 took another 30 minutes to pivot.

### Video Design

```
┌──────────────────────┐
│  探花书房·逆袭        │  ← Faint watermark (opacity 20%)
│                      │
│                      │
│  十月一号傍晚，苏州到  │
│  太仓的末班大巴晃晃悠  │  ← White text, centered
│  悠地停在了浏河路汽车  │     44pt PingFang SC
│  站。                 │     Fades in 0.3s, out 0.3s
│                      │
│                      │
│                      │
│                      │
└──────────────────────┘
  1080×1920 / near-black bg (#0F0F19)
  Dialogue: slightly brighter bg (#161423)
  Speaker name below dialogue text
```

### Generation

```bash
# Generate full-chapter videos for chapters 1-20
/tmp/tts-env/bin/python douyin_fullchapter.py 1 20
```

Each chapter: parse → generate audio per segment → create text frame images (Pillow) → render video segments with fade filter (ffmpeg) → concatenate → apply 1.5x speed.

**Output:** ~9-12 MB per chapter. 20 chapters total ~255 MB.

## Step 3: Semi-Automated Publishing via Playwright

### Why Semi-Automated?

| Approach | Risk | Effort |
|----------|------|--------|
| Manual (browser) | Zero | High — fill 20 forms by hand |
| **Semi-auto (Playwright fills, you publish)** | Zero | Low — you just click one button |
| Full-auto (Playwright publishes) | Account ban risk | Zero |

Semi-auto is the sweet spot: Playwright handles the tedious form-filling, but you maintain control over when each video goes live.

### How It Works

1. **First time:** Playwright opens a browser, you scan QR code with Douyin app to log in
2. **Per chapter:** Script uploads video, fills title + description + hashtags
3. **You:** Review in the browser, click "发布"

```javascript
// Per-chapter upload (runs in Playwright MCP)
async (page) => {
  await page.goto('https://creator.douyin.com/creator-micro/content/upload');
  await page.waitForTimeout(1500);
  const fileInput = await page.locator('input[type="file"]').first();
  await fileInput.setInputFiles('<VIDEO_PATH>');
  await page.waitForTimeout(4000);
  const titleInput = page.locator('input[placeholder*="标题"]').first();
  await titleInput.fill('探花书房·逆袭｜第X章 <Title>');
  const editor = page.locator('.editor-kit-container').first();
  await editor.click();
  await page.keyboard.press('Meta+a');
  await page.keyboard.type('<Hook description> #小说推荐 #有声小说 ...');
  return 'ready';
}
```

**Publishing speed:** ~30 seconds per chapter (upload + fill + click). 20 chapters in ~10 minutes.

### Description Strategy

Each chapter's Douyin description follows a formula:

```
<One-line hook from chapter's most dramatic moment> + hashtags
```

Examples:
- "东北穷小子回到太仓，妈炖了排骨，爸的手指肿成紫色却不敢去医院…"
- "系统第一次过载。Qing的鼻子流出血来，视线模糊了三秒。"
- "她是谁？Qing在平江路的巷口再次遇到林晚，这次她没有笑。"

The hook should create curiosity without spoiling — make viewers start the video.

## The Skill: `/webnovel-publish`

The entire pipeline is packaged as a Claude Code skill. In any future session:

```
/webnovel-publish          # Triggers the full pipeline
"发抖音"                    # Also triggers it
"做有声书 21-50"            # Generate audiobooks for chapters 21-50
"publish chapters 21-50"   # Full pipeline for a chapter range
```

The skill contains:
- Voice configuration table
- Chapter parsing logic
- `batch_audiobook.py` — audiobook generation script
- `douyin_fullchapter.py` — video generation script
- Playwright publishing workflow
- Description template

## What's Next

| Enhancement | Difficulty | Impact |
|-------------|-----------|--------|
| **CosyVoice voice cloning** | Medium | Much better character voices |
| **AI-generated scene images** | High | Visual interest for longer videos |
| **Background music** | Low | Atmosphere (need royalty-free source) |
| **Auto-scheduling** | Low | Timed releases instead of manual publish |
| **Multi-platform** | Medium | Publish to 小红书, 微信视频号 simultaneously |

## Key Takeaways

1. **Edge TTS is underrated** — free, zero-setup, 6 Chinese neural voices with pitch/rate control. Good enough for MVP audiobooks.
2. **Iterate format fast** — our v1 (1-min clips) was wrong. We pivoted to full-chapter in 30 minutes. Ship, test, adjust.
3. **Semi-automation is the sweet spot** — Playwright fills forms, you click publish. Zero ban risk, 95% effort reduction.
4. **One session, three outputs** — the same chapter text becomes an MP3, a video, and a Douyin post. Write once, distribute everywhere.
5. **Parallel agents for writing** — 4 chapters at a time with detailed outlines = 48 chapters in ~2 hours. The outline is the bottleneck, not the writing.
