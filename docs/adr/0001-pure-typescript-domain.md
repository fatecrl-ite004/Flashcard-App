# ADR 0001 — Pure TypeScript Domain and FSRS Integration Boundary

- **ADR number:** 0001
- **Title:** Pure TypeScript Domain and FSRS Integration Boundary
- **Date:** 2026-10-28
- **Owner:** Enzo
- **Status:** Proposed

## Context

Flashcard App is a local-first Android application and a college final project. Its required Phase 1 delivery includes FSRS v6 scheduling through `ts-fsrs`, due-card selection, an optional round limit, an adaptive new-card suggestion, immediate review persistence, and sequential undo of confirmed ratings in reverse order within an active session.

These responsibilities interact during study. A rating requires a scheduling calculation and consistent storage of its effects before the interface can advance. Session preparation also combines study rules with retrieval and persistence of the state needed to apply them.

The current implementation stage is an exploration of `ts-fsrs` and the initial domain model in TypeScript. The project needs to explore and test study behavior without starting React Native, Expo, Android, or a database. Its UI will evolve through usability research, so scheduling and study rules must remain independent of screen components and hooks.

The project already requires an independent domain and an internal integration with `ts-fsrs`. This ADR records the proposed responsibility boundaries and their rationale together. Detailed requirement behavior remains defined by the system specification and use cases.

## Decision

Use a pure TypeScript domain, encapsulate `ts-fsrs` within that domain, and coordinate user operations through application use cases.

1. **The domain owns scheduling and study rules.** It calculates scheduling changes and applies accepted rules for card eligibility, round capacity, new-card suggestions, and study counts from explicit inputs. It does not read or write storage, access device APIs, or control the interface. Calling a rule an application policy in the specification describes a product rule; it does not require that rule to reside in the application coordination layer.

2. **Only a dedicated internal domain integration calls `ts-fsrs`.** It translates project concepts and scheduling state to and from the library. Public domain operations use project-owned types and terminology, such as `ReviewRating`, rather than exposing library objects. The integration preserves every scheduling field needed for later reviews. Advanced scheduling information required by the product is exposed deliberately through project-owned representations.

3. **Application use cases coordinate complete user operations.** They obtain the necessary state through explicit persistence boundaries, invoke domain operations, request consistent persistence, and return confirmed outcomes or failures. For a rating, this includes coordinating the scheduling change, daily-count effects, and information required for undo before reporting success. The domain performs the calculations; use cases coordinate their execution and storage.

4. **The UI calls application use cases for study and data operations.** Screens and hooks handle presentation, interaction, loading, and error display. They do not implement scheduling or study rules and do not call `ts-fsrs` or storage directly. A hook may adapt a use case to the interface; the use case remains independently callable TypeScript code.

5. **Dependency direction protects the domain.** Application use cases depend on the domain and the persistence contracts needed for current operations. Concrete storage implementations satisfy those boundaries. The domain does not import application coordination, React Native, Expo, SQLite, filesystem APIs, or device APIs. Storage-specific objects remain outside the public domain API.

6. **Time is an explicit input to business rules.** Domain operations receive the instants and study-day context they need. Obtaining device time and local-time context happens outside the domain. Core rules do not read the wall clock, allowing the same inputs to be exercised with fixed dates in scenarios and tests.

7. **Keep the implementation proportional to current needs.** Use cases and domain operations may be ordinary TypeScript functions. Introduce interfaces and modules when an actual boundary requires them. This decision does not mandate classes, a dependency-injection framework, or a generic repository for every entity.

This boundary applies to the required Phase 1 behavior. It does not authorize implementing all Phase 1 features during the current exploration. Exact operation names and signatures, persisted schemas, transaction mechanisms, session-state representation, time representation, and the JSON import contract require their own design work. Current structural details belong in `docs/architecture/` as they are defined.

## Rationale

- **Independent validation:** Scheduling and study rules can be explored and tested with fixed inputs without an Android build or concrete storage.
- **Reliable coordination:** A user operation can combine domain calculations and persistence without making UI components responsible for data integrity.
- **Controlled library coupling:** Translation remains concentrated in one integration. Library types do not become the vocabulary used throughout the application, although changes to scheduling behavior still require review and validation.
- **UI iteration:** Usability-driven changes to screens and hooks can preserve the same study behavior and application operations.
- **Clear ownership:** Domain modules express rules, use cases coordinate operations, and infrastructure provides concrete access to storage and the device.
- **Manageable scope:** The separation supports the required workflows with small modules and functions, without requiring a framework or speculative infrastructure for later phases.

## Alternatives Considered

- **Implement scheduling and persistence coordination in screens or hooks.** This offers fewer initial boundaries, but couples essential study behavior to the UI lifecycle and makes independent validation harder. It conflicts with the project's domain independence requirement.
- **Expose `ts-fsrs` directly to application use cases and the UI.** This reduces initial translation work, but spreads library concepts and integration responsibilities across callers. It makes the public application vocabulary depend on the scheduling library and weakens the accepted FSRS boundary.
- **Have domain operations coordinate storage through injected persistence contracts.** This can avoid a concrete database dependency, but combines business calculations with retrieval, save confirmation, and recovery coordination. Separate application use cases give these current responsibilities a clearer home.
- **Adopt a complete architecture framework with mandatory classes and generic abstractions.** This could impose a uniform structure, but adds concepts and maintenance before the project has demonstrated a need for them. Explicit responsibilities and dependency direction are sufficient for this decision.

## Consequences

- Domain scenarios and tests must run in a plain TypeScript environment with explicit time inputs.
- Application operations that change stored study data must report success only after the required persistence has been confirmed. The concrete guarantees for retries, interrupted writes, and undo will be designed with the review-consistency and persistence decisions.
- The project must maintain translations between library, domain, storage, and presentation representations where those boundaries require them. This adds mapping code and validation work.
- The team must distinguish a domain calculation from the complete user operation that uses it. Similar concepts at both levels require clear names and documented responsibilities.
- Encapsulation does not eliminate dependence on FSRS. Scheduling-state preservation and observed outcomes still need validation against the chosen library.
- Reviews must check that new rules stay in the domain and that screens, hooks, and infrastructure do not accumulate business behavior.
- Persistence technology, schemas, session lifecycle details, and platform tooling remain subjects for subsequent decisions. This ADR establishes their relationship with the domain.

## References

- [Project overview](../project-overview.md): product goals, Phase 1 scope, and technical constraints.
- [System specification](../system-specification.md): RF-020–RF-024, RN-004–RN-015, RN-020, RN-021, and RNF-001–RNF-004.
- [UC08 — Conduct a Study Session](../use-cases/uc-008-conduct-study-session.md): review coordination, failure handling, and the boundary between FSRS and application policy.
- [Agent instructions](../../AGENTS.md): dependency direction, FSRS integration, determinism, data integrity, and proportional modularity.
- [ADR conventions](README.md): record structure, numbering, and preservation of decision history.
