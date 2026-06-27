# CHAPTER 05 — The Sixty-Four Changes

### *Guà* — the Great Grid · the number `64`

> *Stand any one of the eight friends on top of any other and you have a change — a hexagram. Eight
> friends, eight friends: sixty-four changes, the whole weather of the world. And the smallest of
> them are smaller than one.*

---

## 🍇 Cold open — the vines that hang between the numbers

The last sleepy world is the highest: the **Vine Heights**, where long vines swing out over the valley
like the strings of an instrument, each one a number line `0 … 1`. And the Heights are gray in the
strangest way — not empty, but *blurred*, as if all the numbers *between* the whole numbers have gone
soft and can't decide where to sit.

A piglet named **Mo** is up there with a pie, trying to cut it into fair slices and getting halves and
thirds tangled, flour everywhere.

> **Mo:** "Half a pie, third of a pie, three-quarters — they're all *less than one whole pie* but
> they're not *nothing*, and I can't — where do they even *go*?" *(holds up a slice forlornly)* "This
> is two-thirds. Is that more than a half or less? I used to *know.*"

You ring the gong on the `0…1` vine and stand at **¾**, and the blur sharpens into a tick. Mo gasps.
And high above, at the very crown of the **Banyan Gem Tree**, something enormous and golden shifts in
its sleep for the first time since you arrived.

---

## ☯ The pattern — `64`, the Great Grid

This is the leap the whole Book has been building toward. Stack **any trigram on any trigram** —
upper friend over lower friend — and you get a **hexagram**, a six-line *change*. Eight choices on
top, eight on the bottom:

> **8 × 8 = 64.** The full deck. Every change there is.

```
        the 64 changes = an 8 × 8 grid
                    lower trigram →
              ☰  ☱  ☲  ☳  ☴  ☵  ☶  ☷
          ☰ ䷀  ䷹  ䷌  ䷘  ䷫  ䷅  ䷠  ䷈
   upper  ☱ ䷪  ䷹  …
   trigram☲ ䷲      …                       64 cells
     ↓    …             every (upper, lower) pair
              one cell = one hexagram = one change
```

This is the deepest math-joke in the Book and the most important one in the game: **the leap from 8
to 64 is a multiplication table.** The 64 hexagrams *are* the 8×8 grid of all pairings — which is the
same shape as the **Banyan Gem Tree** (`screens/gems.js`), the times-table mosaic that is *already*
the game's progress dashboard. The Gem Tree was a hexagram chart all along: every fact a cell, every
cell a change.

And **counting the changes is combinatorics:** *how many ways can you pair eight friends with eight
friends?* Sixty-four. Multiplication is **counting the cells of a grid** — the same idea, whether the
cells hold bananas or hexagrams.

---

## 🧮 The mathematics — fractions, magnitude first

The `vines` ladder from [`mathengine.js`](../../src/mathengine.js) — and the hardest, most
anxiety-prone band of the `NL_PO` `ratios` domain, taught the research-backed way (magnitude *before*
rules — `docs/01-learn.md`):

| Skill | What it is | The Heights image |
|-------|------------|-------------------|
| `frac_magnitude` | where a fraction *sits* (denoms widen 2,4 → 3,6,8 → 5,10,12) | stand at ¾ on the `0…1` vine |
| `frac_compare` | which is bigger | two vines side by side |
| `frac_equiv` | `½ = 2⁄4 = 3⁄6` | different cuts, same height |
| `frac_of_n` | `¾ of 24` | a fraction *of* a basket — ÷ then × |

### Fractions are balance, and `yijingjs` already computes it

Here is the cleanest correspondence in the whole story. `yijing_balance()` returns **yáng-lines ÷ 6**
— a number from `0` to `1`. **That is a fraction.** A hexagram's balance *is* its position on the
`0…1` vine:

| Hexagram | yáng lines | `yijing_balance()` | On the vine |
|----------|:----------:|:------------------:|-------------|
| ䷁ all yīn | 0 / 6 | `0.0` | the far-left post (the gray island!) |
| three yáng | 3 / 6 | `0.5` | dead centre — **½** |
| ䷀ all yáng | 6 / 6 | `1.0` | the far-right post |

And **equivalent fractions are hexagrams with the same balance.** `3⁄6` and `½` both sit at `0.5` —
just as many *different* hexagrams (different patterns of lines) share a yáng-count and so share a
balance. `frac_equiv` is "find another change that hangs at the same height." `frac_compare` is "which
change hangs higher." The Book's balance metric and the child's fraction sense are **the same
measurement.**

> **Sacred tool — the Compass of Ratios** (the user's named artifact). Equip it and a light-beam
> projects the **relative size** of any two quantities in the overworld — half a coconut beside a
> whole one, ⅔ of a vine beside ¾. Magnitude you can *see at a distance*, the exact intuition
> fractions need. (It is, not coincidentally, a **bāguà compass** — the Later-Heaven ring from
> [`bagua.js`](https://github.com/jklarenbeek/yijingjs/blob/master/packages/core/src/bagua.js).)

---

## 🗺️ Two ways to walk the whole grid

With all 64 cells in play, the game finally needs an *order* to walk them in — and `yijingjs` ships
**two**, which map exactly onto the game's two pacing modes:

- **The King Wen sequence** (`YIJING_KINGWEN_SEQUENCE`) — the traditional, *curriculum* order; the
  `NL_PO` ladder, stage by stage, the order a teacher would choose. This is **strict targeting**
  (`mathengine.js` `allowedSkills`): walk the grid the way the school walks it.
- **The Gray-code sequence** (`YIJING_GRAYCODE_SEQUENCE`) — every step changes **one line**, a
  Hamiltonian path through all 64 with no jumps ever. This is the **soft, adaptive ramp**: the kindest
  possible walk, one knob at a time, `yijing_neighbors()` all the way through. Same 64 cells, gentler
  road.

The child never picks "King Wen" or "Gray code." The engine picks the road; the design just made sure
*both roads visit every cell.* Nothing in the grid is missable (`island.js`: choices sequence, never
exclude).

---

## 🌉 The bridge is built — Act III

This is the enrichment doc's **Act III**. With four worlds blooming and the Gem Tree filling, Mimi
finally dreams up the blueprint that matters: **the bridge to the islet** (`island.js`, the 200🍌
build that opens the festival islet). Building it shifts the math engine into **mixed review** — the
**Echo Doors** (`yijing_invert()` shadow rooms) now pull your weakest *stale* skill across all four
worlds, the spaced retrieval that After Completion will demand you never stop doing.

And building it is a choice *toward* the Crab King, not against him. You're not laying siege. You're
laying a road to someone who forgot how to be visited.

---

## 👥 Companions & characters

- **Mo the Piglet — Lí ☲ (Fire).** Opens the **bakery** (`business/`): the pizzeria/ratio sim where
  fractions become slices, recipes, and fair portions — fractions you can *eat*. Fire shared evenly is
  exactly what a pie is.
- **Rin the Red Panda — Gèn ☶ (Mountain).** Returns as the friend of *magnitude*: hold still, measure,
  see how big a thing really is before you judge it. The cure for whole-number bias (`1⁄8 > 1⁄3
  "because 8 > 3"`) is Mountain stillness — look at where it actually sits.
- **The Dragon — Qián ☰ (Heaven), stirring.** As the 64th cell of the Gem Tree lights, the eighth
  Friend — the legendary one, asleep at the crown since Chapter 03 — finally begins to wake. The grid
  is nearly full enough to hold the whole sky.
- **Mimi — almost whole.** No longer apologizing, not yet at peace. She stands on the half-built
  bridge looking at the islet and says the thing the whole game has been walking toward.

> **Mimi:** "I get it now. He didn't take the numbers because he's mean. He took them because the last
> time the grove learned to count, it learned to *leave.*" *(she sets the last bridge plank)* "So
> let's learn to count *back.* Let's make the numbers the reason somebody finally comes to *visit.*"

---

## 🌀 Heritage threads

- **Zelda — Act III:** the bridge, the shift to mixed review, the approach to the antagonist's
  domain — the Master Sword arc turning toward confrontation-as-understanding.
- **King's Valley II (1988):** the Great Grid is the full map of every chamber in every pyramid;
  **passwords** that jumped you between pyramids are our **challenge codes** (`duel.js`) — a short
  code that reproduces any run. The grid is the game's whole topology, finally visible.
- **The bakery** turns the abstract `ratios` domain into the warm, social business sim — Konami's
  charm tradition (the happy monkey dances of Monkey Academy) grown into a whole cozy shop.

---

## ✍️ The line is drawn — **line 5, Yáng `⚊` — the ruler line**

Fill enough of the Great Grid and the Tide Stone presses the **fifth** line — **yáng** — the **ruler
line**, the middle of the upper trigram, the Book's traditional seat of mastery (Qián's "flying dragon
in the heavens"). This is the high point of the climb.

```
   ⚋   line 6
   ⚊   line 5   ← NEW. Yáng. The ruler line. Mastery. ──┐
   ⚋   line 4                                            │ upper trigram filling: Kǎn ☵ Water
   ⚊   line 3   ──────────────────────────────────────┐ │
   ⚋   line 2                                          │ │ lower: Lí ☲ Fire (complete)
   ⚊   line 1   ──────────────────────────────────────┘ │
```

Five lines lit, one dark. The Altar's needle hovers a hair from even. The whole grid glows. And the
Book whispers its warning, the one the finale turns on: *the flying dragon is glorious — and the very
next line, the top line, is where the dragon that climbs too high and grabs too much comes to grief.*
The last line must not be a sixth grab. **It must be a letting-go.**

---

## 🛡️ Anti-anxiety & pedagogy notes

- **Magnitude before rules** — the single most effective fraction intervention (`docs/01-learn.md`);
  the vine *is* the number line the research begs for.
- **Equivalence shown as "same height,"** not as a cross-multiplication trick — the balance metric
  makes `½ = 3⁄6` *visible*.
- **Whole-number bias** is targeted directly by misconception-tagged distractors (`whole_number_bias`)
  and Mountain-stillness magnitude checks.
- **Mastery language stays humble:** "the ruler line" is glory, but the very chapter sets up that
  glory isn't the goal — balance is. We celebrate understanding, and warn, gently, against the grab.

---

## 🌍 Localization (EN / NL)

| Author term | Child-facing EN | Child-facing NL |
|-------------|-----------------|-----------------|
| Guà / the 64 changes | the **Great Grid** | het **Grote Raster** |
| balance / fraction-on-the-vine | **how high it hangs** | **hoe hoog het hangt** |
| Compass of Ratios | the **Size Compass** | het **Maatkompas** |
| equivalent fractions | "hang at the **same height**" | "hangen **even hoog**" |

---

## → Next

Five lines lit, the bridge built, the Dragon waking, and one dark line left at the very top. Across
the bridge, on the lonely islet, the Crab King is sitting on a hoard of light he has never once been
able to use. It's time to find out what completion really costs — and that the last line is not a
grab, but a hand held out.

**[CHAPTER 06 — The Four Roots →](CHAPTER_06.md)**
