# CHAPTER 03 — The Eight Friends

### *Bāguà* — the family of eight · the number `8`

> *Split the Four once more and you have a family: a mother, a father, and their six children, each
> one a little weather. Eight friends. Eight ways the wind can blow through a grove.*

---

## 🌱 Cold open — the garden that grows in rows

The **Banana Garden** is the loudest waking yet. Where the Tide Pools whispered, the Garden *erupts*
— vines unrolling, soil tilling itself, sprouts popping in tidy lines like they've been waiting for a
cue. Because they have. Bananas don't grow in heaps. **Bananas grow in rows.**

A red panda named **Rin** is already there with a wheelbarrow, trying to plant in a heap, getting
nowhere, deeply embarrassed.

> **Rin:** "I *know* it's supposed to be rows. I just — I can't remember how many in each. The number
> that told us is gone." *(sets the wheelbarrow down)* "...You're the one bringing them back, aren't
> you. The caretaker." *(small bow)* "Then maybe you can wake the others. There's supposed to be
> eight of us. A whole family. I'm the only one who remembered to show up."

---

## ☯ The pattern — `8`, the Eight Trigrams

Take each of the Four Images and stack **one more line** on top — yáng or yīn — and the Four become
**Eight.** Three lines each. This is the third doubling: **4 → 8 = 2³**, and three stacked lines is
exactly a **trigram** — a *Guà*. There are eight of them, and the Yijing has always called them a
**family**:

```
            ☯  →  ⚊⚋ (2)  →  Four Images (4)  →  ☰☱☲☳☴☵☶☷  Eight Trigrams (8)
                                                    2³ = 8
```

| Trigram | Glyph | The Friend | Element | Weather / temperament |
|---------|:-----:|------------|---------|------------------------|
| **Qián** Heaven | ☰ | **Dragon** *(still sleeping)* | Metal | the Creative — the whole sky |
| **Kūn** Earth | ☷ | **Tuk** the Turtle | Earth | the Receptive — the patient ground |
| **Zhèn** Thunder | ☳ | **Kiki** the Kitten | Wood | the Arousing — the spark, the beat |
| **Kǎn** Water | ☵ | **Dot** the Duckling | Water | the Flowing — the deep, the line |
| **Gèn** Mountain | ☶ | **Rin** the Red Panda | Earth | the Still — hold, then count |
| **Xùn** Wind | ☴ | **Olli** the Owl | Wood | the Gentle — strategy, estimation |
| **Lí** Fire | ☲ | **Mo** the Piglet | Fire | the Clinging — warmth, shared evenly |
| **Duì** Lake | ☱ | **Pip** the Bunny | Metal | the Joyous — the glad surprise |

These are the eight companions already in [`src/mesh/`](../../src/mesh/) — now revealed as what they
always were: the **eight three-line figures**, the family the whole rest of the Book is built from.
Wake them, and you have the alphabet of every change to come. (Seven wake here. The eighth, the
**Dragon ☰**, sleeps at the Gem Tree's crown until the island can hold that much light —
[Chapter 06](CHAPTER_06.md).)

---

## 🧮 The mathematics — multiplication, the great doubling

`8 = 2 × 2 × 2`. The number of this chapter is **doubling three times**, so this is where the Garden
teaches **multiplication** — the `garden` ladder from [`mathengine.js`](../../src/mathengine.js):

| Skill | What it is | The Garden image |
|-------|------------|------------------|
| `tables_a` | ×2, ×5, ×10 | the easy rows — beans, hands, fingers |
| `tables_b` | ×3, ×4, ×6 | the middle beds |
| `tables_c` | ×7, ×8, ×9 | the deep rows (the famously sticky ones) |
| `tables_mix` | all tables, interleaved | the whole garden at once |
| `mult_2digit` | 1 × 2-digit, partial products | the big plots, split into patches |

**Multiplication is just rows × columns — an array you can stand in.** The Garden's signature verb
makes that literal:

- **Array verb** (`verbs.js`): walk onto a soil patch and **grow a glowing `r × c` bed**; drag the
  edges to extend it; watch the sprouts pop. For big beds, **distributive splits** break a hard plot
  into easy patches (`7×8 = 7×4 + 7×4`). It's **constructed response — guessing is impossible.** You
  don't *pick* an answer; you *build* the quantity, so there's nothing to be wrong-anxious about.

### Two transformations bloom here

- **`yijing_opposite()` — swap the upper and lower trigram = commutativity.** On the **Banyan Gem
  Tree**, lighting the fact `7×8` *automatically lights its twin* `8×7` — because a hexagram and its
  opposite are the same two trigrams in the other order, just as `7×8` and `8×7` are the same array
  turned sideways. The child earns *two* gems for *one* insight. The aha is built into the geometry.
- **`yijing_reverse()` — mirror the line order = read the array both ways.** Turn the bed a quarter
  turn: `3 rows of 4` is `4 rows of 3`. Same bananas. The mirror proves it.

> [!NOTE]
> **The eight trigrams form a circle — a multiplication wheel.** The classical *Bāguà* arrangements
> (Earlier Heaven, Later Heaven — both in [`bagua.js`](https://github.com/jklarenbeek/yijingjs/blob/master/packages/core/src/bagua.js))
> lay the Eight around a ring. The Garden borrows the picture: the eight times-table families arranged
> as a wheel of beds, neighbors one step (one line) apart — the Gray-code ramp again, now growing
> things.

---

## 🪝 Sacred tool — the Hookshot of Arrays

The user's **Zelda Pillar #5 (Earning the Sacred Tools)**: complete the first Garden milestone and
earn the **Hookshot of Arrays**. Target a soil patch from across the field and *zip* to it, **planting
a whole row or column in one pull.** Like every Zelda tool it recontextualizes the world — suddenly
you see the overworld in rows and columns, estimating `6 × 4` plots at a glance. The tool *makes you
feel the multiplication in your hands*, which is the entire point of a Zelda item.

---

## 👥 Companions & characters — the family assembles

- **The Eight wake** (seven of them) as you clear Garden chambers — each pops into the hub with
  confetti and a small *living* perk, the ACNH build beats from [`island.js`](../../src/island.js):
  **Rin** opens the fruit stand (+🍌/day), **Kiki** raises the music stage (a tappable gong — Thunder
  ☳, the *beat* you skip-count to), and the rest drift in to tend their beds.
- **Mimi — Phase 2 (she opens up).** This is the user's **Zelda Pillar #3** payoff. Watching the
  family come back, Mimi finally tells you the real story: *she* grew up here when math was a game,
  and somewhere along the way she got something wrong in front of everyone, and the laughing made the
  numbers feel sharp, and she stopped trusting herself — and she's been quietly afraid of the chambers
  this whole time. She's not just your guide who had a bad day. She's a kid who got math-anxious too,
  and never told anyone.

> **Mimi:** "I used to *love* the rows. Seven rows of eight, eight rows of seven, same bananas — I
> thought that was the best secret in the world." *(a long pause)* "Then I forgot one, out loud, and
> everybody laughed, and after that the numbers just… stopped being friends." *(she watches you grow a
> 7×8 bed)* "...Huh. They still do the twin thing. The Tree still remembers even when I don't."

---

## 🌀 Heritage threads

- **Zelda — Pillar #5 (Sacred Tools):** the Hookshot of Arrays, earned not given, reshaping how you
  read the whole grove.
- **Zelda — Pillar #3 (Companion Arc):** Mimi's vulnerability lands here. A guide who admits *she*
  finds it hard is the most validating thing a struggling child can hear.
- **The Bāguà family** itself: father/mother/three sons/three daughters, the oldest character system
  in the Book, repurposed as the cast Monkey Grove already shipped.

---

## ✍️ The line is drawn — **line 3, Yáng `⚊` — the Fire trigram completes**

Bloom the Garden and the Tide Stone presses the **third** line — **yáng** — and with it the bottom
three lines are done. Read them bottom-to-top: `⚊ ⚋ ⚊` = **Lí ☲, Fire.**

```
   ⚋   line 6
   ⚋   line 5
   ⚋   line 4
   ⚊   line 3   ← NEW. Yáng. ───┐
   ⚋   line 2                   │  LOWER TRIGRAM COMPLETE:  Lí ☲  (Fire / Light / Clarity)
   ⚊   line 1   ───────────────┘
```

**The light-half of the island is lit.** The lower trigram is *Fire* — clarity, illumination,
"the clinging" — and that is exactly what the first three chapters built: the grove can *see* itself
again, the four directions lit, the family home, the tables clicking on like lamps.

But a fire that only ever rises burns out. The upper trigram — the next three chapters — is **Water**:
the deep, the share, the cool that completes the flame. To finish the work the light has to learn to
*give itself away.* That road starts at the Sharing Stump.

---

## 🛡️ Anti-anxiety & pedagogy notes

- **Arrays make multiplication *visible*** — "you can SEE the sevens now" — the celebration language
  the design mandates (`DESIGN.md`), never speed or rank.
- **Constructed response removes guess-anxiety:** you build the quantity; there's no multiple-choice
  trap to fear.
- **Commutativity as a free gift:** every earned fact lights its twin on the Gem Tree — half the
  table is *given* the moment the other half is learned. Mastery feels generous.
- **Mimi modeling recovery** is the pedagogy: naming math-anxiety out loud, from a beloved character,
  is the anti-anxiety thesis of the whole game made into a scene.

---

## 🌍 Localization (EN / NL)

| Author term | Child-facing EN | Child-facing NL |
|-------------|-----------------|-----------------|
| Bāguà / Eight Trigrams | the **Eight Friends** | de **Acht Vrienden** |
| Lí ☲ (lower trigram) | the **Light half** | de **Lichthelft** |
| Hookshot of Arrays | the **Row-Hook** | de **Rijhaak** |
| commutativity / the twin | "the **twin** lights up too" | "de **tweeling** licht ook op" |

---

## → Next

The light-half is lit. Now the grove has to learn the harder, kinder thing: not how to *grow* a pile,
but how to **share** it — fairly, with leftovers and all. The doubling stops here; the next number
isn't 16. It's **five**, and it turns in a wheel.

**[CHAPTER 04 — The Five Phases →](CHAPTER_04.md)**
