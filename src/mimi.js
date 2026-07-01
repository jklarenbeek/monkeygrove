// Mimi's conversations — pure logic, no DOM, no three.js.
//
// Given the profile, the mastery report and the island status, produce the
// ordered list of things Mimi has to say right now: the most useful advice
// first (what to build, what it costs, which world to practice), cozy chatter
// last. The game cycles through the list on repeated taps, so the first tap
// always carries the line that actually matters for the quest.
//
// Lines are {key, vars?, buildId?, worldId?}: buildId/worldId are raw ids the
// caller translates (t('build.'+id) / t('world.'+id)) so this stays i18n-free.
import { progressPoints } from './island.js';

// Mimi's three-phase healing arc (SUPER_PROMPT Phase 4): the anxious, self-blaming Mimi
// of the gray dock (the Crab King's theft) slowly opens as the friends return, and is
// whole again at the festival. Her *usefulness* never drops — only her tone shifts.
//   0 anxious  : the theft is fresh, no world line drawn yet
//   1 opening  : at least one friend is home (a world line drawn)
//   2 whole    : the festival / reconciliation has happened
export function mimiPhaseFor(profile) {
  const story = profile?.story || {};
  if (profile?.flags?.festivalDone || story.crabKingReconciled) return 2;
  const drawn = Array.isArray(story.lines) ? story.lines.filter(Boolean).length : 0;
  if (drawn >= 1) return 1;
  return 0;
}

// Monotonic latch (like flags.portalStages / story.lines): Mimi never relapses, even if
// a rating later decays. Returns the (possibly advanced) phase.
export function advanceMimiPhase(profile) {
  if (!profile?.story) return 0;
  const next = mimiPhaseFor(profile);
  if (next > (profile.story.mimiPhase ?? 0)) profile.story.mimiPhase = next;
  return profile.story.mimiPhase ?? 0;
}

export function mimiLines(profile, report, status) {
  const lines = [];
  // Her tone for this visit — the stored monotonic phase, or computed for a pre-arc save.
  const mimiPhase = Math.max(0, Math.min(2, profile.story?.mimiPhase ?? mimiPhaseFor(profile)));
  if (!profile.flags?.mimiMet) lines.push({ key: 'mimi.meet' });

  // The island architect: a funded-up blueprint beats everything else.
  const unlocked = status.filter((b) => b.state === 'unlocked');
  const affordable = unlocked.find((b) => profile.bananas >= b.playerCost);
  if (affordable) {
    lines.push({ key: 'mimi.build_ready', buildId: affordable.id });
  } else if (unlocked.length) {
    lines.push({
      key: 'mimi.need_bananas',
      buildId: unlocked[0].id,
      vars: { n: unlocked[0].playerCost - profile.bananas },
    });
  }

  // The quest guide: point at the sleepiest world — that's where practice
  // blooms the island AND brings the next blueprint closer.
  let weakest = null;
  for (const [id, info] of Object.entries(report.worlds)) {
    if (!weakest || info.pct < weakest.pct) weakest = { id, pct: info.pct };
  }
  const nextDream = status.find((b) => b.state === 'locked');
  if (nextDream && weakest) {
    const gap = nextDream.points - progressPoints(report);
    if (gap > 0 && gap <= 0.5) lines.push({ key: 'mimi.almost_blueprint', worldId: weakest.id });
  }
  if (weakest && weakest.pct < 1) lines.push({ key: 'mimi.world_hint', worldId: weakest.id });

  const egg = profile.egg;
  if (egg && egg.goal - egg.points > 0 && egg.goal - egg.points <= 6) {
    lines.push({ key: 'mimi.egg_soon', vars: { n: egg.goal - egg.points } });
  }
  if ((profile.streak?.count || 0) >= 3) {
    lines.push({ key: 'mimi.streak', vars: { n: profile.streak.count } });
  }
  if (profile.flags?.festivalDone) lines.push({ key: 'mimi.festival' });

  // Her self-talk shifts with the arc — anxious, then opening, then whole. This is tone,
  // not advice: it rides alongside the quest lines above, which never change by phase.
  lines.push({ key: `mimi.phase${mimiPhase}` });
  lines.push({ key: 'mimi.chat.1' }, { key: 'mimi.chat.2' }, { key: 'mimi.chat.3' });
  return lines;
}
