# Solo Therapy — Batch 1 fixes

Everything here is ready to apply. Nothing in this batch changes how the store
looks or how checkout works.

**Full audit:** https://claude.ai/code/artifact/1606e7b5-a7aa-4c24-87e1-e4d36756c627

---

## Before you touch any code: duplicate the theme

Your live theme is **"SoloTherapy New"** (Flow 17.3.4, theme id `120143806563`).
Never edit a published theme directly.

1. Online Store → Themes
2. On "SoloTherapy New", click **⋯ → Duplicate**
3. Rename the copy something like `SoloTherapy — SEO fixes Aug 2026`
4. Make every edit below on the **duplicate**
5. **Preview**, check a product page, the homepage and the FAQ page
6. Only then **Publish**

If anything goes wrong, you publish the original back. Two minutes of setup that
makes every step below reversible.

---

## The files

| File | What it does | Where it goes |
|---|---|---|
| **`00-ALL-SCHEMA-single-file.liquid`** | **All schema in one snippet — use this** | **New snippet `st-schema` + one line in `theme.liquid`** |
| `01-product-schema.liquid` | Product + Offer + review stars | Superseded by `00` — split-file alternative |
| `02-organization-and-breadcrumbs.liquid` | Organization, WebSite, Breadcrumb | Superseded by `00` — split-file alternative |
| `03-faq-schema.liquid` | FAQPage | Superseded by `00` — split-file alternative |
| `04-og-image-and-h1-fixes.md` | Two find-and-replace edits | `social-meta-tags.liquid`, `header.liquid` |
| `05-images-corrected.md` | Corrects an audit finding; alt-text list | Read before doing image work |

Each `.liquid` file has its exact install steps in a comment at the top.

### Recommended install — two edits, ~3 minutes

Use `00-ALL-SCHEMA-single-file.liquid` and ignore 01–03. It covers **Product +
Offer + AggregateRating**, **Organization + WebSite**, **BreadcrumbList**,
**FAQPage** and **BlogPosting**, branching internally on template type.

1. Edit code → Snippets → Add a new snippet → name it `st-schema` → paste → Save
2. `layout/theme.liquid` → add `{% render 'st-schema' %}` on the line above `</head>` → Save

To reverse the whole thing: delete that one line.

> **Verified file names.** Your theme's product template is
> `sections/template--product.liquid` and the page template is
> `sections/template--page.liquid` — not the names I gave in my first pass.
> The single-file install doesn't touch either of them, which is part of why
> it's the safer route.

---

## No-code tasks (Shopify admin, ~20 minutes total)

These need no theme edits and can be done on the live store right now.

### 1. Homepage title and meta description
**Online Store → Preferences**

Your homepage title is currently just `Solo Therapy` — 12 characters out of ~60,
with no words anyone searches for. Set:

- **Title:** `Dried Herbs, Palo Santo & Ritual Incense | Solo Therapy`
- **Description:** `Organic dried herbs, roots, palo santo, resin incense and crystal tea infusers. Ethically sourced, shipped across the US. Hierbas y productos espirituales.`

### 2. Redirect the dead product
**Online Store → Navigation → URL Redirects → Create**

- **From:** `/products/6-pure-essential-oils-eucalyptus-lavender-frankincense-lemongrass-rosemary-patchouli`
- **To:** `/collections/essential-oil-therapy`

This is a deleted essential-oil set still linked from your homepage and returning
a hard 404.

### 3. Fix the ALL-CAPS titles
All-caps depresses click-through and reads as shouting in search results.

- Blog post `HOW TO SMUDGE` → `How to Smudge: A Beginner's Guide`
- Page `CONTACT US` → `Contact Us`

Change the **title**, not the URL handle — changing handles breaks existing links.

### 4. Correct the Facebook address
Your Facebook page says **Woodland, CA**, but `21781 Ventura Blvd` with an 818
number is **Woodland Hills** — different cities, ~350 miles apart. Etsy says
Porter Ranch.

Pick the correct one and make Facebook, Etsy, the site footer and
the `st_city` value in `00-ALL-SCHEMA-single-file.liquid` all agree. **Don't publish the
Organization schema until this is settled** — teaching Google a wrong location
is harder to undo than teaching it nothing.

### 5. Decide about YouTube
13 subscribers, 2 videos, linked from every page of your site. Either unlink it
(Customize → footer/header social settings) or upload six of the Reels you've
already shot. Right now it costs trust on every pageview.

---

## After publishing — verify

1. **Rich Results Test** — https://search.google.com/test/rich-results
   Run these four and confirm each detects what it should:
   - a product URL → **Product** (price, availability, + rating if that product has reviews) and **Breadcrumbs**
   - a collection URL → **Breadcrumbs**
   - `/pages/faqs` → **FAQPage**
   - a blog post → **Article/BlogPosting**
   Every page should also carry **Organization**.
2. **Facebook Sharing Debugger** — https://developers.facebook.com/tools/debug/
   Run a product URL, click *Scrape Again*, confirm the image renders over https.
3. **One `<h1>`** — load the homepage, DevTools console, `$$('h1').length` → `1`
4. **Search Console** — Settings → Crawl stats, and request indexing on the
   homepage plus three product URLs to speed up recrawl.

Rich results typically start appearing 2–4 weeks after recrawl. Nothing here
shows up same-day.

---

## The bigger question: your theme is 24 versions behind

Flow is a supported Shopify Theme Store theme, currently at **v41.2.5**
(Feb 2026). You're on **17.3.4**, from 2021.

Modern Flow ships native lazy loading, `srcset` responsive images, image
dimension attributes, Product JSON-LD, and none of the IE8/IE9 compatibility
code your version still carries. Updating would fix findings 01, 05, 07 and most
of 12 in one move — versus hand-patching each.

The catch is real: theme updates don't preserve custom code or custom sections,
and four years of accumulated customisation is a genuine migration, not a button.

**My recommendation:** apply this batch now — it's small, safe, and the schema
snippets carry forward to any theme. Separately, duplicate the theme, run the
update on the copy, and compare side by side without any time pressure. That
tells you what the update would actually cost before you commit to it.

I'd treat "hand-patch the image pipeline on 17.3.4" as the fallback if the update
turns out to be too disruptive — not the first move. It's the one item in the
audit I'd hold rather than rush.
