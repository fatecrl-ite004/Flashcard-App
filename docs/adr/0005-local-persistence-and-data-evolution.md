# ADR 0005 — Local Persistence and Data Evolution

- **ADR number:** 0005
- **Title:** Local Persistence and Data Evolution
- **Date:** 2026-10-28
- **Owner:** Enzo
- **Status:** Proposed

## Context

Flashcard App requires offline access to imported decks, card scheduling, tags, flags and notes, onboarding state, and global and deck settings. Required daily study data and confirmed review progress must survive application restarts. The user has selected SQLite through `expo-sqlite` for the Android application's local persistence.

Several use cases update related data together. JSON import accepts a complete deck or saves none of it. Deck deletion removes its associated data atomically. A rating or sequential undo must keep scheduling, daily effects, reversal information, and operation recovery evidence consistent, as developed in ADR 0004. Changing the global goal also recalculates the references of automatically linked decks while preserving manual references.

The current repository contains domain and application boundary proposals, but no adopted Expo project, dependency configuration, database schema, or migration implementation. The persistence technology needs a documented role and an evolution policy before concrete storage work begins.

## Decision

Use SQLite through `expo-sqlite` as the authoritative local persistence for the required Android workflows. Keep database access in infrastructure behind the application boundaries proposed in ADR 0001, and evolve the database through explicit, versioned migrations.

1. **Keep the required persistent state in the local database.** Store decks and imported text cards, scheduling state, settings, onboarding completion, organization data, and the daily and operational state required by the accepted use cases. Imported JSON is an input to validation and persistence. After import, the local database is authoritative for the stored deck and its study progress. Runtime views and caches derive from confirmed stored state.

2. **Keep the driver inside the persistence implementation.** Infrastructure owns `expo-sqlite` access, SQL, row mapping, initialization, and transaction execution. Application use cases call operations expressing their actual persistence needs. Domain and public application contracts use project-owned representations, with explicit conversion of scheduling instants and state. Database handles, transaction objects, row shapes, and SQL do not leak into domain rules or screen operations.

3. **Use asynchronous access and bind values.** Use asynchronous database APIs and bind imported and user-entered values with parameters or prepared statements. Screens and hooks access data through application operations. See the [Expo prepared-statement guidance](https://docs.expo.dev/versions/latest/sdk/sqlite/#prepared-statements).

4. **Match transactions to complete use-case outcomes.** A transaction must include all persistent effects of an individual rating or undo defined by ADR 0004. Whole-deck import, deck deletion, and settings changes with dependent reference recalculation must also retain their accepted atomic behavior. Validate an import before accepting the deck, and expose success only after the complete write commits. Reading a file and waiting for user interaction belong outside a database transaction. [SQLite's transaction guarantees](https://www.sqlite.org/transactional.html) supply the database mechanism; the application and persistence implementation must use it correctly.

5. **Control asynchronous transaction scope explicitly.** Expo documents that `withTransactionAsync()` can include unrelated concurrent queries. `withExclusiveTransactionAsync()` scopes work through a supplied `txn` object. The persistence implementation must isolate use-case transactions and verify settings on every connection used. Validate the exact approach against the adopted SDK. See [Expo's transaction guidance](https://docs.expo.dev/versions/latest/sdk/sqlite/#executing-queries-within-an-async-transaction).

6. **Enforce the designed relationships and constraints.** Model the relationships required by current decks, cards, tags, flags, scheduling, daily state, and operation records. Enable and verify foreign-key enforcement on each relevant connection before transactions begin; enabling it on one connection is insufficient for another. SQLite documents this [connection-specific behavior](https://www.sqlite.org/foreignkeys.html#fk_enable). Define concrete constraints, deletion behavior, and indexes with the schema, guided by accepted rules and actual query needs.

7. **Version database evolution explicitly.** Use ordered forward migrations, with the application schema version recorded through [`PRAGMA user_version`](https://www.sqlite.org/pragma.html#pragma_user_version). Initialize or migrate the database before making dependent application flows available. Each migration step and its version advancement must commit together. On failure, preserve the last committed schema and data and report that initialization could not complete. An unsupported newer schema must not be silently downgraded or reset. Concrete migration contents require review with the schema; destructive changes remain subject to explicit approval.

8. **Preserve recovery semantics across reopening.** Stored operation outcomes must support recognition of a completed rating or undo after an interrupted confirmation. Daily counts, adaptive state, and pending due-only continuation remain available independently of the ended live session. Reopening does not grant access to the previous session's undo sequence, as established in ADR 0003. Retain and clean up reversal and recovery information according to the actual active-session and reconciliation needs identified in ADR 0004.

The engine and driver choice does not select an ORM, a public import schema, exact tables or column types, connection topology, journal settings, or a full retry policy. Those details belong in `docs/architecture/persistence/` as they are designed and approved. Concrete journal and durability settings must support the required persistence guarantees. Dependency versions must match the project's adopted Expo SDK when application setup occurs. The current domain exploration remains independent of Expo and SQLite.

## Rationale

- **Local operation:** The selected storage fits the required device-local source of truth and offline study workflows.
- **Related data:** SQL relationships and constraints provide mechanisms for expressing the relationships already required by decks, cards, flags, tags, and study data.
- **Atomic outcomes:** Transactions support the complete write outcomes required by import, deletion, rating, undo, and dependent settings changes.
- **Expo integration:** The user-selected driver supplies the SQLite access needed by the planned Android application while remaining isolated from domain calculations.
- **Controlled evolution:** Ordered migrations make storage changes reviewable and connect each installed schema to the code that understands it.
- **Preserved boundaries:** Driver-specific implementation can develop alongside independently testable TypeScript rules without dictating the public domain model.

## Alternatives Considered

- **Custom JSON files as primary storage.** This begins with a simple representation, but requires designing atomic replacement, cross-record consistency, recovery, and query behavior for the application's related data. SQLite supplies database mechanisms that fit these current needs.
- **Independent key-value records for study data.** This can suit isolated values, but would require a separately demonstrated design for consistent updates across scheduling, daily counts, undo, import, and deletion. Splitting the required persistent state across stores would also complicate those boundaries.
- **Another SQLite binding.** This could retain the same database model, but would require a separate integration and maintenance evaluation. The user selected `expo-sqlite`; no comparative performance claim is made here.
- **Recreate the database whenever the schema changes.** This simplifies development resets, but loses user-owned study progress and conflicts with the continuity requirements. Versioned migrations are the proposed evolution approach.

## Consequences

- Validating the native driver integration requires an Expo Android environment. Domain tests and deterministic scheduling scenarios continue to run without it.
- Initialization, migrations, connection configuration, transaction scope, and error translation become explicit persistence responsibilities.
- Schema design must account for the complete active-session undo sequence and enough persisted operation evidence to resolve uncertain outcomes. Choosing SQLite does not by itself implement these guarantees.
- Connection-specific settings need validation on transaction connections as well as ordinary access. Review the adopted driver version's actual connection behavior before relying on enforcement.
- Migration failure must preserve the last committed data, and the application must avoid operating against an incompatible schema. Actual migration SQL and validation remain to be designed.
- Performance and durability must be checked with the selected SDK, connection configuration, and representative operations. No response-time claim or fixed deck-size limit is established by this ADR.
- Required validation includes successful and rejected whole-deck imports; atomic deletion; rating and sequential undo across interruption; uncertain-confirmation recovery; foreign-key enforcement on actual write connections; settings recalculation without partial changes; clean initialization; migration success, failure, and restart; and rejection of an unsupported newer schema.
- This ADR proposes the surrounding persistence design using the engine and driver selected by the user. No dependency has been installed, database created, migration executed, or runtime guarantee verified in this documentation task.

## References

- [ADR 0001 — Pure TypeScript Domain and FSRS Integration Boundary](0001-pure-typescript-domain.md): dependency direction and project-owned contracts; currently Proposed.
- [ADR 0003 — Session and Round Lifecycle](0003-session-and-round-lifecycle.md): confirmed progress, daily state, and session lifetime; currently Proposed.
- [ADR 0004 — Review Consistency and Undo](0004-review-consistency-and-undo.md): atomic outcomes, sequential reversal, and recovery; currently Proposed.
- [Project overview](../project-overview.md): local-first Android scope and required data continuity.
- [System specification](../system-specification.md): RF-002, RF-005–RF-010, RF-022–RF-024, RF-028, RN-001, RN-013, RN-016, RN-020, RN-021, and RNF-001–RNF-005.
- [UC04 — Import a Deck](../use-cases/uc-004-import-deck.md), [UC07 — Delete Deck](../use-cases/uc-007-delete-deck.md), [UC08 — Conduct a Study Session](../use-cases/uc-008-conduct-study-session.md), and [UC09 — Configure Global Study Settings](../use-cases/uc-009-configure-global-study-settings.md): operations requiring coherent persistence outcomes.
- [Agent instructions](../../AGENTS.md): infrastructure isolation, data integrity, and approval of concrete schemas and migrations.
- [Expo SQLite documentation](https://docs.expo.dev/versions/latest/sdk/sqlite/): driver APIs, prepared statements, and asynchronous transaction scope; consulted 2026-10-28.
- [SQLite transactions](https://www.sqlite.org/transactional.html), [foreign-key support](https://www.sqlite.org/foreignkeys.html), and [application schema version](https://www.sqlite.org/pragma.html#pragma_user_version): database guarantees and configuration semantics; consulted 2026-10-28.
- [ADR conventions](README.md): record structure and preservation of decision history.
