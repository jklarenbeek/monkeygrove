import { NL_PO } from './nl_po.js';

export const CURRICULUM_PACKS = { NL_PO };

export function getPack(packId = 'NL_PO') {
  return CURRICULUM_PACKS[packId] || CURRICULUM_PACKS.NL_PO;
}

export function listPacks() {
  return Object.values(CURRICULUM_PACKS)
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function listObjectives(packId = 'NL_PO', filters = {}) {
  const pack = getPack(packId);
  return pack.objectives.filter((o) => {
    if (filters.status && o.status !== filters.status) return false;
    if (filters.stage && o.stage !== filters.stage) return false;
    if (filters.domain && o.domain !== filters.domain) return false;
    return true;
  });
}

function skillMapFromReport(report) {
  const out = {};
  for (const world of Object.values(report?.worlds || {})) {
    if (!Array.isArray(world?.skills)) continue;
    for (const skill of world.skills) out[skill.id] = skill;
  }
  // The business group (decimals/%/scale) rides beside the four story worlds in
  // masteryReport; include it so those objectives can read as covered/partial too.
  for (const skill of report?.business?.skills || []) out[skill.id] = skill;
  return out;
}

// Coverage contributed by a minigame (business shops OR the music stage): an objective is
// 'covered' once every mapped mode is covered, 'partial' once any is tried. Shared shape
// so the shop and the stage both feed the dashboard the same way.
function modeCoverage(modeIds, report) {
  if (!modeIds.length || !report?.modes) return null;
  if (modeIds.every((id) => report.modes[id]?.coverage === 'covered')) return 'covered';
  if (modeIds.some((id) => {
    const coverage = report.modes[id]?.coverage;
    return coverage === 'partial' || coverage === 'covered';
  })) return 'partial';
  return null;
}

function mergeCoverage(...states) {
  if (states.includes('covered')) return 'covered';
  if (states.includes('partial')) return 'partial';
  return 'playable';
}

export function coverageForReport(packId = 'NL_PO', report = null, opts = {}) {
  const pack = getPack(packId);
  const skills = skillMapFromReport(report);
  const businessReport = opts.business || null;
  const stageReport = opts.stage || null;
  const domains = {};
  const statusCounts = { covered: 0, partial: 0, playable: 0, planned: 0 };

  for (const domain of pack.domains) {
    domains[domain.id] = {
      id: domain.id,
      labelKey: domain.labelKey,
      total: 0,
      covered: 0,
      partial: 0,
      playable: 0,
      planned: 0,
      objectives: [],
    };
  }

  for (const obj of pack.objectives) {
    const gameSkills = obj.gameSkills || [];
    const skillStates = gameSkills.map((id) => skills[id]).filter(Boolean);
    const mastered = skillStates.filter((s) => s.mastered).length;
    const practiced = skillStates.filter((s) => (s.n || 0) > 0).length;
    const bySkills = mastered && mastered === gameSkills.length ? 'covered'
      : practiced ? 'partial' : null;
    const byBusiness = modeCoverage(obj.businessModes || [], businessReport);
    const byStage = modeCoverage(obj.stageModes || [], stageReport);
    const coverage = obj.status === 'planned' ? 'planned'
      : mergeCoverage(bySkills, byBusiness, byStage);

    const entry = { ...obj, coverage };
    const domain = domains[obj.domain];
    domain.total += 1;
    domain[coverage] += 1;
    domain.objectives.push(entry);
    statusCounts[coverage] += 1;
  }

  return { packId: pack.id, domains, statusCounts };
}
