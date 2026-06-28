# Monkey Grove 🍌 — Design Document (canonical)

A cozy, cute, Animal-Crossing-hearted voxel island game that secretly delivers
research-grade arithmetic practice to children who struggle with math. It began
for an 11-year-old who loves ACNH, Roblox and Minecraft, and now starts from the
Dutch primary-school arithmetic path (`NL_PO`) while keeping the child-facing
experience playful.

## Story & tone
The Crab King pinched all the island's numbers, and without them the monkeys
forgot how to plant, share and bake — the grove faded to gray. You are the new
caretaker. Chamber by chamber you bring the numbers home, and the island blooms
back to color. Crabs are mischievous thieves, never lethal; Mimi the monkey
guide never says "wrong" — she shows. Time only ever gives (daily gift, streak),
never takes. **No hearts. No Game Over. No school words for the child** (no
academy / lesson / test / score-penalty vocabulary in play). Parent-facing
screens may show curriculum, stage, and objective labels. Child UI vocabulary:
worlds, quests, eggs, coins, gems, pets.

## Form
3D voxel dioramas (Three.js from npm, bundled by Vite), orthographic isometric
camera, chunky cute big-headed characters, pastel palette. All text is DOM
overlay (crisp, localizable, ≥48px touch targets). EN/NL, auto-detect Dutch.

## Structure
- **Walkable hub island** with 4 regions = worlds, each initially gray/sleepy:
  - 🌊 **Tide Pools** — addition & subtraction (incl. missing addend)
  - 🌱 **Banana Garden** — multiplication (arrays!)
  - 🥥 **Sharing Stump** — division (fair sharing, remainders)
  - 🍇 **Vine Heights** — fractions (magnitude first, then equivalence)
- Each region portal leads to a **chamber run**: 3 problems per chamber,
  hand-authored diorama layouts (ASCII templates), seeded decoration.
- Regions bloom (gray → color, props appear) as skill mastery rises — and so
  do their gates (see Hub island → Living gates).

## Explorer placement & curriculum spine
- New Explorers choose a country/curriculum pack and can enter an optional age
  (4-13) or birthday. For the shipped `NL_PO` curriculum pack, current age
  estimates a Dutch primary stage (`grade_1`...`grade_8` internally, shown to
  parents as Groep 1...8).
- A short warm-up after the intro story gives Mimi a few tiny number quests
  before the hub. It adjusts the placement band (`below`, `on_track`, `ahead`)
  without putting a permanent label on the child.
- The current-age-estimated stage is the default lower bound. Warm-up can open
  the upper side of the window, but it may not send a child below the
  age/curriculum floor.
- Children age quickly, so birthday-based profiles re-check the automatic floor
  on later sessions. When the child reaches a higher age band, the automatic
  lower bound may promote upward and the warm-up can run again for the new band.
- Parent-selected stage/group is the explicit override. If a parent chooses a
  different group, that confirmed stage becomes the lower bound for play.
  Parent overrides are not silently raised by birthdays; the suggested stage can
  keep moving, but the confirmed group remains the floor until the parent changes
  it.
- Targeting is soft by default: playable objectives from the lower bound upward
  into the next stage feed the adaptive engine as eligible game skills. Strict
  targeting keeps play close to the confirmed stage. If no eligible skills exist,
  the engine falls back to normal play.
- `NL_PO` is the only real curriculum mapping for now. English-speaking children
  in the Netherlands can use the English UI over the Dutch curriculum, but the
  design must not pretend to support other countries until their mappings exist.
  The pack registry, profile state, and parent UI are prepared for completely
  different country curricula once those mappings are defined.
- Internal IDs remain English (`grade_5`, `operations`,
  `nl_po.grade5.tables_3_4_6`). Dutch and English labels live in `i18n.js`.

## Core loop (60–120 s per chamber)
1. Enter chamber → equation banner slides in (e.g. `7 × ? = 42`).
2. Crabs never enter the answer zones; bumping a crab only scatters a few
   bananas (instant continue, comic "yoink").
3. Solve with the chamber's **verb**:
   - **Fetch** (base verb, all worlds): 4 number stones on pedestals / under
     smashable pots, values are misconception-tagged distractors. Compute
     first, then carry the chosen stone to the golden altar.
   - **Array** (Garden signature): walk onto the soil patch and grow a glowing
     r×c bed (arrows/drag extend it), watch sprouts pop. Distributive splits
     for big beds. Constructed response — guessing is impossible.
   - **Number line** (Vines signature): a long vine bridge 0…1 (later 0…2);
     stand where 3/4 lives and ring the gong. Tolerance scales with rating.
     Overshoot = comic splash + tick-mark scaffold appears. Magnitude sense!
   - **Share** (Stump signature): deal coconuts into baskets round-robin;
     leftovers become **remainder berries** → they feed the egg meter (the
     scariest part of division becomes the most coveted reward).
4. Correct → hit-pause, confetti, banana fountain, combo ding (rising pitch),
   pet flip. Wrong → soft friendly "boop", **the visual model materializes**
   (floor tiles light up as the array; tick marks fade in; baskets animate)
   and the world's helper friend (Pip, Olli…) explains in one short line,
   targeting the tagged misconception. Retry free, always.
5. 3 solves → treasure chest: bananas + egg progress + sometimes a hat/gem.
   Occasionally an **Echo Door** shimmers afterwards: a 2-problem bonus room
   that secretly reviews her weakest stale skill (spaced retrieval as loot).

## Math engine (src/mathengine.js — pure logic)
- **Skill ladder** (prereq chains):
  - tide: add_20 → sub_20 → missing_addend → add_100 (carry knob) → sub_100
  - garden: tables_a (2,5,10) → tables_b (3,4,6) → tables_c (7,8,9) →
    tables_mix (1–10) → mult_2digit (1×2-digit, partial products)
  - stump: div_facts (÷ by table set) → share (constructed) → div_remainder →
    missing_factor (`? × 6 = 42`)
  - vines: frac_magnitude (denoms widen 2,4 → 3,6,8 → 5,10,12) → frac_compare
    → frac_equiv → frac_of_n (3/4 of 24)
- **Elo-lite per skill**: rating starts 600; expected = 1/(1+10^((Di−Rp)/400));
  K=32 first 20 attempts then 16; hint-assisted correct counts 0.7. Problem
  params chosen so expected success ≈ 0.65.
- **Misconception distractors** (tagged, drive the explain line):
  addsub_confuse (7×6→13), off_by_table ((7±1)×6), no_carry (47+25→62),
  reversed (62→26), whole_number_bias (1/8 > 1/3 "because 8>3"),
  add_tops_bottoms (1/2+1/3→2/5), remainder_ignored, near_miss (±1/±2).
- **Scaffold level from rating**: 0 = model visible by default + labels,
  1 = model on demand (hint button), 2 = bare. Returns with each problem.
- **Per-fact gem tracking** for the times tables (key "7x8"): 3 lifetime
  corrects with the latest correct → gem lights (and its commutative twin).
- **Cold start**: first ~8 problems per world ramp fast ("wake the sleepy
  monkeys") to seed ratings.
- **Selection**: ~70% focus skill (lowest unmastered, prereqs met), 20%
  neighbor review, 10% older refresh; Echo Doors pull the weakest stale skill.
- **Forgetting curve**: "mastered" means *recently* mastered. A skill left
  unpracticed gently decays (a lazy, clock-driven view of its rating/mastery), so it
  can lapse back to "stale" — which is exactly what Echo Doors and neighbor review
  re-surface, bringing scaffolds back when a rusty skill returns.
- **Curriculum filter**: normal chamber selection accepts `allowedSkills` from
  the profile curriculum. Forced skill paths, duels, and deterministic challenge
  codes remain in control when they explicitly choose a skill.

## Parent visibility
- The parent screen explains the pedagogy and now shows the active profile's
  country, learning path, stage, domain coverage, and objective pills before the
  existing skill overview.
- Parents can change curriculum pack, stage/group, and targeting strictness.
  Changing the pack recalculates the age estimate for that pack and resets
  warm-up placement so old probes from a different curriculum do not leak into
  the new path.
- Parents can also edit the birthday. That affects the automatic suggested
  stage immediately, while any parent-confirmed stage/group remains the override.
- Coverage is objective-based: covered, started, ready to play, or planned.
  Planned objectives are visible so parents can see the broader `NL_PO` map even
  before every requirement has a game mechanic.
- The same parent screen translates between English and Dutch. Raw internal
  curriculum IDs must never appear in the UI.

## Retention kit (exactly four systems)
1. **Daily streak flame** + small daily gift chest on first play of the day.
   Missing a day never punishes ("Pip kept your spot warm!"); streak freeze
   purchasable with bananas.
2. **Egg meter → pets**: correct answers (and remainder berries) fill the egg;
   it hatches with a suspense-crack animation into a cute pet (8+, rarities).
   Pets follow you everywhere, do a flip when you get one right. Tiny banana
   bonus, no hunger, no decay.
3. **Banyan Gem Tree**: the 10×10 times table as a gem mosaic in the great
   tree — earning 7×8 auto-lights 8×7 (built-in commutativity aha). Fraction
   gems hang on a vine arc ordered by magnitude (the display itself is a
   number line). This screen IS the progress dashboard, for kid and parent.
4. **Banana shop**: hats, fur colors, trails. Visible in play and in the hub.

## Island restoration (the story arc)
The ACNH build loop on top of the math core: blooming becomes something she
*does*, not something that happens to her. Without numbers the monkeys also
forgot how to **build** — as numbers come home, Mimi dreams up blueprints at
her worktable.
- **Mastery unlocks the blueprint, bananas pay the materials.** Gating uses
  progress points (sum of the four world mastery percentages, 0–4), so story
  progress can never be farmed with easy chambers. Mastery decides *what's
  possible*, bananas decide *what's next* (build vs. hat is a real choice).
- **Choices sequence, never exclude.** Every build stays available forever —
  her choices control order and who moves in next. No missable content, per
  the anti-anxiety guarantees.
- **Seven plot-based builds** (ACNH bridge-funding model; fixed plots in the
  hub template): lantern path 30🍌 (0.25pt) → fruit stand 60 (0.7 — Rin the
  Red Panda moves in, saves +8🍌/day) → flower garden 90 (1.2) → music stage
  120 (1.8 — Kiki the Kitten, tappable gong) → bakery 150 (2.4 — Mo the
  Piglet, +3 egg/day) → bridge 200 (3.0, opens the festival islet) →
  **festival plaza** 500 (3.4 + bridge). At the plaza the Crab King interrupts
  with his apology and pays half from the returned hoard; the festival makes
  the whole island bloom for good and he stays on, sheepish and tappable.
- **Builds are the story beats**: each pops in with confetti, a thank-you from
  the friend who moves in, and a small *living* perk — never lawn ornaments.
- Tap Mimi (or any 🔨 plot sign) for the worktable screen: built ✓ /
  blueprint + cost / "a future dream…" hint. New blueprints are announced
  once, on returning to the hub.
- src: `island.js` (pure logic — defs, gating, funding, perks, bridge rows),
  plots/builds/NPCs in `chamber.js` (HubPlace), worktable + finale in
  `screens.js`, flow in `main.js`.

## Bakery/Pizzeria business simulation
After the bakery build is complete, the child can open a cozy shop scene. The
existing helper animal models become customers: Tuk the Turtle, Pip the Bunny,
Dot the Duckling, and Olli the Owl. Orders ask the child to prepare recipes,
portion pizzas, measure ingredients, handle payment and change, watch stock,
earn shop coins, and buy gentle upgrades.

There is no timer, debt, loss spiral, or shame. Mistakes keep the customer
waiting kindly and offer another try. The shop is child-facing as orders, ovens,
coins, stock, and upgrades; parent-facing progress maps to `NL_PO` objectives
for money, measurement, fractions, ratios, percentages, profit, and data.

## Hub island
Walkable (same grid-hop tech as chambers). Your monkey + pets idle and wander;
waves lap. Region portals are living gates that bloom with mastery (below). NPCs:
Mimi (guide & island architect), the build friends (Rin, Kiki, Mo) and the Crab
King (finale: comically apologetic, pays half the festival plaza, then lives on
the islet). The egg nest is a tappable spot that opens the pets screen.
- **Living gates** (`LivingPortal` in `entities.js`): each world's portal grows
  with that world's mastery — the same pct that blooms the floor — through five
  stages: bare gray stone → sprouting vines → climbing vines with buds →
  garland in bloom → flower crown with a golden star. Each world blooms in its
  own color (banana-yellow garden, sea-blue tides, peach stump, lavender
  vines); the film in the opening breathes with that color, fireflies drift up
  inside it, the name tag bobs, and the gate does a happy jelly-bounce when the
  player walks near. Stage-ups are celebrated on the next hub visit — the new
  vines pop in with confetti and a toast — and the saved stage
  (`flags.portalStages`) only ever rises: a rating dip can never wilt a gate
  (anti-anxiety guarantee). After the festival every gate is radiant for good.
  Thresholds in `config.js` (`portalStage`), vine overlay models in
  `models.js` (`portalVine1..3`).
- **Mimi is a companion, not a signpost** (`mimi.js`): she wanders near her
  worktable, turns to greet the player, and carries a floating 💬 tag (📜 when
  a blueprint waits). Talking walks an advice ladder — affordable build →
  exact bananas missing → "almost a new blueprint" nudge → weakest world →
  egg/streak — before cozy chatter; the hub greeting reuses the top line, so
  every return home starts with the next useful step. When her line is "we
  can build X!", the worktable opens right after it (the AC walk-you-there).
- **Talking is AC-style, every input**: stand beside any hub friend and the
  round action button becomes 💬 (Space/Enter or tap it); walking into them
  bumps a chat too; tapping a character directly also works (characters and
  Mimi's tag are raycast targets, so taps don't fall through to the floor
  tile behind them). Player and friend turn to face each other.
- **Ambient life** (`ambient.js`): butterflies flutter between flowers and
  rest on them; birds fly in over the water, land, hop, peck and flee when
  approached. Density grows with mastery and builds (the flower garden adds
  butterflies) — the island literally gets more alive as it blooms. Chambers
  get two quiet butterflies, nothing more (no distraction during tasks).
  Ambient rng forks its own stream so duel-critical draws stay aligned.

## Multiplayer (shipped, `duel.js`)
- **Hot-seat duel**: two profiles alternate problems from the same seed,
  banana race over 3 rounds; the duel button appears on the title screen once
  a second profile exists.
- **Challenge codes**: a short code (world + rounds + base36 seed) reproduces
  the identical run on any machine to compare scores.

## Controls
- Keyboard: arrows/WASD hop, Space interact, E hint.
- Mouse/touch: tap a tile → BFS auto-walk; tap object → walk + interact;
  swipe = step. Everything ≥48px. No virtual joystick.

## Anti-anxiety guarantees (non-negotiable)
- Wrong answers cost nothing and always teach (model + one-line why).
- Crabs freeze while a stone is carried / an answer is being placed.
- No countdown timers in core play (optional "Lightning Vine" fluency mode
  unlocks only after a skill is accurate, per the research).
- Progress language celebrates understanding ("You can SEE the sevens now!"),
  never speed or rank.

## Art & audio direction
- Pastel ACNH-adjacent palette; soft hemisphere light + one warm directional;
  AO baked in vertex colors; squash-and-stretch hops; particles everywhere
  the math succeeds. (A retro CRT toggle stays on the wishlist as an
  unlockable easter egg — not built.)
- WebAudio synth: cozy marimba/kalimba island loop, pentatonic SFX, rising
  combo tones, friendly "boop" for wrong (never a buzzer). Optional procedural
  ambient beds (shore/birds/oven warmth) on their own mutable "Nature sounds" group.
- **Liveliness layers (tier-gated, child-safe).** A quality-tier system (`gfx.js`,
  Settings → Graphics: Auto/Low/Medium/High) drives in-engine sky + warm tone mapping,
  contact shadows, prop-density scatter, an ambient ecosystem (fireflies/bees/motes),
  gentle GPU sway, a glow language, animated water, world reactivity, build-NPC
  routines, per-creature animation, chamber juice, and soft camera moments. All are
  **additive and reversible**: every layer keys off a `GFX` flag, `reducedMotion()`
  calms all motion, and **Low tier reproduces the pre-liveliness renderer**. The
  non-negotiable bar (see Anti-anxiety guarantees): a child always reads every number,
  prompt, button, and model instantly; nothing decorative obscures or out-competes the
  math; a wrong answer stays a warm "try this way," never red/shake/wilt.

## Build order (each step was shippable — 1–10 shipped, secrets pending)
1. Chamber + grid-hop player feel (touch-first) → 2. Fetch loop + juice +
audio → 3. Math engine + distractors + Elo → 4. Array verb + Garden world →
5. Save/streak/i18n → 6. Number line + Share verbs, Vines/Stump/Tide worlds →
7. Gem tree, pets, shop, hub island → 8. Echo Doors, duel → 9. `NL_PO`
curriculum spine, age-first Explorer placement, warm-up, curriculum-aware
chambers, and parent coverage → 10. Bakery/pizzeria shop simulation with
helper customers, stock, upgrades, payment/change, recipe prep, and parent
curriculum coverage from business-mode progress.
