# Whiskey Ridge Golf Resort

Marketing site for the rebrand of Cedars Golf Course / Bristol Golf Club at the Cedars
(115 Cedar Creek Rd, Bristol, TN 37620) as **Whiskey Ridge Golf Resort** — an
**experiential golf**, **Tennessee Hills themed** resort.

## Positioning

The course is 5,886 yards at slope 113. It cannot be sold as championship golf, and the
local players who are the near-term revenue base would see through the attempt. Experiential
golf resolves that: short and forgiving stops being an apology and becomes the design intent —
a course that does not punish you for showing up.

The **Tennessee Hills Distillery partnership** (confirmed) gives the 19th hole an identity no
other public course in the Tri-Cities can copy, so it is credited plainly: a byline under the
hero CTAs, a feature block of its own in the experience section, and a footer credit. What the
partnership *permits* is a separate question — see the table below.

The homepage therefore leads with the category ("Eighteen holes. Tennessee whiskey. No dress
code."), puts the experience section *before* the course detail so it reframes the yardage,
and keeps Bristol's demand drivers — the casino, the Speedway, State Street — as the reason
the weekend exists at all.

**All nine pages built.** Phase 1 was the homepage; Phase 2 added the remaining eight.

| Route | Page |
| --- | --- |
| `/` | Homepage |
| `/course/` | The Course — honest description, signature holes, scorecard |
| `/rates/` | Rates & Tee Times — booking stub, rate card, experiential tiers |
| `/groups/` | Groups & Outings — the money page, package builder |
| `/clubhouse/` | Clubhouse & Bar — the Tennessee Hills partnership |
| `/stay/` | Stay — planned lodging, nearby options |
| `/events/` | Events & Weddings — spaces, date inquiry |
| `/visit/` | Plan Your Visit — directions, FAQ, review capture |
| `/gallery/` | Gallery |

## Stack

[Astro](https://astro.build) 5, static output.

- **No framework, no client bundle by default.** The homepage ships ~6 KB of inline JS (mobile
  drawer + tee-sheet ticker). The two pages with forms add one small module for validation.
- **Images optimized at build.** `astro:assets` emits AVIF/WebP at several widths with
  `width`/`height` baked in, so there is no layout shift. The hero drops from 922 KB to ~64 KB.
- **Fonts self-hosted** via `@fontsource`, so there is no third-party request on first paint.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Deploying

The site publishes to GitHub Pages from `.github/workflows/deploy.yml` on every push to `main`.

**One manual step is required, once:** in **Settings → Pages → Build and deployment**, set
**Source** to **GitHub Actions**. While it is left on *Deploy from a branch*, GitHub runs its
built-in **Jekyll** builder instead, which cannot build an Astro project — that is what the
failing `pages build and deployment` run was.

### Base path

Project pages serve from `https://<user>.github.io/<repo>/`, so the build carries a base path
and every internal link goes through `url()` in `src/data/site.ts`. Astro rewrites asset URLs
for `base` but not `href`s, so a bare `href="/course/"` would resolve to the account root
and 404.

Moving to the real domain is a config change, not a code change:

```bash
SITE_URL=https://whiskeyridgegolf.com BASE_PATH=/ npm run build
```

Set those two as repository variables (or edit the defaults in `astro.config.mjs`), add the
domain under Settings → Pages → Custom domain, and `url()` becomes a no-op.

`public/.nojekyll` is insurance: if Pages ever falls back to a branch deploy, Jekyll would
strip Astro's `/_astro/` directory because the name begins with an underscore.

## Design system

Direction A ("dark-led"), locked in Phase 0. Everything keys off `src/styles/tokens.css`.

**Palette** — HSHG forest/gold crossed with Tennessee Hills charcoal/amber:
Charcoal `#231F20` · Deepest Forest `#0D2B20` · Emerald `#0B6B4E` · Whiskey Amber `#AD813C`
· Brass Gold `#C6A65B` · White / Soft Gray `#F5F5F5`. No cream, no parchment anywhere —
light surfaces stay cool and neutral, and all warmth comes from the amber, the brass and
the photography.

Recurring layout (`grid`, `card`, `split`, `facts`, `rate-table`, `callout`, `form`) lives in
`src/styles/patterns.css` and is shared by all nine pages; only genuinely page-specific rules
stay scoped in the `.astro` files. Patterns are band-aware — a card on a soft band goes white,
a card on a dark band goes translucent — so sections change register without variant classes.

**Two registers, one system.** `.band--char` and `.band--forest` carry the brand (and every
nav, hero and footer); `.band` and `.band--soft` carry the reading. Bands retune the same
custom properties rather than restyling their children, so a section changes register by
changing one class.

**Type** — Fraunces (display, never heavier than 500, never in caps), Barlow Condensed
(labels, the only face allowed in caps), Archivo (body). Fluid via `clamp()` between 390px
and 1400px.

**Signature element** — `src/components/TeeSheetTicker.astro`. The course opens with one
lifetime review against competitors carrying 250, so the site shows the tee sheet filling
instead: it cycles the next open times and turns gold at two spots left. A pill bottom-right
on desktop, the docked bar on mobile, collapsed on the booking page. It rises from the bottom
edge only when that corner is free, tucking away for the hero's booking buttons, the footer and
anything interactive that scrolls beneath it. Pauses on hover and on keyboard focus, holds still
under `prefers-reduced-motion`, and gives screen readers the times once as a list instead of
announcing every rotation.

## Accessibility

WCAG AA by construction. Every token text pair is verified at AA or better. Two brand colors
needed text-safe variants, because the brand values measured below 4.5:1 as small text:

| Brand value | Used for | Text variant |
| --- | --- | --- |
| `--wr-mauve` `#8E8083` | borders, dashed rules | `--wr-mauve-text` `#96888B` (4.81:1 on charcoal) |
| `--wr-gold-deep` `#A9893E` | 2px rules, dots, markers | `--wr-gold-text` `#86661B` (4.90:1 on soft gray) |

Bands expose both: `--band-mark` for decorative marks and `--band-mark-text` for the same accent
as type. On dark bands both resolve to Brass Gold, which already passes. Focus rings read on
both charcoal and white. Skip link, labelled mobile drawer with Escape-to-close, 44px minimum
touch targets, 16px minimum form text so iOS does not zoom on focus.

## Unconfirmed facts

Everything factual lives in `src/data/site.ts`. Anything marked `TBD` renders as a visible
"pending" chip or a dagger footnote rather than a guess — **do not publish these as fact**:

| Item | Status |
| --- | --- |
| Green fees, cart, twilight, junior/senior | Not set. ~$25 for 18 is the *current* course's fee. |
| Course rating / slope | 70.0 / 113 from the blues is disputed; one database lists 71.0 / 126. |
| Per-hole yardages, hole names | Need the official scorecard and a walk with the superintendent. |
| Hours (tee sheet, kitchen, bar, pro shop) | Not set. |
| On-site lodging | Planned, not open. Format and timeline unset. |
| Stay-and-play partners | In negotiation. No partnership is claimed until signed. |
| Drive times to Hard Rock / Speedway / downtown | Unmeasured. Only the ~20 min to TRI is used. |
| Booking provider | foreUP / Lightspeed / GolfNow / Supreme — undecided. The flow is a front-end stub. |
| Final domain | `whiskeyridgegolf.com` is a placeholder in `astro.config.mjs` and `site.ts`. |
| Tennessee Hills relationship | **Confirmed partnership.** Named in copy, credited in the hero and footer (`partner` in `site.ts`). |
| **Whiskey program** | Tastings, barrel program and exclusive pours are **not** claimed — `partner.program` is TBD. |
| **Liquor license** | `partner.license` TBD. No license-dependent language (tastings, sampling, on-site pours as a draw) appears anywhere yet. |
| **On-site distilling** | `partner.onSite` TBD. Nothing claims distilling or a tasting room at the ridge. |
| Bar name | The clubhouse bar is unnamed in copy. |
| **Experiential attractions** | Simulators, short-course and night play are marked TBD on the page itself, not described as existing. |

No awards, rankings, press quotes, testimonials or heritage claims appear anywhere, and the
copy never claims championship difficulty. The Tennessee Hills partnership is named because it
is real; what it permits is not assumed — nothing asserts an on-site distillery, a tasting license, a barrel program or any specific product line. That is deliberate: at 5,886 yards and slope 113
the course is shorter and more forgiving than average, and local players would know.

## Photography

`src/assets/photos/` — 13 frames. Two need a retouch before launch: the two-pours still life
shows a scorecard branded "The Grove", and the porch sign has garbled small text.
