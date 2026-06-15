import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  CURRICULUM_PACKS, getPack, listPacks, listObjectives, coverageForReport,
} from '../src/curriculum/index.js';
import {
  createCurriculumState, estimateStageFromAge, scoreWarmup,
  eligibleSkillIds, retargetCurriculumPack, ageOnDate, currentCurriculumAge,
  refreshCurriculumForDate,
} from '../src/curriculum/placement.js';

test('NL_PO pack uses English internal identifiers', () => {
  const pack = getPack('NL_PO');
  assert.equal(pack.id, 'NL_PO');
  assert.deepEqual(pack.stages.map((s) => s.id), [
    'grade_1', 'grade_2', 'grade_3', 'grade_4',
    'grade_5', 'grade_6', 'grade_7', 'grade_8',
  ]);
  assert.ok(pack.domains.every((d) => /^[a-z_]+$/.test(d.id)));
  assert.ok(pack.objectives.every((o) => o.id.startsWith('nl_po.')));
  assert.ok(!JSON.stringify(pack).includes('groep_'));
  assert.ok(!JSON.stringify(pack).includes('bewerkingen'));
});

test('NL_PO has playable mappings for existing mathengine skills', () => {
  const playable = listObjectives('NL_PO', { status: 'playable' });
  const mapped = new Set(playable.flatMap((o) => o.gameSkills));
  for (const skill of [
    'add_20', 'sub_20', 'missing_addend', 'add_100', 'sub_100',
    'tables_a', 'tables_b', 'tables_c', 'tables_mix', 'mult_2digit',
    'div_facts', 'share', 'div_remainder', 'missing_factor',
    'frac_magnitude', 'frac_compare', 'frac_equiv', 'frac_of_n',
  ]) {
    assert.ok(mapped.has(skill), `${skill} should map to at least one objective`);
  }
});

test('coverageForReport groups playable and planned objectives by domain', () => {
  const report = {
    worlds: {
      tide: {
        skills: [
          { id: 'add_20', mastered: true, n: 12, rating: 870 },
          { id: 'sub_20', mastered: true, n: 10, rating: 860 },
        ],
      },
      garden: { skills: [{ id: 'tables_a', mastered: false, n: 3, rating: 650 }] },
      stump: { skills: [] },
      vines: { skills: [] },
    },
  };
  const coverage = coverageForReport('NL_PO', report);
  assert.ok(coverage.domains.operations.total > 0);
  assert.ok(coverage.domains.operations.covered >= 1);
  assert.ok(Number.isInteger(coverage.domains.operations.playable));
  assert.ok(coverage.domains.operations.playable > 0);
  assert.ok(coverage.statusCounts.playable > 0);
  assert.ok(coverage.statusCounts.planned > 0);
});

test('multi-skill objectives are partial until every mapped skill is mastered', () => {
  const coverage = coverageForReport('NL_PO', {
    worlds: {
      tide: { skills: [{ id: 'add_20', mastered: true, n: 12, rating: 870 }] },
    },
  });
  const objective = coverage.domains.operations.objectives
    .find((o) => o.id === 'nl_po.grade3.add_sub_to_20');

  assert.equal(objective.coverage, 'partial');
});

test('coverageForReport tolerates partial reports and unknown pack ids', () => {
  assert.doesNotThrow(() => coverageForReport('NL_PO', {
    worlds: {
      tide: null,
      garden: { skills: null },
    },
  }));

  const coverage = coverageForReport('NL_PO', {
    worlds: {
      tide: null,
      garden: { skills: null },
    },
  });
  assert.equal(coverage.packId, 'NL_PO');
  assert.ok(coverage.domains.operations.total > 0);
  assert.ok(coverage.statusCounts.playable > 0);
  assert.equal(coverageForReport('UNKNOWN', null).packId, 'NL_PO');
});

test('registry exposes NL_PO only for now', () => {
  assert.deepEqual(Object.keys(CURRICULUM_PACKS), ['NL_PO']);
});

test('registered packs expose country metadata for selection', () => {
  assert.deepEqual(listPacks().map((p) => p.id), ['NL_PO']);
  const pack = listPacks()[0];
  assert.equal(pack.countryCode, 'NL');
  assert.equal(pack.countryKey, 'curriculum.country.nl');
});

test('estimateStageFromAge maps ages to NL_PO grade stages', () => {
  assert.equal(estimateStageFromAge('NL_PO', 4), 'grade_1');
  assert.equal(estimateStageFromAge('NL_PO', 6), 'grade_3');
  assert.equal(estimateStageFromAge('NL_PO', 8), 'grade_5');
  assert.equal(estimateStageFromAge('NL_PO', 11), 'grade_8');
  assert.equal(estimateStageFromAge('NL_PO', 13), 'grade_8');
});

test('createCurriculumState stores estimate with soft targeting', () => {
  assert.deepEqual(createCurriculumState({ age: 8 }), {
    packId: 'NL_PO',
    ageAtStart: 8,
    birthDate: null,
    ageCapturedOn: null,
    estimatedStage: 'grade_5',
    confirmedStage: 'grade_5',
    stageSource: 'auto',
    lastPromotionCheck: null,
    lastPromotion: null,
    placementBand: 'unknown',
    strictness: 'soft',
    warmup: { completed: false, results: [], skillIds: [] },
  });
});

test('birth date gives current age and initial curriculum stage', () => {
  assert.equal(ageOnDate('2018-06-15', '2026-06-14'), 7);
  assert.equal(ageOnDate('2018-06-15', '2026-06-15'), 8);

  const curriculum = createCurriculumState({
    birthDate: '2018-06-15',
    today: '2026-06-15',
  });
  assert.equal(curriculum.ageAtStart, 8);
  assert.equal(curriculum.birthDate, '2018-06-15');
  assert.equal(curriculum.ageCapturedOn, '2026-06-15');
  assert.equal(curriculum.estimatedStage, 'grade_5');
  assert.equal(curriculum.confirmedStage, 'grade_5');
});

test('auto curriculum advances upward as a child ages and resets warmup for promotion', () => {
  const curriculum = {
    ...createCurriculumState({ birthDate: '2018-06-15', today: '2026-06-15' }),
    warmup: { completed: true, results: [{ skill: 'tables_b', correct: true }], skillIds: ['tables_b'] },
  };
  const next = refreshCurriculumForDate(curriculum, '2027-06-15');

  assert.equal(currentCurriculumAge(next, '2027-06-15'), 9);
  assert.equal(next.estimatedStage, 'grade_6');
  assert.equal(next.confirmedStage, 'grade_6');
  assert.equal(next.stageSource, 'auto');
  assert.equal(next.lastPromotion.fromStage, 'grade_5');
  assert.equal(next.lastPromotion.toStage, 'grade_6');
  assert.equal(next.lastPromotion.on, '2027-06-15');
  assert.deepEqual(next.warmup, { completed: false, results: [], skillIds: [] });
});

test('age-only profiles can still advance using the captured age date', () => {
  const curriculum = createCurriculumState({ age: 8, today: '2026-06-15' });
  assert.equal(currentCurriculumAge(curriculum, '2027-06-14'), 8);
  assert.equal(currentCurriculumAge(curriculum, '2027-06-15'), 9);
  assert.equal(refreshCurriculumForDate(curriculum, '2027-06-15').estimatedStage, 'grade_6');
});

test('parent confirmed stage stays the lower bound when aging suggests a higher grade', () => {
  const curriculum = {
    ...createCurriculumState({ birthDate: '2018-06-15', today: '2026-06-15' }),
    confirmedStage: 'grade_4',
    stageSource: 'parent',
  };
  const next = refreshCurriculumForDate(curriculum, '2027-06-15');

  assert.equal(next.estimatedStage, 'grade_6');
  assert.equal(next.confirmedStage, 'grade_4');
  assert.equal(next.stageSource, 'parent');
  assert.ok(eligibleSkillIds(next).includes('add_100'));
  assert.ok(!eligibleSkillIds(next).includes('mult_2digit'));
});

test('createCurriculumState normalizes unknown pack ids to the default pack', () => {
  assert.equal(createCurriculumState({ packId: 'UNKNOWN', age: 8 }).packId, 'NL_PO');
});

test('selected curriculum pack controls age estimates and lower bounds', () => {
  CURRICULUM_PACKS.TEST_COUNTRY = {
    id: 'TEST_COUNTRY',
    titleKey: 'curriculum.test.title',
    countryCode: 'TT',
    countryKey: 'curriculum.country.test',
    fallbackStagePrefixKey: 'curriculum.stage',
    stages: [
      { id: 'level_a', order: 1, minAge: 4, maxAge: 9, labelKey: 'curriculum.stage' },
      { id: 'level_b', order: 2, minAge: 9, maxAge: 14, labelKey: 'curriculum.stage' },
    ],
    domains: [{ id: 'operations', labelKey: 'curriculum.domain.operations' }],
    objectives: [
      { id: 'test.level_a.add', stage: 'level_a', domain: 'operations', titleKey: 'x', status: 'playable', gameSkills: ['add_20'] },
      { id: 'test.level_b.frac', stage: 'level_b', domain: 'operations', titleKey: 'y', status: 'playable', gameSkills: ['frac_compare'] },
    ],
  };

  try {
    const curriculum = createCurriculumState({ packId: 'TEST_COUNTRY', age: 8 });
    assert.equal(curriculum.packId, 'TEST_COUNTRY');
    assert.equal(curriculum.estimatedStage, 'level_a');
    assert.deepEqual(eligibleSkillIds(curriculum), ['add_20', 'frac_compare']);

    const strict = { ...curriculum, strictness: 'strict' };
    assert.deepEqual(eligibleSkillIds(strict), ['add_20']);
  } finally {
    delete CURRICULUM_PACKS.TEST_COUNTRY;
  }
});

test('retargetCurriculumPack recalculates age estimate and resets parent stage to selected pack', () => {
  CURRICULUM_PACKS.TEST_COUNTRY = {
    id: 'TEST_COUNTRY',
    titleKey: 'curriculum.test.title',
    countryCode: 'TT',
    countryKey: 'curriculum.country.test',
    fallbackStagePrefixKey: 'curriculum.stage',
    stages: [
      { id: 'level_a', order: 1, minAge: 4, maxAge: 9, labelKey: 'curriculum.stage' },
      { id: 'level_b', order: 2, minAge: 9, maxAge: 14, labelKey: 'curriculum.stage' },
    ],
    domains: [{ id: 'operations', labelKey: 'curriculum.domain.operations' }],
    objectives: [],
  };

  try {
    const oldState = {
      ...createCurriculumState({ age: 11 }),
      confirmedStage: 'grade_5',
      stageSource: 'parent',
      placementBand: 'ahead',
      warmup: { completed: true, results: [{ correct: true }], skillIds: ['mult_2digit'] },
    };
    const next = retargetCurriculumPack(oldState, 'TEST_COUNTRY');
    assert.equal(next.packId, 'TEST_COUNTRY');
    assert.equal(next.ageAtStart, 11);
    assert.equal(next.estimatedStage, 'level_b');
    assert.equal(next.confirmedStage, 'level_b');
    assert.equal(next.stageSource, 'auto');
    assert.equal(next.placementBand, 'unknown');
    assert.deepEqual(next.warmup, { completed: false, results: [], skillIds: [] });
  } finally {
    delete CURRICULUM_PACKS.TEST_COUNTRY;
  }
});

test('missing and blank ages remain unknown', () => {
  assert.equal(estimateStageFromAge('NL_PO', null), null);
  assert.equal(estimateStageFromAge('NL_PO', undefined), null);
  assert.equal(estimateStageFromAge('NL_PO', ''), null);
  assert.equal(estimateStageFromAge('NL_PO', '   '), null);
  assert.equal(createCurriculumState().ageAtStart, null);
});

test('numeric string ages are parsed into curriculum state', () => {
  const state = createCurriculumState({ age: '8' });
  assert.equal(estimateStageFromAge('NL_PO', '8'), 'grade_5');
  assert.equal(state.ageAtStart, 8);
  assert.equal(state.estimatedStage, 'grade_5');
});

test('scoreWarmup gives below/on/ahead bands without permanent labels', () => {
  assert.equal(scoreWarmup([{ correct: false }, { correct: true }, { correct: false }]).band, 'below');
  assert.equal(scoreWarmup([{ correct: true }, { correct: false }, { correct: true }]).band, 'on_track');
  assert.equal(scoreWarmup([{ correct: true }, { correct: true }, { correct: true }]).band, 'ahead');
});

test('eligibleSkillIds softly includes previous current and next stage skills', () => {
  const curriculum = createCurriculumState({ age: 8 });
  const soft = eligibleSkillIds(curriculum);
  assert.ok(soft.includes('tables_b'));
  assert.ok(soft.includes('tables_c'));
  assert.ok(soft.includes('mult_2digit'));
  assert.ok(!soft.includes('frac_compare'));

  const strict = eligibleSkillIds({ ...curriculum, strictness: 'strict' });
  assert.ok(strict.includes('tables_b'));
  assert.ok(strict.includes('tables_c'));
  assert.ok(!strict.includes('mult_2digit'));
});

test('age estimate is the default lower bound for eligible skills', () => {
  const curriculum = createCurriculumState({ age: 8 });
  const soft = eligibleSkillIds(curriculum);
  assert.ok(!soft.includes('add_100'));
  assert.ok(!soft.includes('sub_100'));
  assert.ok(!soft.includes('tables_a'));
  assert.ok(soft.includes('tables_b'));
  assert.ok(soft.includes('mult_2digit'));

  const below = eligibleSkillIds({ ...curriculum, placementBand: 'below' });
  assert.ok(!below.includes('add_100'));
  assert.ok(!below.includes('sub_100'));
  assert.ok(!below.includes('tables_a'));
  assert.ok(below.includes('tables_b'));
});

test('parent confirmed stage can override the age lower bound', () => {
  const curriculum = {
    ...createCurriculumState({ age: 11 }),
    confirmedStage: 'grade_5',
  };
  const soft = eligibleSkillIds(curriculum);
  assert.ok(soft.includes('tables_b'));
  assert.ok(soft.includes('tables_c'));
  assert.ok(!soft.includes('add_20'));
});

test('age eleven warmup starts with representative grade eight gameplay probes', () => {
  assert.deepEqual(
    eligibleSkillIds(createCurriculumState({ age: 11 })).slice(0, 3),
    ['mult_2digit', 'div_remainder', 'frac_compare'],
  );
});

test('invalid confirmedStage falls back to estimatedStage for eligibility', () => {
  const curriculum = {
    ...createCurriculumState({ age: 8 }),
    confirmedStage: 'grade_missing',
    strictness: 'strict',
  };
  const strict = eligibleSkillIds(curriculum);
  assert.ok(strict.includes('tables_b'));
  assert.ok(strict.includes('tables_c'));
  assert.ok(!strict.includes('mult_2digit'));
});

test('soft eligibility windows clamp at first and last stages', () => {
  const first = eligibleSkillIds(createCurriculumState({ age: 4 }));
  assert.deepEqual(first, []);
  assert.ok(!first.includes('add_20'));
  assert.ok(!first.includes('tables_b'));
  assert.ok(!first.includes('mult_2digit'));

  const last = eligibleSkillIds(createCurriculumState({ age: 13 }));
  assert.ok(last.includes('mult_2digit'));
  assert.ok(last.includes('div_remainder'));
  assert.ok(last.includes('missing_factor'));
  assert.ok(last.includes('frac_compare'));
  assert.ok(last.includes('frac_equiv'));
  assert.ok(!last.includes('add_20'));
  assert.ok(!last.includes('add_100'));
  assert.ok(!last.includes('tables_a'));
});
