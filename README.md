# 🐵 Monkey Grove 🍌

**A cozy island adventure that secretly teaches arithmetic — built for kids (9–12) who struggle with math.**
*Een knus eiland-avontuur dat stiekem rekenen leert — voor kinderen die rekenen lastig vinden.*

The Crab King pinched all the island's numbers, and the grove faded to gray. Chamber by
chamber, you bring the numbers home — and the island blooms back to life.

🎮 **Play it:** see [How to start the game](#how-to-start-the-game) below — in the
browser via GitHub Pages, or on your own computer, no internet needed.
Works on laptops, tablets and phones. English + Nederlands (auto-detected).

## How to start the game

**Option A — play online (if this repo is published).** If GitHub Pages is enabled
(see [Deploy](#deploy-to-github-pages-free-2-minutes) below), just open:

```
https://<username>.github.io/monkeymath/
```

**Option B — play on your own computer (works offline).** The game can't be started by
double-clicking `index.html` — browsers block module scripts from plain files. It needs a
tiny local server, which comes with the project:

1. Install [Node.js](https://nodejs.org) (LTS version) — one time only.
2. Get this folder onto your machine (`git clone …` or GitHub's *Download ZIP*).
3. In a terminal, inside the project folder:

   ```bash
   npm install     # one time only — the only step that needs internet
   npm run dev     # starts the game and opens your browser automatically
   ```

   If the browser doesn't open by itself, go to the address it prints —
   normally **http://localhost:5173/monkeymath/**.

After `npm install` has run once, `npm run dev` works with no internet connection at all:
no server, no accounts, no downloads — saves live in the browser
(per player profile, under the localStorage key `monkeymath.save`).

> Prefer the optimized build? `npm run build` once, then `npm run preview` serves it
> (it prints the address, normally http://localhost:4173/monkeymath/) — also fully offline.

### How to play

- **Walk** — arrow keys / WASD on a keyboard, or tap (and swipe) on a touch screen.
- **Act** 🌱🔔✅💬 — Space or Enter, or the round button at the bottom right
  (plant the garden-bed flag, ring the bell, confirm your share…). Stand next
  to Mimi or any island friend and the button becomes 💬 — talk to them!
  (Walking into them or tapping them works too.)
- **Hint** 💡 — the E key or the lightbulb button shows the visual model.
- **Stuck or sad?** Tap the helper animal (bunny, turtle, duckling, owl) — it explains
  the task and cheers you on. Mistakes never cost anything.

## What's inside

- 🌱 **Banana Garden** — multiplication, by planting a flag and *walking out* row × column
  garden beds (arrays)
- 🥥 **Sharing Stump** — division, by *dealing* coconuts fairly into baskets; leftovers
  become remainder berries that feed your pet egg
- 🍇 **Vine Heights** — fractions, by *standing* where ¾ lives on a vine number line
  (overshoot = comic splash, never failure)
- 🌊 **Tide Pools** — addition & subtraction with place-value models
- 🗿 **Fetch the stone** — compute first, then find the right number stone and carry it
  to the altar, past mischievous (never dangerous) crabs
- 💎 **The Banyan Gem Tree** — the whole times table as a gem collection; earning 7×8
  lights 8×7 too
- 🛠️ **Island restoration** — your math mastery unlocks Mimi's blueprints, your bananas
  pay the materials: lantern path, fruit stand, bakery, music stage… each build pops into
  the island, a new friend moves in (with daily gifts!), and a bridge finally leads to the
  festival plaza — which the comically apologetic Crab King pays half of
- 🐰 **Pets** — correct answers fill an egg; eggs hatch into pets that follow you around
- 🐢 **Helper friends** — every world has a pet guide (Pip the Bunny, Olli the Owl…) who
  explains each task and cheers; tap them whenever you need a friendly word
- 🐒 **Mimi, your island guide** — she wanders the village square with a 💬 over her
  head: walk up and talk to her (Animal-Crossing-style) for advice that actually
  matters — which world to play next, how many bananas the next build needs, how
  close your egg is to hatching. When a build is ready she walks you straight to
  her worktable
- 🦋 **A living island** — butterflies dance between the flowers and birds sail in to
  land, hop and peck (sneak up and they flutter off!); the more the island blooms,
  the more life arrives
- 🔥 Daily streaks, 🍌 banana shop (hats! fur colors! trails!), ⚔️ hot-seat duels and
  shareable challenge codes — no server, no accounts, no ads, ever

## The learning science (for parents & teachers)

Monkey Grove is built on what research says actually works for struggling learners
(IES fractions practice guide, NCTM teaching practices, 2025 arithmetic-fluency synthesis):

- **The math IS the game mechanic** — never a quiz bolted onto a game. You multiply by
  building arrays, divide by fair-sharing, place fractions by magnitude.
- **Mistakes teach instead of punish.** A wrong answer costs nothing: the visual model
  (array, number line, baskets, place-value rods) materializes *in the world* and a
  friendly helper animal explains why — targeting the specific misconception behind the error
  (whole-number bias, forgotten carries, off-by-one-table…). No hearts, no Game Over,
  no countdown timers.
- **Invisible adaptivity.** A per-skill Elo rating keeps every child at ~65% success —
  challenging, never crushing. Visual scaffolds (grid lines, tick marks) fade as
  mastery grows and quietly return on struggle.
- **Spaced review** sneaks in as shimmering bonus "Echo Doors".
- **Practice has a purpose.** Restoring the island (the build projects) unlocks with
  *mastery*, never with grinding — bananas only decide what gets built next. Long-term
  goals across weeks, no missable content, choices sequence rather than exclude.
- The **Gem Tree screen is the progress dashboard** — for the child it's a collection,
  for you it's a mastery report (plus a "For parents" page with accuracy per skill).

## Deploy to GitHub Pages (free, ~2 minutes)

```bash
npm install
npm run deploy        # builds with Vite and pushes dist/ to the gh-pages branch
```

Then once, on GitHub: **Settings → Pages → Source: Deploy from a branch →
Branch: `gh-pages`, folder `/ (root)` → Save**. The game is live at
`https://<username>.github.io/monkeymath/`.

The game itself stays fully static after the build: no server, no accounts,
no ads — saves live in the player's browser.

## Develop & test

```bash
npm install
npm run dev           # Vite dev server with hot reload (http://localhost:5173/monkeymath/)
npm test              # vitest: math engine + chamber layout + voxel model suites
npm run build         # production build into dist/
npm run preview       # serve the production build locally
```

## Project layout

```
index.html        single page entry (Vite); style.css; vite.config.js
src/
  mathengine.js   adaptive engine: 18-skill ladder, Elo, misconception distractors
  verbs.js        the four math interactions (fetch / array / number line / share)
  island.js       island restoration: blueprints, mastery gating, build funding
  mimi.js         Mimi's conversation ladder (most useful advice first)
  ambient.js      living-island critters: butterflies & birds
  chamber.js      diorama builder + hand-authored layouts + hub island
  main.js         game controller; world.js, player.js, entities.js, voxel.js (3D)
  config.js, models.js, anim.js, rng.js   (knobs, voxel art data, tweens, seeded rng)
  hud.js, screens.js, i18n.js (EN/NL), state.js (localStorage), audio.js (WebAudio synth)
  duel.js         hot-seat duels + challenge codes
tests/            vitest suites
docs/             the research & retro-game inspiration that shaped the design
DESIGN.md         the full game design document
ARCHITECTURE.md   technical architecture
```

All saves live in the browser's localStorage (key `monkeymath.save`) — nothing leaves
the device. Multiple player profiles supported.

## Credits

Made with ❤️ by a dad, for his daughter and every kid who thinks they "can't do math" —
you can, you just haven't *seen* it yet.

Standing on the shoulders of 1980s Konami: *Monkey Academy* (1984), *King's Valley II*
(1988) and *The Treasure of Uşas* (1987). 3D by [Three.js](https://threejs.org) (MIT),
built with [Vite](https://vite.dev). Everything else is hand-rolled vanilla JavaScript.
