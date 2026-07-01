// The two domain vocabularies, mapped in ONE place. This closes the first of the
// structural-debt seams named in SUPER_PROMPT §3: the NL_PO curriculum pack speaks
// five English domains a parent recognises, while the Tree of Learning and the
// 64-step ladder (docs/04) speak the four Dutch SLO (kerndoelen) domains. They are
// the same territory cut two ways. This file is the single source of truth that ties
// them together; tests/tree.test.mjs and tests/ladder-coherence.test.mjs both consume
// it, so if the vocabularies ever drift a test reddens rather than the meaning quietly
// rotting.
//
// PURE DATA + tiny lookups: no DOM, no engine import.

// The four canonical SLO domains the Tree and the ladder use (author/parent vocabulary,
// never child-facing).
export const SLO_DOMAINS = Object.freeze(['GETALLEN', 'VERHOUDINGEN', 'METEN_MEETKUNDE', 'VERBANDEN']);

// The five NL_PO pack domains a parent sees -> their SLO domain. Total over the pack's
// `domains`: numbers and operations are both "getallen en bewerkingen"; ratios are
// verhoudingen; measurement/geometry is meten & meetkunde; data/relationships are
// verbanden.
export const NL_PO_TO_SLO = Object.freeze({
  numbers: 'GETALLEN',
  operations: 'GETALLEN',
  ratios: 'VERHOUDINGEN',
  measurement_geometry: 'METEN_MEETKUNDE',
  data_relationships: 'VERBANDEN',
});

export const isSloDomain = (d) => SLO_DOMAINS.includes(d);
export const sloForDomain = (nlPoDomain) => NL_PO_TO_SLO[nlPoDomain] || null;
