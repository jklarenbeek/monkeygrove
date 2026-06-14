# Monkey Grove — Technical Architecture

## Hard constraints
- **Vite** for dev/build/preview (`npm run dev|build|preview`), **vitest** for tests
  (`npm test`); deployed to GitHub Pages via `npm run deploy` (gh-pages branch,
  base path `/monkeygrove/`).
- **No network dependencies at runtime** once built; three.js comes from npm and
  is bundled. No server, no accounts.
- **All state in localStorage** under the `monkeygrove.*` key namespace.
- **Targets:** mid-range laptop (Chrome/Firefox/Safari) and tablet/phone browsers. 60fps desktop, 30fps+ mobile.
- **Inputs:** keyboard (arrows/WASD hop, Space/Enter act, E hint), mouse click on tiles, touch (tap tile / swipe).
- **Bilingual EN/NL**, auto-detected from `navigator.language`, switchable in settings.
  The first curriculum pack is Dutch primary arithmetic (`NL_PO`); English UI is
  also supported for English-speaking children in the Netherlands. Other country
  mappings are not claimed until their packs are defined.

## File layout
```
index.html              SPA shell: canvas + DOM overlay layers (Vite entry)
vite.config.js          base '/monkeygrove/', vitest config
src/
  main.js               game controller: boot, RAF loop, chamber/hub flow, input, juice
  config.js             central knobs: palette, world themes (accent/bloom colors),
                        grid metrics, timings, balance, portal growth stages, QUALITY
  i18n.js               t(key, vars) helper + EN/NL dictionaries
  langFlags.js          accessible drawn flag buttons for EN/NL language toggles
  state.js              save/load/migrate localStorage; profiles; settings; streak; economy
  mathengine.js         pure logic: 18-skill ladder, Elo-lite ratings, misconception
                        distractors, times-table fact gems, mastery report, review mix
  curriculum/
    nl_po.js            first curriculum pack: Dutch primary arithmetic objectives
    placement.js        age-to-stage estimate, warm-up scoring, eligible skill window
    index.js            pack registry, objective filtering, coverage summaries
  verbs.js              the four math interactions (fetch / array / number line / share)
  island.js             pure logic: restoration blueprints, mastery gating, funding, perks
  mimi.js               Mimi's conversation ladder (most useful advice first)
  audio.js              procedural WebAudio: pentatonic SFX + music loops, no samples
  voxel.js              ASCII voxel models -> merged BufferGeometry with vertex colors
                        and baked AO; geometry cache; one shared material
  models.js             voxel model data: characters, props, pets, hats, portal vine
                        overlays, ambient critters (pure data, zero imports)
  world.js              renderer, fixed-angle iso ortho camera rig, lighting, picking
  chamber.js            diorama builder: ASCII templates + variation, hub island (HubPlace)
  player.js             grid-hop movement w/ squash & stretch, BFS tap-to-walk, carrying
  entities.js           crabs (patrol), pots, number stones, altar, chest, particles,
                        living hub portals (mastery-staged vines, glow, fireflies)
  ambient.js            living-island critters: butterflies & birds (density grows w/ bloom)
  anim.js               hand-rolled tween engine + easing, ticked from the main loop
  hud.js                DOM HUD: equation banner, chips, helper/Mimi bubble, toasts,
                        verb panels, action/hint buttons
  screens.js            DOM screens: title, story, warm-up, settings, shop, pets,
                        gem tree, island worktable, parents, chamber results, duel
  duel.js               hot-seat duel mode + seeded challenge codes
  rng.js                seeded PRNG (mulberry32)
tests/                  vitest: mathengine, curriculum, state migration, warm-up and
                        parent wiring, chambers, island, mimi, models, portal stages
```

## Rendering approach
- **Orthographic camera** at one fixed isometric-ish angle (view dir ≈ (1, 1.15, 1),
  no rotation): smooth exponential follow of the player, a "fit board" mode that keeps
  a whole chamber visible at any aspect ratio, camera micro-shake for juice.
- **Voxel models**: defined as layered ASCII grids + palette in `models.js`; `voxel.js`
  converts each to a single merged `BufferGeometry` with **vertex colors and baked
  ambient occlusion** — one shared Lambert material for every voxel mesh keeps draw
  state tiny. Geometries are cached by key and reused across scenes (palette variants
  such as fur colors or per-world portal vines get their own key). No textures, no
  skeletal animation — characters animate by transform only (hop, squash & stretch,
  bob, tilt).
- **Lighting**: hemisphere + warm directional sun (1024px PCF-soft shadow map) + faint
  cool fill light. The sun follows the camera target so the shadow camera stays tight.
  On low-quality devices (touch + small screen or very high DPR — `QUALITY` in
  `config.js`) shadows are disabled entirely.
- **Juice**: hand-rolled tween engine (`anim.js`), particle bursts from a pooled
  `THREE.Points` per place (`entities.js`), camera shake, instanced floor-tile color
  tints (island bloom, answer feedback), DOM emoji flights from world to HUD.

## DOM/Canvas split
3D world on the WebGL canvas. Everything textual (equation banner, menus, shop,
dialogs, mastery map) is DOM positioned over the canvas — crisp text, easy i18n,
accessible hit targets (≥48px), CSS animations for cheap polish.

## Math engine contract (the heart — pure logic, no DOM/three imports)
```js
// Problem shape (returned by nextProblem)
{
  id, skillId, world,
  kind: 'fetch' | 'array' | 'numberline' | 'share',
  equation,                       // display string, e.g. '7 × ⬚ = 42'
  prompt:   { key, vars },        // i18n-ready instruction
  answer,                         // number (or target value for numberline)
  accept,                         // optional acceptance window/alternates, or null
  choices:  [{ value, tag }],     // fetch only; tag = misconception id | 'correct' | 'random'
  model:    { kind: 'array' | 'numberline' | 'baskets' | ..., ...params },
  scaffold,                       // from rating: 0 model shown, 1 on demand, 2 bare
  difficulty,                     // elo-comparable item rating
  explain:  { key, vars },        // the helper friend's "why" after a miss
  meta,                           // generator extras (e.g. a, b for fact gems)
}
createMathState() -> the profile.math blob (skills, facts, log)
nextProblem(math, { world?, kind?, skill?, echo?, allowedSkills?, rng? }) -> Problem
  // ≈65% expected success; allowedSkills softly constrains adaptive selection
recordResult(math, problem, { correct, ms, usedHint })
  -> { delta, rating, masteredSkill, newGems }      // masteredSkill/newGems drive toasts
masteryReport(math)
  -> { worlds: { [world]: { pct, skills: [{ id, rating, acc10, n, mastered }] } },
       gems: { lit, total }, weakest }
```
The math state lives at `profile.math` and is owned by `state.js`; the engine mutates
it only through these functions. `island.js` is pure in the same way: gating reads the
mastery report, funding mutates `profile.island` and bananas via small exported fns.

## Curriculum contract
The curriculum layer is deliberately separate from the math engine. It maps
school-facing requirements to existing game skills, while child-facing play
still speaks in islands, quests, helpers, and treasures.

```js
getPack('NL_PO') -> curriculum pack metadata and objectives
listObjectives(packId, filters?) -> objectives by status/stage/domain
coverageForReport(packId, masteryReport) -> parent-facing domain/objective coverage

createCurriculumState({ age? }) -> profile.curriculum defaults
estimateStageFromAge(packId, age) -> 'grade_1'..'grade_8' | null
scoreWarmup(results) -> { band: 'below'|'on_track'|'ahead', correct, total, rate }
applyWarmupResult(curriculum, results, opts?) -> updated curriculum state
eligibleSkillIds(curriculum) -> skill ids for the soft current-stage window
```

`NL_PO` is the only registered pack for now. Stage and domain IDs stay English
internally (`grade_5`, `operations`, `measurement_geometry`); Dutch and English
labels live in `i18n.js`. The default targeting window is soft: previous,
current, and next stage playable objectives are eligible unless parent policy
later tightens `strictness`.

## Save format (versioned)
```js
monkeygrove.save = {
  v: 1,
  profiles: [{
    id, name, created,
    avatar:  { fur, hat, trail, pet },              // equipped cosmetics + active pet
    bananas,
    egg:     { points, goal },                      // goal grows 1.25× per hatch
    pets:    [petId],
    owned:   { hats: [], furs: ['classic'], trails: [] },
    streak:  { count, lastDay, freezes, giftDay },
    island:  { built: [buildId], seen: [buildId], perkDay },
    curriculum: {
      packId: 'NL_PO',
      ageAtStart,
      estimatedStage, confirmedStage,       // English internal ids, e.g. 'grade_5'
      placementBand,                        // unknown | below | on_track | ahead
      strictness,                           // soft by default
      warmup: { completed, results, skillIds, scored? },
    },
    math:    { skills: { [skillId]: { r, n, hist } },     // Elo rating, attempts, last-10
               facts:  { '7x8': { n, ok, lastOk } },      // gem lit = ok ≥ 3 && lastOk
               log:    [{ t, skill, tag, ok, ms, hint }] }, // capped at 200
    stats:   { chambers, correct, wrong, msPlayed, berries, days },
    flags:   { introSeen, mimiMet, festivalDone,
               portalStages: { [world]: 0..4 } },         // living gates — only rises
  }],
  activeProfile,
  settings: { lang, sfx, music },
}
```
`state.js` heals missing profile fields against a fresh profile on load (migrations
stay additive); corrupt JSON falls back to a fresh save after stashing the broken
blob in `monkeygrove.backup`.

## Runtime flow additions
- New Explorer creation accepts an optional age from 4-13 and calls
  `createProfile(name, { age })`.
- Age-created profiles go through story -> warm-up -> hub. If interrupted after
  the story or mid-warm-up, `needsWarmup()` routes them back through warm-up
  before the hub. Old migrated profiles with no `ageAtStart` are not forced into
  warm-up.
- Warm-up records normal math results, but partial progress keeps
  `warmup.completed === false`; final answer or explicit skip completes the
  warm-up. UI and controller guards prevent double-tap duplicate finalization.
- Normal chamber generation passes `allowedSkills: eligibleSkillIds(profile.curriculum)`
  into `nextProblem`. Empty eligibility means unconstrained selection. Duels and
  debug forced-skill paths remain deterministic and unchanged.
- The parent screen renders `coverageForReport(...)` beside the existing skill
  overview, with translated pack, stage, domain, objective, and status labels.

## Determinism
Chamber layout generation/variation and duels flow through `rng.js` (mulberry32):
a challenge code (world + rounds + base36 seed) reproduces the identical run on any
machine. Free-play problem selection seeds itself randomly. `AmbientLife` forks its
own rng stream from a single seed draw, so cosmetic critters never disturb
duel-critical draws.

## Performance budget
- Few draw calls: each place's floor is one `InstancedMesh`; voxel props share cached
  geometries and a single vertex-color material; text is canvas-texture sprites.
- Particles live in one pooled `THREE.Points` per place; tweens run on one global
  ticker; the RAF hot path avoids per-frame allocations.
- `renderer.setPixelRatio(min(devicePixelRatio, 2))`; shadows only at high QUALITY.
