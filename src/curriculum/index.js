import { NL_PO } from './nl_po.js';

export const CURRICULUM_PACKS = { NL_PO };

export function getPack(packId = 'NL_PO') {
  return CURRICULUM_PACKS[packId] || CURRICULUM_PACKS.NL_PO;
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
  return out;
}

function businessCoverage(obj, businessReport) {
  const modes = obj.businessModes || [];
  if (!modes.length || !businessReport?.modes) return null;
  if (modes.every((id) => businessReport.modes[id]?.coverage === 'covered')) return 'covered';
  if (modes.some((id) => {
    const coverage = businessReport.modes[id]?.coverage;
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
    const byBusiness = businessCoverage(obj, businessReport);
    const coverage = obj.status === 'planned' ? 'planned'
      : mergeCoverage(bySkills, byBusiness);

    const entry = { ...obj, coverage };
    const domain = domains[obj.domain];
    domain.total += 1;
    domain[coverage] += 1;
    domain.objectives.push(entry);
    statusCounts[coverage] += 1;
  }

  return { packId: pack.id, domains, statusCounts };
}
