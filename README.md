# Monkey Grove

**A cozy 3D island adventure that secretly teaches arithmetic.**
*Een knus 3D eiland-avontuur dat stiekem rekenen leert.*

The Crab King pinched all the island's numbers, and the grove faded to gray.
Chamber by chamber, children bring the numbers home: the gates bloom, Mimi finds
new blueprints, pets hatch, and the island comes back to life.

Monkey Grove is built for children who find math stressful, especially Dutch
primary-school learners working through the `NL_PO` arithmetic path. New
Explorers can enter their age so the island can start near the right level, then
a short warm-up helps Mimi tune the first quests. The child sees playful worlds
and quests; parents can see the school-stage mapping and curriculum coverage.

## Play

Play the published build here:

**https://jklarenbeek.github.io/monkeygrove/**

The game runs fully in the browser. There are no accounts, no ads, and no server
backend. Progress is saved on the device in `localStorage` under
`monkeygrove.save`.

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
- **Curriculum-aware onboarding**
  - New Explorers can enter an optional age from 4-13
  - The first shipped curriculum pack is `NL_PO` for Dutch primary arithmetic
  - Age estimates a Dutch school stage; warm-up results softly adjust the band
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
npm run dev        # Vite dev server with hot reload
npm test           # Vitest suites
npm run build      # Production build into dist/
npm run preview    # Serve the production build locally
npm run deploy     # Build and publish dist/ to the gh-pages branch
```

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
vite.config.js      Vite, Vitest, and GitHub Pages base path

src/
  main.js           game controller, flow, input, rewards, hub/chamber transitions
  world.js          Three.js renderer, orthographic camera, picking, zoom/pan
  chamber.js        ASCII diorama layouts, hub island, portals, build plots
  player.js         grid-hop movement, tap-to-walk, carrying, pet follower
  entities.js       stones, pots, crabs, portals, particles, props, labels
  voxel.js          ASCII voxel data to cached Three.js geometry
  models.js         voxel models, props, pets, cosmetics, ambient critters
  anim.js           tweening and easing
  audio.js          procedural WebAudio music and SFX

  mathengine.js     pure adaptive math engine and mastery report
  curriculum/       NL_PO pack, age placement, warm-up scoring, coverage, eligibility
  verbs.js          fetch, array, number-line, and share interactions
  island.js         restoration blueprints, gating, funding, daily perks
  mimi.js           Mimi's advice ladder
  state.js          save/load, profiles, settings, streaks, economy
  i18n.js           English and Dutch dictionaries
  langFlags.js      accessible drawn language flags for EN/NL toggles
  hud.js            equation banner, chips, speech bubble, toasts, panels
  screens.js        title, warm-up, settings, shop, pets, gem tree, parents, results
  duel.js           hot-seat duel mode and challenge codes
  rng.js            seeded PRNG

tests/              Vitest suites for math, curriculum, state, UI wiring, chambers,
                    island, Mimi, models, portals
docs/               research notes and retro-game inspiration
DESIGN.md           canonical game design document
ARCHITECTURE.md     technical architecture notes
```

## Learning Notes

Monkey Grove follows a few simple principles:

- The math is the game mechanic, not a quiz layer.
- Mistakes are diagnostic, not punitive.
- Visual models appear in the world: arrays, baskets, number lines, and place-value strips.
- Practice adapts per skill and includes spaced review.
- Curriculum targeting is soft by default: previous, current, and next stage
  skills stay available so the adaptive engine can still meet the learner where
  they are.
- Long-term progress is visible through island restoration, pets, cosmetics, and the Gem Tree.

The parent screen in the game shows the active profile's `NL_PO` learning path,
estimated or confirmed school stage, curriculum coverage by domain and
objective, plus recent accuracy, attempts, and mastery per skill.

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
