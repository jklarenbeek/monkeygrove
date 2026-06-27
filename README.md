# Monkey Grove

**A cozy 3D island adventure that secretly teaches arithmetic.**
*Een knus 3D eiland-avontuur dat stiekem rekenen leert.*

The Crab King pinched all the island's numbers, and the grove faded to gray.
Chamber by chamber, children bring the numbers home: the gates bloom, Mimi finds
new blueprints, pets hatch, and the island comes back to life.

Monkey Grove is built for children who find math stressful, especially Dutch
primary-school learners working through the `NL_PO` arithmetic path. New
Explorers choose a country/curriculum path and can enter their age or birthday,
so the island can start at the curriculum's age-based lower bound and keep that
floor moving as the child grows. A short warm-up helps Mimi tune the first
quests upward when the child is ready. The child sees playful worlds and quests;
parents can see and override the school-stage mapping and curriculum coverage.

## Play

Play the published build here:

**https://jklarenbeek.github.io/monkeygrove/**

The game runs fully in the browser. There are no accounts, no ads, and no server
backend. Progress is saved on the device in `localStorage` under
`monkeygrove.save`.

Monkey Grove is an installable **PWA**: a service worker precaches the app shell,
so once it has loaded it plays **offline** (handy on flaky school Wi-Fi) and can be
added to the home screen like a native app.

## What Is In The Game

- **Four math worlds**
  - Tide Pools: addition, subtraction, missing addends, carrying, borrowing
  - Banana Garden: multiplication through walked-out arrays
  - Sharing Stump: division, fair sharing, remainders, missing factors
  - Vine Heights: fractions on number lines, comparison, equivalence, fractions of a number
- **Four problem verbs**
  - Fetch the right number stone and carry it to the altar
  - Grow an array by walking out rows and columns
  - Stand on the correct point of a vine number line
  - Deal coconuts fairly into baskets
- **Adaptive practice**
  - 18 skill ladder with per-skill Elo-style ratings
  - Problems target roughly 65% expected success
  - Visual scaffolds fade as mastery grows and return when needed
  - Misconception-tagged wrong answers trigger targeted visual explanations
- **Curriculum-aware progression**
  - New Explorers can enter an optional age from 4-13 or a birthday
  - The onboarding form also stores the selected country/curriculum pack
  - The first shipped curriculum pack is `NL_PO` for Dutch primary arithmetic
  - Current age estimates the selected curriculum stage and sets the default lower bound
  - Birthday-based profiles automatically re-check that floor over time
  - Warm-up results can move the child upward, but not below that lower bound
  - Parents can override the lower bound by changing the profile's stage/group
  - English and Dutch UI can both run over the Dutch curriculum path
  - Generic fallback labels exist, but other country mappings are not claimed
    until their packs are defined
- **Island progression**
  - Mastery unlocks Mimi's blueprints
  - Bananas fund builds such as lanterns, fruit stand, garden, stage, bakery, bridge, and festival plaza
  - Gates and island life bloom as skills improve
- **Retention without pressure**
  - Daily streak gifts and streak freezes
  - Egg meter, hatchable pets, hats, fur colors, and trails
  - Banyan Gem Tree progress view for times-table facts and skill mastery
  - Echo Doors for spaced review
  - Hot-seat Banana Duel and shareable deterministic challenge codes
- **Friendly by design**
  - No countdown timers in core play
  - No lives, Game Over, penalties, ads, or accounts
  - English and Dutch, auto-detected and switchable in settings

## Controls

- **Move:** arrow keys or WASD
- **Act / talk / confirm:** Space, Enter, or the round action button
- **Hint:** E or the lightbulb button
- **Mouse / touch:** tap a tile to walk there, tap an object to interact, swipe to step
- **Camera:** mouse wheel or trackpad pinch to zoom; on touch devices, pinch to zoom and drag with two fingers to pan

## Run Locally

The game is a Vite app. Do not open `index.html` directly; browser module
security rules require a local dev server.

```bash
npm install
npm run dev
```

Vite opens the browser automatically. If it does not, use:

```text
http://localhost:5173/monkeygrove/
```

After `npm install`, local development works without a runtime network
connection. Three.js is bundled by Vite.

## Scripts

```bash
npm run dev         # Vite dev server with hot reload
npm test            # Vitest suites (simulated DOM — no browser needed)
npm run test:watch  # Vitest in watch mode
npm run test:e2e    # Headless-browser smoke test: boot -> profile -> hub -> kitchen
npm run lint        # ESLint (flat config): size + correctness guardrails
npm run build       # Production build into dist/
npm run preview     # Serve the production build locally
npm run gen:icons   # Regenerate the PWA app icons into public/
npm run deploy      # Build and publish dist/ to the gh-pages branch
npm run debug       # Vite under the Node inspector (--inspect-brk)
```

See [End-To-End (Browser) Tests](#end-to-end-browser-tests) for `test:e2e`,
including how to run it on Fedora-family distributions.

## End-To-End (Browser) Tests

`npm test` runs the Vitest suites in a simulated DOM (happy-dom) and never needs
a browser. The one test that needs a *real* WebGL context is the end-to-end
smoke test [`scripts/e2e.mjs`](scripts/e2e.mjs):

```bash
npm run test:e2e
```

It spawns its own Vite dev server, drives the real game through Playwright
(title -> create profile -> hub -> bakery business scene), asserts there were no
page errors, then tears everything down. It runs **headless with a software GL
backend** (SwiftShader), so it works on machines without a real GPU.

Unlike a typical Playwright project, this harness does **not** download or use
Playwright's bundled browsers. It points Playwright's launcher at a **system
Chrome/Chromium**, searching in this order:

1. `$MG_CHROME` — set this to any Chrome/Chromium binary to override the search
2. `/usr/bin/google-chrome`
3. `/usr/bin/chromium`
4. `/usr/bin/chromium-browser`

If none is found it **skips cleanly** (exit 0), so CI and contributors without a
browser are never blocked by it.

### Fedora / RHEL-family hosts (incl. Nobara)

Playwright's `npx playwright install-deps` only knows Debian/Ubuntu and Arch
package names, so on Fedora-family hosts it cannot install the native libraries
Playwright's *bundled* Chromium needs — the usual source of "Playwright doesn't
work on Fedora" pain. **This project avoids that entirely by launching a system
browser**, so the simplest path is also the native one — no container required:

```bash
sudo dnf install chromium     # provides /usr/bin/chromium, auto-detected below
npm run test:e2e
```

Google Chrome works too (`/usr/bin/google-chrome`, if you have Google's rpm repo
enabled). For a browser in a non-standard location, point the harness at it
directly:

```bash
MG_CHROME=/path/to/chrome npm run test:e2e
```

#### Fallback: run inside an Ubuntu container (distrobox)

If you would rather not install a system Chrome on the host — or specifically
want Playwright's own bundled Chromium and its `install-deps` flow — run the test
inside an Ubuntu container with [distrobox](https://github.com/89luca89/distrobox).
distrobox shares your home directory, so the repo, `node_modules`, and your
editor all see the same files unchanged.

```bash
# 1. On the host
sudo dnf install distrobox

# 2. A dedicated container (its own name avoids clashing with other toolboxes)
distrobox create --name mg-e2e --image ubuntu:24.04 \
    --additional-packages "git curl ca-certificates"
distrobox enter mg-e2e

# 3. Inside the container: Vite 7 needs Node 20+, but Ubuntu 24.04's apt ships
#    Node 18 — install a current Node from NodeSource (do NOT `apt install nodejs`).
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install Playwright's Chromium AND its (Ubuntu-known) system libraries
cd ~/path/to/monkeygrove          # your home is shared — the repo is right here
npm install
npx playwright install-deps chromium
npx playwright install chromium

# 5. Point the harness at that bundled Chromium and run.
#    (The harness only searches /usr/bin + $MG_CHROME, so $MG_CHROME is required
#    here — the bundled browser lives under ~/.cache/ms-playwright, not /usr/bin.)
export MG_CHROME="$(node -e "console.log(require('playwright').chromium.executablePath())")"
npm run test:e2e
```

The container exists only to provide the browser and its native libraries; the
dev server, the test, and your files are still the shared host copies.

## Deploy To GitHub Pages

This repository is configured for GitHub Pages at `/monkeygrove/` in
`vite.config.js`.

```bash
npm install
npm run deploy
```

Then, on GitHub, set:

```text
Settings -> Pages -> Source: Deploy from a branch
Branch: gh-pages
Folder: / (root)
```

The published URL is:

```text
https://jklarenbeek.github.io/monkeygrove/
```

If you fork the project under a different repository name, update `base` in
`vite.config.js` before deploying.

## Project Map

```text
index.html          single-page shell: WebGL canvas plus DOM overlay
style.css           full UI, HUD, screens, responsive layout
vite.config.js      Vite, Vitest, PWA, and GitHub Pages base path
eslint.config.js    ESLint flat config: size + correctness guardrails

src/
  main.js           slim game orchestrator: boot, loop tick, mode switching, wiring
  input.js          keyboard/touch/camera gestures -> semantic intents
  hub.js            island hub build, NPC talk, gate growth, hub menus
  chamberflow.js    one math chamber: pick problem, build, present, score, complete
  rewards.js        banana/egg/combo/chest payouts + emoji-fly juice
  avatar.js         player + pet follower mesh lifecycle
  world.js          Three.js renderer, orthographic camera, picking, zoom/pan
  chamber.js        ASCII diorama layouts, hub island, portals, build plots
  player.js         grid-hop movement, tap-to-walk, carrying, pet follower
  entities.js       stones, pots, crabs, portals, particles, props, labels
  ambient.js        living-island critters (butterflies, birds)
  voxel.js          ASCII voxel data to cached Three.js geometry
  mesh/             one file per character & pet voxel model
  models.js         props, cosmetics, ambient critters; re-exports mesh/
  anim.js           tweening and easing
  audio.js          procedural WebAudio music and SFX
  config.js         central balance / palette / timing / quality knobs

  mathengine.js     pure adaptive math engine, mastery report, rating decay
  curriculum/       NL_PO pack, age placement, warm-up scoring, coverage, eligibility
  business/         bakery/pizzeria sim: data, pure engine, controller, scene
  verbs.js          fetch, array, number-line, and share interactions
  island.js         restoration blueprints, gating, funding, daily perks
  mimi.js           Mimi's advice ladder
  state.js          save/load/migrate, profiles, settings, streaks, economy
  i18n.js, i18n/    t() helper + English and Dutch dictionaries
  langFlags.js      accessible drawn language flags for EN/NL toggles
  a11y.js           comfort/accessibility: reduced motion, dyslexia font, contrast
  devtools.js       DEV-only debug hooks, gated out of production builds
  hud.js            equation banner, chips, speech bubble, toasts, panels
  screens.js, screens/  full-screen overlays, one module per family (title, warm-up,
                    settings, shop/pets, gem tree, business, parents, results)
  duel.js           hot-seat duel mode and challenge codes
  rng.js            seeded PRNG

tests/              Vitest suites for math, curriculum, state, UI wiring, chambers,
                    island, Mimi, models, portals
scripts/            e2e smoke test, PWA icon generation, playtest driver
docs/               research notes and retro-game inspiration
DESIGN.md           canonical game design document
ARCHITECTURE.md     technical architecture notes
```

## Learning Notes

Monkey Grove follows a few simple principles:

- The math is the game mechanic, not a quiz layer.
- Mistakes are diagnostic, not punitive.
- Visual models appear in the world: arrays, baskets, number lines, and place-value strips.
- Practice adapts per skill and includes spaced review. "Mastered" means *recently*
  mastered: an unpracticed skill gently fades and resurfaces through Echo Doors.
- Curriculum targeting is soft by default, but the age-derived stage is a floor:
  eligible practice starts at that lower bound and may include higher stages so
  the adaptive engine can let the learner stretch. Parents can explicitly change
  the profile's stage/group when that floor should be different. When a birthday
  is saved, the game re-estimates current age on later play sessions and can
  promote the automatic floor upward; parent-confirmed groups stay in control
  until the parent changes them again.
- Long-term progress is visible through island restoration, pets, cosmetics, and the Gem Tree.

The parent screen in the game shows the active profile's country, learning path,
estimated or confirmed school stage, curriculum coverage by domain and
objective, plus recent accuracy, attempts, and mastery per skill. It also exposes
the curriculum pack, stage/group, and targeting policy controls.

## Privacy

All saves stay in the browser. The app stores profiles, settings, progress,
cosmetics, streaks, and math history in `localStorage`. Nothing is uploaded
because there is no backend.

## Credits

Made by a dad for his daughter, and for every child who thinks they "can't do
math" before they have had the chance to see it.

Built with [Three.js](https://threejs.org/) and [Vite](https://vite.dev/).
Inspired by cozy island games, 1980s Konami puzzle adventures, and research on
visual arithmetic practice for struggling learners.

## License

Monkey Grove is **open source and dual-licensed**:

- **GNU GPL v2 — the open-source license.** Free to use, run, study, share, and
  modify under the [GPL-2.0](LICENSE) — at home, in schools, in clubs, and in
  research, at no cost. Because the GPL-2.0 is copyleft ("share-alike"), anything you
  distribute that includes or is derived from Monkey Grove must also be released as
  open source under the GPL-2.0.
- **Commercial license — for proprietary use.** If the GPL-2.0's copyleft doesn't fit
  you (for example, you want to use Monkey Grove in a closed-source product, app, or
  service, or under any other terms), a commercial license is available **only from
  the author** — Johannes Klarenbeek is the sole copyright holder, and only he can
  release you from the GPL-2.0's terms. Commercial licensing funds continued
  development, so you're warmly invited to get in touch:
  **[jklarenbeek@gmail.com](mailto:jklarenbeek@gmail.com)**.

See [LICENSE](LICENSE) for the full terms and the complete GPL-2.0 text. The bundled
[Three.js](https://threejs.org/) library is MIT-licensed (that notice covers Three.js
only); the vendored `src/yijing/` engine is the author's own, under the same GPL-2.0.
