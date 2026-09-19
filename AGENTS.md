# Agent Instructions

> **Scope:** This file applies to the entire repository.  
> **Last reviewed:** 2026-08-31

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
3. `docs/system-specification.md`, when present, for functional requirements, business rules, non-functional requirements, requirement-level phase assignments, priorities, and statuses.
4. `docs/architecture/`, when present, for current boundaries, responsibilities, and dependency rules.
5. `docs/adr/`, when present, for accepted architectural decisions and their reasoning.
6. `docs/research/`, when present, for experiments, evidence, and unresolved research questions.
7. The repository configuration for executable commands and tooling.

Do not treat a chat discussion, exploratory script, or temporary implementation as a durable decision until its conclusion is transferred to the appropriate specification, architecture document, research note, issue, or ADR.

At requirement level, `docs/system-specification.md` is canonical. `docs/project-overview.md` summarizes the product and phases and must not duplicate the requirement matrices. GitHub Issues and GitHub Projects may track implementation work, but their items must cite the relevant requirement IDs and must not silently replace requirement text or status. Closing an implementation item does not by itself make a requirement `Verificado`; verification requires corresponding evidence and a documentation update.

## Current implementation phase

The current implementation work is an exploration of `ts-fsrs` and the first version of the domain in pure TypeScript. Phase 1 describes the complete final TCC delivery target, planned for June 2027; it does not authorize implementing every Phase 1 feature during the current domain task. The institutional TCC I checkpoint on 2026-11-18 has intermediate academic deliverables and does not require completion of Phase 1.

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
- Atomic JSON deck import: import the complete deck or reject the file.
- Text cards with a front and back.
- Deck listing, opening, and deletion from the local library.
- Deck-level editing of name, desired retention, maximum cards per session, and daily number of new cards, without editing imported card content.
- Deck tags and chip-based filtering; when no chip is selected, show all decks.
- One flag per card with an optional editable note; add it during review or individual card view, remove it from the card itself, and show flagged cards inside their deck.
- Reviews started from an open deck, prioritizing cards due for the current study day and filling remaining accepted capacity with new cards subject to the deck limits.
- Review ratings using `Again`, `Hard`, `Good`, and `Easy`.
- FSRS scheduling, persistence of each rating before advancing to the next card, and undo of only the latest rating while the current session remains active.
- A neutral indication of currently available cards, with its final presentation and possible next-review date left open until the specification resolves them.
- Progressively disclosed advanced FSRS information in a collapsed section after the main deck information.
- A global configurable study-day boundary, defaulting to 04:00 in the device's local time, with active sessions retaining their starting study day.
- A 200 ms card-flip animation in the UI; treat this as motion duration, not as a general response-time target.
- Accessible, understandable, and reliable UI/UX.

### Phase 2 — Stretch goals

Do not implement Phase 2 work opportunistically. It may begin only when the user explicitly requests it and the relevant Phase 1 foundation is stable. Phase 2 includes:

- Textual deck search.
- A fuller local profile and user-level settings.
- Centralized flag visualization and management.
- CSV and APKG import, deck export, local backup, and restoration.
- Interface colors, dark mode, and other visual customization.
- Analytics, study statistics, and complete review history.
- Image, cloze-deletion, and typed-answer cards.
- Study goals, reminders, and local notifications.
- Richer post-session feedback.
- PWA delivery and tablet adaptation.

### Phase 3 — Post-TCC

Do not implement or prepare speculative infrastructure for:

- Accounts, OAuth 2.0, or OpenID Connect.
- Backend services.
- Cloud storage, backup, or synchronization.
- Background synchronization.
- Discover or public deck publishing.
- Server-side relevance ordering and remote security or privacy behavior.
- In-app deck or card authoring.
- Social, collaborative, generative-AI, or advanced-gamification features.

Phase 3 possibilities are not current requirements and do not justify abstractions, dependencies, schemas, or extension points today.

### Open requirement guardrails

Always re-read the current statuses in `docs/system-specification.md`. At this revision, agents must not choose final behavior for:

- `RF-026`: presentation and location of the available-card count, including whether to show a next-review date.
- `RN-008`: behavior when due cards exceed the configured session limit.
- `RN-009`: whether the session limit can be disabled.
- `RNF-010`: the measurable usability threshold for the research protocol.
- `RNF-011`: the measurable satisfaction threshold for the research protocol.
- `RF-041`: notification triggers, frequency, content, silent hours, and deck relationships.
- `RN-019`: the relevance criteria used by Discover.
- `RNF-015`: remote-service security and privacy requirements.

Do not encode an unresolved option as a default, UI promise, persisted field, test expectation, or architectural commitment. If an active task depends on one of these decisions, stop and ask. After the user decides, update the specification before implementing the behavior.

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
- Preserve the accepted user-language mapping: `Errei` to `Again`, `Difícil` to `Hard`, `Bom` to `Good`, and `Fácil` to `Easy`.
- Preserve every scheduling field required to calculate a later review correctly, but do not expose fields merely because the library returns them.
- Desired retention is the only required user-editable FSRS parameter in Phase 1 unless the specification is explicitly changed.
- Maximum cards per session and daily new-card limits are application policies, not editable FSRS parameters. Do not use them to justify exposing deeper library configuration.
- Advanced FSRS values may be presented progressively, but agents must not add deep parameter editing or automatic optimization without approval.
- Follow validated FSRS v6 scheduling outcomes. Do not force a card rated `Again` to repeat until the user answers it correctly.
- Do not replace, modify, or reimplement the FSRS algorithm.

### Time and determinism

- Supply time explicitly to domain operations, for example through `reviewedAt` or an injected clock.
- Do not call `new Date()`, `Date.now()`, or another wall-clock source inside core business rules.
- Use fixed instants in scenarios and tests.
- The study-day boundary is global and user-configurable, defaults to 04:00, and is evaluated in the device's local time.
- A review session keeps the study day on which it started even if it crosses the boundary. The next session uses the new study day.
- State timezone assumptions explicitly at system boundaries and avoid environment-dependent date behavior.

### Local-first data integrity

- All required Phase 1 study behavior must work without a network connection.
- JSON import must validate and persist the complete deck atomically. Do not retain a partially imported deck.
- A completed review must be persisted before the next card is presented; finishing the entire session must not be required.
- Review persistence must not leave the card state, scheduling state, and undo information partially updated.
- Closing and reopening the app must preserve decks, scheduling progress, tags, flags and their notes, deck settings, global settings, and the other state required by Phase 1.
- Deck deletion must remove its associated local data through the accepted deletion operation. Do not invent an archive or recovery feature unless the specification changes.
- Complete review history is a Phase 2 feature. In Phase 1, retain only the information required by current use cases, scheduling correctness, immediate persistence, and undo.
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
- Changing a requirement's intended meaning, phase, priority, or status.
- Treating a requirement marked `Em discussão` as final behavior.
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
- When import is introduced, test complete success, invalid-file rejection, and prevention of partial deck persistence.
- When session selection is introduced, test due-card priority, accepted new-card limits, and the final overflow behavior after the open requirements are resolved.
- Test the 04:00 study-day boundary on both sides and a session that crosses it.
- When flags are introduced, test addition, optional-note editing, removal, and persistence.
- When persistence is introduced, test interruption and restart behavior, saving before the next card is presented, and undo consistency.
- Validate the 200 ms card flip at the UI level rather than as a domain timing rule.
- When fixing a reproducible bug, add a focused regression test if a test harness exists.
- Long-running temporal simulations remain deferred unless explicitly requested.
- If a required check cannot run, report why and describe exactly what was validated instead.

Tests should document business rules, not reproduce the internal implementation of `ts-fsrs`.

## Code and writing conventions

- Use English for code, identifiers, comments, general documentation, test descriptions, and agent-authored commit or pull-request text.
- Keep `docs/system-specification.md` and the requirement text it owns in Portuguese unless the user explicitly changes that policy.
- Preserve external terminology and required user-facing copy when a task explicitly uses another language.
- Prefer clear domain vocabulary over generic names such as `manager`, `helper`, or `data`.
- Use explicit types at public boundaries.
- Avoid `any`; if unavoidable at an external boundary, isolate and justify it.
- Comments should explain reasoning, constraints, or non-obvious behavior rather than narrating the code.
- Follow the formatter, linter, TypeScript configuration, and naming style already present in the repository.
- Do not reformat unrelated files.

## Documentation rules

- Update documentation when a change alters behavior, scope, architecture, research conclusions, setup, or validation commands.
- Keep high-level product information in `docs/project-overview.md`.
- Keep detailed RF, RN, RNF, phase assignments, statuses, traceability, and acceptance criteria in `docs/system-specification.md`.
- Keep Markdown links relative and documentation readable in both the repository and GitHub Pages.
- Use requirement IDs in GitHub Issues and Projects instead of duplicating the complete requirement text there.
- Mark a requirement `Verificado` only when corresponding validation evidence exists and is referenced or recorded appropriately.
- Keep current technical structure in `docs/architecture/`.
- Use ADRs only for decisions that are meaningful and costly to reverse.
- Do not erase the history of an accepted ADR. Create a new ADR and mark the earlier one as superseded when the decision changes.
- Record `ts-fsrs` experiments in `docs/research/` with fixed inputs, observed outputs, conclusions, and unanswered questions.
- Transfer useful evidence into the evidence log when a milestone, experiment, validation, or usability study may support the monograph.
- Do not create empty documentation trees or documents that merely duplicate source code.

## Working procedure

1. Read this file, the active task, and the relevant documentation.
2. Inspect the repository state and preserve unrelated user changes.
3. Identify the applicable delivery phase, requirement status, and acceptance criteria.
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
