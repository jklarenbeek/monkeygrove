import { test } from 'vitest';
import assert from 'node:assert/strict';
import { coverageForReport, getPack, listObjectives } from '../src/curriculum/index.js';
import { BUSINESS_MODES } from '../src/business/data.js';
import { createShopState, dailyBusinessReport } from '../src/business/engine.js';

function assertBusinessModesKnown(objectives) {
  const modeIds = new Set(Object.keys(BUSINESS_MODES));
  for (const objective of objectives) {
    for (const mode of objective.businessModes || []) {
      assert.ok(modeIds.has(mode), `${objective.id} mode ${mode}`);
    }
  }
}

test('business modes point to real NL_PO objectives', () => {
  const objectives = new Set(listObjectives('NL_PO').map((o) => o.id));
  for (const mode of Object.values(BUSINESS_MODES)) {
    assert.ok(objectives.has(mode.objectiveId), `${mode.id} maps to ${mode.objectiveId}`);
  }
});

test('business-covered objectives have businessModes metadata', () => {
  const objectives = new Map(listObjectives('NL_PO').map((o) => [o.id, o]));
  for (const mode of Object.values(BUSINESS_MODES)) {
    const objective = objectives.get(mode.objectiveId);
    assert.ok(objective, `${mode.id} maps to ${mode.objectiveId}`);
    assert.equal(objective.status, 'playable');
    assert.ok(
      (objective.businessModes || []).includes(mode.id),
      `${mode.objectiveId} includes ${mode.id}`,
    );
  }
  assertBusinessModesKnown(listObjectives('NL_PO'));
});

test('coverageForReport includes business progress beside math skills', () => {
  const business = createShopState('bakery');
  business.progress.money_make_amounts = { attempts: 4, correct: 4 };
  business.progress.recipe_measure_whole = { attempts: 2, correct: 1 };
  const coverage = coverageForReport('NL_PO', { worlds: {} }, {
    business: dailyBusinessReport(business),
  });

  const measurement = coverage.domains.measurement_geometry.objectives;
  const money = measurement.find((o) => o.id === 'nl_po.grade4.money_to_100');
  const measure = measurement.find((o) => o.id === 'nl_po.grade5.measurement_units_intro');

  assert.equal(money.coverage, 'covered');
  assert.equal(measure.coverage, 'partial');
});

test('covered math skills stay covered when business progress is partial', () => {
  const business = createShopState('bakery');
  business.progress.repeated_addition_orders = { attempts: 1, correct: 0 };
  const coverage = coverageForReport('NL_PO', {
    worlds: {
      garden: { skills: [{ id: 'tables_a', mastered: true, n: 12, rating: 900 }] },
    },
  }, {
    business: dailyBusinessReport(business),
  });
  const objective = coverage.domains.operations.objectives
    .find((o) => o.id === 'nl_po.grade4.tables_2_5_10');

  assert.equal(objective.coverage, 'covered');
});

test('multi-mode business objectives require every mapped mode for covered', () => {
  const pack = getPack('NL_PO');
  const objective = {
    id: 'nl_po.test.multi_business_coverage',
    stage: 'grade_4',
    domain: 'measurement_geometry',
    titleKey: 'curriculum.nl_po.objective.test_multi_business_coverage',
    status: 'playable',
    gameSkills: [],
    businessModes: ['money_make_amounts', 'recipe_measure_whole'],
  };
  pack.objectives.push(objective);

  try {
    const coverage = coverageForReport('NL_PO', { worlds: {} }, {
      business: {
        modes: {
          money_make_amounts: { coverage: 'covered' },
        },
      },
    });
    const entry = coverage.domains.measurement_geometry.objectives
      .find((o) => o.id === objective.id);

    assert.equal(entry.coverage, 'partial');
  } finally {
    const index = pack.objectives.indexOf(objective);
    if (index >= 0) pack.objectives.splice(index, 1);
  }
});
