# CHAPTER 04 — The Five Phases

### *Wǔxíng* — the turning wheel · the number `5`

> *Not everything in the world grows by doubling. Some things turn. Water feeds the wood, wood feeds
> the fire, fire makes the earth, earth yields the metal, metal melts to water again — round and
> round, each thing giving way to the next. That circle is how you take a pile apart.*

---

## 🥥 Cold open — the stump that won't share

The light-half is lit, but the path **north** runs cold. At the top of it sits the **Sharing Stump**
— a great flat-topped tree round, ringed with empty baskets — and it is the only world that grayed
*worse* after the others bloomed, because north is the direction of the **islet bridge**, and someone
has been here, dragging things away.

A bunny named **Pip** is trying to split a basket of coconuts between two friends and getting it
heartbreakingly wrong — three here, then five there, then snatching them all back to start over,
because the number that made it *fair* is gone.

> **Pip:** "If it's not even, somebody's sad, so I keep — I keep starting over—" *(notices you)*
> "Oh! You're — can you make it fair? I just want it to be *fair.*"

And then, for the first time, you hear the claws on stone. Sideways claws. The **Crab King** is
*here*, in the chamber, scuttling along the back wall toward a number stone — and when he sees you
see him, he doesn't run. He grabs the stone and holds it to his chest.

> **Crab King:** "Numbers are too *pointy.* They make my claws hurt." *(backing toward the bridge)*
> "And anyway — anyway if you learn all of them, you'll build a boat. Everyone who learns the numbers
> builds a boat. And then you *leave.*"

He's gone over the bridge before Pip can finish gasping. But he left the stone. He always, it turns
out, leaves the stone.

---

## ☯ The pattern — `5`, the Five Phases

Here the doubling **stops** — and that break is the lesson. After `1, 2, 4, 8`, the next number in
this story is **not 16.** It is **five**, because the Yijing has a second engine that doesn't double;
it **turns**: the **Wǔxíng (五行), the Five Phases.** From
[`wuxing.json`](https://github.com/jklarenbeek/yijingjs/blob/master/packages/core/src/wuxing.json):
**Aarde (Earth), Water, Hout (Wood), Vuur (Fire), Metaal (Metal)** — connected by two cycles:

```
        GENERATING (creates / 创):  builds UP            OVERCOMING (controls / 克):  breaks DOWN
            Wood → Fire → Earth                              Wood → Earth → Water
              ↑              ↓            and                  ↑                ↓
            Water ← Metal ←─┘                               Fire ← Metal ←─────┘
```

- The **generating cycle** (`Creeert`) is everything you've done so far — Water feeds Wood feeds
  Fire: small things **growing into** big ones. `+` grows into `×`.
- The **overcoming cycle** (`Vernietigd` / controls) is the new direction — Water *puts out* Fire,
  Metal *cuts* Wood: big things **broken back down**. This is **division.** `÷` undoes `×`; `−` undoes
  `+`. The wheel turns the other way.

> [!IMPORTANT]
> **Division is not "the opposite of fun." It's the wheel coming back around.** The doubling chapters
> *built*; this one *shares out what was built.* Mathematically that's the **inverse**: every `7 × 8 =
> 56` in the Garden is a `56 ÷ 8 = 7` at the Stump, the same fact read around the wheel. The child
> who built the array already *owns* the division — they just have to turn it.

---

## 🧮 The mathematics — the Sharing Stump

The `stump` ladder from [`mathengine.js`](../../src/mathengine.js):

| Skill | What it is | The Stump image |
|-------|------------|------------------|
| `div_facts` | ÷ by the learned tables | the wheel turning a known array backward |
| `share` | fair sharing (constructed) | dealing coconuts round-robin into baskets |
| `div_remainder` | division with leftovers | the coconuts that don't divide evenly |
| `missing_factor` | `? × 6 = 42` | **the hidden number inside** |

### The verbs and transformations

- **Share verb** (`verbs.js`, the Stump signature): deal coconuts into baskets **round-robin** — one,
  one, one, around again — until they run out. Whatever's left over becomes **remainder-berries**, and
  here is the design's quiet genius: those berries **feed the egg meter** (`rewards.js`). *The
  scariest part of division — the leftover — becomes the most coveted reward.* A remainder isn't a
  failure; it's loot.
- **`missing_factor` = `yijing_center()`, the nuclear hexagram.** `? × 6 = 42` asks for the number
  *hidden inside* the product — and `yijing_center()` is the operation that extracts the hexagram's
  hidden inner figure. Finding a factor **is** finding the centre. (And repeatedly taking the centre
  is how everything converges to the four roots — hold that thought for [Chapter 06](CHAPTER_06.md).)
- **The five-phase regroup:** the Eight Friends rearrange around the Stump by **element**, not by
  family — Tuk (Earth) anchors the grouping, Dot (Water) pours the share, Mo (Fire) warms it, Kiki &
  Olli (Wood) keep the beat, Pip & the sleeping Dragon (Metal) ring the count. Five phases, eight
  friends, one wheel.

**Sacred tool — the Wheel of Phases.** A five-spoke dial that shows, for any fact, *where you are on
the wheel*: the generating arc (build it up) and the overcoming arc (break it down). Equip it and the
overworld shows every quantity's two directions — the `×` that made it and the `÷` that undoes it.
Inverse operations, made into an object you can hold.

---

## 🦀 The Reflective Antagonist steps forward

This is the user's **Zelda Pillar #2 (the Reflective Antagonist)**, and Act II of the enrichment
doc's beat table. The Crab King stops being an offstage thief and starts being a *character*, met in
the chambers, leaving his fear in speech-bubbles:

- *"Numbers are too pointy! They make my claws hurt!"* — he's **math-anxious too**, the same as Mimi,
  the same as the child. The villain's problem is the player's problem.
- *"If you learn the numbers, you'll leave me!"* — the real wound. He hoards the numbers not for power
  but so the monkeys can't build boats and **sail away** and leave him alone on his islet, the way
  they did before. (Mimi's journal and old carvings, surfaced across this chapter, fill in the
  history: he was once the island's guardian, and the grove grew up and left him.)
- **He always leaves the stone.** Every interception ends with the Crab King dropping what he grabbed.
  He doesn't actually *want* the numbers. He wants someone to stay. He doesn't know how to ask.

> [!NOTE]
> **Why division is the Crab King's chapter.** Division is **sharing** — and sharing is the exact
> thing he can't do, because to him, sharing is how you end up alone (you split the island, everyone
> takes their piece, everyone leaves). The math of this world *is* his wound. Teaching the child that
> sharing-with-leftovers is safe and even *rewarding* (the berries!) is teaching the lesson the Crab
> King most needs to hear — and the child gets to be the one who, eventually, teaches it to him.

---

## 🌀 Heritage threads

- **Zelda — Pillar #2 (Reflective Antagonist):** Skull Kid's loneliness, Wind Waker's nostalgic
  Ganondorf. The Crab King joins their company — grief, not malice.
- **King's Valley II (1988):** the chambers deepen into proper *tomb-rooms* now, soul-stones (number
  stones) guarded room by room, and a presence haunting them — the mummies of El Giza, recast as one
  sad crab. The **tools-used-in-the-right-order** discipline of King's Valley becomes the round-robin
  *sequence* of fair sharing: deal in order, or it isn't fair.
- **Wǔxíng** itself: the five-element generating/overcoming cycles, the Book's model of how things
  build up and break down — i.e., the inverse operations.

---

## ✍️ The line is drawn — **line 4, Yīn `⚋`**

Bring fair sharing back to the Stump and the Tide Stone presses the **fourth** line — **yīn** — the
base of the **upper trigram.** This is the first line of **Kǎn ☵ (Water)**, the deep: receptive,
yielding, the cool that will balance the fire below.

```
   ⚋   line 6
   ⚋   line 5
   ⚋   line 4   ← NEW. Yīn. The deep opens.  ──┐ (upper trigram begins: Kǎn ☵ Water)
   ⚊   line 3   ───────────────────────────────┐
   ⚋   line 2                                   │  lower trigram: Lí ☲ Fire (complete)
   ⚊   line 1   ───────────────────────────────┘
```

Four lines lit, two dark. The dial on the Altar of Balance is no longer flat-dead — it's *tilting*,
swinging toward even. Mimi watches the needle and says the truest thing she's said yet:

> **Mimi:** "He keeps leaving the stones. Did you notice? Every time. He grabs them and then he just…
> puts them down and runs." *(quietly)* "That's not someone stealing. That's someone who doesn't know
> how to come to the party." *(she looks north, at the bridge)* "...We're going to have to build that
> bridge, aren't we. Not to chase him. To *reach* him."

---

## 🛡️ Anti-anxiety & pedagogy notes

- **Remainders are rewards, full stop.** Reframing the leftover as egg-fuel defuses the single most
  anxiety-loaded idea in elementary division (`DESIGN.md` retention kit).
- **Division taught as the *turn* of a known fact**, not a new monster — leveraging the array the
  child already built (research: `÷` from `×` as inverse, `docs/01-learn.md`).
- **The villain is safe.** Even arriving in-chamber, the Crab King never threatens — crabs freeze
  while you carry a stone; he leaves what he grabs; the dread is *his*, not the child's. The anti-
  anxiety guarantee holds even as the antagonist gets closer.

---

## 🌍 Localization (EN / NL)

| Author term | Child-facing EN | Child-facing NL |
|-------------|-----------------|-----------------|
| Wǔxíng / Five Phases | the **Turning Wheel** | het **Draaiende Wiel** |
| generating / overcoming | **build up** / **share out** | **opbouwen** / **uitdelen** |
| remainder-berries | **leftover berries** | **restbessen** |
| Wheel of Phases | the **Share Wheel** | het **Deelwiel** |

---

## → Next

Four lines lit, the wheel turning, the bridge calling. Now the eight friends and the four directions
combine into *everything at once* — eight times eight, the **Great Grid** of every fact there is — and
the last sleepy world, the **Vine Heights**, where numbers learn to be smaller than one.

**[CHAPTER 05 — The Sixty-Four Changes →](CHAPTER_05.md)**
