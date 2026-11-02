# Whiskey Ridge Golf Resort

Marketing site for the rebrand of Cedars Golf Course / Bristol Golf Club at the Cedars
(115 Cedar Creek Rd, Bristol, TN 37620) as **Whiskey Ridge Golf Resort** — an
**experiential golf**, **Tennessee Hills themed** resort.

## Positioning

The course is 5,886 yards at slope 113. It cannot be sold as championship golf, and the
local players who are the near-term revenue base would see through the attempt. Experiential
golf resolves that: short and forgiving stops being an apology and becomes the design intent —
a course that does not punish you for turning up. The Tennessee Hills theme gives the 19th
hole an identity no other public course in the Tri-Cities can copy.

The homepage therefore leads with the category ("Eighteen holes. Tennessee whiskey. No dress
code."), puts the experience section *before* the course detail so it reframes the yardage,
and keeps Bristol's demand drivers — the casino, the Speedway, State Street — as the reason
the weekend exists at all.

**Phase 1 — homepage only.** The remaining eight pages land in Phase 2.

## Stack

[Astro](https://astro.build) 5, static output.

- **Zero JavaScript by default.** The homepage ships ~2.3 KB of inline JS (mobile drawer +
  tee-sheet ticker) and no bundle.
- **Images optimised at build.** `astro:assets` emits AVIF/WebP at several widths with
  `width`/`height` baked in, so there is no layout shift. The hero drops from 922 KB to ~64 KB.
- **Fonts self-hosted** via `@fontsource`, so there is no third-party request on first paint.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Design system

Direction A ("dark-led"), locked in Phase 0. Everything keys off `src/styles/tokens.css`.

**Palette** — HSHG forest/gold crossed with Tennessee Hills charcoal/amber:
Charcoal `#231F20` · Deepest Forest `#0D2B20` · Emerald `#0B6B4E` · Whiskey Amber `#AD813C`
· Brass Gold `#C6A65B` · White / Soft Grey `#F5F5F5`. No cream, no parchment anywhere —
light surfaces stay cool and neutral, and all warmth comes from the amber, the brass and
the photography.

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
on desktop, the docked bar on mobile, collapsed on the booking page. Pauses on hover and on
keyboard focus, announces through `aria-live`, and holds still under `prefers-reduced-motion`.

## Accessibility

WCAG AA by construction. All 17 token text pairs are verified at AA or better (the mauve used
for metadata on charcoal is `--wr-mauve-text`, a lightened variant; the Tennessee Hills
`--wr-mauve` remains for borders, which carry no contrast requirement). Focus rings read on
both charcoal and white. Skip link, labelled mobile drawer with Escape-to-close, 44px minimum
touch targets, 16px minimum form text so iOS does not zoom on focus.

## Unconfirmed facts

Everything factual lives in `src/data/site.ts`. Anything marked `TBD` renders as a visible
placeholder rather than a guess — **do not publish these as fact**:

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
| **Tennessee Hills relationship** | **Themed** is all the copy claims. Licensed / partnered / owned is unset (`positioning.themeScope`) — and it governs how far the language can go. |
| **Whiskey programme** | Tastings, barrel programme and on-site distilling are *not* claimed. No liquor-licence language appears anywhere. |
| **Experiential attractions** | Simulators, short-course and night play are marked TBD on the page itself, not described as existing. |

No awards, rankings, press quotes, testimonials or heritage claims appear anywhere, and the
copy never claims championship difficulty. The Tennessee Hills theme is written as a theme:
nothing asserts an on-site distillery, a tasting licence or a signed partnership. That is deliberate: at 5,886 yards and slope 113
the course is shorter and more forgiving than average, and local players would know.

## Photography

`src/assets/photos/` — 13 frames. Two need a retouch before launch: the two-pours still life
shows a scorecard branded "The Grove", and the porch sign has garbled small text.
