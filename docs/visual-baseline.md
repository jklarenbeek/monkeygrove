# Visual Baseline & Child-Readability Workflow

How to capture and review screenshots when changing anything visual in Monkey Grove.
This is a standalone reference — it depends only on committed scripts, never on any
planning document.

## Why screenshots

Every visual change must clear two bars at once:

1. The target scene looks warmer / livelier / more magical on Medium/High.
2. A child can still read every number, prompt, button, and math model instantly, and
   **Low tier still looks like the simple baseline renderer**.

Screenshots are therefore child-readability checks, not beauty checks.

## Required scenes

- Title attract scene.
- Fresh hub.
- Full-progress hub with all major builds.
- One chamber per world/theme.
- A chamber with a number line.
- A chamber with grouped objects / an array.
- Business / bakery scene.
- Settings screen with the Graphics control.

## Required modes

- Graphics Low / Medium / High (Settings → Graphics, or a `settings.graphics` save edit).
- Reduced motion on / off (OS setting or the in-game a11y toggle).
- Desktop viewport **1280×800**.
- Mobile portrait viewport **390×844**.

## Storage

Generated PNGs/videos stay **out of the bundle** — write them to `tmp/visual-baseline/`
(git-ignored). Do not precache or commit large generated image sets.

## Commands

Gate the screenshot review behind the automated checks first:

```bash
npm test          # vitest: tier resolver, scatter/ambient/npc determinism, postfx smoke …
npm run build     # vite build + scripts/check-budget.mjs (index gzip, precache, lazy chunks)
npm run test:e2e  # scripts/e2e.mjs — boots real WebGL, drives title → hub → chamber
```

The manual screenshot helper is [`scripts/playtest.mjs`](../scripts/playtest.mjs). It
drives a **running** dev server in headless Chrome and writes one PNG to `MG_SHOT`. State
persists between runs via `MG_PROFILE`, so you can build up a save and re-shoot it.

`scripts/playtest.mjs` reads these env vars:

| Var | Default | Meaning |
|---|---|---|
| `MG_URL` | `http://localhost:5173/monkeygrove/` | page to open |
| `MG_SHOT` | `/tmp/mg-shot.png` | output PNG path |
| `MG_PROFILE` | `/tmp/mg-playtest-profile` | persistent user-data-dir (carries the save) |
| `MG_CHROME` | `/usr/bin/google-chrome` | Chrome/Chromium executable |
| `MG_VIEWPORT` | `900x660` | `WIDTHxHEIGHT`; garbage falls back to the default |

### PowerShell — desktop baseline (1280×800)

```powershell
npm run dev -- --host 127.0.0.1 --port 5173
$env:MG_CHROME = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:MG_URL = 'http://127.0.0.1:5173/monkeygrove/'
$env:MG_VIEWPORT = '1280x800'
$env:MG_SHOT = 'C:\tmp\mg-baseline-hub-desktop.png'
node scripts/playtest.mjs wait:1000
```

### PowerShell — mobile-portrait baseline (390×844)

```powershell
$env:MG_VIEWPORT = '390x844'
$env:MG_SHOT = 'C:\tmp\mg-baseline-hub-mobile.png'
node scripts/playtest.mjs goto wait:1000
```

`MG_VIEWPORT` parses `WIDTHxHEIGHT`, defaults to `900x660`, and passes the parsed
dimensions straight into Playwright's `viewport` option.

### Forcing a graphics tier for a shot

Graphics is persisted in the save under `settings.graphics`. Prefer driving the real
Settings → Graphics control so the screenshot proves the user-facing path. The dev-only
tuning panel (`src/gfxdev.js`, dev builds only) also exposes live sliders — including a
**bloom** slider whose `0` end disables bloom entirely — for dialing effects in by eye.

## Child-readability review (per screenshot)

- Can a child find the player and the next place to go?
- Can a child read every visible number, prompt, and button?
- Are answer objects visually separate from decoration?
- Are moving / glowing objects away from math text? (Bloom must never sit behind text.)
- Is the scene warm and inviting, never dark or alarming?
- Does mobile portrait avoid overlap?
- Does Low graphics look calm and playable?
- Does reduced-motion look intentionally calmer?

## Failure examples

A shot fails review if: a glow/bloom covers text; fog hides a far-corner object; tiny
decoration looks tappable/collectible; a character blocks a path or portal; water foam
hides a bridge edge; bloom hazes the whole scene; camera framing cuts off math; retry
feedback looks like punishment; or audio is required to understand what happened.

## Passing standard

- Low tier still looks like the simple baseline.
- Medium/High improve the target area of the change.
- Math stays clearer than decoration; motion and effects stay gentle.
- No UI overlap or unreadable numbers in any shot.
- Any accepted visual difference is recorded in the change's notes / commit message.

For the render pipeline these screenshots exercise (quality tiers, selective bloom, DoF,
camera rig), see [ARCHITECTURE.md](../ARCHITECTURE.md).
