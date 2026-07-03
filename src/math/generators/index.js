// The per-skill generator registry. nextProblem indexes GEN by skillId; each
// generator returns the inner problem fields (kind/equation/answer/choices/model/
// difficulty/meta) and nextProblem wraps them with id/skillId/world/scaffold.
// Split by math domain — add a skill by adding it to the matching domain module.
import { ARITH } from './arithmetic.js';
import { MULT } from './multiplication.js';
import { DIV } from './division.js';
import { FRAC } from './fractions.js';
import { DEC } from './decimals.js';

export const GEN = { ...ARITH, ...MULT, ...DIV, ...FRAC, ...DEC };
