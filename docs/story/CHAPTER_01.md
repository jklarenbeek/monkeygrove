# CHAPTER 01 — The Two Modes

### *Yīn · Yáng* — in & out · the number `2`

> *The first thing the One ever did was breathe. Out, then in. The tide taught the island to count
> to two before it could count to anything else.*

---

## 🌊 Cold open — where the water remembers

Mimi takes you down to the **Tide Pools**, the lowest, oldest corner of the grove, and it is the
saddest gray of all — because the tide pools have *stopped*. No in, no out. Just flat, dim,
held-breath water, and the smell of a beach that forgot what to do.

A small **gray duckling** sits at the edge of the dead water, staring at where the tide line used to
be. This is **Dot.** When the numbers were stolen, the water forgot how to move, and Dot forgot what
she was *for*.

> **Mimi:** "...This is my fault, isn't it. The Altar. I let you solve the puzzle. I *cheered.*"
> *(she won't look at you)* "Everyone trusted me to mind the grove and I — I turned it gray on your
> first day."

You find the first number stone half-buried in the dry pool: a single **⚊** — one solid, unbroken
mark, glowing faintly gold. The moment you lift it, the water *twitches*. Just an inch. Out, then in.

Dot's head comes up.

---

## ☯ The pattern — `2`, the Two Modes

This is the Yijing's first move, the one every other move is made of. **Tàijí (the One) divides into
the Two Modes: Yáng and Yīn.**

| Mode | Line | The tide | The number sense |
|------|:----:|----------|------------------|
| **Yáng** | `⚊` (unbroken) | the tide **rising** — building, adding, filling | `+` / `1` / more / a whole step |
| **Yīn** | `⚋` (broken) | the tide **falling** — emptying, taking, the gap | `−` / `0` / less / a space |

They are **not enemies.** A tide that only rose would drown the grove; a tide that only fell would
leave it a desert. The water is alive *because it does both* — `out, in, out, in` — and that rhythm
**is** the number two. From here on, **every number on the island is built out of these two marks**:
solid step or gap, light or dark, yáng or yīn. (The child never hears "binary." The child hears: *you
can make any number out of two simple choices, over and over.*)

```
        Tàijí ☯  →  ⚊  Yáng  (rising / +)
                    ⚋  Yīn   (falling / −)
                                          2¹ = 2
```

> [!NOTE]
> **Addition and subtraction are the original yīn-yáng pair** — the first **inverse operations**, two
> faces of one motion. That is why they share a world. The research (`docs/01-learn.md`) wants
> `+`/`−` taught *together*, as one reversible idea, not two separate skills — exactly how the tide
> teaches it.

---

## 🧮 The mathematics — Tide Pools

This chapter is the `tide` skill ladder from [`mathengine.js`](../../src/mathengine.js), top to
bottom of the `NL_PO` `operations` domain, early stages:

| Skill | What it is | The tide-image |
|-------|------------|----------------|
| `add_20` | addition to 20 | the rising tide, small |
| `sub_20` | subtraction to 20 | the falling tide, small |
| `missing_addend` | `7 + ? = 10` | **the hidden line** — find the gap that completes the whole |
| `add_100` (carry knob) | bigger sums, regrouping | the spring tide, bigger swing |
| `sub_100` | bigger differences | the neap tide |

**The transformation this world teaches is `yijing_invert()` — the complement.** To flip a line is
to ask *what's missing to make the whole.* That is precisely **missing-addend** and **subtraction**:

> `7 + ? = 10` → the pool is filled to **7**; how much more tide makes a full **10**?
> Flip it (`yijing_invert`) and it's `10 − 7 = 3`. Same truth, read from the other side of the water.

The child *feels* `+` and `−` as one reversible thing — the falling tide is just the rising tide
read backwards. **Whole-first, then the missing part** — the unit-sense from Chapter 00 paying off
immediately.

---

## 🎮 In the grove — the verbs and the Tide Stone

- **World:** 🌊 Tide Pools (`config.js` sea-blue accent).
- **Base verb — Fetch:** four number stones rest on pedestals and under smashable pots, their values
  **misconception-tagged** (`addsub_confuse`, `no_carry`, `reversed`). Compute first, carry the right
  stone to the golden Altar shard. *(This is Monkey Academy's whole game, kept intact: find the number,
  carry it to the helper.)*
- **Signature verb — Number Line:** Dot's gift. A vine-bridge stretched `0…10` (later `0…20`, `0…100`)
  across the pool. Stand where the answer lives and ring the gong. **Overshoot = a friendly splash**,
  and the tick-marks fade in to help (the model materializes; never a buzzer). Tolerance scales with
  your rating — magnitude sense first, precision later.
- **Sacred tool — the Tide Stone:** the first artifact. It is the **line-drawer**: when a chamber is
  cleared, the Tide Stone presses one glowing line — yáng or yīn — into the Altar's frame. The child
  learns the tool *makes marks*; the author knows it writes hexagram lines.

**Gentle ramp = the tide steps one at a time.** Each new problem is **one knob harder** than the last,
never a cliff — which is exactly `yijing_neighbors()`, the Gray-code step that changes a *single*
line. The kindest pacing in the research and the deepest law of the Book are the same rule:
**change one line at a time.**

---

## 👥 Companions & characters

- **Dot the Duckling — Kǎn ☵ (Water, the Flowing, the deep).** `010`. The first of the **Eight
  Friends** to wake. Dot is the friend of the **number line** and of *flow* — she shows that numbers
  live in order along a line, that there's always a "between." When you get one right she paddles a
  happy little wake. When you slip, she swims the number line *with* you to the right tick.
- **Mimi — Phase 1 (anxious, self-blaming).** This is the user's **Zelda Pillar #3** beat, opening
  note. Mimi is overwhelmed and defensive; she keeps apologizing; she's sure the other animals will
  never come home. She is *not* a cheerful signpost here — she's a friend having a hard day, which is
  the whole point: *your guide also finds things difficult.* Her conversation ladder (`mimi.js`)
  still surfaces the next useful step first; the *tone* is what's shifted.
- **The Crab King** is not seen — only his sideways tracks in the dry sand, and a single number stone
  he dropped in his hurry (your first recovery). Keep him offstage; he earns his entrance in
  [Chapter 04](CHAPTER_04.md).

---

## 🌀 Heritage threads

- **Zelda — Pillar #3 (Companion Arc), beat 1:** Midna started sharp and self-interested; Mimi starts
  *frightened and guilty.* Same trajectory, kinder cause. The water world is where we plant the seed
  of her growth.
- **Zelda — Pillar #4 (Dual Worlds), seeded:** the dead/flat pool vs. the living/moving pool is the
  first whisper of the light↔gray duality that becomes the **Gray Echo Realm** in
  [Chapter 02](CHAPTER_02.md).
- **Monkey Academy (1984):** the Fetch verb is the 1984 loop, frame for frame — locate the number,
  deliver it. The crab is the same crab. We've just given the water a memory.

---

## ✍️ The line is drawn — **line 1, Yáng `⚊`**

Clear enough Tide-Pool chambers to wake the world (mastery, not speed — same progress points that
bloom the living gate), and the **Tide Stone presses the first line** into the founding hexagram:
the **bottom** line, and it is **yáng** — the first spark of light returning to the gray field.

```
   ⚋   line 6
   ⚋   line 5
   ⚋   line 4
   ⚋   line 3
   ⚋   line 2
   ⚊   line 1   ← NEW. The first distinction. The tide breathes again.   (entropy ticks up)
```

This is the base of the **lower trigram, Lí ☲ (Fire)** — the trigram of *light and clarity*. The
island has its first ember. The Tide Pools flush from gray to blue; Dot's feathers come back yellow;
somewhere up the hill, a single flower remembers it is orange.

> **Mimi:** *(watching the color crawl back into the water)* "...Huh. It worked. It actually—"
> *(a breath)* "Okay. Okay! One down. There's more of these, aren't there. There's a *lot* more of
> these." *(and for the first time since the dock, she almost sounds like herself)*

---

## 🛡️ Anti-anxiety & pedagogy notes

- **Missing-addend is framed as completion, not as a blank you failed to fill.** The pool *wants* to
  reach its line; you find how much more tide it needs. Productive, not punitive.
- **`+`/`−` taught as one reversible motion** (research-aligned), so subtraction never becomes a
  scary separate beast — it's just the tide going the other way.
- **The number line tolerates being roughly right first.** Magnitude before precision; the scaffold
  appears on a miss, fades as mastery grows (`mathengine.js` scaffold levels 0→2).

---

## 🌍 Localization (EN / NL)

| Author term | Child-facing EN | Child-facing NL |
|-------------|-----------------|-----------------|
| Yáng `⚊` / rising | the **rising tide** / a solid step | het **opkomend tij** / een hele stap |
| Yīn `⚋` / falling | the **falling tide** / a gap | het **afgaand tij** / een opening |
| the Two Modes | **in & out** | **eb & vloed** |
| Kǎn (Dot's trigram) | Dot, friend of the **flow** | Dot, vriend van de **stroom** |

---

## → Next

Two modes, two directions of the tide. But Mimi notices something as the color spreads: the light
isn't going *one* way home. It's heading for **four** different corners of the grove at once. Two,
it turns out, has *two faces each.*

**[CHAPTER 02 — The Four Images →](CHAPTER_02.md)**
