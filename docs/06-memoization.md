# Monkey Grove — Memory Grove: anchor images & memory walks (method of loci)

*Design note: teaching children an evidence-based memory technique inside the
island, tied to the fact gems and the skill engine — as a supplement to, never
a replacement for, understanding.*

Peildatum: juli 2026. Companion to `01-learn.md` (pedagogy), `02-adaptive.md`
(engine), `04-64-step-ladder.md` (placement), `05-mimi-check.md` (Mimi's
probe). The filename says *memoization* — the programmer's pun stays, but the
technique is **memorization**: the method of loci (memory palace).

> **Status: implemented (Phases 1–3), juli 2026.** The v2.0 design below shipped
> as `src/memory/` (`data.js` + pure `engine.js`, plus the `walkflow.js` /
> `probeflow.js` controllers) and `src/screens/memory.js`, wired through `hub.js`,
> `chamberflow.js`, `mimi.js`, `screens/gems.js`, and `screens/parents.js`;
> `profile.memory` heals additively in `state.js` with no version bump. Coverage:
> `tests/memory.test.mjs` (engine purity, gating, hint dispatch, walks, codes,
> A/B, probe, state healing) and a visual smoke test in `scripts/e2e-memory.mjs`
> (with the `memory_grove` devtools preset) that drives every surface. §3 is the
> original greenfield audit the build followed; §5 records the as-built status of
> each phase.

---

## 0. Verdict, and what changed since v1.0

The method of loci is real, well-evidenced, and a genuinely good fit for a
game whose whole premise is a spatial island the child knows by heart. But
v1.0 oversold three things, and this revision fixes them:

1. **One technique became two.** V1.0 conflated *loci journeys* (ordered
   recall — walk the route, retrieve item N) with *anchor images*
   (paired-associate recall — one vivid image at one place for one fact).
   Arithmetic needs **random access**: a child facing 7×8 in a chamber cannot
   mentally walk five loci to reach it. §1 splits the design accordingly:
   anchors for facts, journeys for sequences and procedures.
2. **The code, as it is.** V1.0 assumed an extensible hint-type system, a
   fact-level review queue, and seven ready-made hub loci. None of those
   exist (§3). The design in §4 is rebuilt on what does exist — and on one
   thing v1.0 missed: **island builds double as unlockable loci**, tying the
   memory system into the restoration loop for free.
3. **The evidence, honestly weighed.** Corrections in §2: the Moll & Sykes
   figures are percentage recall scores, not word counts, and the paper was
   published in *Virtual Reality* (Springer); the Qureshi "~16%" figure is
   dropped (direction verified, magnitude not); the "existing Monkey Grove VR
   fan games" claim was fabricated and is gone. Added: the Twomey & Kroneisen
   (2021) meta-analysis (g = 0.65 across 13 RCTs) and the Ondřej et al.
   (2025) systematic review — the two strongest citations available.

Scope also shrank. V1.0's MVP included a free-form palace builder, custom
journeys, and "image upload or generative prompts". The builder moves to
Phase 2; uploads and AI generation are **cut** outright (§4.8) — Monkey Grove
has no backend and makes a privacy promise (README: "Nothing is uploaded"),
and pre-authored associations are pedagogically safer anyway.

---

## 1. Two mechanics, not one

**The method of loci** (memory palace): pick a familiar space with distinct
ordered locations (*loci*), bind each item to its locus with a vivid,
exaggerated, multi-sensory image, and recall by mentally walking the route.
It exploits the hippocampal machinery humans already have for places, plus
dual coding (Paivio), elaborative encoding, and built-in retrieval practice.

The catch for arithmetic: loci retrieval is **sequential**. That is perfect
for ordered content and wrong for fact lookup. So Monkey Grove gets two
mechanics with one shared aesthetic:

| Mechanic | Technique | Recall shape | Content | Where it lives |
|---|---|---|---|---|
| **Anchor images** | paired-associate / pegword at a landmark | random access: fact → image → answer | times-table & division facts (`math.facts`, keyed `"7x8"`) | memory hint in chambers; Gem Tree; anchor browser |
| **Memory walks** | true method of loci (journey) | sequential: locus 1 → 2 → 3… | skip-counting rows, procedure steps (borrowing, long division, fraction addition), Echo Song sequences | hub activity, stage-style (§4.4) |

The landmark in an anchor image is not there for route-walking — it is there
for **distinctiveness and dual coding** (the image lives *somewhere* the
child knows, which is what makes it stick). The journey mechanic is where
the walking itself carries the order.

Both are positioned exactly as `01-learn.md` demands: the visual models
(arrays, baskets, number lines) teach *why* 7×8 is 56; the anchor image only
speeds up *remembering* it once understood. Retrieval practice and spaced
review (Echo Doors) remain the backbone — MoL is an encoding aid layered on
top, which is also how the strongest literature frames it.

---

## 2. Evidence, honestly weighed

### 2.1 Meta-analytic base (new in v2.0)

- **Twomey & Kroneisen (2021, QJEP)** — meta-analysis of 13 RCTs: the loci
  method improves memory with a **medium-to-large pooled effect, g = 0.65**
  (95% CI 0.45–0.85), robust to publication-bias adjustment, leave-one-out,
  setting, and number of sessions. This single citation carries more weight
  than any individual study below.
- **Ondřej (2025, British Journal of Psychology)** — systematic review +
  meta-analysis of MoL across psychological research: a **large effect on
  immediate serial recall vs. rehearsal (d = 0.88)** in adults, and a map of
  the boundary conditions we design around (working-memory demands,
  imagery-ability differences, training quality).

### 2.2 Key studies

- **Legge, Madan, Ng & Caplan (2012, Acta Psychologica)** — ~142
  undergraduates; MoL with **virtual environments performed equivalently**
  to MoL with familiar real places, both beating control. Palaces built in
  minutes. This is the license to use the island itself as the palace.
- **Moll & Sykes (2023, *Virtual Reality*)** — optimized VR memory palace;
  recall rose from a **62.6% pre-test to 82.9% post-test recall score**
  (+20.4 percentage points; ≈+22 on second use), statistically significant,
  after minimal training. *(V1.0 misread these as word counts and cited the
  paper by its PMC id.)*
- **Ruchkin et al. (2022, Applied Neuropsychology: Child)** — feasibility of
  app-delivered MoL in **12 children/adolescents with ADHD, ages 9–17**;
  8/12 completed 4 weeks of 10–15-minute sessions; completers improved on
  memory tests and reported fewer ADHD symptoms; all completers would
  recommend it. Small, uncontrolled — but it is *our* age band, *our*
  delivery medium, and the attention-challenged tail we care most about.
- **Pan et al. (2023, npj Science of Learning)** — digit-image mnemonic
  training in ~13-year-olds; memory discriminability d′ 1.37 → 2.10
  (Group × Session η²p = 0.30, large), with EEG markers (P200, theta)
  predicting gains; some effects held at 4 months. **Read the fine print:**
  this was ≥6 h/day for 22 days at a memory-sport camp, and generalization
  beyond trained material was limited. It proves mechanism, not that a game
  can reproduce the dose.
- **Qureshi et al. (2014, Advances in Physiology Education)** — medical
  students using MoL scored significantly higher on endocrinology
  assessments than lecture-only peers. Direction verified; v1.0's "~16%"
  magnitude could not be verified and is withdrawn.
- **Sousa et al. (2021, Frontiers in Psychology)** — one-session MoL gave
  small-but-significant gains in healthy adults (n = 71); none in a tiny
  schizophrenia sample. Relevant lesson: MoL costs working memory and
  executive resources → scaffold hard for children.

### 2.3 What the evidence does *not* show

Be precise about the gap the game is stepping into:

- Nearly all of it measures **word/picture-list recall**, not arithmetic
  fluency. No RCT shows MoL improving times-table retrieval in children.
  Monkey Grove would be generating that evidence, not standing on it (§7).
- Effects need **generation and effort**: images the learner elaborates
  (even from templates) beat images passively shown. The design must make
  the child *do* something with each image (retell it, walk it, answer from
  it), not just look at it.
- **Age floor ≈ 9.** Self-generated imagery mnemonics are developmentally
  shaky below ~9; the child evidence starts there (Ruchkin 9–17, Pan ~13).
  V1.0 unlocked the feature "after the first chamber" — wrong for a game
  whose youngest players are in groep 1. §4.2 gates by groep/stage instead.
- Mathematics-education research on fact fluency favors **derived-fact
  strategies + retrieval practice** as the primary route. Anchor images are
  for the stubborn residue (the 6×7/7×8/6×9 cluster every child fights),
  not a curriculum.

---

## 3. What exists today (code audit — source of truth)

Audited juli 2026, after the `src/math/` / `src/verbs/` / `src/chamber/`
refactor. Every claim in §4 traces to a line here.

1. **Skills & facts.** `src/mathengine.js` is a 32-line barrel over
   `src/math/` (config, rating, choices, generators/*, selection, results).
   Per-skill Elo-lite state lives in `profile.math.skills`. **Per-fact
   tracking exists only for the five fact skills** — `FACT_SKILLS =
   {tables_a, tables_b, tables_c, tables_mix, div_facts}`
   (`src/math/results.js:13`) — keyed `"${a}x${b}"` with
   `{ n, ok, lastOk }`; a gem lights at `ok >= 3 && lastOk`
   (`results.js:15`). The Gem Tree (`src/screens/gems.js`) renders this as
   the 10×10 grid. **It is a display, not a queue** — nothing re-serves an
   individual dark fact.
2. **Echo Doors are skill-level.** `echoSkill()` in
   `src/math/selection.js:84` picks a *skill* due for review;
   `nextProblem(math, { echo: true, … })` (`selection.js:147–159`) has no
   notion of a target fact. Fact-level review = engine work (§4.5).
3. **One hint path, no hint types.** `useHint()` in
   `src/chamberflow.js:569–577` shows the verb's floor model
   (`g.verb.showModel()`), falls back to `hud.showModelPanel()`, says
   `t('hint.look')`. `hintUsed` is tracked via the verb ctx
   (`chamberflow.js:339`). A memory hint is a **branch here**, not a plug-in
   (§4.3).
4. **Verbs are cleanly extensible — but solve single problems.**
   `src/verbs/index.js` registers `VERBS = { fetch, array, numberline,
   share }`; each extends the 27-line `VerbBase` contract (own your scene
   objects, `ctx.resolve(correct, info)` exactly once) and is instantiated
   at `src/chamberflow.js:326`. A memory *walk* — a multi-stop journey — is
   the wrong shape for a verb; it is an **activity**, like the music stage
   (§4.4).
5. **The hub is the palace; the worlds are not.** The four math worlds are
   separate portal scenes (`src/chamber/place.js`), so loci live on the hub
   island only (`src/chamber/hubplace.js`). Permanent landmarks: **Gem Tree**
   (`markers.T`, hubplace.js:50), **shop stand** (`markers.O`, :66), **egg
   nest** (`markers.N`, :74), **Mimi** (`markers.M`, :83). Plus **eight
   build plots** (`src/island.js:17–43`): lanterns 🏮, fruit stand 🍉,
   garden 🌺, music stage 🎵, bakery 🥐, pizzeria 🍕, bridge 🌉, plaza 🎪 —
   each already tappable through `hubTap()` (`src/hub.js:382`) and the NPC
   talk machinery (`hub.js:427–433`). **4 base loci growing to 12 as the
   island is restored** — the progression hook v1.0 missed.
6. **Persistence is ready.** `src/state.js`: `VERSION = 3`, a version-step
   ladder (`STEPS`, :176) for restructures, and an **additive-only
   `healSave()`** (:200) that fills any missing profile field from
   `freshProfile()`. A new `profile.memory` subtree needs one line in
   `freshProfile()` (:20, next to `math: createMathState()` at :51) and heals
   into old saves automatically — no version bump.
7. **Screens & house architecture.** `src/screens/` is one functional
   module per family (render + callbacks, no state machines) — the builder
   overlay copies `gems.js`. Feature folders follow a data / engine /
   controller / scene split (`src/business/`, `src/stage/`) — `src/memory/`
   should too. i18n is `src/i18n/en.js` + `nl.js`: **every association is
   authored twice**.
8. **Size guardrails.** ESLint warns at 777 lines/file. The old offenders
   are split; `src/main.js` (941) is the last one — so the memory feature
   wires through `hub.js` and its own controller, **adding nothing to
   main.js beyond mode plumbing if unavoidable**.

---

## 4. Design

### 4.1 Principles (unchanged in spirit from v1.0)

1. **Optional, discoverable, never required** for math progression.
2. **Understanding first** — an anchor is offered only for facts the child
   has already *solved* (misconception-free), never as a shortcut past the
   array model.
3. **Pre-authored, bilingual, silly.** Curated EN+NL association catalog;
   generation effort comes from retelling and walking, not from a blank
   canvas (mitigates imagery-ability differences).
4. **Island-native.** Loci are real landmarks the child restored; images
   star the cast (monkeys, Mo, Olli, Kiki, coconuts, bananas).
5. **No backend, no uploads, no generated images.** Privacy promise intact.
6. **Scaffold hard, fade late** — same philosophy as the verb scaffolds.

### 4.2 Gating & onboarding

Mimi offers the Memory Grove when `profile.curriculum` (confirmed or
measured stage — see `05-mimi-check.md`) reaches **groep 6 / age ≈ 9**, the
floor the child evidence supports, *and* at least a handful of table facts
are gem-lit (so there is something worth anchoring). Parents can enable it
earlier or disable it from the parents screen (`src/screens/parents.js`).
Offer plumbing reuses the Mimi advice ladder (`src/mimi.js`), like the
checkup offers already do.

### 4.3 Feature 1 — anchor images + the memory hint (MVP core)

- **Catalog** `src/memory/data.js`: ~20 pre-authored anchors for the
  hardest fact cluster (6×7, 7×8, 6×9, 8×8, 7×7, …), each
  `{ factKey: '7x8', lociId: 'gemtree', imageKey: i18n key, sceneHint }`.
  Story text lives in `i18n/en.js` + `nl.js`. Example, 7×8 at the Gem Tree:
  *"Five-six-seven-eight! 56 = 7×8 — the gems on the tree count themselves
  up the trunk."* (The 5-6-7-8 digit-string trick rides along free.)
- **Adoption, not assignment.** At the Gem Tree, a lit-but-wobbly fact
  (recent `lastOk === false` after being lit, or low `ok`) sparkles; the
  child taps it, hears/reads the image story, retells it (taps the scene
  elements in order — the generation step §2.3 demands), and the anchor is
  saved to `profile.memory.anchors`.
- **Memory hint.** In `useHint()` (`src/chamberflow.js:569`): if the current
  problem is a fact problem whose `factKey` has an adopted anchor, the first
  hint press shows the **anchor card** (image story + landmark thumbnail,
  via a `hud` panel) instead of the bare model; a second press still opens
  the floor model, which remains the conceptual authority. For non-anchored
  problems the flow is untouched.
- **State** (`profile.memory`, healed additively per §3.6):

  ```js
  memory: {
    enabled: false,          // Mimi offer accepted / parent toggle
    anchors: {},             // '7x8': { lociId, adoptedAt, recalls, lastOk }
    walks:   {},             // journeyId: { built, bestStreak, lastAt }
  }
  ```

### 4.4 Feature 2 — memory walks (Phase 2)

True loci journeys, shaped like the music stage, not like a verb: a
`src/memory/` controller + engine drives the *existing* hub — no new scene.
Kiki-style flow: Mimi lays a route over N restored landmarks (start N = 3),
the child physically walks it; at each locus the anchor/step image appears
and the child answers (numpad/tiles, the same DOM presentation trick
`05-mimi-check.md` §3.3 already uses). Content that is genuinely ordered:

- **Skip-counting paths** (stage synergy: the Counting Song *is* this —
  `src/stage/data.js` — a walk is its spatial twin; correct rounds feed the
  same skills via `reinforceSkill`).
- **Procedure journeys**: borrowing, long division, fraction addition — one
  step per locus, the "story route" for multi-step work.

Rewards flow through `rewards.js` like everything else; recall accuracy
writes to `profile.memory.walks` and reinforces the parent skill. Duel and
challenge-code variants (deterministic via `rng.js`) are Phase 3.

### 4.5 Feature 3 — fact-level echo bias (Phase 2, engine work)

The honest gap from §3.2: to let Echo Doors re-serve a *specific* wobbly
anchored fact, extend `nextProblem` opts with `targetFact` and teach the
table generators (`src/math/generators/multiplication.js`, `division.js`)
to honor it, with `echoSkill()` unchanged. Small, contained, testable in
`tests/` — but it is engine surgery and stays out of the MVP.

### 4.6 Feature 4 — anchor browser / builder (Phase 2)

`src/screens/memory.js` on the `gems.js` pattern: browse the island map of
loci, review adopted anchors, swap an anchor's landmark, compose custom
walks from adopted anchors. "Custom" means recombining catalog pieces —
still no free-form asset creation (§4.1.5).

### 4.7 Parents screen & analytics (Phase 2)

One block in `src/screens/parents.js`: anchors adopted, walk streaks,
recall accuracy on anchored vs unanchored facts (computable from
`math.facts` + `memory.anchors`). Feeds §7.

### 4.8 Explicitly cut

- **Image upload / AI-generated imagery** — no backend, privacy promise,
  and curation beats generation for 9-year-olds.
- **VR** — v1.0's "existing Monkey Grove VR fan games" claim was false;
  nothing here targets headsets.
- **Loci inside the four math worlds** — separate scenes (§3.5); the hub is
  the palace. Revisit only if worlds ever become walk-through.
- **A second review system** — memory features *feed* Echo Doors and the
  Elo engine; they never fork their own scheduling.

---

## 5. Roadmap

**Phase 1 — MVP. ✅ Shipped.** `src/memory/data.js` (18 anchors for the hard
multiplication cluster, EN+NL) + pure `engine.js` (eligibility, wobbly-fact
pick, anchor CRUD) · Gem Tree adoption flow (`screens/gems.js` + `hubTap`) ·
memory-hint branch in `useHint()` · Mimi offer, groep-6 gate, parent toggle ·
`profile.memory` + additive heal.
*Acceptance (met):* a groep-6 child with lit gems can adopt 7×8 at the Gem
Tree, sees the anchor as their first hint next time 7×8 wobbles, and a parent
can see and disable it. Old saves load unchanged.

**Phase 2 — walks & depth. ✅ Shipped** (one deferral). Memory-walk controller
over hub landmarks — *skip-counting shipped*; the **procedure journey**
(borrowing / long division / fraction addition, one step per locus) is the one
deferred item, and the walk engine is shaped to take it as a second `kind` ·
fact-level echo bias (§4.5, `nextProblem` `targetFact` + table/division
generators) · anchor browser screen (`src/screens/memory.js`) · parents block ·
anchor-themed cosmetic (the grove-leaf trail) through the shop economy.

**Phase 3 — sharing & evidence. ✅ Shipped.** Walk challenge codes
(`makeWalkCode`/`parseWalkCode`, the `duel.js` pattern) · opt-in anonymous
pre/post fact-recall probes (§7, `probeflow.js`, stored on device) · A/B of
memory-first vs model-first hints for anchored facts (`pickHintArm` /
`recordHintArm`, surfaced in the parents block).

---

## 6. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Weak imagery / aphantasia in some children | Pre-authored multi-sensory stories (text + narration + scene), never a blank canvas; walks work verbally too |
| Working-memory overload (§2.2 Sousa) | Start at 3 loci; one new anchor per session; scaffolds fade like verb scaffolds |
| Anchors become rote shortcuts past understanding | Adoption requires the fact solved misconception-free; model remains hint #2; Mimi frames it as "so your head is free for the thinking" |
| Motivation cliff (33% dropout in Ruchkin) | Sessions ≤ 5 min, banana rewards, streak integration, builds-as-loci make progress visible |
| i18n authoring cost (×2 languages, ×20+ anchors) | Catalog is data, not code; ship the 8–10 hardest facts first; NL and EN reviewed together |
| Scope creep (v1.0's builder-first trap) | Builder demoted to Phase 2; §4.8 cut list is contractual |
| Evidence gap for arithmetic transfer (§2.3) | Position as encoding aid over Echo Doors; measure (§7) before claiming |
| `main.js` still over the size guardrail | All wiring lives in `src/memory/` + `hub.js`; lint stays the tripwire |

---

## 7. Evaluation

The feature should prove itself with the instruments already in the save:

- **Primary:** accuracy and time-to-answer on **anchored vs comparable
  unanchored facts** (`math.facts` n/ok history), within-child.
- **Secondary:** gem relight rate after wobbles; Echo Door success on
  anchored skills; walk streaks.
- **Qualitative:** Mimi asks after a walk ("did the picture help?"),
  1-tap answer, stored locally; parents screen surfaces it.
- **Phase 3:** opt-in anonymous pre/post recall probe reusing the checkup
  presentation machinery — the missing arithmetic-transfer evidence (§2.3),
  generated with consent, still with no backend.

---

## References

1. Twomey, C., & Kroneisen, M. (2021). The effectiveness of the loci method
   as a mnemonic device: Meta-analysis. *Quarterly Journal of Experimental
   Psychology, 74*, 1317–1326. https://doi.org/10.1177/1747021821993457
2. Ondřej, J. (2025). The method of loci in the context of psychological
   research: A systematic review and meta-analysis. *British Journal of
   Psychology, 116*, 930–986. https://doi.org/10.1111/bjop.12799
3. Legge, E. L. G., Madan, C. R., Ng, E. T., & Caplan, J. B. (2012).
   Building a memory palace in minutes: Equivalent memory performance using
   virtual versus conventional environments with the Method of Loci. *Acta
   Psychologica, 141*(3), 380–390. https://doi.org/10.1016/j.actpsy.2012.09.002
4. Moll, B., & Sykes, E. R. (2023). Optimized virtual reality-based Method
   of Loci memorization techniques through increased immersion and effective
   memory palace designs: a feasibility study. *Virtual Reality, 27*(2),
   941–966. https://doi.org/10.1007/s10055-022-00700-z
5. Ruchkin, V., et al. (2022). Memory training with the method of loci for
   children and adolescents with ADHD — a feasibility study. *Applied
   Neuropsychology: Child.* https://doi.org/10.1080/21622965.2022.2141120
6. Pan, Y., Hao, N., Liu, N., Zhao, Y., Cheng, X., Ku, Y., & Hu, Y. (2023).
   Mnemonic-trained brain tuning to a regular odd-even pattern subserves
   digit memory in children. *npj Science of Learning, 8*, 27.
   https://doi.org/10.1038/s41539-023-00177-8
7. Qureshi, A., et al. (2014). The method of loci as a mnemonic device to
   facilitate learning in endocrinology… *Advances in Physiology Education,
   38*(2), 140–144. https://doi.org/10.1152/advan.00092.2013
8. Sousa, A. E., Mahdid, Y., Brodeur, M., & Lepage, M. (2021). A feasibility
   study on the use of the Method of Loci for improving episodic memory
   performance in schizophrenia and non-clinical subjects. *Frontiers in
   Psychology, 12*, 612681. https://doi.org/10.3389/fpsyg.2021.612681

Supporting: Paivio's dual-coding literature; Dunlosky et al. (2013),
*Improving students' learning with effective learning techniques* (retrieval
practice & spacing as the backbone MoL supplements).

---

## Appendix A — Starter palace: the real one

Loci as they exist in `src/chamber/hubplace.js` + `src/island.js`, in the
order a walk visits them. Builds join the palace **when restored** — new
loci are literally earned through math:

| # | Locus | Exists | Source |
|---|---|---|---|
| 1 | Gem Tree (banyan) | always | `markers.T` |
| 2 | Shop stand | always | `markers.O` |
| 3 | Egg nest | always | `markers.N` |
| 4 | Mimi's spot | always | `markers.M` |
| 5 | Lanterns | build (30 🍌) | `island.js` `lanterns` |
| 6 | Fruit stand | build (60 🍌) | `fruitstand` |
| 7 | Garden | build (90 🍌) | `garden` |
| 8 | Music stage | build (120 🍌) | `stage` |
| 9–12 | Bakery, pizzeria, bridge, plaza | builds | `bakery`/`pizzeria`/`bridge`/`plaza` |

*(V1.0's list — "Tide Pool Rock", "Banana Garden Entrance", "Sharing
Stump" — named portals and separate world scenes, not hub landmarks.)*

## Appendix B — Sample anchor adoption (Mimi, at the Gem Tree)

> "Psst — the island remembers things if you paint funny pictures on its
> places. See this wobbly gem? Seven times eight. Watch: **five, six,
> seven, eight** — the gems count themselves right up the trunk!
> **56 = 7×8.** Paint it in your head… gems climbing the tree, shouting
> five-six-seven-eight. Got it? Next time that one wobbles, look for the
> tree in your mind first."

## Appendix C — For parents & educators

- It's a game, not homework; sillier images stick better — encourage weird.
- Anchors come **after** understanding: the child earns them by solving the
  fact with the visual model first.
- Short and often beats long and rare: one anchor or one walk per session.
- The skill transfers: "Kun je zo'n plaatje ook maken voor je
  topografie-toets?" — say it out loud; transfer needs the invitation.
