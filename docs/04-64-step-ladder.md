# Monkey Grove — The 64-Step Mastery Ladder

*Design note: replacing the 18-skill ladder with a 64-step, research-grounded
progression that works whether a child starts in grade 3 or grade 8.*

Peildatum: juni 2026. Companion to `03-curriculum.nl.md`.

---

## 0. What you asked, and the short answer

Two questions:

1. **Can the 18-skill ladder become a 64-step ladder?** Yes — and the research
   supports finer granularity, *if* the steps are real learning-trajectory levels
   and not 64 arbitrary slices. 64 is a good number: it gives ~8 meaningful steps
   per grade across grade 1–8, which matches how fact-fluency and number
   progressions actually decompose in the literature. (It's also a clean power of
   two — `0..63`, 6 bits — if you want a compact `u8` skill id with room to spare.)

2. **Can a child who starts in grade 8 also begin at step 1 and climb the whole
   ladder?** Yes, but not by force-marching them through 63 baby steps. The
   evidence-based pattern is **placement + compaction**: every learner shares the
   *same* 64-step ladder, but where they *enter* and how fast they *compact*
   already-mastered steps differs. A late-starting grade-8 child plays the same
   story arc from the start, but the early world clears in fast "you already know
   this" confirmations, and real practice concentrates wherever their actual gaps
   are. The story stays whole; the grind does not repeat.

The rest of this document is the evidence and the concrete 64-step table.

---

## 1. What the research says (and how each finding shapes the design)

**Learning trajectories are ordered sub-levels, not topics.** Clements and
Sarama's work frames math learning as a trajectory: a goal, a developmental
*sequence of levels of thinking*, and activities matched to each level. Learning trajectories provide simple labels and descriptions for each level of thinking in every mathematical topic. The
counting trajectory alone has many named levels (Reciter → Counter (Small Numbers)
→ Producer → Counter and Producer (10+) → …). *Design consequence:* each of the
64 steps must be a **named level of thinking**, not just "harder sums." A step is
a thing the child can newly *do and explain*, with its own visual model.

**Optimal practice difficulty is high but not maximal — which is why Monkey Grove
splits its success target by purpose.** Wilson et al.'s "Eighty Five Percent Rule"
derived an optimal training accuracy of ~85% (error ~15.87%) *for stochastic
gradient-descent algorithms on binary-classification tasks*; the authors themselves
flag that applying it to human practice difficulty is untested extrapolation, and
the exact figure is noise-model-specific (≈82% Laplacian, ≈75% Cauchy). They tie it
conceptually to the Region of Proximal Learning and Desirable Difficulties
frameworks. In the classroom, Rosenshine's *Principles of Instruction* reports a
fourth-grade-math study in which the most successful teachers' students answered
82% correct versus 73% for the least successful. A separate motor-learning study
(Al-Fawakhiri et al., 2023) found a point optimum near ~68% success (~32% error) —
*lower* success / *more* error than Wilson's 85%, i.e. effortful initial practice
helps. *Design consequence:* run two targets for two purposes. Keep ~65% for
*active practice at a step* (close to the motor-learning optimum, deliberately
effortful, mistakes here are diagnostic) — but when a step is being **confirmed**
(placement / compaction / spaced review), aim much higher (~85–90%, in line with
Wilson and Rosenshine's guided-practice band). A confirmation that fails 35% of the
time feels like punishment, not review.

**Fine-grained skill nodes are established practice in the best adaptive systems.** A
2025 analysis of competency structures notes that both Grasple and MathAcademy use very fine-grained nodes focused around skills — things students actually do — and MathAcademy subdivides their topics into layers called 'knowledge points'. *Design consequence:* 64 nodes is not excessive; it's in line with how MathAcademy/Grasple decompose. But skill-decomposition theory warns the split should stop at a useful floor: decomposition continues until the skills are at such a rudimentary level that it would be a pragmatically wasted effort to continue further. 64 is about right for arithmetic grade 1–8; going to 128 would start splitting hairs.

**Math is sequentially scaffolded, so prerequisite gaps must be filled — but only
the ones that actually exist.** Project ACHIEVE's review stresses that math is more sequentially scaffolded than literacy, with certain skills laying the foundation as prerequisites to a next set of skills, and that off-track students who are taught only at grade level stay behind. The modern remediation pattern separates two skill types: Target Skills are the grade-level readiness skills a student must master to engage with current instruction; Supporting Skills are the prerequisite building blocks beneath each Target Skill, and students only work on the Supporting Skills they actually need — no unnecessary backtracking through content they already understand, and no hit to their confidence from covering old ground. *Design consequence:* this is the whole answer to your grade-8 question. A late starter's **Target band** is grade 8; the ladder *below* it is a reservoir of **Supporting steps** they drop into only on evidence of a gap. (See §4.)

**Mastery learning works precisely because it refuses to advance on unmastered
prerequisites — and the variance between fast and slow learners shrinks when it's
applied.** Bloom's mastery learning holds that differences in learning pace occur because of lack of prerequisite knowledge; if all children have the same prerequisite knowledge, learning progresses at a more similar rate. (A caution against over-optimism: Arlin's (1984) four-year study found that learning-time variability did *not* vanish under mastery — fast/slow time differences stayed stable or grew, so the engine should not assume slow learners converge on their own.) *Design consequence:* the ladder must gate on *mastery*, not on age or on steps-completed — and precisely because variability persists, the gate has to be per-step and individual rather than time-boxed. The Elo rating per step already gives you this; the 64-step version just makes the gate finer.

**Fact fluency itself decomposes into a strategy sequence — which is where a lot
of the 64 steps come from.** Research-based fluency programs break each operation
into strategy-based levels, from a foundational-facts stage to a derived-facts
stage, using ten frames, rekenrek-like beads, number lines, and double-bar
diagrams. One concrete example, MathFactLab, sequences this as ten named strategy
levels (a vendor implementation, not a field-wide standard); the underlying
research is broader. The derived-fact strategies themselves are explicit and
teachable — bridging through ten, near doubles, and compensating (adding 10 and
subtracting 1) — and explicit teaching of these strategies (Thornton 1978;
Steinberg 1985) is an effective route to fluency for all children, including lower
attainers. *Design consequence:* "addition" isn't one step; it's a short staircase (count-all → count-on → make-ten/bridging → near-doubles → derived facts → automaticity). That's how 18 skills naturally expand toward 64 without inventing filler.

**Number sense is the through-line that makes later steps possible.** Flexibility is the missing piece to building math fluency; how kids build flexibility with single digits for addition and subtraction plays into how they think about multi-digit addition and subtraction. *Design consequence:* steps should be ordered so the *strategy* (part-part-whole, bridging, place-value decomposition) is learned on small numbers and then *reused* on big numbers, rather than re-taught. The ladder threads strategies vertically, not just by getal-grootte.

---

## 2. Architecture of the 64-step ladder

**Layout.** 64 steps, id `0..63`, grouped into **8 bands** of **8 steps** each.
Band `b = floor(step / 8)` corresponds to grade `b + 1`. So:

- Band 0 → Grade 1 (steps 0–7, informal/observational)
- Band 1 → Grade 2 (steps 8–15)
- Band 2 → Grade 3 (steps 16–23)
- …
- Band 7 → Grade 8 (steps 56–63)

**Grade 1–2 and Elo.** `03-curriculum.nl.md` notes that a 4–5-year-old should get
no fail-sensitive sums. That maps cleanly here: **Band 0 (grade 1) is fully `[obs]`
— no Elo**, observation/voorbereidend only. Band 1 (grade 2) *does* carry ratings,
because grade 2 is the first group with SLO eind-doelen (the 2017 tussendoelen begin
at eind grade 2) — but its **earliest steps (8–9) stay soft**: scored gently, never
gating, so a child still in the kleuter-overgang is never punished. This is a slight
refinement of doc 03's "geen getoetste ratings voor `grade_1`/`grade_2`": grade 1
stays observational, grade 2 becomes lightly rated in line with the SLO framework.

This keeps a clean `step → grade` mapping (`grade = (step >> 3) + 1`) while giving
each grade 8 fine-grained internal levels — enough to express the strategy
staircases the research calls for.

**Each step carries five fields** (suggested schema, adapt to `mathengine.js`):

```
{
  id: 0..63,
  band: 0..7,              // grade - 1
  domain: GETALLEN | VERHOUDINGEN | METEN_MEETKUNDE | VERBANDEN,
  world: tidepools | banana | sharing | vine | business | (hub/observational),
  name_nl, name_en,        // a *level of thinking*, not "harder sums"
  floor / target / stretch // the three bounds from 03-curriculum.nl.md
  model,                   // the visual: ten-frame, array, number-line, bar, place-value strip
  prereq: [ids],           // supporting steps that must be ~mastered first
  misconception: [tags]    // wrong-answer patterns that trigger targeted visuals
}
```

**Three difficulty bounds per step** (unchanged from `03-curriculum.nl.md`):
Floor (scaffold visible, small numbers, one step) → Target (scaffold faded,
normal magnitude, a reasoning step) → Stretch (scaffold off, mean numbers,
multi-step, misconception traps, "explain why"). The Elo rating moves a child
*within* a step across these bounds before the step is considered mastered.

**Two success targets, not one** (from the 85%-rule research):

- **Active practice** at the child's working step: target ~**65%** (your current
  value; close to the ~68%-success motor-learning optimum and well below Wilson's
  ~85% — deliberately effortful, good for learning, fine because mistakes here are
  diagnostic, not punitive).
- **Confirmation** (placement probes, compaction, Echo-Door spaced review):
  target ~**85–90%**. These exist to *verify* mastery, so they should feel easy
  and affirming. A child re-confirming grade-3 addition in grade 8 should breeze through it.

---

## 3. The 64 steps

Notation: **F/T/S** bounds live in `03-curriculum.nl.md` per grade; here each step
names the *level of thinking* and its world. `▷` = Monkey Grove world.
`[obs]` = observational/informal, no Elo. Strategy staircases (count-on →
make-ten → derived facts, etc.) are drawn straight from the fact-fluency research.

### Band 0 — grade 1 (steps 0–7) · foundations `[obs]`  ▷ hub / Tide Pools intro
| # | Step (level of thinking) | Model |
|---|--------------------------|-------|
| 0 | Number-word sayer: rote count to 10 | chant / fingers |
| 1 | Count objects to 5 (1:1 correspondence) | countable props |
| 2 | Subitise to 4 (see "how many" without counting) | dice / dot patterns |
| 3 | Compare: more / less / same | side-by-side sets |
| 4 | Count to 20; count back from 10 | number track |
| 5 | Part-part-whole to 5 (split a small set) | ten-frame (half) |
| 6 | Ordinal & position: first/second, before/after | row of props |
| 7 | Recognise & extend a simple repeating pattern | bead chain |

### Band 1 — Grade 2 (steps 8–15) · beginning number  ▷ Tide Pools (handelend) · *steps 8–9 soft-rated*
| # | Step | Model |
|---|------|-------|
| 8 | Subitise to 6; read numerals 0–10 | dot cards |
| 9 | Number bonds / splits of 10 (make-ten facts) | ten-frame |
| 10 | Add within 12 by **counting on** from the larger | number line |
| 11 | Subtract within 12 by counting back / difference | number line |
| 12 | Compare & order numbers to 20 | number track |
| 13 | Halves & quarters of a small set (share fairly) | grouping |
| 14 | Coins to €10; make a total | coin props |
| 15 | Read a picture/bar graph; tally | pictogram |

### Band 2 — Grade 3 (steps 16–23) · formal +/− to 20  ▷ Tide Pools, Sharing Stump intro
| # | Step | Model |
|---|------|-------|
| 16 | Numbers to 100: read, place on line (global) | bead string / line |
| 17 | **Make-ten / bridging through 10** for addition (8+5 → 8+2+3) | ten-frame + line |
| 18 | Bridging through 10 for subtraction (14−6) | number line |
| 19 | **Near-doubles & doubles** (6+7 = 6+6+1) | double bar |
| 20 | +/− within 20 automatic (derived-fact fluency) | (fading) |
| 21 | Inverse relationship + and − (fact families) | bar model |
| 22 | Repeated addition → intro × (equal groups) | rows of items |
| 23 | Fair sharing → intro ÷ (deal into groups) | baskets |

### Band 3 — Grade 4 (steps 24–31) · to 100, tables start  ▷ Tide Pools, Banana Garden, Sharing Stump
| # | Step | Model |
|---|------|-------|
| 24 | Place value to 100 (tens & ones; split) | place-value strips |
| 25 | +/− to 100 by **splitting** (rijgen/splitsen) | empty number line |
| 26 | +/− to 100 by **compensating** (39+? → 40+?−1) | number line |
| 27 | Tables ×2, ×5, ×10 (skip-count structure) | array / hops |
| 28 | × as array; commutativity (4×6 = 6×4) | walked-out array |
| 29 | Tables ×3, ×4 via derived facts | array |
| 30 | ÷ with equal groups; ÷ as missing factor | baskets |
| 31 | Quarter of a quantity; simple ratio (recipe) | bar / table |

### Band 4 — Grade 5 (steps 32–39) · to 1.000, intro decimals  ▷ all worlds
| # | Step | Model |
|---|------|-------|
| 32 | Place value to 1.000; round to hundreds | place-value strips |
| 33 | Column +/− to 1.000 (cijferen) with regrouping | column layout |
| 34 | Estimate +/− and judge plausibility | rounding line |
| 35 | Tables 6–9 added → **all tables to 10 automatic (end off grade 5)** | array / Gem Tree |
| 36 | Decimals in money (2 places): read, +/− | price tags |
| 37 | ×/÷ informal beyond 20 (chunking) | array / repeated |
| 38 | Fraction as part of a whole; place 1/2, 1/4 on a line | **Vine Heights** line |
| 39 | mm/dm/km; herleiden (2 m 40 cm = 240 cm) | ruler / conversion |

### Band 5 — Grade 6 (steps 40–47) · decimals, fractions, fluency  ▷ all worlds · ⭐ je dochter
| # | Step | Model |
|---|------|-------|
| 40 | Numbers to ±100.000; order & round | place-value / line |
| 41 | **Tables to 10 — maintenance/retention** (already automatic) | Gem Tree |
| 42 | Efficient ×/÷ with remainder; interpret the rest | array / baskets |
| 43 | Inverse ×/÷ as a check (missing factor) | bar / array |
| 44 | Decimals to 2 places: meaning, compare (**0,4 vs 0,12 trap**) | place-value strip |
| 45 | Fraction notation: teller/noemer; place named fractions on line | **Vine Heights** |
| 46 | Compare fractions (**1/8 vs 1/4 trap**); equivalence intro | Vine Heights / pie |
| 47 | Fraction of a quantity (2/3 of 300); 1/4 = 25% = 1 op 4 | bar / business |

### Band 6 — Grade 7 (steps 48–55) · refinement, %, scale  ▷ Vine Heights, business
| # | Step | Model |
|---|------|-------|
| 48 | Numbers to ±1 miljoen; decimals to 2 places (precision/rounding) | place-value |
| 49 | Efficient all four operations; estimate & check | mixed |
| 50 | Fraction ↔ decimal (1/5 = 0,2); simplify (9/12 = 3/4) | line / strip |
| 51 | Equivalent fractions, self-generated | Vine Heights |
| 52 | Percent basics (25%, 50%); % of a quantity | bar / business |
| 53 | Discount problem (25% off €80 = €60) | price / business |
| 54 | Scale notation (1:100 → real length) | scaled drawing |
| 55 | Area/perimeter reasoning; line graph from a table | grid / graph |

### Band 7 — Grade 8 (steps 56–63) · integration, 1S, VO-ready  ▷ business, all worlds
| # | Step | Model |
|---|------|-------|
| 56 | Numbers to millions/billions; decimals to thousandths | place-value |
| 57 | +/− decimals fluently (align comma; reason about zeros) | column |
| 58 | ×/÷ by 10/100/1000; ×/÷ decimals | place-value shift |
| 59 | Order of operations & brackets (4 + 5×6) | expression tree |
| 60 | Fractions +/− unlike denominators (gelijknamig maken) | bar / line |
| 61 | Fraction × and ÷ (by whole or fraction) | area model |
| 62 | Percent advanced: 1%-rule, increase/decrease, >100%, back-calculate | business |
| 63 | Scale calculation; derived quantities (density, per km²); data critique | business / graph |

> **Why the strategy staircases matter.** Steps 17–20 (make-ten → bridging →
> near-doubles → automaticity) and 27–29 (×2/5/10 → array/commutativity → derived
> tables) are not "the same skill four times." Each is a distinct *level of
> thinking* the fact-fluency research treats as separately teachable, and teaching
> the derived-fact strategies explicitly is what produces fluency for *all*
> children, including those who struggle — which is exactly Monkey Grove's
> audience.

---

## 4. The grade-8 starter — same ladder, different entry (this is the core answer)

The principle from remediation research: **one ladder for everyone; placement sets
the entry; compaction handles everything below it.** A child is never marched
through 63 trivial steps, and never dropped cold into step 56 with hidden gaps
underneath.

### 4.1 Three reference learners on the *same* 64 steps

```
Step:  0 ......... 23 .......... 39 ...... 47 .......... 63
A (grade 3 start)  ▓▓▓▓▓▓▒░·························        entry ~16, climbs slowly
B (grade 6 start) ✓✓✓✓✓✓✓▓▓▓▓▒░··········        entry ~40, gaps below auto-filled
C (grade 8 start)  ✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓▓▓▓▓▒░               entry ~56, fast-confirm below
```
`▓` active practice · `▒░` stretch/edge · `✓` confirmed-by-compaction · `·` not yet

All three see the **same island story from step 0**. What differs is the *texture*
of the early steps: for C they are rapid confirmations ("you already know this" —
the gate blooms in one or two correct answers at the 85–90% confirm target), not
full practice loops.

### 4.2 Placement: where does a new child enter?

1. **Age/grade → provisional Target band.** Grade 8 → Target band 7 (steps 56–63).
   This is the *floor's ceiling*, the level the engine is steering toward.
2. **Warm-up probes the band below at the confirm target (~85%).** A short
   adaptive probe walks *down* from the Target band, not up from step 0, sampling
   one or two steps per band. As long as the child confirms, the engine marks
   those steps `compacted` and keeps descending only as far as it needs to find
   the **frontier** — the highest step that is *not* yet solid.
3. **Practice starts at the frontier, not at the Target.** If a grade-8 child sails
   through everything but stumbles on step 45 (fraction notation), the frontier is
   45: that's where ~65% active practice begins, with the Supporting steps below
   it confirmed and the Target steps above it visible as the goal.

This is the Target/Supporting-skill split: the child only practises the supporting
steps they actually need, with no needless backtracking and no confidence hit from
re-covering mastered ground.

### 4.3 Compaction: clearing the story below the frontier without grinding

For steps below the entry band that the warm-up didn't individually probe, the
island still has to *open* (gates, blueprints, story). Use **compaction**, not
full practice:

- Each below-frontier step opens on a **single confirm problem** at the ~85–90%
  target. Pass → gate blooms, step marked `compacted`, story advances.
- A miss demotes that step from `compacted` to `active`: the frontier moves down to
  it, and it now gets real ~65% practice. (A genuine gap was found — exactly what
  you want surfaced.)
- Compacted steps still resurface later through **Echo Doors / spaced review**, so
  "confirmed in 30 seconds during onboarding" doesn't mean "never seen again."

The effect: a grade-8 starter experiences the **whole narrative** (every world
unlocks, the grove is restored from gray) but spends their *real* effort at their
actual edge. A grade-3 starter experiences the identical narrative at a slower
climb. The story is invariant; only the pacing differs — which is precisely the
"keep the story going whether started in grade 1 or the last grade" you asked for.

### 4.4 Why not just let the grade-8 child skip to step 56?

Because math is sequentially scaffolded and the *most common* reason a grade-8
child finds math stressful (Monkey Grove's stated audience) is unmastered
*earlier* steps — a shaky 0,4-vs-0,12 (step 44) or 1/8-vs-1/4 (step 46) quietly
breaks step 60 (unlike-denominator addition). Skipping straight to band 7 hides
those gaps; compaction *finds* them cheaply. The ladder below the entry point
isn't busywork — it's a diagnostic safety net that only catches when something is
actually loose.

---

## 5. Migration from the 18-skill ladder

The 18 skills map cleanly onto step *clusters* — you're refining, not rebuilding.
Keep the old skill as a `group` tag so existing ratings can seed the new steps.

| Old skill (18) | New steps (64) |
|----------------|----------------|
| 1 Tellen & getalbegrip ≤20 | 0–4, 8, 12 |
| 2 Splitsen tot 10 | 5, 9 |
| 3 +/− tot 20 | 10–11, 17–20 |
| 4 +/− tot 100 | 16, 24–26 |
| 5 +/− tot 1.000 | 32–34 |
| 6 +/− ≤100.000 + geld-decimaal | 36, 40, 44, 48, 56, 57 |
| 7 Tafels 1-5/10 | 22, 27–29 |
| 8 Tafels 6-10 (alle) | 35, 41 |
| 9 × meercijferig | 37, 42, 49 |
| 10 Delen + rest | 23, 30, 42 |
| 11 Missing factor / inverse | 21, 30, 43 |
| 12 ×/÷ decimalen | 58 |
| 13 Breuk op lijn | 38, 45 |
| 14 Breuk vergelijken/equivalentie | 46, 50–51 |
| 15 Breuk van hoeveelheid | 47 |
| 16 Breuk +/− ×/÷ | 60–61 |
| 17 Procenten | 52–53, 62 |
| 18 Schaal & verhouding | 31, 54, 63 |

**Genuinely new steps (no 18-skill parent — cold-start).** The 18-skill ladder
covered only Getallen + Verhoudingen, so the Meten/Meetkunde/Verbanden and
early-informal steps have no parent to seed from: **6** (ordinal/position),
**7** (repeating pattern), **13** (halves/quarters of a small set), **14** (coins),
**15** (picture/bar graph), **39** (mm/dm/km herleiden), **55** (area/perimeter,
line graph), **59** (order of operations). These start at the band's default rating.

**Seeding ratings.** For each new step *with* a parent, initialise its Elo from the
parent old skill's rating (or the mean of its parents where a step has two). For a
step with **no** parent (the cold-start list above), seed from the nearest mapped
neighbour in the same band, falling back to the band's age-Target default. A child
mid-way through the 18-skill ladder keeps their place; the finer steps just give the
engine more resolution from the next session on.

**Migration is additive and reversible.** Bump the save schema version, write a
one-way `migrate18to64()` in `state.js` that expands ratings, and keep the old
ids as `legacyGroup` so the parent screen's historical coverage still reads.

---

## 6. Concrete recommendations

1. **Adopt 64 steps as 8 bands × 8** (`grade = (step >> 3) + 1`). Clean math,
   `u8`-friendly, ~8 levels-of-thinking per grade matching the fact-fluency
   staircases in the research.
2. **Each step is a named level of thinking with its own visual model** — not a
   getal-grootte bucket. Reuse strategies vertically (bridging learned small,
   applied big).
3. **Two success targets:** ~65% for active practice, ~85–90% for
   placement/compaction/spaced-review confirmation. Don't confirm at 65% — it
   reads as failure.
4. **Placement walks *down* from the age-Target band to the frontier**, not up
   from step 0. Practice begins at the frontier.
5. **Compaction opens below-frontier steps on a single confirm**, demoting to real
   practice only on a miss. This is what lets a grade-8 starter live the whole
   story without grinding — and what catches the hidden early gaps that actually
   cause grade-8 stress.
6. **Keep the two misconception traps as first-class step fields:** decimal-length
   (step 44) and denominator-size (step 46). They are the highest-leverage "snap,
   don't memorise" moments and they silently break band-7 fraction work if missed.
7. **Revisit when the SLO 2025 leerlijnen land (summer 2026)** — they may renumber
   sub-goals; the band structure should absorb that without a rebuild.

---

## 7. Sources

- Clements, D. & Sarama, J. — *Learning and Teaching Early Math: The Learning
  Trajectories Approach*; *Building Blocks* curriculum; learningtrajectories.org
  (canonical level names: Reciter, Counter (Small Numbers), Producer, Counter and
  Producer (10+), …).
- Wilson, R. C., Shenhav, A., Straccia, M. & Cohen, J. D. (2019). *The Eighty Five
  Percent Rule for optimal learning.* Nature Communications 10:4646. (Result is for
  SGD on binary classification — optimal accuracy ~85%, Gaussian-noise-specific;
  classroom application is the authors' acknowledged extrapolation.) Rosenshine,
  B. (2012). *Principles of Instruction*, American Educator — a fourth-grade-math
  study with 82% (most successful teachers) vs 73% (least) correct. Al-Fawakhiri,
  N. et al. (2023). *Evidence of an optimal error rate for motor skill learning*,
  bioRxiv — a point optimum near ~68% success (~32% error) for *motor* learning,
  **not** a 64–83% range.
- *Structuring Competency-Based Courses Through Skill Trees* (Bijl, H., arXiv
  2504.16966, 2025) — on MathAcademy/Grasple fine-grained "knowledge-point" nodes.
- *The SAGE Encyclopedia of Educational Technology* — "Skill Decomposition"
  (granularity floor).
- Project ACHIEVE (Knoff) — *Closing Secondary Students' Significant Academic Skill
  Gaps* (Parts I–II); Target Skills vs Supporting Skills — the readiness-vs-
  prerequisite distinction from the acceleration literature (TNTP; Accelerate
  Learning / STEMscopes).
- Bloom's mastery learning (Learning for Mastery). Arlin, M. (1984). *Time
  Variability in Mastery Learning*, AERJ 21(1) — found learning-time variability did
  *not* vanish (a caution, not a confirmation, of Bloom's vanishing-point claim).
- Fact-fluency strategy staircases: Thornton, C. (1978), *Emphasizing Thinking
  Strategies in Basic Fact Instruction*, JRME 9(3); Steinberg, R. (1985),
  *Instruction on Derived Facts Strategies…*, JRME 16(5); MathFactLab (a vendor
  program implementing ten named strategy levels). Fluency = accuracy + efficiency +
  flexibility + appropriate strategy: Bay-Williams & SanGiovanni, *Figuring Out
  Fluency*; NCTM *Procedural Fluency* position statement.
- Companion: `03-curriculum.nl.md` (SLO Tussendoelen 2017; kerndoelen herziene
  versie 2025; referentieniveaus 1F/1S).

*Design synthesis for Monkey Grove `NL_PO`. Peildatum juni 2026. The step contents
are grounded in the SLO per-grade curriculum; the ladder mechanics are grounded in
the learning-science sources above. Reconcile step names against the real
`curriculum/` enum before shipping.*