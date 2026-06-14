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

export function coverageForReport(packId = 'NL_PO', report = null) {
  const pack = getPack(packId);
  const skills = skillMapFromReport(report);
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
    const coverage = obj.status === 'planned' ? 'planned'
      : mastered && mastered === gameSkills.length ? 'covered'
        : practiced ? 'partial' : 'playable';

    const entry = { ...obj, coverage };
    const domain = domains[obj.domain];
    domain.total += 1;
    domain[coverage] += 1;
    domain.objectives.push(entry);
    statusCounts[coverage] += 1;
  }

  return { packId: pack.id, domains, statusCounts };
}
