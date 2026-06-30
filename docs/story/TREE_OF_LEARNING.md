# Monkey Grove — The Tree of Learning 🌳

> The **skill-progression layer** that sits *beneath* the seven story chapters: **10 learning
> nodes** and **22 paths**, folded directly out of the 64 hexagrams by the `@yijingjs/core` engine.
> It keeps the 7-chapter narrative spine untouched while carrying the **full** `NL_PO` curriculum —
> including the decimals / % / scale content the four worlds under-served.

Peildatum: juni 2026. Companion to [`README.md`](README.md), [`../03-curriculum.nl.md`](../03-curriculum.nl.md)
and [`../04-64-step-ladder.md`](../04-64-step-ladder.md).

> [!NOTE]
> **On the name.** This structure is historically called the *Tree of Life* (the **sefirot** and the
> 22 paths between them). We use it for one reason only: its **mathematics**. The diagram is, stripped
> of folklore, a clean partition of the 64 binary hexagrams into **10 + 22**, and it happens to be a
> near-perfect skeleton for a maths curriculum. So we keep the fold and **rename every node for what
> it teaches.** No superstition travels into the game — only the shape. The historical names are kept
> in one *provenance* column so the engine mapping stays checkable; nothing else.

---

## 1. The fold — where 10 and 22 come from

The engine's `SefirotPanel` builds this from two functions (`src/utils/tools.js` in `yijingjs`):

```js
categorizeSequencePairs(getSequencePairs(true))
```

1. **Fold 64 → 32 pairs.** Walk the **King Wen sequence** (`YIJING_KINGWEN_SEQUENCE`) and pair
   consecutive entries: `(seq[0],seq[1]), (seq[2],seq[3]), … (seq[62],seq[63])`. The King Wen order
   pairs each hexagram with its inverse/reverse partner, so every pair is a natural "twin."
2. **Split 32 → 10 + 22.** A pair is **balanced** iff *both* its hexagrams are balanced
   (3 yáng / 3 yīn, `yijing_isBalanced`); otherwise **unbalanced**.
   - **10 balanced pairs → the 10 nodes** (the still points — *states of mastery*).
   - **22 unbalanced pairs → the 22 paths** (the in-between, still-leaning states — *the learning you
     do to move between nodes*).

That's the whole idea in one line: **balance = mastery; imbalance = a path you're still walking.**
`10 + 22 = 32` = every twin-pair of the 64. It is exactly the game's thesis (move the island from
gray toward balance) written in the engine's own arithmetic.

> The numbers are not chosen; they fall out. There are precisely 10 balanced King Wen pairs and 22
> unbalanced ones — verified against the vendored engine in [§8](#8-provenance--cross-check).

---

## 2. The 10 nodes — learning points (the climb: **The Whole → Integration**)

Each node is a **balanced** King Wen pair = a *state of consolidated understanding*. They climb the
Tree's **middle/right/left pillars**; read bottom-to-top they are the curriculum's milestones.

| Node | Renamed for what it teaches | Pillar | KW pair (dec) | Curriculum milestone | World |
|:----:|------------------------------|--------|---------------|----------------------|-------|
| **The Whole** | the unit, the manifest island | middle | #63/#64 (42/21) | counting, subitising, "one of what?" (grade 1–2) | hub / 🌊 |
| **Foundation** | number bonds & place value | middle | #59/#60 (19/50) | splits of 10, tens & ones (grade 2–3) | 🌊 |
| **Procedure** | +/− structure & strategy | left | #55/#56 (44/13) | formal +/−, bridging, compensating (grade 3–4) | 🌊 |
| **Fluency** | fact automaticity & rhythm | right | #53/#54 (11/52) | tables, skip-count, automaticity (grade 4–5) | 🌱 |
| **Sharing** | division — taking apart fairly | left | #41/#42 (49/35) | ÷, fair shares, remainder (grade 4–6) | 🥥 |
| **Growth** | multiplication — building up | right | #31/#32 (14/28) | × as array, distributive (grade 4–5) | 🌱 |
| **Balance** | fractions & magnitude (the centre) | middle | #47/#48 (22/26) | fraction sense = `yijing_balance` (grade 6) | 🍇 |
| **Precision** | decimals & deep place value | left | #21/#22 (37/41) | tenths/hundredths, the parts between (grade 5–7) | 🍇 / business |
| **Proportion** | ratio, %, scale | right | #17/#18 (38/25) | verhoudingen, relationships (grade 7–8) | business |
| **Integration** | mastery, balance-as-practice (1S) | middle | #11/#12 (56/7) | all operations woven, VO-ready (grade 8) | Altar / finale |

> [!IMPORTANT]
> **"The Whole" is the founding hexagram.** The bottom node (historically *Malkuth*, the manifest
> kingdom) is King Wen #63/#64 = decimals **42 / 21** = **After Completion / Before Completion** — the
> two woven cosmic roots, i.e. the story's [`FOUNDING_HEXAGRAM`](../../src/story/constants.js) and its
> inverse. The restored island *is* the bottom of the Tree. The child climbs from the whole they can
> touch toward the whole they can reason about.

**The pillars are the curriculum.** The secular reading exposes the structure the old names hid:

- **Middle pillar — the number-sense spine:** The Whole → Foundation → Balance → Integration
  (unit → place value → fractions → mastery).
- **Right pillar — building up:** Fluency → Growth → Proportion (facts → × → scale). This is the
  Wǔxíng **generating** cycle of [Chapter 04](CHAPTER_04.md): `+` grows into `×`.
- **Left pillar — breaking down:** Procedure → Sharing → Precision (+/− → ÷ → decimals). This is the
  Wǔxíng **overcoming** cycle: `÷` undoes `×`. The **Growth↔Sharing** rung *is* the ×↔÷ inverse pair.

Two ancient diagrams (the Tree and the Five Phases) agree on the same maths — that arithmetic builds
up one side and breaks down the other, meeting at balance. We keep the agreement and drop the mystique.

---

## 3. The 22 paths — the skill-clusters (each bridges two nodes)

Each path is an **unbalanced** King Wen pair = *the practice that carries you between two nodes*. The
22 paths are where the actual `NL_PO` skills live, and together they cover the **whole** curriculum.
Rows are ordered as the **learning climb** (early grade first); the *engine path #* is the canonical
index in `SefirotPanel`'s `PATHS` array, kept for cross-checking.

| # | Bridges | KW pair | Skill cluster | Ladder steps (doc 04) | Grade | Domain |
|:-:|---------|:-------:|---------------|:---------------------:|:-----:|--------|
| 22 | Foundation–The Whole | 61/62 | counting, splits of 10, the unit | 0–9 | 1–2 | GETALLEN |
| 21 | Procedure–The Whole | 57/58 | +/− to 20, missing addend, strategy | 10–11, 17–20 | 3 | GETALLEN |
| 19 | Fluency–The Whole | 49/50 | tables ×2,5,10,3,4 → intro × | 22, 27–29 | 4 | GETALLEN |
| 20 | Procedure–Foundation | 51/52 | +/− to 100 & to 1.000 (column) | 24–26, 32–34 | 4–5 | GETALLEN |
| 18 | Fluency–Foundation | 45/46 | tables ×6–9, skip-count fluency | 35 | 4–5 | GETALLEN |
| 17 | Fluency–Procedure | 43/44 | **all-tables automaticity** (maintenance) | 41 | 5 | GETALLEN |
| 11 | Growth–Fluency | 27/28 | multi-digit × (area model) | 37, 42 | 5–7 | GETALLEN |
| 9 | Growth–Sharing | 23/24 | **inverse ×÷ / missing factor** (fact families) | 21, 30, 43 | 5–6 | GETALLEN |
| 13 | Sharing–Procedure | 33/34 | ÷ facts, short/long division | 30 | 5–6 | GETALLEN |
| 16 | Balance–Foundation | 39/40 | fraction magnitude & compare (**1/8 vs 1/4 trap**) | 38, 45–46 | 5–6 | VERHOUDINGEN |
| 12 | Sharing–Balance | 29/30 | division **with remainder** | 42 | 6 | GETALLEN |
| 15 | Balance–Procedure | 37/38 | fraction notation (teller/noemer), on the line | 45 | 6 | VERHOUDINGEN |
| 8 | Precision–Balance | 19/20 | **decimals** on the line, compare (**0,4 vs 0,12 trap**) | 44 | 6 | GETALLEN |
| 14 | Balance–Fluency | 35/36 | fraction **equivalence** (½=2/4=3/6) | 46, 50–51 | 6–7 | VERHOUDINGEN |
| 10 | Growth–Balance | 25/26 | fraction **of** a quantity (¾ of 24) | 47 | 6–7 | VERHOUDINGEN |
| 6 | Proportion–Balance | 13/14 | **percent of a quantity** (25% of €80) | 52–53 | 7 | VERHOUDINGEN |
| 4 | Proportion–Precision | 7/8 | **fraction ↔ decimal ↔ % conversion** | 50 | 7–8 | VERHOUDINGEN |
| 7 | Precision–Sharing | 15/16 | **decimal ÷**, ÷ by 10/100/1000 | 58 | 7–8 | GETALLEN |
| 5 | Proportion–Growth | 9/10 | **scale & enlargement** (1:100; lineair ×2 → opp. ×4) | 54, 63 | 7–8 | VERHOUDINGEN |
| 3 | Integration–Balance | 5/6 | estimation & "does this make sense?" meta-check | 34, 49 | 7–8 | GETALLEN |
| 2 | Integration–Precision | 3/4 | big numbers (miljoen/miljard), standard form | 40, 48, 56 | 8 | GETALLEN |
| 1 | Integration–Proportion | 1/2 | **% advanced** (>100%, back-calculate), proportion | 62 | 8 | VERHOUDINGEN |

---

## 4. How the seven chapters light the Tree

The 7-chapter spine is **unchanged**. Each chapter simply *illuminates a region of the Tree* as its
world blooms — the narrative is the journey; the Tree is the map of what was learned.

| Chapter | Lights nodes | Lights paths | Region |
|---------|--------------|--------------|--------|
| **00 The One** | The Whole | — | the manifest base (placement) |
| **01 Two Modes** 🌊 | Foundation, Procedure | 22, 21, 20 | middle/left base (+/−) |
| **02 Four Images** | *(map reveal)* | — | the four pillars made visible |
| **03 Eight Friends** 🌱 | Fluency, Growth | 19, 18, 17, 11 | right pillar (×, fluency) |
| **04 Five Phases** 🥥 | Sharing | 9, 13, 12 | left pillar (÷, inverse) |
| **05 Sixty-Four** 🍇 | Balance | 16, 15, 8, 14, 10 | the centre (fractions) + opens the business climb |
| **06 Four Roots** 🎪 | Precision, Proportion, **Integration** | 7, 6, 4, 5, 3, 2, 1 | the ascent to mastery (1S) |

The **business climb** (Precision → Proportion → Integration, paths 1–8) is opened by Chapter 05's
bakery and completed across Chapter 06's mixed-review finale — which is where the grade 7–8 decimals,
%, and scale content finally gets a real home (see §5). No new chapter is needed; the Tree gives the
upper-grade content a place to *live* without breaking the six-line founding hexagram.

---

## 5. How this closes the curriculum gaps

The four worlds (the 18 shipped `mathengine.js` skills) cover Getallen + fractions. The Tree adds the
rest of `NL_PO` as dedicated paths, so an older starter (grade 7–8) has level-appropriate work:

- **Decimals** → paths **8** (compare, the 0,4-vs-0,12 trap), **7** (decimal ÷), **4** (↔ fraction/%),
  **2** (big-number place value). *Previously: no engine skill at all.*
- **Percent** → paths **6** (% of a quantity), **1** (advanced %, back-calculation). *Previously: a
  passing bakery mention.*
- **Scale / proportion** → path **5** (scale & enlargement, the lineair-×2 → opp-×4 reasoning).
- **Estimation / number-sense meta-check** → path **3**.

These six upper paths all sit on the climb toward **Integration** (1S), exactly where the curriculum
puts them. **Meten/Meetkunde and Verbanden remain out of scope** — consistent with docs 03/04, which
mark them "not yet playable / contextual." When they become playable they extend the Tree's upper-left
region; the structure already has room.

---

## 6. Walking the Tree — the two orders are already in the engine

[Chapter 05](CHAPTER_05.md) ships both traversal orders, and they map onto the Tree directly:

- **King Wen order** (`YIJING_KINGWEN_SEQUENCE`) — the order this very fold is built from; the
  *curriculum* walk, node by node, the way a teacher sequences it. → `mathengine.js` strict targeting.
- **Gray-code order** (`YIJING_GRAYCODE_SEQUENCE`) — every step changes one line; the *adaptive,
  gentle* walk, one knob harder at a time (`yijing_neighbors`). → the soft difficulty ramp.

Placement/compaction (doc 04 §4) is "enter the Tree at your frontier node and confirm the paths below
it": a grade-8 starter confirms the lower paths fast (~85–90% confirm target) and does real practice
(~65%) only on the paths that are actually loose. The Tree is the same for everyone; only the **entry
node** and the **walk speed** differ — the doc-04 promise, drawn as a graph.

---

## 7. Child-facing & anti-anxiety notes

- **The Tree is a parent/design map, not child UI.** Node names ("Balance", "Growth") are design
  vocabulary for the **parent dashboard's coverage view**; the child still hears only the story words
  ("the One, the Eight Friends, the Great Grid, the Balance"). The historical sefirot names never
  appear anywhere in the product — author docs only.
- **Imbalance is not failure.** A child living on a path (an "unbalanced" pair) is *mid-learning*, by
  design — the whole game says balance is something you keep choosing, not a trophy ([Chapter 06](CHAPTER_06.md)).
  The Tree makes that literal: you are *always* on a path toward a node, and that is the healthy state.
- **No path is missable.** Both engine orders visit every path; the Tree only ever lights up, never
  dims to lock you out (`flags.portalStages` only rise).

---

## 8. Provenance & cross-check

The 10/22 partition and every pair in §2–§3 are **computed**, not hand-assigned — reproduce them from
the vendored engine:

```js
import * as y from '../../src/yijing/yijing.js';
const seq = y.YIJING_KINGWEN_SEQUENCE;
const balanced = [], unbalanced = [];
for (let i = 0; i < 64; i += 2) {
  const a = seq[i], b = seq[i + 1];
  (y.yijing_isBalanced(a) && y.yijing_isBalanced(b) ? balanced : unbalanced).push([a, b]);
}
// balanced.length === 10  → the nodes (§2, King Wen order)
// unbalanced.length === 22 → the paths (§3, engine PATHS-array order)
```

The node/path *adjacency* (`NODES`, `PATHS`) is the Tree-of-Life graph from `yijingjs`'s
`SefirotPanel.jsx`. The **renaming** (node → what it teaches) and the **path → skill-cluster** mapping
are this document's contribution; the underlying fold is the engine's. If a future `src/story/`
data file encodes this layer, cross-check `balanced.length === 10`, `unbalanced.length === 22`, and
`balanced[9]` (The Whole) `=== [42, 21]` in a test, the way [`constants.js`](../../src/story/constants.js)
is checked in `tests/story.test.mjs` — so the Tree can never silently drift from the engine.

---

*Design synthesis for Monkey Grove `NL_PO`. The narrative spine is the seven chapters; the Tree of
Learning is the skill map beneath them, folded from the 64 hexagrams and named for the mathematics it
teaches. Peildatum: juni 2026.*
