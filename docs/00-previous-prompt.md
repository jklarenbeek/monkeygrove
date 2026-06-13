You are an elite, production-grade senior frontend engineer and math educator. Your task is to build a beautiful, fully functional full-stack interactive educational application named "Monkey Math Academy" in React 18+, TypeScript, and Tailwind CSS. 

The application is heavily inspired by 1980s Konami classic design layouts (specifically "The Treasure of Uṣas" from 1987) and pairs retro arcade platformer physics on an HTML5 canvas with a charming multi-lingual classroom chalkboard interface.

---

### 1. TECH STACK, TYPOGRAPHY & VISUAL MOTIFS
- Framework: React 18+ with Vite, utilizing `framer-motion` for smooth entrance states and tab switches.
- Styling: Standard Tailwind CSS utility classes. DO NOT use external CSS stylesheets except for font imports.
- Accessibility & Colors: Pristine contrast. Dark Slate grids, Golden Yellow accents (`#fbbf24`), Emerald Greens for Multiplication Jungle, Tomato Reds and Warm Cheeses for Fraction Pizza bakeries, and Oceanic Deep Blues for Division Sands.
- Typography Pairings:
  - Primary UI & Paragraphs: "Inter" (sans-serif) for high legibility and density.
  - Display & Headers: "Space Grotesk" or "Outfit" for retro-arcade branding.
  - Data / Statistics / Controls: "JetBrains Mono" or "Fira Code" (monospace) for scores, coins, and system logs.
- Iconography: strictly imported from `lucide-react`.

---

### 2. DATA SCHEMA & CORE TYPES (types.ts)
Define these strict TypeScript interfaces at the very beginning of the code mapping:
- `MathTopic = 'multiplication' | 'fraction' | 'division'`
- `Question`: { id, equation, questionText, visualType ('bananas' | 'pizza' | 'coconut_baskets' | 'monkey_grid'), visualData (numerator, totalItems, groupedBy, etc.), options[], correctAnswer, explanation }
- `GameLevel`: { id, topic, levelNumber, title, subtitle, academicGoal, starsRequired, questions[] }
- `Sticker`: { id, name, emoji, description, cost, category }
- `PlayerStats`: { score, bananas, stars, unlockedStickers[], completedLevels: Record<string, number> (stars earned 1-3) }

---

### 3. GLOBAL STATE & THE 4 PRINCIPAL VIEWS
Implement a unified state engine orchestrating a desktop-first responsive window layout. The app features 4 core components that the user can seamlessly navigate:

#### VIEW 1: THE ACADEMY TREASURE ROUTE Dashboard (TreasureMap.tsx)
- Feature a view-preference toggle matching "🗺️ TREASURE MAP" and "🗂️ CLASSROOM GRIDS".
- The 'Treasure Map' renders a scrollable map canvas (aspect-locked virtual coordinates 1000x500 box) simulating a vintage parchment map.
- Draw an SVG dashed glowing gold trail path connecting 9 chronological level node islands.
- Islands are segmented into territories:
  - World 1: Levels 1-3 (Jungle Ruins, Green theme)
  - World 2: Levels 4-6 (Pizza Oven Bakery, Crimson/Gold theme)
  - World 3: Levels 7-9 (Coast Castle, Navy/Sea theme)
- Level Node interactions: Locked nodes are grayscaled with a security lock icon. Active/Unlocked levels have hovering tooltips detailing academic goals, stars earned (0 to 3), and a subtle pulsing halo indicator.

#### VIEW 2: THE CHALKBOARD CLASSROOM LECTURE (ChalkBlackboard.tsx)
- A screen representing a deep forest-green chalk blackboard framed by vintage thick oakwood borders.
- Display a real-time chalk-dust background overlay using a subtle white dot pattern.
- Lesson Content: Details the level's objective, kid-friendly academic tips customized based on whether the topic is multiplication, fractions, or division.
- Concept Sketch Panel: Dynamically renders an active graphic illustrating the math concept:
  - Multiplication: Creates a grid-box array of banana emojis (e.g. 2 rows of 4 bananas with math totals).
  - Fractions: Renders an active inline vector SVG Pizza pie with customizable segmented slices (e.g. showing 2 of 4 slices highlighted in melting cheese orange, leaving 2 bread support segments white).
  - Division: Renders baskets grouping coconut items with remainder labels.
- Displays personal High Score history and an "Enter Classroom" execution button with an active hover push-shadow effect.

#### VIEW 3: RETRO MINIGAME ARCADE CANVAS (ArcadeScreen.tsx)
An active 60FPS HTML5 Canvas platformer running physics calculations server-side and rendering via a 2D context.
- **Hero Characters Select**: Children choose between 3 heroes:
  1. **Momo (Agile Monkey)**: Grants a continuous active Double-Jump ability.
  2. **Wit (Math Wizard)**: Shoots horizontal/vertical plasma projectable orbs to trigger math answers from a safe distance.
  3. **Cles (Metal Gladiator)**: Generates a persistent magnetic coin shield pulling nearby bananas to the player.
- **Procedural Level Platform Generation**: Rather than hardcoding arrays, generate platforms and climbing apparatus (vine ladders, brick checkers, or metallic chains) matching the level's theme.
  - Jungle (Multiplication): Mossy templated bricks with leafy hanging vines.
  - Bakery (Fractions): Pizza pans, oven crates, and red/white checkered pipes.
  - Castles (Division): Golden battlements with dark iron anchor chains.
- **Thematic Gameplay Loop**:
  - The level question is framed permanently in top-screen LED letters.
  - Scattered throughout the map are Cherries/Bananas (currency) and 4 floating, bobbing **Mood Bubbles**:
    - *Happy Component*: Boosts score multipliers.
    - *Sad Component*: Activates a cool slow-motion gameplay field matrix.
    - *Angry Component*: Produces a colorful shadow jumping tail.
  - The map contains 4 locked neon math "Shutters" matching options A, B, C, or D situated under the platform paths.
  - The child must collect the vault key placed randomly in mid-air, jump platforms, dodge crawling red crabs on ledges and diving bats overhead, and then touch or shoot the Shutter matching the correct math answer.
  - If incorrect: Shutter shakes violently and deals 1 unit of damage.
  - If correct: Shutter rolls up, yielding sparkling star streams. Correctly solving 3 sequential shutters reveals the glowing portal allowing level completion.
- **Canvas Overlay Static FX**: Include real-time dark horizontal scanlines and a glowing outer retro cabinet framing overlay.

#### VIEW 4: THE STICKER ALBUM / STORE (StickerBook.tsx)
- An interface styled in a deep space-slate album cover.
- Track banana balances. Kids purchase retro trading card stickers (emojis of funny monkeys, ancient relics, pizzas, and maritime captains) with their collected coins.
- Clicking a card opens a profile presentation detailing the card's retro properties (power bars rating system, license information, description, trade status), accompanied by purchase animations and particle streams.

---

### 4. LOCALIZATION DICTIONARY (lang.ts)
The game must support complete localization on startup for English ('en') and Dutch ('nl'). Implement nested translation keys for all headings, tooltips, statistics cards, and game prompts:
- English: "THE ACADEMY TREASURE ROUTE", "DE ACADEMY SCHATKAART ROUTE"
- Educational tips: "Multiplication means adding equal groups together." / "Vermenigvuldigen betekent gelijke groepen bij elkaar optellen."

---

### 5. IMPLEMENTATION SPECIFICATIONS
- Handle canvas bounding boxes precisely to avoid players clipping through walls or falling off-screen.
- Include state resets: when a player loses 3 hearts (fruit bites), animate a CRT retro "Game Over" screen with a retry button.
- Restrict logic modularity: Split the codebase cleanly so type interfaces are declared in `types.ts`, challenge data resides in a separate `challenges.ts` file, and subviews map to modular files in `/src/components/`. Keep the visual framework compact, elegant, and entirely responsive down to mobile view sizes (at least 44px hit bounds for controls).