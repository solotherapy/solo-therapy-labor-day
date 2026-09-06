# Images — a correction to my audit, and what's actually wrong

## What I got wrong

My audit reported "0 of 59 images lazy-loaded." That was measured by testing for
the native `loading="lazy"` attribute, which is genuinely absent. But it led me
to the wrong conclusion.

**Your images do lazy-load.** Flow uses a JavaScript lazy-loader instead of the
native attribute. Verified in the homepage source:

```
class="lazyload"    103 occurrences
data-src             51
data-sizes          102
<noscript> fallback  52
loading="lazy"        0   ← what I tested for
```

So don't spend any time adding lazy loading. It's there, and the `<noscript>`
fallbacks mean it degrades correctly without JS.

## What is actually wrong

Two things, both confirmed, and both still worth fixing:

### 1. No responsive images at all

`srcset` and `data-srcset` each appear **zero** times across the entire site.
Every image is served at one fixed width regardless of screen size or pixel
density. A phone downloads the same file as a 27-inch monitor.

### 2. No `width`/`height` on any image

Zero of 59 homepage images carry dimension attributes. The browser can't reserve
space before the image loads, so content jumps as each one arrives. This is a
direct Cumulative Layout Shift penalty, and CLS is a ranking factor.

### 3. The hero is an unoptimised PNG

`backimage-02.png` — 173 KB, took 2,218 ms to load, and it's a photograph.
PNG is the wrong format for photographic content. As WebP it should land near
30–40 KB.

---

## The fix — and why I'd hold off on hand-patching

You *can* patch the theme's image snippet by hand:

```liquid
<img
  src="{{ image | image_url: width: 800 }}"
  srcset="{{ image | image_url: width: 400 }} 400w,
          {{ image | image_url: width: 800 }} 800w,
          {{ image | image_url: width: 1200 }} 1200w"
  sizes="(min-width: 990px) 33vw, (min-width: 750px) 50vw, 100vw"
  width="{{ image.width }}"
  height="{{ image.height }}"
  loading="lazy"
  decoding="async"
  alt="{{ image.alt | default: product.title | escape }}">
```

with the hero as the one exception — it must be `loading="eager"` and
`fetchpriority="high"`, because lazy-loading your largest above-the-fold image
makes LCP *worse*:

```liquid
<img src="..." width="..." height="..." loading="eager" fetchpriority="high" alt="...">
```

**But there's a much better path.** See the theme-version note in the README:
your Flow version is from 2021 and modern Flow does all of this natively. Patching
by hand now means doing the work twice. I'd fix the schema and text issues first
(those carry forward regardless), then evaluate the theme update, and only
hand-patch images if you decide to stay on 17.3.4 long-term.

---

## The 12 images missing alt text

Measured live. Eleven are yours; the twelfth belongs to a WhatsApp share-button
app and isn't worth chasing.

These are content images added through the theme editor, so you fix them in
**Online Store → Themes → Customize**, in the section each one sits in — not in code.

| Image file | Likely section |
|---|---|
| `DSC08126_150x.jpg` | homepage content |
| `Ashwagandha_150x.png` | homepage content |
| `shutterstock_2565989461_150x.jpg` | homepage content |
| `BARBERRYROOT-Photoroom_150x.jpg` | homepage content |
| `iStock-879243758_150x.jpg` | homepage content |
| `SOLO-THERAPY_Rose_Quartz_Crystal_150x.jpg` | blog/social grid |
| `SOLO-THERAPY_Oil_Scents_150x.jpg` | blog/social grid |
| `SOLO-THERAPY_Love_whit_herbs_150x.jpg` | blog/social grid |
| `SOLO-THERAPY_Sandalwood_150x.jpg` | blog/social grid |
| `SOLO-THERAPY_Patchouli_150x.jpg` | blog/social grid |
| `SOLO-THERAPY_Be_grateful_150x.jpg` | blog/social grid |
| `image_2.6.png` | WhatsApp app — ignore |

Write alt text that describes the image for someone who can't see it — 
"Dried barberry root in a glass jar", not "barberry root buy online".
Keyword-stuffed alt text is a spam signal, and these are decorative
content images, not product shots.

> Also worth noting: `SOLO-THERAPY_Love_whit_herbs` is a typo for `with`.
> Harmless for SEO, but if you ever rename the file, fix it then.
