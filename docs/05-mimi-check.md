# Monkey Grove — Mimi's Check: dynamic placement & recalibration

*Design note: replacing the 3-item warm-up MVP with a child-invocable,
research-grounded adaptive calibration probe over the 64-step ladder.*

Peildatum: juli 2026. Companion to `04-64-step-ladder.md` (placement +
compaction) and `03-curriculum.nl.md` (Floor/Target/Stretch bounds).

> **Status: implemented** (juli 2026). The probe machine lives in
> `src/curriculum/checkup.js`, the overlay in `src/screens/checkup.js`, the
> session flow in `src/main.js` (`runCheckup`), Mimi's offers in `src/mimi.js`,
> and the curriculum plumbing in `src/curriculum/placement.js` — with the §5
> scenarios as table tests in `tests/checkup.test.mjs`. One §3.3 deviation:
> probe items are fetch-presented (numpad for integer answers, tiles otherwise)
> because the 3D verb scenes don't run inside a DOM overlay, so the
> numberline-only skill (`frac_magnitude`) sits the check out and the fraction
> thread is probed via `frac_compare`/`dec_compare` instead.

---

## 0. What you asked, and the short answer

Three questions:

1. **Can the kid invoke a level check from Mimi in-game, any time?** Yes — and
   the check should be *the same machinery* as onboarding's "Mimi will check",
   not a second system. One probe engine, three entry points (new explorer,
   Mimi's talk menu, system-suggested moments).

2. **What is the best test mechanism for children?** A short **staircase probe
   over the 64-step ladder** driven by the existing Elo engine: start one band
   *below* the child's expected level, confirm bands at the ~87% confirm target
   walking toward the frontier, then refine within the frontier band. 12–16
   scored items, ~5 minutes, variable length with early stop. This is the
   evidence-backed sweet spot: Elo with pre-known item difficulties reaches a
   usable ability estimate (r ≈ .8) in ~10 answers (Pelánek 2016), and every
   serious children's CAT (Star Math, MAP, Duolingo) starts easy and stays
   short. Full IRT CAT is neither possible (no calibrated item bank, no
   backend) nor needed — the Dutch Rekentuin proved Elo self-calibration is
   valid for exactly this population (r = .78–.84 against Cito LVS).

3. **How do we respect the lower/upper expectations of an age — including
   children who repeated a grade?** Ask **"welke groep zit je in?"** instead of
   deriving everything from age. Roughly a quarter of Dutch children are *not*
   in the groep their birth date predicts (~10% of groep 2 does
   kleuterbouwverlenging; 15% of groep 8 is 12+; ~13% is versneld, mostly
   herfstkinderen). Groep measures curriculum *exposure* directly; age only
   predicts it. The probe may then place the child's practice frontier **below
   the groep floor** (that is the whole point for the struggling tail — 7% of
   groep 8 sits below referentieniveau 1F) while story access never shrinks
   (the docs/04 invariant), and it caps its ceiling at **groep + 2 bands** so a
   young child never meets frustration items (Star Math caps at +3 grades,
   Cito adapts ±1 level per task).

The rest of this document is the audit, the evidence, and the concrete design.

---

## 1. What exists today (audit of the MVP)

- **Onboarding**: the trail step stores an age bucket (`sprout`=6, `climber`=8,
  `explorer`=10) or `unsure` (age `null` + `placementWarmup` flag)
  (`src/screens/intro.js`). Picking *Not sure* currently leaves
  `estimatedStage` null, so `eligibleObjectives()` falls back to **all**
  playable objectives — the least-informed profile gets the widest window.
- **The warm-up** (`src/main.js startWarmupThenHub`, `src/screens/warmup.js`):
  exactly **3 multiple-choice `fetch` items**, one per eligible skill, fixed in
  advance (no adaptation between items), `ms: 0` recorded (response time
  thrown away).
- **Scoring** (`src/curriculum/placement.js scoreWarmup`): plain correct-rate →
  `ahead` (≥85%) / `on_track` / `below` (<50%) → shifts the eligible **stage
  window by ±1**. Three MC items at 25% guess-rate each cannot distinguish
  more than that — as a measurement it is close to a coin flip.
- **One-shot**: the warm-up runs once; only a birthday-driven stage promotion
  resets it (`refreshCurriculumForDate`). Mimi's advice ladder (`src/mimi.js`)
  has no check line; nothing in the hub can re-invoke calibration.
- **Already built but unwired**: `placeOnLadder()` (frontier walk down the
  64-step ladder), `demoteStep()` (compaction demotion), and
  `CONFIRM_TARGET = 0.87` all exist in `placement.js` with tests — but no
  caller in the game. Docs/04 §4.2 already *specifies* an adaptive descending
  probe ("a short adaptive probe walks down from the Target band"); it was
  never implemented. **This design is that missing probe.**

---

## 2. Evidence

### 2.1 How the serious adaptive tests do it

| Product | Items | Time | Start point | Adaptation | Success target | Out-of-level |
|---|---|---|---|---|---|---|
| NWEA MAP Growth | 40–43 (screening: 20) | 40–55 min, untimed | grade mean / prior RIT | item-level Rasch CAT | ~50% | yes; 2023 algo biases on-grade |
| Star Math | 34 fixed | <25 min median | **1–2 grades below** placement → ~85% first-item success | item-level Rasch CAT | **67%** ("minimize frustration") | caps at **+3 grades** |
| i-Ready Diagnostic | 54–72 | 30–60 min, splittable | grade level | item-level CAT | ~50% (kids told "half wrong is normal") | unbounded K–12 |
| Cito Leerling in beeld (digital) | fixed tasks | 30–45 min/task, untimed | teacher-chosen level | **multistage: 3 routes per task** (easier/same/harder) | — | ±1 level per task |
| Boom LVS | 40–58 sub-items | ≤50 min | teacher-chosen block | not adaptive; continuous norming | — | via block choice |
| Bareka Profieltoets | ~5 items/stone | 2 min/stone | instruction level | not adaptive | **80% = mastered**; speed norm 4–5 s/fact | per drempel |
| Rekentuin / Math Garden | continuous | 20 s/item | high-uncertainty Elo (K ≈ 5×) | **Elo after every item** | **75%** (child-selectable 60/75/90) | unbounded by construction |
| Duolingo placement | ~5–10 min | short | "very simple" first items | estimate updated per question | — | unlocks "skills we think you know" |

Patterns that transfer directly:

- **Start below, never at or above, the expected level.** Star Math engineers
  ~85% success on item one explicitly against initial anxiety. First
  impressions set the emotional tone of the whole check.
- **Comfort-biased targets beat max-information targets for children.** 50%
  is statistically optimal and emotionally wrong; Star picks 67%, Rekentuin
  75%. A *placement* probe can afford harder items than practice, but must
  open and close easy.
- **Short screening forms exist for exactly our use case** (NWEA's 20-item
  screening for "students who arrive with little information").
- **Bounded out-of-level** protects both tails: Star +3 grades, Cito ±1 level
  per task.
- **Every product retests 2–5×/year** (Bareka 4×) — recalibration is normal,
  not exceptional.
- **Disengagement is monitored** (i-Ready rush flags, NWEA rapid-guessing) —
  a fast-wrong streak means the *measurement* is broken, not the child.

### 2.2 What the measurement literature says

- **Elo with known item difficulties converges fast**: ~10 answers give
  r ≈ .8 recovery of true ability (Pelánek 2016, *Computers & Education*).
  Our 64-step ladder with parameterized generators *is* the pre-calibrated
  difficulty scale — the favorable case. A groep-prior that is wrong by 1–2
  bands is absorbed within one session.
- **Uncertainty-weighted K** (Klinkenberg et al. 2011, the Rekentuin paper):
  new or stale players update ~5× faster (K·(1 + 4·U_person − 0.5·U_item),
  U starts at 1, shrinks with data, regrows with inactivity). Our engine's
  decay already models staleness; the probe should write ratings with a
  boosted K.
- **Stopping rules**: pediatric CAT practice (PROMIS) stops at SE ≤ 0.32 with
  **min 4 / max 12 items** per dimension; reliability ≥ .80 is the accepted
  pediatric bar. Fixed-length is not inferior to variable-length (Babcock &
  Weiss). For dichotomous math items expect 10–30 items — with response time
  adding information (below), 12–16 is defensible for a *placement*, because
  normal play keeps refining afterwards (stealth assessment, §2.5).
- **Multiple-choice corrupts exactly the low end**: a 4-option MC has a 25%
  guessing floor, and guessing destroys item information at low ability —
  where placement matters most. Rekentuin's answer is the High Speed High
  Stakes rule (fast guessing is costly) plus open answer formats. Ours:
  prefer **constructed-response verbs** (number-line placement,
  array-building, basket-dealing) over 4-choice fetch wherever the skill
  allows.
- **Response time separates "can do" from "has automatized"**: the observable
  signature of automatization is correct-but-slow → correct-and-fast
  (Math Garden longitudinal data); direct fact retrieval ≈ 0.4–0.9 s, common
  automaticity cutoffs 2–6 s (England's Multiplication Tables Check chose
  6 s/item explicitly to rule out counting strategies; Bareka's speed norm is
  4–5 s/fact). Bareka's **power vs speed** two-axis model (accuracy without
  time pressure vs fluency on tempo) maps exactly onto ERWD's
  begrip-vs-automatisering distinction.
- **Framing is measurement-critical**: presenting the same task as a *game*
  vs a *test* removed the SES performance gap in 6–9-year-olds (Désert et
  al. 2009). Math anxiety is real from grade 1–2 and hits high-working-memory
  children hardest (Ramirez et al. 2013). Easier item streams increase
  practice *volume* (motivation), not anxiety relief (Jansen et al. 2013,
  60/75/90% experiment). Consequence: Mimi's words never contain
  toets/test/score; completing the check is rewarded, the result is not.
- **Priors from background data are standard** (van der Linden 1999): a bad
  start on a *short* test converges too slowly. Grade/groep is the single
  best prior available; it costs one tap.
- **Stealth assessment is validated** (Shute: in-game evidence streams reach
  reliability ≈ .85 against external tests): the check only needs to solve
  cold start and drift; normal play is the real, continuous test — exactly
  the Rekentuin model ("practice data doubles as measurement").

### 2.3 The Dutch reality: age ≠ groep

- Per year ~1.2% of basisschool pupils repeat; kleuterbouwverlenging touches
  ~10% of groep 2; by groep 8, ~15% of children are 12+ (delayed at least
  once). Versnellen has grown to ~13% (>80% herfstkinderen). Net: **for a
  given age, roughly one in four children is not in the nominal groep**, and
  the mismatch is largest precisely in the struggling population this game
  is for.
- The Onderwijsinspectie's own position: transition is decided per child by
  development, not birth date.
- Dutch LVS practice already has the right output construct:
  **functioneringsniveau** — "functions at midden-groep-5 level (M5)"
  regardless of enrolled groep, expressed on a groep-independent skill scale
  (DLE months). The 64-step ladder *is* that scale at 8 steps/groep;
  frontier step → functioneringsniveau is a direct translation for the
  parent screen.
- Spread within one cohort is enormous: end-groep-8 rekenen runs from <1F
  (7%) to ≥1S (43–46%) — functioning from ~groep-6 level to VO level in one
  classroom. In sbo, 70% do not reach 1F. Any check that clamps to
  "age-appropriate" items will floor or ceiling a large minority.

### 2.4 Struggling learners: what Protocol ERWD requires of a screener

The national ERWD protocol (ernstige rekenwiskunde-problemen en dyscalculie)
gives four rules a game-embedded check must respect:

1. **Vier hoofdlijnen**: begripsvorming → oplossingsprocedures → vlot rekenen
   (automatiseren) → flexibel toepassen. A screener must not collapse these:
   *accuracy without time pressure* probes procedures/begrip, *speed* probes
   automatisering. One number that mixes them misclassifies working-memory
   overload as global inability.
2. **Handelingsmodel**: when a child fails at the formal level, the
   diagnostic move is to *drop a representation level* (formal → schematic →
   pictorial → enactive), not just to drop difficulty. Our scaffold tiers
   (bare / on-demand model / visible model) approximate this: a miss at
   scaffold 2 should retry the *level of thinking* at scaffold 0 before the
   step is declared unmastered.
3. **Persistent counting-only strategies are the red flag** in groep 3–4, not
   errors per se (finger counting early in groep 3 is normal). Slow-correct
   patterns on make-ten/bridging steps (17–20) are a signal to *watch*, never
   to punish.
4. **Fase-model expectations**: ~10% of children have serious math problems
   (fase oranje/rood), 2–3% dyscalculie. For them the frontier will sit 1+
   bands below groep — the probe must reach there gracefully (start-low +
   descent makes that a short, shame-free path: every item on the way down
   was *designed* to be within reach).

### 2.5 Kleuters: do not test them

Since 1 August 2022 Dutch schools may not use formal LVS toetsen for groep
1–2 at all; only observation instruments are approvable. ERWD says
automatisering is simply "niet aan de orde" before groep 3. Monkey Grove's
band 0 is already observational (`[obs]`, no Elo) — the check must follow:
**if groep ≤ 2 or age ≤ 5, Mimi never runs a probe.** She says "let's just
play!", the trail starts at band 0/1, and the observational steps do the
placing through play. (This is also the answer inside the game's own values:
no fail-sensitive sums for 4–5-year-olds, per docs/03.)

---

## 3. The design: Mimi's Check

One probe engine, reused everywhere the game needs calibration. Working name
in-game: **"Mimi kijkt wat je al kan"** — never "toets", "test", or "score".

### 3.1 Entry points

1. **New explorer** (replaces the current 3-item warm-up): after the trail
   step, same flow position as today.
2. **Child-invoked via Mimi**: a new line in Mimi's talk ladder — "Zal ik
   eens kijken wat jij al kan? Dan weet ik welke poorten we eerst wakker
   maken!" Always present in her menu (below quest advice), with a **soft
   cooldown**: if the last check is <7 days old *and* ratings are fresh,
   Mimi deflects warmly ("Ik weet het nog goed! Zullen we spelen?") instead
   of re-testing — prevents check-grinding without ever refusing coldly.
3. **System-suggested** (Mimi *offers*, never forces — one line in her
   ladder, dismissible):
   - birthday/stage promotion (already resets `warmup` today);
   - a new school year (first session in/after September: "Zit je nu in een
     nieuwe groep?" — re-ask groep, one tap);
   - staleness: >60–90 days since practice on frontier skills (matches the
     decay half-life);
   - flow mismatch: sustained >85% success over the last ~20 problems
     (bored — probe *up*) or <45% (frustrated — probe *down*); this mirrors
     i-Ready's rushing flags and MAP's rapid-guessing monitoring.
4. **Parent-requested**: a button on the parent screen ("vraag Mimi om een
   nieuwe check"), which queues entry point 3 on the child's next hub visit.

### 3.2 Setup questions: exactly two, then stop asking

The literature is unambiguous that the best "questions" are the items
themselves — every extra self-report question adds friction and children
self-report unreliably. Two facts are worth asking because they set the
prior and the bounds:

1. **"Welke groep zit je in?"** — a groep 1–8 picker (big tiles, one tap),
   with "weet ik niet / ik woon niet in Nederland" falling back to
   age-derived stage. Stored as `curriculum.groep` + `groepSource:'child'`,
   parent-overridable (existing stage override subsumes this). *This single
   question is the fix for zittenblijvers*: a child who repeated groep 4
   picks groep 4 and gets a groep-4 prior — no age-derived overestimate, no
   shame, no detective work.
2. **Birthday** (only if not already stored) — powers the existing automatic
   floor promotion over the years, and the age⇄groep *divergence* is itself
   a signal: age ≫ groep (repeated) → probe extra gently, start one band
   lower; groep ≫ age (versneld) → allow the higher ceiling.

Everything else the check "asks" is a math item chosen adaptively — that is
the dynamic questioning the MVP lacks.

### 3.3 The probe algorithm: descend to the frontier, then refine

Two phases over the 64-step ladder, exactly the shape docs/04 §4.2 specified,
now made concrete. All items come from the existing `nextProblem` generators;
difficulty per item targets the **confirm** success rate (~87%,
`CONFIRM_TARGET`) — these are verification items, not practice items.

```
Prior:    target band T from groep (fallback: age → stage → band).
Phase A — band staircase (coarse, 2 items per band):
  b := T − 1                     // start BELOW expectation: first item ≈ 85–90% success
  loop:
    ask 2 confirm items in band b (different steps, different verbs)
    2/2 correct-and-fluent  → band b solid; if b was never failed above, b := b+1
                              (ceiling: b ≤ min(T+1, 7))
    any miss (or 2× slow)   → b := b−1   (floor: b ≥ 1; band 0 is [obs])
    stop when the solid/unsolid boundary is bracketed (a solid band directly
    below a missed band), or after 4 bands probed.
Phase B — frontier refinement (fine, 3–5 items):
  within the boundary band, walk its 8 steps: probe the middle step of the
  unresolved range (binary search), one confirm item per step; a miss on a
  step with scaffold 2 retries the SAME level of thinking once at scaffold 0
  (ERWD: drop the representation level before declaring a gap).
  frontier := highest unsolid step at/below the ceiling.
Closing:  one guaranteed-easy item from a solid band ("bookend win"),
          unscored — the child leaves on a success (Star Math's opening
          trick, mirrored at the exit).
```

Item choice rules within a probed step:

- **Prefer constructed-response verbs** (number-line, array, share) over
  4-choice fetch — MC's 25% guess floor corrupts exactly the low-end
  estimates placement exists to protect. Fetch remains for skills with no
  other verb, and a *fast-wrong* fetch answer counts as weaker negative
  evidence than a slow-wrong one.
- **Never two items of the same verb in a row** — variety keeps it feeling
  like play, and per-verb interface confusion doesn't masquerade as a math
  gap (Star's practice-item rationale).
- **First item of the whole check is a freebie**: one unscored warm-in item
  ~2 bands below target, presented exactly like the rest. Interface check +
  guaranteed first success.

### 3.4 Response time: the second axis, invisible to the child

Record real `ms` per item (the warm-up currently records `ms: 0`). No visible
timer, no time-based reward or penalty — the HSHS coin mechanic is *not*
appropriate in a one-shot placement (Klinkenberg's own caveat: users must
know the rule well before it carries stakes; and visible pressure depresses
anxious high-ability children). RT is used only to classify, silently:

- **correct + fast** (within the step's fluency norm, e.g. facts ≤ 4–6 s à la
  Bareka/MTC, scaled per step type) → step **compacted** (solid).
- **correct + slow** → "can do, not yet fluent": the step is *not* compacted;
  it is marked `goal` at the edge of the frontier — practice will revisit it.
  This is ERWD hoofdlijn 3 (automatiseren) kept separate from hoofdlijn 1–2
  (begrip), and Bareka's power-vs-speed wall in game form.
- **wrong + very fast** repeatedly → disengagement flag: Mimi gently ends the
  check ("Weet je wat? We spelen gewoon verder!") and keeps only the
  pre-streak evidence — a rushed check must not write garbage ratings
  (i-Ready's rush-reassign, in child-sized form).

### 3.5 Length and stopping

- **Budget: 12–16 scored items, ~5 minutes.** Inside every evidence bound:
  Pelánek's ~10-answer Elo recovery, PROMIS's max-12 pediatric CATs, the
  5-minute MTC, Rekentuin's 15-item sessions, and attention heuristics for
  the youngest testable players (groep 3 ≈ 6 years).
- **Early stop** when Phase B has bracketed the frontier within one step —
  typical happy path (child near expectation): 2+2+2 band items + 3 refine
  items ≈ **9 scored items, ~3 minutes**.
- **Hard stop** at 16 scored items even if unresolved; take the conservative
  (lower) frontier estimate. Better to under-place and let compaction climb
  than to over-place into frustration (docs/04 §4.3 makes under-placement
  cheap: solid steps clear in one confirm each).
- **Interruptible without loss**: every answer is persisted as it lands
  (the current warm-up already does this — keep it). Quitting mid-check
  applies partial evidence with wider uncertainty; Mimi's cooldown does not
  arm, so the child can resume tomorrow.

### 3.6 What the result changes

1. **Placement**: run `placeOnLadder(report, { targetStep })` with the
   measured frontier feeding the per-step states — below frontier
   `compacted`, frontier `active`, above `goal`, beyond ceiling `locked`.
   This *replaces* the ±1 `placementBand` stage-window shift (keep the field
   for save compatibility, derived as: frontier band vs groep band).
2. **Ratings**: write probe results into the per-skill Elo with a **boosted
   K** (uncertainty-weighted: full boost on never-practiced or fully-decayed
   skills, small on fresh ones — Klinkenberg's K·(1+4U) shape). A check may
   move a rating *down* as well as up: that is recalibration working
   (rust-roest is already modelled by decay; the check confirms or corrects
   it).
3. **Misconceptions**: any misconception-tagged wrong answer during the
   check (decimal-length bias at step 44, denominator-size at step 46, …)
   is stored and biases the first post-check quests toward the targeted
   visual explanations — the check's most valuable diagnostic byproduct.
4. **Compaction states**: bands the check confirmed wholesale are marked so
   the story below the frontier opens at one-confirm-per-step pace
   (docs/04 §4.3, `demoteStep` on a miss — wire it at last).
5. **Parent screen**: show the result as a **functioneringsniveau** ("rekent
   op niveau ~M5") next to the enrolled groep, with the frontier step name,
   last-check date, and the misconception flags. Child-facing result is
   story only: "Jij kan al …! Ik weet nu precies waar we beginnen 🎉" plus
   which gates bloom — never a number, never a level label.

### 3.7 Bounds: the floor and ceiling question, answered

- **Downward: unbounded practice, invariant story.** The frontier may land
  below the groep/age floor — for ~10% of children (ERWD fase geel/oranje,
  sbo tail) it will, and that is the feature, not a bug. `eligibleObjectives`
  currently refuses to shift below the lower bound; the check's frontier
  must be allowed to override the *practice* floor downward while the story
  and world access remain whole (the docs/04 invariant: access never
  shrinks; only pace and entry move). The age floor keeps one job: it is
  where *compaction confirms* aim, i.e. the level the engine steers back up
  toward.
- **Upward: groep + 2 bands, hard.** Beyond that, items are unfamiliar
  *content*, not higher ability — a versnelde 8-year-old in groep 6 probes
  into band 6, but no 6-year-old ever meets fraction notation because of a
  lucky streak (Star's +3-grade cap, tightened one notch because our bands
  are curriculum-content bands, not pure difficulty).
- **Age-groep divergence** shifts these bounds one band conservatively in
  the direction of the divergence (see §3.2).

### 3.8 What NOT to build (anti-requirements)

- **No visible timer, score, lives, or right/wrong tally** during the check
  (framing evidence, §2.2; house rules already forbid countdowns).
- **No HSHS coin stakes** in the check (one-shot setting; rule-familiarity
  caveat). Consider HSHS-style scoring *later, in practice mode only*, where
  the child lives with the rule daily.
- **No long questionnaire** — two setup questions, then items only.
- **No kleuter probe** — groep ≤ 2 / age ≤ 5 never sees the check (§2.5).
- **No IRT/3PL machinery** — the Elo ladder is the scale; adding IRT would
  demand item calibration data the no-backend architecture can never
  collect.
- **No performance-gated reward**: the completion reward (bananas + egg
  points) is identical whether the frontier lands at band 2 or band 7.
  Jansen 2013: success experiences drive practice volume — the check must
  end as one.

---

## 4. Wiring map

| Piece | File | Change |
|---|---|---|
| Probe state machine | `src/curriculum/checkup.js` (new) | pure logic, mirror of `placement.js` style: `createCheckup({curriculum, math, report})` → `next()` / `record({correct, ms, misconception})` / `result()`. No DOM, no three.js; fully unit-testable. |
| Confirm-target items | `src/mathengine.js` | `nextProblem(math, { …, targetSuccess })`: difficulty = rating − 400·log10(p/(1−p)) (0.87 → ≈ rating − 330, vs today's fixed −108). Also: stop discarding `ms` in check/warm-up recording. |
| Screen | `src/screens/warmup.js` → grow into `screens/checkup.js` | add groep-picker page + birthday page; variable-length progress (Mimi's notebook fills, not "question n of N"); verb-variety rendering (reuse chamber verb presenters where possible); keep skip = "weet ik nog niet". Respect the `#top-stack` mobile text rules. |
| Mimi | `src/mimi.js` + `src/hub.js` | new advice-ladder entries: `mimi.checkup_offer` (conditions from §3.1.3) and an always-available `mimi.checkup_ask`; hub talk handler launches the checkup overlay like the duel/business launches. |
| Curriculum state | `src/curriculum/placement.js` + `src/state.js` | `applyCheckupResult()` (frontier-based) alongside legacy `applyWarmupResult`; schema: `curriculum.groep`, `groepSource`, `groepCapturedOn`, `checkup: {lastRun, frontier, itemsSeen, flags}`; save-version bump + migration (old `warmup.scored.band` → derived compat). |
| Eligibility | `src/curriculum/placement.js` | let a measured frontier lower the *practice* floor below the groep stage (story access unchanged); ceiling clamp at groep+2 bands. |
| Parent screen | `src/screens/parents.js` | functioneringsniveau readout, last-check date, misconception flags, "request new check" button. |
| i18n | `src/i18n/en.js`, `src/i18n/nl.js` | checkup keys; all child-facing copy per §3.8. |
| Tests | `tests/checkup.test.mjs` (new) | the §5 scenarios as table tests over the pure state machine. |

Everything heavy already exists: generators, Elo, decay, scaffold tiers,
`placeOnLadder`, `demoteStep`, misconception tags, the overlay screen system.
The new code is one pure state machine, one screen extension, and wiring.

---

## 5. Scenarios the state machine must pass

1. **On-track groep 5** (age 8, groep 5): prior band 4 → Phase A opens in
   band 3 (easy win), climbs to 4, misses once in 5; Phase B pins frontier
   ~step 33–35; ≈9 items, ~3 min; practice starts at frontier, band ≤2
   compacts at story pace.
2. **Zittenblijver** (age 9, groep 4 — repeated): groep picker says 4 → prior
   band 3, *not* the age-derived band 4/5; age≫groep shifts start to band 2;
   child confirms band 2, misses in band 3; frontier ~step 25. The child
   never saw a band-5 item, never learned the word "achterstand".
3. **Struggling groep 8 / sbo tail** (age 12, groep 8, functioning ~groep 5):
   descent 7→6→5→4 costs 8 items but *every* item was designed to be
   confirmable at the next level down — the path reads as a streak of
   near-wins, not a fall; frontier lands ~step 36; parent screen shows
   "rekent op ~E5/M6-niveau"; practice floor overrides the groep-8 stage
   floor downward; compaction + Echo Doors handle the climb back.
4. **Versnelde herfstkind** (age 7, groep 5): groep≫age → ceiling groep+2
   honored, probe may climb to band 6; frontier wherever evidence says;
   no age-based clamp at band 3.
5. **Kleuter** (age 5, groep 2): no probe. Mimi: "we spelen gewoon!" — band
   0/1 observational play places her.
6. **Bored veteran** (returning after 3 months, decayed ratings, sustained
   92% in play): Mimi offers a check; probe confirms bands quickly at
   boosted K, frontier jumps 6 steps; the "too easy" complaint dissolves
   without a parent touching settings.
7. **Rushed check** (wrong+fast ×3 in a row): check self-terminates keeping
   pre-streak evidence only; no cooldown armed; ratings barely move.
8. **Mid-check quit** at item 5: partial evidence applied, wider
   uncertainty, resume offer next session.

---

## 6. Sources

Product mechanics: NWEA MAP Growth item-selection FAQ (2023) and test
descriptions (teach.mapnwea.org); Star Assessments for Math Technical Manual
(Renaissance, 2024 Florida ed.) — start rules, 34 items, 67% target, +3-grade
cap, practice gate; i-Ready Diagnostic public docs (curriculumassociates.com,
NYSED submission) — 54–72 items, ~50% target, 5 placement levels; Cito
Leerling in beeld "toetsen op maat" & doorstroomtoets adaptiviteit (cito.nl);
Boom LVS Rekenen-Wiskunde product pages; Bareka Profieltoets
(onderwijsdatabank.nl, lexima.nl) — power/speed, 5 drempels, 80% norms;
Duolingo placement-test engineering blog; Khan Academy mastery/Course
Challenge support docs.

Measurement literature: Klinkenberg, Straatemeier & van der Maas (2011),
*Computers & Education* 57(2) — Elo + HSHS, 75% target; Brinkhuis et al.
(2018), *J. Learning Analytics* 5(2) — update rules, uncertainty-K, guessing;
Maris & van der Maas (2012), *Psychometrika* 77(4) — SRT scoring; Pelánek
(2016), *Computers & Education* — Elo variants, ~10-answer recovery; Jansen
et al. (2013), *Learning & Individual Differences* 24 — 60/75/90% success
experiment; Savi et al. (2018), *Computers & Education* 119 — skip-button
delay; Désert, Préaux & Jund (2009), *EJPE* 24(2) — game-vs-test framing;
Ramirez et al. (2013), *J. Cognition & Development* 14(2) — early math
anxiety; van der Linden (1999), *APM* 23 — empirical initialization; Weiss
(1982), *APM* — CAT efficiency; Babcock & Weiss — stopping rules; PROMIS
pediatric CAT stopping conventions (healthmeasures.net); EuleApp (2025,
*Frontiers in Psychology*) — CAT at ages 4–7; Shute & Ventura, *Stealth
Assessment* (MIT Press); England's Multiplication Tables Check (6 s/item).

Dutch context: onderwijskennis.nl (zittenblijven/versnellen); OCW in cijfers
(verblijfsduur, referentieniveaus); CBS (groep-8 leeftijden); Onderwijsinspectie
Peil.Taal en Rekenen 2022–2023 (1F 93%, 1S 43–46%; sbo 30% 1F);
Protocol ERWD po/sbo/so (Van Groenestijn et al., 2011, erwd.nl) — hoofdlijnen,
handelingsmodel, drieslagmodel, fasen, kleuter-signalen; Toetsbesluit PO /
Expertgroep Toetsen PO (kleutertoets ban per 1-8-2022); Cito
functioneringsniveau & toetsen-op-maat guidance; DLE/leerrendement
conventions (incl. Evers & Resing critique).

*Synthesis for Monkey Grove `NL_PO`, juli 2026. Verified against the codebase
at commit `dbf00ee`; flagged-unverifiable details (e.g. Rekentuin's exact
new-user seed rating, MAP's prior-score offset) are marked in the research
transcripts and were not load-bearing for this design.*
