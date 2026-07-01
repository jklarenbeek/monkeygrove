// The "cohesion of nature" reveals (SUPER_PROMPT Phase 7) — optional, opt-in,
// age-gentle. Never a lesson, never timed, never required: a door, not a worksheet.
// Each card surfaces the unity where a mechanic ALREADY proves it — commutativity is a
// gem and its mirror twin, a times-fact and its division are one wheel turned, the Gem
// Tree's 64 gems are the same 64 as the I Ching and the genetic code. The child can
// *discover* that the bananas, the music, the tides and their own growing skill are the
// same gentle pattern — and feel it, not be told it.
//
// PURE DATA + tiny lookups: no DOM, no three.js. The `proof` field names the engine
// transform that makes the wonder literally true, so the cosmology stays checkable
// (tests/wonders.test.mjs) — exactly the "does this make sense? could it be true?"
// question the game keeps asking.
import '../polyfills.js';
import {
  yijing_opposite, yijing_reverse, yijing_center, yijing_toAminoAcidName,
} from '../yijing/yijing.js';

// trigger: the in-game moment that may quietly offer the card (the UI decides whether to,
// and the child decides whether to open it). audience: 'child' shows in play; 'parent'
// is for the dashboard / older children's deeper "did you know".
export const WONDERS = Object.freeze([
  {
    id: 'twin_gem', trigger: 'commutativity', audience: 'child',
    titleKey: 'wonder.twin_gem.title', bodyKey: 'wonder.twin_gem.body',
    proof: 'yijing_opposite', // 4×6 and 6×4 — a gem and its mirror twin
  },
  {
    id: 'array_both_ways', trigger: 'array', audience: 'child',
    titleKey: 'wonder.array_both_ways.title', bodyKey: 'wonder.array_both_ways.body',
    proof: 'yijing_reverse', // read the rows or the columns — the same garden bed
  },
  {
    id: 'fact_and_division', trigger: 'division_fact', audience: 'child',
    titleKey: 'wonder.fact_and_division.title', bodyKey: 'wonder.fact_and_division.body',
    proof: 'yijing_center', // a fact and its division — one wheel turned
  },
  {
    id: 'music_skip_count', trigger: 'music', audience: 'child',
    titleKey: 'wonder.music_skip_count.title', bodyKey: 'wonder.music_skip_count.body',
    proof: null, // the music stage IS skip-counting rhythm
  },
  {
    id: 'bakery_pie', trigger: 'bakery', audience: 'child',
    titleKey: 'wonder.bakery_pie.title', bodyKey: 'wonder.bakery_pie.body',
    proof: null, // the pie you cut and eat IS the fraction
  },
  {
    id: 'gem_tree_64', trigger: 'gem_tree', audience: 'parent',
    titleKey: 'wonder.gem_tree_64.title', bodyKey: 'wonder.gem_tree_64.body',
    proof: 'yijing_toAminoAcidName', // the 64 gems = the I Ching = the 64 codons of DNA
  },
  {
    id: 'one_line_at_a_time', trigger: 'pacing', audience: 'parent',
    titleKey: 'wonder.one_line.title', bodyKey: 'wonder.one_line.body',
    proof: null, // change one line at a time — the gentlest learning and the deepest Book
  },
]);

const PROOFS = { yijing_opposite, yijing_reverse, yijing_center, yijing_toAminoAcidName };

// Resolve a card's `proof` to the engine transform that makes it literally true (null
// for the cards whose wonder is in the mechanic itself, not a hexagram identity).
export const wonderProof = (id) => {
  const card = WONDERS.find((w) => w.id === id);
  return card && card.proof ? PROOFS[card.proof] : null;
};

// The cards a given in-play moment may offer (never forced — the UI gates on opt-in and
// the child's age/curiosity, never on the clock).
export const wondersForTrigger = (trigger) => WONDERS.filter((w) => w.trigger === trigger);

// The deeper reveals for the parent dashboard and older children.
export const parentWonders = () => WONDERS.filter((w) => w.audience === 'parent');

// The next child-facing card to gently offer for an in-play moment, or null — the first
// one for this trigger the child has not already discovered. `seen` is the list of
// wonder ids already opened (persisted on the profile) so a reveal is a one-time door,
// never a nag.
export function nextWonderFor(trigger, seen = []) {
  const seenSet = new Set(seen);
  return WONDERS.find((w) => w.audience === 'child' && w.trigger === trigger && !seenSet.has(w.id)) || null;
}

// Map a just-answered problem to a child wonder trigger, or null. The trigger vocabulary
// lives with the cards so the play code stays declarative. `litTwin` is true when a fact
// gem lit together with its commutative twin (the twin-gem wonder's exact moment).
export function playTrigger({ kind, skillId, world, litTwin } = {}) {
  if (litTwin) return 'commutativity';
  if (kind === 'array') return 'array';
  if (skillId === 'div_facts' || skillId === 'div_remainder') return 'division_fact';
  if (world === 'business') return 'bakery';
  return null;
}
