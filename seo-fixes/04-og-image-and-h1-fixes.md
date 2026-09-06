# Two small theme edits

Both are find-and-replace inside existing theme files. Neither adds anything new.

---

## Edit A — `og:image` is served over `http://`

**File:** `snippets/social-meta-tags.liquid`

Your store sends HSTS and an `upgrade-insecure-requests` CSP, then hands Facebook
and X an insecure image URL. Card previews can silently fail to render — which
matters, because Facebook is your largest channel at 9.4K followers.

**Find** the line that outputs `og:image`. It currently produces:

```
<meta property="og:image" content="http://solotherapy.com/cdn/shop/products/...">
```

so the source looks something like:

```liquid
<meta property="og:image" content="http:{{ product.featured_image | img_url: '1200x1200' }}">
```

**Replace the whole `og:image` group with:**

```liquid
{%- assign og_img = product.featured_image | default: page_image | default: settings.share_image -%}
{%- if og_img -%}
  <meta property="og:image" content="{{ og_img | image_url: width: 1200 | prepend: 'https:' }}">
  <meta property="og:image:secure_url" content="{{ og_img | image_url: width: 1200 | prepend: 'https:' }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="1200">
{%- endif -%}
```

Check the same file for any other hardcoded `http:` — the homepage `og:image`
uses `https` already, so this is likely isolated to the product branch.

**Verify:** paste a product URL into
<https://developers.facebook.com/tools/debug/>, click *Scrape Again*, confirm
the image renders and the URL starts `https`.

---

## Edit B — the logo is an `<h1>` on every page

**File:** `snippets/header.liquid` (Flow may name it `site-header.liquid`)

An `<h1>` is a page's single most important heading signal. Right now every page
of the store spends it on the logo, and the homepage carries four `<h1>`s total.
Your product pages are already correct with exactly one — this is a header and
homepage problem only.

**Find** — appears twice, once for the image logo and once for the text fallback:

```liquid
<h1 class="site-header__logo site-title" itemscope itemtype="http://schema.org/Organization">
  ...
</h1>
```

**Replace both with:**

```liquid
<div class="site-header__logo site-title">
  ...
</div>
```

Leave everything between the tags exactly as it is. Drop the `itemscope`/
`itemtype` attributes — they are the outdated microdata the new
`st-global-schema` snippet replaces, and they use `http://schema.org` anyway.

> If the logo visually shifts after this, it's because a CSS rule targets
> `h1.site-header__logo`. Fix it in `assets/custom.css` (currently only 43 bytes,
> so there's room):
> ```css
> .site-header__logo { margin: 0; font-size: inherit; }
> ```

### Then give the homepage one real `<h1>`

The homepage's visible heading is currently `Shop Our Collections`, and
`HOW TO SMUDGE` is marked up as an `<h1>` inside a content section.

- In the theme editor, change the `HOW TO SMUDGE` section heading from H1 to H2.
- Make `Shop Our Collections` the single `<h1>` — and rewrite it to say what you
  sell, since it's now a ranking signal rather than decoration. For example:
  **Dried Herbs, Palo Santo & Ritual Incense**

**Verify:** load the homepage, open DevTools console, run `$$('h1').length` —
it should return `1`.
