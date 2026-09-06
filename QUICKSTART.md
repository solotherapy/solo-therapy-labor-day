# 🚀 QUICKSTART — SOLO THERAPY Labor Day Video

**5-minute setup to create your AI video.**

---

## ✅ What's Already Built

All source code is ready:
- ✅ 20 TypeScript files created
- ✅ 15 AI video clip prompts prepared
- ✅ Remotion composition configured
- ✅ npm dependencies installed
- ✅ TypeScript type checks pass

**You only need to:**
1. Add your FAL API key
2. Generate AI clips (10-20 min)
3. Render the video (10-30 min)

---

## 📋 Step 1: Add FAL API Key (2 min)

```bash
cp .env.example .env
```

Edit `.env` file and add your API key:

```
VIDEO_PROVIDER=fal
FAL_API_KEY=your_actual_key_here
```

**Get API key:**
1. Go to [fal.ai](https://www.fal.ai/)
2. Sign up (free)
3. Copy API key from dashboard
4. Paste in `.env`

---

## 🎬 Step 2: Generate AI Video Clips (10-20 min)

```bash
npm run generate:scenes
```

This will:
- Read 15 professional prompts
- Call FAL.ai to generate each clip
- Save to `public/assets/generated/`
- Show progress in console

**What gets generated:**
- `opening-alarm.mp4` — morning preparation
- `worker-nurse.mp4` — healthcare worker
- `worker-teacher.mp4` — teacher setup
- `worker-construction.mp4` — construction worker
- `worker-chef.mp4` — kitchen prep
- `hands-farmer.mp4` — farm work
- `hands-firefighter.mp4` — firefighter prep
- `hands-hairstylist.mp4` — salon work
- `hands-delivery.mp4` — package delivery
- `hands-business.mp4` — shop opening
- `hands-therapist.mp4` — therapy space prep
- `emotion-smile.mp4` — genuine connection
- `emotion-teacher.mp4` — classroom interaction
- `emotion-care.mp4` — healthcare moment
- `closing-sunset.mp4` — end of workday

**Errors are okay** — placeholders fill missing clips.

---

## 👀 Step 3 (Optional): Preview in Remotion Studio

```bash
npm run preview
```

Opens http://localhost:3000 where you can:
- See the composition in real-time
- Adjust timing and text
- Preview before rendering
- See changes instantly

Press `Ctrl+C` to stop.

---

## 🎥 Step 4: Render Final MP4 (10-30 min)

```bash
npm run render
```

This will:
- Render all 45 seconds
- Apply effects, text, music (if present)
- Output to: `out/solo-therapy-labor-day.mp4`
- Show progress in console

**Files generated:**
- `out/solo-therapy-labor-day.mp4` — your final video!

---

## 📁 Optional Assets

### Add Your Logo

Place your logo at:
```
public/assets/solo-therapy-logo.png
```

If missing, an elegant placeholder is shown.

### Add Music

Place your music at:
```
public/assets/music.mp3
```

Supported formats: MP3, WAV, AAC, OGG

Music auto-fades in/out at start/end.

If missing, video renders without audio (still cinematic).

---

## 🔥 One-Command Build

Generate clips + render video in one command:

```bash
npm run build
```

Equivalent to:
```bash
npm run generate:scenes && npm run render
```

---

## ✨ Final Output

When done:
```
out/solo-therapy-labor-day.mp4
```

Ready to upload to:
- Instagram Reels (9:16)
- TikTok (9:16)
- YouTube Shorts (9:16)
- Any vertical video platform

---

## 🎯 Commands Reference

| Command | What it does |
|---------|-------------|
| `npm run generate:scenes` | Generate AI video clips |
| `npm run generate:scenes --force` | Regenerate all clips |
| `npm run preview` | Launch Remotion Studio preview |
| `npm run render` | Render final MP4 |
| `npm run build` | Generate + render (full pipeline) |
| `npm run clean` | Delete generated clips and output |

---

## ❓ Troubleshooting

### "FAL_API_KEY not set"
- Make sure `.env` file exists and has your key
- Restart terminal after editing `.env`
- Key format: starts with `fal_`

### "Video file not found"
- Check generation output for errors
- Run `npm run generate:scenes --force` to retry
- Placeholders automatically fill missing clips

### "Port 3000 already in use"
- Kill: `lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9`
- Or use different port

### "Render takes forever"
- This is normal (10-30 min)
- Depends on your CPU
- Don't close the terminal

---

## 🎨 Customization

Want to customize? See `README.md` for:
- Editing text & timing
- Changing colors
- Modifying AI prompts
- Adding different providers

---

## 📞 Need Help?

- Remotion docs: [remotion.dev](https://www.remotion.dev)
- FAL docs: [fal.ai/docs](https://fal.ai/docs)
- This project: See `README.md`

---

**Ready?** Run:
```bash
npm run generate:scenes
```

**Then:**
```bash
npm run render
```

**Done!** 🎉
