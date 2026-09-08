# A/B testing — skins on one engine protocol

Goal: compare **frontends/looks** (and related chrome) while holding the
curriculum/math engine constant. Same problems, ratings, checkup, memory
policy — different presentation.

## What may differ by arm

- SkinId / visual language (voxel vs future skins) — MULTI_SKIN.md
- Juice intensity, HUD layout, helper copy tone (still i18n keys)
- Optional capability sets that only affect presentation fallbacks

## What must NOT differ by arm

- `nextProblem` / Elo / `eligibleSkillIds` / checkup machine logic
- Save schema semantics (`src/state.js`)
- Curriculum pack content (`nl_po.js`, `ladder.js`)
- Reward economy balance (`config.js` BALANCE) unless the experiment is
  explicitly about economy (default: freeze balance across arms)

## Assignment

- Sticky per profile at creation (or first launch after experiment enable).
- Store `{ experimentId, arm, assignedAt }` under profile.flags.ab or settings.
- Deterministic hash(profileId + experimentId) for reproducible assignment
  without a server.
- Parent dashboard may show “look” name; never “you are in a test” to the child.

## Metrics (from offline events)

Primary (learning, engine-held):
- Expected-success calibration (target ~0.65) vs observed
- Mastery gains per skill over fixed calendar windows
- Checkup frontier stability / re-check outcomes
- Hint use and post-hint accuracy (incl. memory arms)

Secondary (experience, skin-held):
- Session length, return next day, chambers completed
- Accessibility toggles used (a11y.js)
- Soft drop-offs (leave chamber mid-run)

Guardrails: no countdown pressure metrics; no “speed score” as a success KPI
for kids.

## Ethics (kids / school)

- Offline-first; opt-in export only (parent/school).
- No dark patterns; no ads; no accounts (DESIGN.md / README).
- Child UI never says test/score-penalty; parent screens may show coverage.
- Experiments that change pedagogy (not just look) need an explicit design
  review and docs/ note — default A/B is **skin-only**.
- School deployments: prefer class-level consent for any export; keep raw
  event logs on device unless a district agreement exists (future).
- Stop rules: if an arm harms calibration or retention vs control beyond a
  pre-registered threshold, force control skin.

## Non-goals

- Server-side randomization as a requirement.
- Personalization that silently changes the skill ladder per arm.
- Using A/B to justify shipping AI early.

## Cross-links

- MULTI_SKIN.md, MEMORY_AND_TELEMETRY.md, SESSION_PROTOCOL.md, ROADMAP.md
