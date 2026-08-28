# Agent Instructions

> **Scope:** This file applies to the entire repository.  
> **Last reviewed:** 2026-08-28

## Project objective

Build a free, local-first Android flashcard application that uses FSRS v6 through `ts-fsrs`. The product must provide a simple, smooth, intuitive, and accessible review experience while progressively exposing useful scheduling information to interested users.

This application is also a college final project (*Trabalho de Conclusão de Curso*, or TCC). Phase 1 is the required delivery. Phase 2 contains stretch goals. Phase 3 is post-TCC work and must not enter implementation without explicit user approval.

Read [`docs/project-overview.md`](docs/project-overview.md) before making product, scope, or architectural judgments.

## Instruction scope

- These instructions govern the current domain exploration and all future repository areas, including UI and persistence.
- A nested `AGENTS.md` may add stricter rules for its directory but must not weaken this file without explicit user approval.
- A clearly authorized user request may override a rule for that task. If the override is ambiguous, stop and ask.
- Do not silently resolve conflicts between the task, documentation, accepted ADRs, and implementation. Report the conflict and request direction.

## Sources of truth

Consult the narrowest relevant sources before editing:

1. The user's current request and its acceptance criteria.
2. `docs/project-overview.md` for product purpose, delivery phases, constraints, and non-goals.
3. `docs/system-specification.md`, when present, for functional and quality requirements.
4. `docs/architecture/`, when present, for current boundaries, responsibilities, and dependency rules.
5. `docs/adr/`, when present, for accepted architectural decisions and their reasoning.
6. `docs/research/`, when present, for experiments, evidence, and unresolved research questions.
7. The repository configuration for executable commands and tooling.

Do not treat a chat discussion, exploratory script, or temporary implementation as a durable decision until its conclusion is transferred to the appropriate specification, architecture document, research note, issue, or ADR.

## Current implementation phase

The current implementation work is an exploration of `ts-fsrs` and the first version of the domain in pure TypeScript. Phase 1 describes the complete TCC delivery target; it does not authorize implementing every Phase 1 feature during the current domain task.

During the exploration phase:

- Work outside React Native and Expo.
- Do not introduce SQLite, Android APIs, device APIs, navigation, hooks, or UI concerns into the domain.
- Use small deterministic scenarios to understand `ts-fsrs` before finalizing domain models.
- Start from one card and fixed dates, then inspect the results of `Again`, `Hard`, `Good`, and `Easy` independently.
- Record relevant inputs, complete outputs, observations, conclusions, and open questions in the research documentation.
- Treat exploratory structures as provisional until their behavior and invariants are understood.
- Do not implement long temporal simulations, advanced analytics, or a complete review-history feature unless explicitly requested.

The expected initial implementation areas are `src/domain/` for domain code and `scripts/scenarios/` for disposable or research-oriented experiments. Do not create this structure speculatively if the active task does not require it.

## Scope guardrails

### Phase 1 — Required delivery

Prioritize only the required TCC scope defined in `docs/project-overview.md`, including:

- Android development build.
- Onboarding.
- Local-first persistence and offline operation.
- JSON deck import.
- Text cards with a front and back.
- Deck listing, search, property editing, tags, filtering, and deletion.
- Card flags and their minimum management interface.
- Due-card review using `Again`, `Hard`, `Good`, and `Easy`.
- FSRS scheduling, immediate review persistence, and undo.
- Desired retention as the principal editable FSRS setting.
- Clear deck information and progressively disclosed scheduling information.
- Accessible, understandable, and reliable UI/UX.

### Phase 2 — Stretch goals

Do not implement Phase 2 work opportunistically. It may begin only when the user explicitly requests it and the relevant Phase 1 foundation is stable.

### Phase 3 — Post-TCC

Do not implement or prepare speculative infrastructure for:

- Accounts, OAuth 2.0, or OpenID Connect.
- Backend services.
- Cloud storage, backup, or synchronization.
- Discover or public deck publishing.
- In-app deck or card authoring.
- Social, collaborative, generative-AI, or advanced-gamification features.

Phase 3 possibilities are not current requirements and do not justify abstractions, dependencies, schemas, or extension points today.

## Architecture constraints

### Dependency direction

- The domain must remain independently testable in a plain TypeScript environment.
- The domain must not import React Native, Expo, SQLite, UI frameworks, hooks, navigation, filesystem APIs, or device APIs.
- UI code must call public application/domain operations. It must not contain scheduling or persistence business rules.
- UI code must not call `ts-fsrs` or SQLite directly.
- Persistence implementations must connect through explicit boundaries and must not dictate the domain model.
- Infrastructure-specific and library-specific objects must not leak through the public domain API.

### FSRS boundary

- The domain owns review and scheduling behavior.
- Only a dedicated internal domain integration may call `ts-fsrs`.
- Expose application terminology such as `ReviewRating`; translate library ratings and data internally.
- Preserve every scheduling field required to calculate a later review correctly, but do not expose fields merely because the library returns them.
- Desired retention is the only required user-editable FSRS setting in Phase 1 unless the specification is explicitly changed.
- Advanced FSRS values may be presented progressively, but agents must not add deep parameter editing or automatic optimization without approval.
- Do not replace, modify, or reimplement the FSRS algorithm.

### Time and determinism

- Supply time explicitly to domain operations, for example through `reviewedAt` or an injected clock.
- Do not call `new Date()`, `Date.now()`, or another wall-clock source inside core business rules.
- Use fixed instants in scenarios and tests.
- State timezone assumptions explicitly at system boundaries and avoid environment-dependent date behavior.

### Local-first data integrity

- All required Phase 1 study behavior must work without a network connection.
- A completed review must be persisted immediately; finishing the entire session must not be required.
- Review persistence must not leave the card state, scheduling state, and undo information partially updated.
- Closing and reopening the app must preserve the state required by Phase 1.
- Do not create a full review-history feature solely because it may be useful later. Retain only the information required by current use cases, correctness, undo, accepted analytics requirements, or documented research evidence.
- Exact schemas, transaction boundaries, and migrations require documentation and approval before becoming architectural commitments.

### Modularity

- Prefer small, cohesive modules organized around current responsibilities.
- Keep business rules explicit and close to the domain concepts they govern.
- Avoid a single large service that accumulates unrelated behavior.
- Do not create an interface, adapter, factory, repository, service, or generic abstraction only because it might be useful later.
- Reuse an abstraction only after a real current boundary or repeated behavior justifies it.
- Maximum modularity means clear responsibility and replaceable boundaries, not the maximum number of files or layers.

## Approval gates

Unless the user's current request already grants explicit authorization, stop and ask before:

- Adding, removing, or upgrading a runtime or development dependency.
- Selecting or replacing the package manager, test runner, build system, linter, or formatter.
- Changing the public domain API or a documented use-case contract.
- Changing dependency direction, layer responsibilities, or another architectural boundary.
- Expanding work from Phase 1 into Phase 2 or Phase 3.
- Adding functionality not present in an accepted specification or task.
- Establishing or changing a persisted schema, migration strategy, or public import/export format.
- Accepting, superseding, or materially rewriting an ADR.
- Performing a destructive data migration or removing user-owned data.

Agents may identify alternatives and draft an ADR with `Proposed` status. Only the user may approve a scope expansion or turn a proposed architectural decision into an accepted project decision.

## Tooling and commands

Tooling is intentionally not fixed by this document.

- Treat `package.json`, declared scripts, configuration files, and the repository lockfile as the source of truth.
- Infer the package manager from the existing lockfile. Do not generate a different lockfile.
- Do not invent commands that are not configured in the repository.
- If no package manager, test runner, or required script has been established, report that fact and ask before selecting one.
- Run the narrowest relevant declared check first, followed by broader checks when justified.
- Do not weaken compiler, lint, test, or coverage settings to make a change pass.
- Update this section with concrete commands only after the project has adopted them.

## Testing and exploration

- Exploratory scripts are the intentional first step for unfamiliar `ts-fsrs` behavior.
- Exploration does not permanently replace automated tests. Once inputs, outputs, and invariants are understood, encode stable domain rules in focused automated tests.
- Do not introduce a test runner without approval.
- Use deterministic dates and independent starting state for comparisons between ratings.
- At minimum, scheduling behavior must eventually cover `Again`, `Hard`, `Good`, and `Easy`.
- Test domain behavior without starting React Native, Expo, Android, or SQLite.
- When persistence is introduced, test interruption and restart behavior, immediate review saving, and undo consistency.
- When fixing a reproducible bug, add a focused regression test if a test harness exists.
- Long-running temporal simulations remain deferred unless explicitly requested.
- If a required check cannot run, report why and describe exactly what was validated instead.

Tests should document business rules, not reproduce the internal implementation of `ts-fsrs`.

## Code and writing conventions

- Use English for code, identifiers, comments, documentation, test descriptions, and agent-authored commit or pull-request text.
- Preserve external terminology and user-facing copy when a task explicitly requires another language.
- Prefer clear domain vocabulary over generic names such as `manager`, `helper`, or `data`.
- Use explicit types at public boundaries.
- Avoid `any`; if unavoidable at an external boundary, isolate and justify it.
- Comments should explain reasoning, constraints, or non-obvious behavior rather than narrating the code.
- Follow the formatter, linter, TypeScript configuration, and naming style already present in the repository.
- Do not reformat unrelated files.

## Documentation rules

- Update documentation when a change alters behavior, scope, architecture, research conclusions, setup, or validation commands.
- Keep high-level product information in `docs/project-overview.md`.
- Keep detailed behavior and acceptance criteria in the system specification.
- Keep current technical structure in `docs/architecture/`.
- Use ADRs only for decisions that are meaningful and costly to reverse.
- Do not erase the history of an accepted ADR. Create a new ADR and mark the earlier one as superseded when the decision changes.
- Record `ts-fsrs` experiments in `docs/research/` with fixed inputs, observed outputs, conclusions, and unanswered questions.
- Transfer useful evidence into the evidence log when a milestone, experiment, validation, or usability study may support the monograph.
- Do not create empty documentation trees or documents that merely duplicate source code.

## Working procedure

1. Read this file, the active task, and the relevant documentation.
2. Inspect the repository state and preserve unrelated user changes.
3. Identify the applicable delivery phase and acceptance criteria.
4. Resolve contradictions or missing authority before editing.
5. Make the smallest cohesive change that satisfies the task.
6. Add or update focused validation for changed behavior.
7. Run the relevant declared checks.
8. Update documentation and research evidence when required.
9. Review the diff for scope expansion, architecture violations, and unrelated edits.

Do not commit, push, publish, open a pull request, or modify remote project-management state unless the user explicitly requests that action.

## Completion report

Every completed task must report:

- The outcome delivered.
- Files changed.
- Tests, scripts, or checks run and their results.
- Documentation or evidence updated.
- Decisions, assumptions, or user approvals relied upon.
- Remaining blockers, risks, or intentionally deferred work.

Never claim that a check passed if it was not run. Distinguish implementation completion from unverified behavior.
