# CHAPTER 00 — The One

### *Wújí · Tàijí* — the whole · the number `1`

> *Before there were two, there was one. Before there was one, there was the field that holds it.*
> The Banyan Gem Tree held every number on the island the way a seed holds a forest: all of it,
> folded into a single warm light. Nobody counted, because nothing had been divided yet.

---

## ☀️ Cold open — the grove that was whole

You arrive on the last boat of the warm season, the new caretaker, with a name you chose yourself
and a small friend napping in your hood. The island is *loud* with color. Butterflies stack on the
flowers three deep. The waves come in pentatonic. And in the middle of it all stands the **Banyan
Gem Tree**, so wide its roots make bridges, every leaf holding a fleck of gold that is — somehow —
the *same* fleck of gold, one light wearing a thousand leaves.

Mimi meets you at the dock, walking on her hands because today is that kind of day.

> **Mimi:** "You made it! Okay okay okay — first thing. Before the chambers, before *anything* —
> come meet the Tree. She's the whole reason the grove can do the thing it does."

She leads you up the root-bridges to a flat stone at the Tree's heart: the **Altar of Balance**. It
is a single round dial, perfectly still, perfectly even. In its center floats **one** golden
number — not a *1*, exactly. Just… **One.** The whole. Every banana, every coconut, every share and
every step, still wrapped up together and not yet told apart.

> **Mimi:** "That's everything, that is. Every number the monkeys ever planted with, baked with,
> shared with. It hasn't been *split* yet — so it's just one big happy light. The Tree keeps it
> balanced." *(she taps the even dial)* "See? Flat. Calm. That's how home feels when it's whole."

---

## ☯ The pattern — `1`, the Great Ultimate

The Yijing begins where this chapter begins: with **Wújí** (無極), the limitless field of
not-yet-anything, which gives rise to **Tàijí** (太極), the *Great Ultimate* — the single, whole,
undivided One. Everything that follows in the whole book — the Two, the Four, the Eight, the
Sixty-Four — is just **the One learning to tell itself apart**.

```
        Wújí  ………  the empty field, the blank dial
          │
          ▼
        Tàijí  ☯  the ONE — the Gem Tree's single gold light   (the number 1)
```

The whole island is, right now, **one whole thing** — which in the Book's bookkeeping is the blank
hexagram waiting to be written, the field before any line. There is nothing to count because nothing
has been separated. *This is the most important number in the game, and the child meets it before
any arithmetic at all:* **1 = the whole.** Half *of* one. A third *of* one. Seven groups that
rebuild *one*. Every lesson to come is the One, divided and put back.

> [!NOTE]
> **Why open on "one"?** The research in [`docs/01-learn.md`](../01-learn.md) is blunt: fraction and
> division errors mostly come from a weak sense of **the unit** — *one of what?* So the very first
> beat establishes the whole, warmly and wordlessly, long before we ever cut it.

---

## 🧮 The mathematics — calibration, not instruction

Nothing is "taught" yet. Instead this is **placement**, disguised as Mimi being excited to show you
around. It maps to the existing `placement.js` warm-up and the Explorer setup in
[`DESIGN.md`](../../DESIGN.md):

- Mimi asks for a few **tiny number-quests** ("grab me two coconuts… now one more… how many?"). These
  are the warm-up probes that set the soft difficulty window (`below` / `on_track` / `ahead`).
- The child's **age/curriculum floor** (`NL_PO` → Groep) is the lower bound; the warm-up may open the
  *upper* side of the window, never push below the floor.
- **No score, no label sticks to the child.** The probes calibrate the engine, then dissolve into the
  story. (`mathengine.js` cold-start: the first ~8 problems per world ramp fast — "waking the sleepy
  monkeys.")

The only *concept* on the table is **unity**: this is one whole grove, and your job for the rest of
the game is to keep it whole.

---

## 💥 The Accidental Catalyst — the One is split

Here the story takes the user's **Zelda Pillar #1** (Personal Responsibility) head-on. The dial has a
seam. A puzzle. A pedestal with two cups and a beam between them, begging to be balanced.

> **Mimi:** "Oh — that little puzzle? Caretakers always solve that one on day one, it's tradition,
> it's basically a *welcome mat*—"

You solve it. Of course you solve it; it's easy, it's a warm-up, it *clicks*. And the click is the
sound of the Altar **opening** — the seam splitting the One golden light into a shower of loose
**number stones**, hundreds of them, suddenly separate, suddenly *countable*, suddenly *spillable* —

— and from a tide-pool at the root-line, where he had been hiding from the locked Altar his whole
shy life, the **Crab King** sees his chance.

> **Crab King:** *"...! All loose! All— mine!"*

He scuttles up the root-bridge sideways (he only *goes* sideways), sweeps every last number stone
into the great shell on his back, and is gone over the islet bridge before you can stand up. The
golden light goes out leaf by leaf. The butterflies fold. The waves stop rhyming.

The grove turns **gray.**

> **Mimi:** *(very quiet)* "...That wasn't supposed to happen. That was — that's never— "
> *(she looks at the dark dial, then at you)* "...we have to get them back. We have to."

---

## 🩶 The fall, in the Book's terms — entropy `0`

When the Crab King carried off the numbers he carried off all the **light** — every yáng line. What's
left is **all yīn**: the dark, the still, the receptive *with nothing to receive*. In `yijingjs`
terms the island has collapsed to:

> ### ䷁ Kūn, doubled — `000000` — `yijing_entropy() = 0`, `yijing_balance() = 0`

Pure yīn is not evil. **Kūn is Earth, the Mother, the Receptive** — devoted, patient, the ground
everything grows *from*. But Earth alone, with no light to answer it, is a gray field in winter. The
island isn't broken. It's **unbalanced** — emptied of one of its two modes — and it is waiting.

That is the whole quest in one image: **bring the light back, one line at a time, until the dial is
even again.** Not all light (that's a different mistake — see [Chapter 06](CHAPTER_06.md)). *Even.*

---

## 👥 The cast, as forces

| Character | In the Book | Their truth |
|-----------|-------------|-------------|
| **You** (the monkey) | the **moving line** — the changing yáo | the one who travels every stage and re-weaves the whole |
| **Mimi** | the memory of **Tàijí** | she remembers the grove *whole*; her healing *is* the island's |
| **The Crab King** | the **inversion** (`yijing_invert`) | not a villain — the lonely all-yīn `000000`, hoarding light he can't even use |
| **The Gem Tree** | **Tàijí** itself | holds all numbers; will become the 8×8 grid of every fact ([Chapter 05](CHAPTER_05.md)) |

> [!IMPORTANT]
> **You caused this.** That is the point, and it is gentle. The grove did not gray because you were
> bad at math; it grayed because you *did something* — and so you can *do something* about it. This is
> Ocarina of Time's Master Sword, sized for a nine-year-old: the burden that turns a chore ("help the
> monkeys") into a quest ("set right what I set loose"). Intrinsic motivation, no shame attached.

---

## 🌀 Heritage threads

- **Zelda — Pillar #1, The Hero's Burden:** lifting the sword opens the door for the villain. Here,
  solving the welcome-puzzle opens the Altar. *Your* hand, *your* quest.
- **Monkey Academy (1984):** the franchise's founding image — *a number has gone missing, and the
  crab took it.* We don't subvert it; we **explain** it, finally, twenty stages deep into a forty-year
  joke.
- **King's Valley II (1988):** the Altar of Balance is our **El Giza** — the central Seal that all the
  scattered stones must return to. The four sealed cores in its dial are the **four Cosmic Roots**
  ([Chapter 06](CHAPTER_06.md)).

---

## ✍️ The line is drawn — *not yet*

The founding hexagram begins **blank**: six yīn lines, the gray field, ䷁. No line has been restored.
The on-screen ceremony (see [README §5](README.md#5-the-founding-hexagram-is-built-line-by-line))
shows the empty frame for the first time:

```
   ⚋   line 6        Each chapter from here restores ONE line, bottom to top,
   ⚋   line 5        alternating light and dark, until the dial is even again.
   ⚋   line 4
   ⚋   line 3        Right now: all dark. Entropy 0. The grove holds its breath.
   ⚋   line 2
   ⚋   line 1
```

> **Mimi:** "Okay. New plan. The numbers want to come home — I can feel the Tree wanting them. We
> bring them back the way the old monkeys did. One. Line. At. A. Time." *(she manages half a smile)*
> "Starting at the water. Come on."

---

## 🛡️ Anti-anxiety & pedagogy notes

- **The gray is sad, never scary.** No threat music, no menace — melancholy, like a turned-off
  fairground. The promise is restoration, instantly legible.
- **The fall is reversible by definition.** Lines only ever get *added* back (`flags.portalStages`
  only rise). The child can't lose progress, so "I broke it" never curdles into "I'll break it again."
- **Unit-first.** Establishing "one whole" before any cutting is the single highest-leverage move for
  later fractions/division (`docs/01-learn.md`).

---

## 🌍 Localization (EN / NL)

| Author term | Child-facing EN | Child-facing NL |
|-------------|-----------------|-----------------|
| Tàijí / the One | **the Whole** / the One Light | **het Geheel** / het Ene Licht |
| Wújí | the quiet field | het stille veld |
| Altar of Balance | **the Balance Dial** | **de Balansschijf** |
| entropy 0 / all-yīn | "the grove went gray" | "het bos werd grijs" |

*Never shown to the child:* Yijing, Tàijí, yīn, hexagram, entropy. Those are for this doc and the
parent dashboard.

---

## → Next

The Tree wants its light back, and Mimi points at the sea. The first thing the One ever does is
become **Two**: in and out, up and down, plus and minus.

**[CHAPTER 01 — The Two Modes →](CHAPTER_01.md)**
