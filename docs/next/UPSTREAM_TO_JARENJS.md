# Upstream to jarenjs — optional generalized ideas

These are **ideas Monkeygrove may prove in-product**, then optionally
generalize into jarenjs. They are **not** a plan to move NL_PO, the ladder,
or island UX into `/workspace/jarenjs`.

## Principle

Monkeygrove = product + pedagogy content. jarenjs = reusable JSON/schema/
contract/FSM/AI toolchain. Upstream only what is domain-agnostic.

## Candidate upstream ideas

### 1. Session/message schema patterns
Versioned JSON envelopes with hello/welcome capability negotiation — useful
beyond games. Could become examples or small helpers near `@jarenjs/contract`
or schema recipes — not Monkeygrove message names.

### 2. Offline event ledger
Append-only, schema-validated event logs with soft-fail validation (validate
package) and optional export bundles. General “local-first telemetry”
pattern; Monkeygrove keeps event type vocabulary local.

### 3. Tool-guarded tutoring pattern (Phase D learnings)
Document how `@jarenjs/ai` toolboxes should wrap a deterministic domain
engine so models cannot invent domain moves. Feedback to ai package docs /
examples (math-agnostic: “engine-approved tools only”).

### 4. FSM parity tests for flow
If checkup is expressed as `@jarenjs/flow` beside JS, the parity-test harness
pattern may strengthen flow docs (golden traces). Keep checkup.js canonical
in Monkeygrove until parity is proven.

### 5. Deterministic host injection
Pattern: pure engines never read clock/entropy; host injects rng + now.
Worth a short jarenjs HOWTO note for agent/tool loops and FSMs — inspired by
mathengine.js contracts in ARCHITECTURE.md.

## Explicitly not upstream

- `src/curriculum/nl_po.js`, `ladder.js`, SLO domain maps
- Verb/Three presentation, island economy, yijing story
- Child i18n copy, Mimi persona, Memory Grove loci images
- GPL game code into MIT packages without a deliberate dual-license decision

## Process

1. Prove in Monkeygrove behind the session protocol.
2. Extract a minimal, domain-free example + schema.
3. PR to jarenjs with docs; Monkeygrove continues to pin/consume.
4. Never block Monkeygrove releases on upstream merge.

## Cross-links

- JARENJS_INTEGRATION.md, ROADMAP.md, VISION.md
