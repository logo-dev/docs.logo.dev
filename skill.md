---
name: logo-dev
description: Fetch company and brand assets from the Logo.dev API. Get company logos as images by domain, stock ticker, crypto symbol, ISIN, or brand name via the image CDN; search brand names to domains; and retrieve brand metadata (logo, colors, description, social links). Use when an application needs to display a company/brand logo, enrich records with brand data, or resolve a brand name to a domain.
license: Proprietary. See https://logo.dev/terms for complete terms.
compatibility: HTTP API. Requires network access to img.logo.dev and api.logo.dev. Image CDN works client-side; Search and Describe APIs are server-side only.
metadata:
  author: logo-dev
  homepage: https://www.logo.dev
  docs: https://docs.logo.dev
---

# Logo.dev API

Logo.dev provides company and brand assets over HTTP. There are two surfaces with two different keys — choosing the wrong key is the most common mistake.

## Authentication

| Key | Prefix | Where | Used with | Header / param |
| --- | --- | --- | --- | --- |
| Publishable key | `pk_` | Client-side safe (browsers, mobile) | Image CDN (`img.logo.dev`) only | `?token=pk_...` query param |
| Secret key | `sk_` | Server-side only — never expose | REST APIs (`api.logo.dev`) | `Authorization: Bearer sk_...` header |

Get keys from the dashboard: https://www.logo.dev/dashboard/api-keys

Rules:
- Never put a secret key (`sk_`) in client-side code, URLs, or public repos.
- The publishable key is safe to expose; it only works with the image CDN and is rate/abuse protected.
- Free plans must show an attribution link (`<a href="https://logo.dev">Logos provided by Logo.dev</a>`); paid plans remove this.

## Image CDN — `https://img.logo.dev`

Returns an image directly (use in `<img>`, `next/image`, spreadsheets, etc.). Authenticate with the publishable key via `?token=`.

Five lookup modes:

```
https://img.logo.dev/:domain?token=pk_...            # by domain  → img.logo.dev/stripe.com
https://img.logo.dev/ticker/:symbol?token=pk_...     # by stock ticker → ticker/AAPL  (exchange suffix: AAPL.L, 7203.T)
https://img.logo.dev/crypto/:symbol?token=pk_...     # by crypto symbol → crypto/btc
https://img.logo.dev/isin/:isin?token=pk_...         # by ISIN → isin/US0378331005
https://img.logo.dev/name/:brand?token=pk_...        # by brand name (URL-encode) → name/sweet%20green
```

`name` is a convenience wrapper over Search that returns the top result's logo. Domain lookup is fastest and most accurate when a verified domain is available.

### Parameters (all optional except `token`)

| Param | Type | Default | Notes |
| --- | --- | --- | --- |
| `token` | string | — | Required. Publishable key (`pk_...`). |
| `size` | integer | 128 | Width/height in px. Max 800 (larger is clipped). Keep raster ≤600. |
| `format` | string | `jpg` | `jpg`, `png`, `webp`, or `svg` (SVG is Enterprise-only). |
| `theme` | string | `auto` | `light`/`dark` invert logos for the background. Requires transparency. |
| `greyscale` | boolean | `false` | Desaturate the logo. |
| `retina` | boolean | `false` | Render at 2× the requested size for high-density displays. |
| `fallback` | string | `monogram` | `monogram` returns a letter monogram with HTTP 200 when no logo exists; `404` returns HTTP 404 instead. |

Example:

```html
<img src="https://img.logo.dev/stripe.com?token=pk_xxx&size=256&format=png" alt="Stripe logo" />
```

## Search API — `https://api.logo.dev/search`

Resolve a brand name to candidate domains. Server-side, secret key.

```bash
curl --header "Authorization: Bearer sk_xxx" "https://api.logo.dev/search?q=sweetgreen"
```

Parameters: `q` (required, the query); `strategy` (optional) — `typeahead` (default, prefix-forward, best for autocomplete) or `match` (best for exact/near-exact matches).

Returns up to 10 results sorted by popularity:

```json
[
  { "name": "sweetgreen", "domain": "sweetgreen.com" },
  { "name": "Sweet Greens Healthy Restaurant", "domain": "sweetgreens.ae" }
]
```

## Describe API — `https://api.logo.dev/describe/:domain`

Retrieve brand metadata for a domain. Server-side, secret key. Available on paid plans.

```bash
curl --header "Authorization: Bearer sk_xxx" "https://api.logo.dev/describe/sweetgreen.com"
```

Returns a single object:

```json
{
  "name": "sweetgreen",
  "domain": "sweetgreen.com",
  "description": "Simple, seasonal, healthy salads and grain bowls...",
  "indexed_at": "2025-03-10T11:36:23Z",
  "socials": { "twitter": "https://x.com/sweetgreen" },
  "logo": "https://img.logo.dev/sweetgreen.com?token=pk_...",
  "blurhash": "UJPanPxr?Vj[oxazj@od_FWDDoodxrodagWD",
  "colors": [{ "r": 228, "g": 255, "b": 85, "hex": "#e4ff55" }]
}
```

`colors` is ordered roughly by prominence; `blurhash` encodes a blurred placeholder for the logo.

## Choosing the right call

- Have a domain and just need an image → Image CDN by domain.
- Have a ticker / crypto symbol / ISIN → corresponding Image CDN mode.
- Have only a brand name and need an image → Image CDN `name/` mode.
- Have a brand name and need the domain (or multiple candidates) → Search API.
- Need colors, description, or social links → Describe API.

## Limits

- Rate limits are monthly request counts by plan; there are no per-second/burst limits. Each API call (image or REST) counts as one request.
- Missing or wrong logos can be reported at https://www.logo.dev/update.
- Full documentation: https://docs.logo.dev
