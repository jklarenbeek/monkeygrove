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
import { memoryOfferReady, availableWalkSteps } from './memory/engine.js';

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

// ---------- Mimi's Check offers (docs/05 §3.1) ----------

const DAY_MS = 86400000;

function daysSinceYmd(ymd, now) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(ymd || ''));
  if (!m) return null;
  const then = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).getTime();
  return Math.max(0, (now - then) / DAY_MS);
}

// Dutch school years roll over in August: September means "zit je nu in een
// nieuwe groep?" — the groep prior needs re-asking, never auto-incrementing
// (zittenblijven is exactly the case auto-increment would get wrong).
function schoolYearRolled(ymd, now) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(ymd || ''));
  if (!m) return false;
  const yearOf = (y, month) => (month >= 8 ? y : y - 1);
  const d = new Date(now);
  return yearOf(d.getFullYear(), d.getMonth() + 1) > yearOf(Number(m[1]), Number(m[2]));
}

// Why Mimi would *offer* a check right now (docs/05 §3.1.3) — or null. Offers are
// one line in her ladder, always dismissible, never a gate.
export function checkupSuggestion(profile, now = Date.now()) {
  const cur = profile?.curriculum;
  if (!cur) return null;
  if (profile.flags?.checkupRequested) return 'requested';
  const ck = cur.checkup;
  if (!ck?.completed) return 'first';
  const days = daysSinceYmd(ck.on, now);
  if (days == null) return null;
  if (schoolYearRolled(ck.on, now)) return 'new_year';
  if (days > 90) return 'stale';
  if (days >= 7) {
    // Flow mismatch over the recent practice stream: cruising reads as bored,
    // grinding as frustrated — both are recalibration signals, not judgments.
    const log = profile.math?.log || [];
    if (log.length >= 20) {
      const last = log.slice(-20);
      const rate = last.filter((e) => e.ok).length / last.length;
      if (rate >= 0.85) return 'bored';
      if (rate <= 0.45) return 'frustrated';
    }
  }
  return null;
}

// Soft cooldown (docs/05 §3.1.2): a check under a week old and no reason to redo
// it — Mimi deflects warmly instead of re-testing.
export function checkupFresh(profile, now = Date.now()) {
  const ck = profile?.curriculum?.checkup;
  if (!ck?.completed) return false;
  const days = daysSinceYmd(ck.on, now);
  return days != null && days < 7;
}

export function mimiLines(profile, report, status, { now = Date.now() } = {}) {
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

  // Mimi's Check: a timely offer rides high in the ladder (right under the
  // blueprint news); the child-invocable ask is always reachable further down.
  const suggestion = checkupSuggestion(profile, now);
  if (suggestion) lines.push({ key: 'mimi.checkup_offer' });

  // Memory Grove offer (docs/06 §4.2): once the child is old enough (groep 6 /
  // age ≈ 9) and has gems worth anchoring, Mimi introduces the anchor-image
  // trick. Confirming her line enables it and opens the Gem Tree (hub.js), the
  // same "walk you to the counter" pattern as the check offer.
  if (memoryOfferReady(profile)) lines.push({ key: 'mimi.memory_offer' });
  // Once the Grove is on, Mimi can invite the child on a memory walk (docs/06
  // §4.4) — confirming opens the browser to pick a skip-count route.
  else if (availableWalkSteps(profile).length) lines.push({ key: 'mimi.memory_walk' });

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

  // The always-available ask ("kijk eens wat ik al kan!") — deflected warmly
  // while a fresh check makes a redo pointless (docs/05 §3.1.2).
  if (!suggestion) {
    lines.push({ key: checkupFresh(profile, now) ? 'mimi.checkup_fresh' : 'mimi.checkup_ask' });
  }

  // Her self-talk shifts with the arc — anxious, then opening, then whole. This is tone,
  // not advice: it rides alongside the quest lines above, which never change by phase.
  lines.push({ key: `mimi.phase${mimiPhase}` });
  lines.push({ key: 'mimi.chat.1' }, { key: 'mimi.chat.2' }, { key: 'mimi.chat.3' });
  return lines;
}
