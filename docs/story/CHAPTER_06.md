# CHAPTER 06 — The Four Roots

### *cosmic convergence* — balance restored · `4 → ☯`

> *Take the heart of any change, and the heart of that heart, and keep going, and every one of the
> sixty-four comes home to just four places. Two of pure light and dark; two of perfect weaving. The
> island doesn't want to be any one of them. It wants to live in the middle, where they meet.*

---

## 🌉 Cold open — the islet, and the hoard that never helped

The bridge holds. You cross to the islet, and there he is: the **Crab King**, small now that you're
close, sitting on a mountain of stolen light — every number stone from the whole grove, heaped into
his great shell, glowing, *useless.* He has been sitting on enough brightness to relight the world,
and he has been cold the entire time, because **light you hoard doesn't warm you.** It only proves
you're alone with it.

He doesn't run. There's nowhere left to run sideways to.

> **Crab King:** "I couldn't count. That was the whole — that was *it.* I was supposed to be the
> guardian and I couldn't even count the monkeys as they left." *(the hoard dims)* "So I took the
> numbers. I thought if there were no numbers, nobody could build a boat, and nobody could leave, and
> I wouldn't have to watch the grove get small again." *(very quietly)* "I didn't make anyone stay. I
> just made it gray."

This is the **Reflective Antagonist's** last turn (Zelda Pillar #2): not a boss to beat, a wound to
witness. And it rewrites the cruelest beat in the Konami canon on purpose — see *the twist*, below.

---

## ☯ The pattern — the Four Roots

The Book has one last secret, and it's the one that ends the story. Take any hexagram's **nuclear
centre** (`yijing_center()`) — its hidden inner change — and then the centre of *that*, and keep
going (`yijing_getCenterChain()`). Every one of the 64 changes **converges.** Not to one place. To
**four** — the **Cosmic Roots**, the only hexagrams that are their own centre (`yijing_isCosmic()`
returns true for exactly these):

| Root | Value | What it is | The island's temptation |
|------|:-----:|------------|-------------------------|
| ䷁ **Kūn** | `0` · `000000` | all yīn — pure dark, the Receptive alone | **the Crab King's gray** — hoard inward until nothing's left |
| ䷀ **Qián** | `63` · `111111` | all yáng — pure light, the Creative alone | **the arrogant dragon** — grab *all* the light back |
| ䷾ **Jìjì** | `42` · `101010`\* | **After Completion** — perfect alternation, every line in its right place | the woven balance the island settles into |
| ䷿ **Wèijì** | `21` · `010101`\* | **Before Completion** — the inverse weave | balance, forever one step from starting again |

> \* Binary read **bottom-to-top with the bottom line as the most-significant bit**, per the
> `yijingjs` convention. The founding hexagram read that way — ⚊⚋⚊⚋⚊⚋ — is `42`, **After
> Completion**. Flip every line (`yijing_invert`, XOR 63) and you get `21`, **Before Completion**:
> the two weaves are each other's complement (`42 ⊕ 63 = 21`). Note that `63` here is the *binary
> value* of all-yáng Qián, not to be confused with After Completion's *King Wen index*, which is
> also 63 — a small joke the Book plays on anyone who maps it.

Here is the whole moral of *Monkey Grove*, written in the deepest math the Book has:

> **The island must not become a single Root.** Not Kūn — that's what the Crab King did, hoarding
> until the grove went gray (entropy `0`). Not Qián — that's the opposite mistake, the "hero" who
> grabs *all* the numbers back and lets one bright thing blind everything (entropy `0` again, just
> white instead of black). **Both pure roots are lifeless.** The island wants to live at the **woven**
> root — ䷾ After Completion — where light and dark *alternate*, three and three, every line answering
> the line below it. Where `yijing_entropy() = 1.0` and `yijing_balance() = 0.5`. **The most balanced
> state is the most alive one.**

That is the anti-anxiety thesis as cosmology: *you were never trying to be perfect (all-yáng, every
fact, instantly, forever). You were trying to be **balanced** — which includes the dark lines, the
leftovers, the things you're still learning. The grove blooms because it holds both.*

---

## 🪄 The last line — the hand, not the grab

Five lines are lit. The Altar's needle trembles one hair from even. The obvious ending — the *wrong*
ending — is to take the sixth stone, press the sixth **yáng** line, grab back the last of the light,
and stand in an all-bright grove as the conquering caretaker. That's Qián's top line: *"the arrogant
dragon will have cause to repent."* It would swing the island to the other dead root. The needle would
slam past even and the grove would go white-blind and cold in a new way.

So you don't grab.

You take one number stone off the Crab King's hoard — just one — and you **hand it to him.** You teach
him to count it. *One.* (Back to where the whole game began: the One, the whole, the unit.) And the
sixth line the Tide Stone presses is **yīn** — the *receptive* line, the *yielding*, the **making-room**
— because **you complete the work by sharing it, not by taking the last of it.**

```
   ⚋   line 6   ← NEW. Yīn. The top line YIELDS. You make room for him. ──┐
   ⚊   line 5                                                            │ upper trigram complete:
   ⚋   line 4   ──────────────────────────────────────────────────────┘  Kǎn ☵ (Water / the deep)
   ⚊   line 3   ──────────────────────────────────────────────────────┐
   ⚋   line 2                                                          │  lower trigram:
   ⚊   line 1   ──────────────────────────────────────────────────────┘  Lí ☲ (Fire / light)
```

Read it bottom to top — ⚊⚋⚊⚋⚊⚋ — **Water ☵ over Fire ☲**:

> # ䷾ Jìjì — After Completion
> **A Cosmic Root. `entropy = 1.0`. `balance = 0.5`. Every line in its right place.**

The founding hexagram is whole, and it is **balanced**, and — water over fire — it is **a pot coming
to the boil.** The Altar's four cores light at once (Kūn, Qián, and the two weaves), the needle settles
*exactly* even for the first time since the dock, and across the whole grove the gray burns off for
good. *And the pot above the fire is the Festival Plaza, and the boil is the feast.*

---

## 🎪 The twist, re-written kind — the feast, not the weapon

This is the **Finale** of the enrichment doc and the redemption of the **Uşas (1987)** ending. In
Konami's original, you gather the goddess's jewel from its **four** scattered pieces — and the reward
is a doomsday weapon; the heroes are mocked as fools. *Monkey Grove keeps the four-piece convergence
and inverts the cruelty:* the four pieces are the four Cosmic Roots, assembling them completes the
Altar — and the "terrible power" the Crab King guarded turns out to be **nothing but his loneliness.**
The treasure isn't a bomb. It's a **shared meal.**

- The **Math Feast / Festival Plaza** (`island.js`, the 500🍌 build) rises. The Crab King, exactly as
  the shipped finale already plays it (`screens/intro.js` `showFinale`), interrupts the funding with
  his apology and **pays half from the returned hoard** — his first act of *giving* instead of
  *keeping.* Giving the light away is the only thing that ever warmed him.
- The **Dragon — Qián ☰ (Heaven)** finally wakes at the Gem Tree's crown — not to dominate (that would
  be the all-yáng mistake), but to take its place as the **eighth Friend**, the crown that completes
  the family of eight. Heaven balanced *into* the grove, not towering over it.
- Every animal who sailed away comes back for the feast — and this time the numbers aren't the reason
  they *leave.* The numbers are the reason they came **home.** The Crab King set the table.

> **Crab King:** *(at his own plaza, sheepish, tappable forever after)* "...So if I learn to count
> them, the monkeys still might build boats and sail off someday." *(a long pause)* "But they'll know
> the way *back.* And I'll be able to count the days till they do." *(smaller)* "That's — that's
> better than gray. That's a lot better than gray."

---

## 👥 Mimi — Phase 3, whole

The user's **Companion Arc (Pillar #3)** lands. The anxious, self-blaming Mimi of the gray dock is
gone; so is the apologizing guide. What's left is a friend who got her home back *and* her nerve back —
and who knows exactly who gave them to her.

> **Mimi:** "You know what you actually did? You didn't just bring the numbers home." *(she watches
> the Crab King ladle soup with a claw he was once too shy to count on)* "You made it safe to be bad
> at something in front of everybody. That's the thing I lost. That's the thing he lost." *(she bumps
> your shoulder)* "Thanks for finding it under all that gray. ...Now eat, the piglet's been at this
> pie all day and the fractions are *immaculate.*"

---

## ♾️ After Completion — why the work is never finished (the good news)

The Book chose its own ending. **After Completion (Jìjì)** is famous for a warning baked into its
line-texts: *the moment of completion is the moment disorder begins to creep back, unless you keep
tending it.* The Yijing does not believe in trophies. Neither does the math:

- A "mastered" skill **decays** if you stop visiting it — the **forgetting curve** in
  [`mathengine.js`](../../src/mathengine.js). Mastery means *recently* mastered.
- The **Echo Doors** (`yijing_invert()` shadow rooms) keep resurfacing your weakest stale skill —
  spaced retrieval as loot, the *tending* After Completion demands.
- The **daily streak flame** and the **seasons** keep the grove living after the credits. The story
  ends; the island doesn't.

So the last screen isn't "The End." It's the grove in full color, the Altar even, the eight Friends
home, the Dragon at the crown, the Crab King at the soup — and a sixty-fourth gem still occasionally
dimming on the Gem Tree, asking, gently, to be visited again. **Balance is not a state you reach. It's
a thing you keep choosing.** Which is the kindest possible thing to teach a child about mathematics —
and about themselves.

```
                              ䷾
                    the grove, balanced, alive
                  fire below ☲   ·   water above ☵
            light and dark, woven, three and three
                   entropy 1.0 — fully, finally green
```

---

## 🌀 Heritage threads

- **Zelda — Finale & Pillar #2 resolved:** the antagonist understood, not destroyed; the world
  restored to radiant color; the companion whole. Majora's Skull Kid, given a chair at the table.
- **King's Valley II (1988):** the central Seal of **El Giza** — our Altar of Balance — set right at
  last, its four cores (the four Roots) lit together. The soul-stones are home.
- **Uşas (1987):** the four-piece convergence and the famous twist, kept in shape and inverted in
  heart — the treasure is the feast.
- **Monkey Academy (1984):** the happy monkey-dance of a cleared stage, grown into a whole island's
  festival. Forty years later, the missing number finally comes home — and we finally know why it
  left.

---

## ✍️ The hexagram complete

```
   ⚋   line 6   Ch06 — yield / share          (the top line gives)
   ⚊   line 5   Ch05 — mastery / the 64        ┐ upper: Kǎn ☵ Water (the deep, reconciled)
   ⚋   line 4   Ch04 — the wheel / division    ┘
   ⚊   line 3   Ch03 — the Eight / ×           ┐ lower: Lí ☲ Fire (the light, lit)
   ⚋   line 2   Ch02 — the Four directions     │
   ⚊   line 1   Ch01 — the first distinction   ┘
                          ䷾  After Completion
```

Seven chapters. Six lines. One whole, balanced, blooming island — built, like every number on it, out
of nothing but **light and dark, told gently apart and woven carefully back together.**

---

## 🛡️ Anti-anxiety & pedagogy notes

- **The villain is healed, not beaten** — no final-boss spike, no Game Over, ever. Confrontation is
  conversation; victory is empathy (`DESIGN.md` non-negotiables intact to the last frame).
- **"Don't grab the sixth line"** is the anti-perfectionism lesson made mechanical: the *wrong* ending
  is grabbing *everything*. Balance — which includes what you haven't mastered — is the win.
- **Completion-as-practice** (the forgetting curve, Echo Doors, streak) tells the child the truth
  kindly: you don't have to be *finished*, you just have to keep visiting. The opposite of math
  dread.

---

## 🌍 Localization (EN / NL)

| Author term | Child-facing EN | Child-facing NL |
|-------------|-----------------|-----------------|
| Cosmic Roots | the **Four Cores** | de **Vier Kernen** |
| After Completion / balance | the **Even Grove** / "in balance" | het **Gelijke Bos** / "in balans" |
| the sixth line yields | "make **room** for him" | "maak **plek** voor hem" |
| the Math Feast | the **Big Share** / the Festival | het **Grote Delen** / het Festival |

---

## ☯ The end is a beginning

*Return to the **[Story Bible](README.md)** · or the first light: **[CHAPTER 00 — The One](CHAPTER_00.md)**.*

> The grove is green. The dial is even. Somewhere a gem dims, just slightly, waiting for tomorrow.
> *易 — change — never stops. That was always the good news.*
