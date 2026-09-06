# SOLO THERAPY Labor Day Video

A complete end-to-end AI video creation pipeline for generating a cinematic 45-second vertical Instagram Reel celebrating workers on Labor Day.

**Status: Project Structure & Components Built** ✨

---

## 🎬 Project Overview

This project uses:
- **Node.js + TypeScript** for the build pipeline
- **FAL.ai** for AI video generation
- **Remotion** for professional video composition and rendering
- **React** components for reusable UI elements

**Output Specifications:**
- Format: MP4 (H.264)
- Resolution: 1080×1920 (9:16 vertical)
- Duration: 45 seconds
- Frame Rate: 30 fps
- File: `out/solo-therapy-labor-day.mp4`

---

## 📁 Project Structure

```
solo-therapy-labor-day/
├── src/
│   ├── index.ts                 # Remotion entry point
│   ├── Root.tsx                 # Composition registry
│   ├── SoloTherapyLaborDay.tsx   # Main composition
│   ├── config.ts                # Video & style config
│   ├── types.ts                 # TypeScript interfaces
│   ├── components/
│   │   ├── CinematicText.tsx     # Text overlay with animations
│   │   ├── CinematicVideo.tsx    # Video player with effects
│   │   ├── PlaceholderClip.tsx   # Fallback for missing files
│   │   ├── GlobalFilmOverlay.tsx # Film grain & vignette
│   │   └── SoloTherapyEndCard.tsx # Branded end card
│   ├── scenes/
│   │   ├── OpeningScene.tsx      # 0-5s: Day begins
│   │   ├── WorkersScene.tsx      # 5-12s: Different professions
│   │   ├── HandsScene.tsx        # 12-26s: Hands working (dynamic)
│   │   ├── HumanStoryScene.tsx   # 26-35s: Human moments
│   │   ├── ClosingScene.tsx      # 35-40s: End of day
│   │   └── EndCardScene.tsx      # 40-45s: Branded end card
│   ├── lib/
│   │   ├── colors.ts            # Color palette & utilities
│   │   ├── transitions.ts        # Animation helpers
│   │   └── asset.ts             # Asset path utilities
│   └── services/
│       ├── videoProvider.ts      # Provider abstraction
│       ├── falProvider.ts        # FAL.ai implementation
│       └── scenePrompts.ts       # AI prompt library (15 clips)
├── scripts/
│   ├── generate-scenes.ts        # AI clip generation CLI
│   └── render-video.ts           # Final render script
├── public/
│   └── assets/
│       ├── generated/            # AI-generated clips (auto-created)
│       ├── solo-therapy-logo.png # Your brand logo (optional)
│       └── music.mp3             # Background music (optional)
├── out/                          # Final output (auto-created)
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs:
- `remotion` — video composition & rendering
- `react` & `react-dom` — component framework
- `typescript` & `tsx` — development tools

### 2. Set Up Environment

Copy `.env.example` to `.env` and add your FAL API key:

```bash
cp .env.example .env
```

Edit `.env`:

```
VIDEO_PROVIDER=fal
FAL_API_KEY=your_api_key_here
```

**Get your FAL API key:**
1. Visit [fal.ai](https://www.fal.ai/)
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Paste it in `.env`

### 3. (Optional) Add Your Assets

**Logo:**
- Place `solo-therapy-logo.png` at: `public/assets/solo-therapy-logo.png`
- If missing, an elegant placeholder card will be used

**Music:**
- Place `music.mp3` at: `public/assets/music.mp3`
- If missing, video renders without audio
- Music will automatically fade in/out at start/end

### 4. Generate AI Video Clips

```bash
npm run generate:scenes
```

This will:
- Read 15 carefully crafted prompts from `src/services/scenePrompts.ts`
- Call FAL.ai to generate each clip (~4-6 seconds each)
- Save clips to `public/assets/generated/`
- Show progress in console
- Log errors but continue rendering (uses placeholders for missing files)

**First time:** ~10-20 minutes (depends on API queue and network)

**Subsequent runs:** Only generates missing clips (add `--force` to regenerate all)

```bash
npm run generate:scenes --force
```

### 5. Preview in Remotion Studio

```bash
npm run preview
```

This launches Remotion Studio at `http://localhost:3000`:
- Preview the composition in real-time
- Edit timeline interactively
- Adjust timing, text, and effects
- See changes instantly

### 6. Render Final Video

```bash
npm run render
```

This will:
- Render the entire 45-second composition
- Apply all effects, text, and music
- Output to: `out/solo-therapy-labor-day.mp4`
- Takes 10-30 minutes depending on your system

### 7. Done!

Your video is ready at:
```
out/solo-therapy-labor-day.mp4
```

Upload to Instagram, TikTok, or any 9:16 vertical platform.

---

## 📝 Full Workflow

**One-command build:**
```bash
npm run build
```

This runs:
1. `generate:scenes` — AI clip generation
2. `render` — Final video rendering

**Or run individually:**
```bash
# Step by step
npm run generate:scenes
npm run preview           # Optional: review in studio
npm run render
```

---

## 🎨 Customization

### Edit Text & Timing

Edit scene files in `src/scenes/`:

```typescript
// src/scenes/OpeningScene.tsx
<CinematicText
  text={['Every day begins', 'with someone showing up.']}
  startFrame={30}
  endFrame={durationFrames - 15}
  fontSize={64}  // Adjust size
  fontFamily="serif"
  fadeInDuration={20}
  fadeOutDuration={15}
/>
```

### Edit Colors

Edit `src/lib/colors.ts` to swap the palette:

```typescript
export const palette = {
  cream: '#F4EFE7',
  warmBeige: '#D7C6AE',
  mutedSage: '#87967B',
  deepOlive: '#485343',
  warmBrown: '#8B735F',
  charcoal: '#252824',
};
```

### Edit AI Prompts

Edit `src/services/scenePrompts.ts` to customize what the AI generates:

```typescript
{
  id: 'opening-1',
  prompt: 'Your custom prompt here...',
  filename: 'custom-clip.mp4',
  duration: 5,
}
```

**Prompt best practices:**
- Be specific and visual
- Request cinematic quality
- Mention lighting, emotion, and style
- Use 50-150 words
- Avoid contradictory requests

### Add Different Video Provider

The code is designed for easy provider swaps. To add Runway, Pika, or another provider:

1. Create `src/services/yourProvider.ts`:

```typescript
import { BaseVideoProvider } from './videoProvider.js';

export class YourProvider extends BaseVideoProvider {
  async generateClip(prompt: string, outputPath: string): Promise<void> {
    // Your API call here
  }
}
```

2. Register in `src/services/videoProvider.ts`:

```typescript
if (provider === 'your-provider') {
  const { YourProvider } = await import('./yourProvider.js');
  return new YourProvider();
}
```

3. Use it:

```bash
VIDEO_PROVIDER=your-provider npm run generate:scenes
```

---

## 🎬 Video Narrative

The 45-second reel follows this structure:

**Scene 1 (0-5s): Opening**
- "Every day begins with someone showing up."

**Scene 2 (5-12s): Different Professions**
- Shows: nurse, teacher, construction, chef
- "Different paths. Different skills. One shared dedication."

**Scene 3 (12-26s): Hands Working** (Most dynamic)
- Shows: farmer, firefighter, hairstylist, delivery, business owner, therapist
- "Hands that build. Hands that heal. Hands that create. Hands that care."

**Scene 4 (26-35s): Human Moments**
- Shows: smiling workers, teacher connection, healthcare worker reflection
- "Behind every job is a person. A story. A purpose."

**Scene 5 (35-40s): Closing**
- "Today, we honor the work. And the people behind it."

**End Card (40-45s): SOLO THERAPY Branding**
- Animated botanical background
- "Happy Labor Day" greeting
- "Care for the person behind the work."
- Logo reveal + Instagram handle

---

## 🛠️ Troubleshooting

### "FAL_API_KEY not set"
- Copy `.env.example` to `.env`
- Add your real FAL API key
- Get one at [fal.ai](https://www.fal.ai/)

### "Video file not found"
- Clips are generated in `public/assets/generated/`
- If generation failed, check console output
- Regenerate with: `npm run generate:scenes --force`
- Placeholders will fill missing clips

### "Remotion Studio won't start"
- Make sure port 3000 is available
- Check Node.js version (needs 16+): `node --version`
- Reinstall: `npm install`

### "Render takes too long"
- This is normal (10-30 min depending on CPU)
- Set `concurrency: 1` in `scripts/render-video.ts` to reduce memory usage
- Check your CPU isn't throttled

### "Music not playing"
- Add `music.mp3` to `public/assets/`
- Supported formats: MP3, WAV, AAC, OGG
- Optional — video renders fine without it

---

## 📊 Component Reference

### CinematicText
```typescript
<CinematicText
  text={string | string[]}          // Single line or array
  startFrame={number}                // When to appear
  endFrame={number}                  // When to disappear
  fontSize={number}                  // Default: 72
  fontFamily={'serif' | 'sans'}      // Default: 'serif'
  color={string}                     // Hex color, default: cream
  fadeInDuration={number}            // Frames to fade in
  fadeOutDuration={number}           // Frames to fade out
  motionOffset={number}              // Upward motion pixels
/>
```

### CinematicVideo
```typescript
<CinematicVideo
  src={string}                       // File path
  startFrame={number}                // When to start
  duration={number}                  // Length in frames
  enableZoom={boolean}               // Slow zoom effect
  darkOverlay={boolean}              // Dark overlay
  warmOverlay={boolean}              // Warm color tint
  fallbackText={string}              // Placeholder text
/>
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `remotion` | Video composition & rendering |
| `react` | Component framework |
| `typescript` | Type safety |
| `tsx` | TypeScript execution |

---

## 📄 License

This project is part of SOLO THERAPY brand content.

---

## 🎯 Next Steps

1. **Install:** `npm install`
2. **Configure:** Add FAL API key to `.env`
3. **Generate:** `npm run generate:scenes`
4. **Preview:** `npm run preview`
5. **Render:** `npm run render`
6. **Share:** Upload `out/solo-therapy-labor-day.mp4`

---

**Questions?** Check the Remotion docs at [remotion.dev](https://www.remotion.dev)

**Ready to create?** Run `npm run generate:scenes` 🚀
