# ADR 0007 — Drizzle ORM for Local Data Access

- **ADR number:** 0007
- **Title:** Drizzle ORM for Local Data Access
- **Date:** 2026-10-28
- **Owner:** Enzo
- **Status:** Proposed

## Context

The user selected SQLite through `expo-sqlite` for Android persistence and now prefers Drizzle ORM for data access. ADR 0005 proposes asynchronous database access, atomic use-case outcomes, explicit migrations, and infrastructure ownership of persistence. The user explicitly retained the asynchronous requirement after reviewing the execution model of the default Drizzle Expo adapter.

The integration has official support: [Expo lists Drizzle among its SQLite integrations](https://docs.expo.dev/versions/latest/sdk/sqlite/#drizzle-orm), and [Drizzle documents an Expo adapter](https://orm.drizzle.team/docs/connect-expo-sqlite). However, the [default adapter implementation inspected](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/expo-sqlite/session.ts) uses synchronous SQLite calls. An `await` expression around a query does not establish asynchronous database execution.

The official [v1.0.0-rc.5 release notes](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-rc.5) announce an additional `expo-sqlite/async` adapter. That release is marked as a pre-release. This provides a candidate integration to evaluate; it does not establish compatibility with an adopted Expo SDK or authorize a pre-release dependency.

The repository has no adopted Expo application, dependency configuration, database schema, or migration implementation. JSON Schema and public payload contracts are deferred at the user's request and are outside this decision.

## Decision

Prefer Drizzle ORM over direct SQL as the principal data-access tool for the selected SQLite persistence, conditional on validating an integration that preserves asynchronous database execution and the integrity guarantees of ADRs 0004 and 0005. This draft records the user's ORM preference; the integration and package versions remain pending.

1. **Keep Drizzle in infrastructure.** Persistence implementations own table definitions, query construction, database access, and row conversion. Application use cases coordinate operations through project-owned contracts. Drizzle tables, inferred storage types, query builders, database handles, and transaction objects must remain internal to persistence.

2. **Retain asynchronous database access.** Evaluate the officially announced async adapter against the versions selected during application setup. Do not substitute the synchronous adapter, wrap synchronous calls in a Promise, or infer nonblocking execution from `await`. If a compatible integration cannot be validated, report the constraint and request direction before implementation. No pre-release version is adopted by this ADR.

3. **Preserve complete transaction outcomes.** An individual rating or undo must commit all related scheduling, daily, reversal, and recovery effects together. Import, deletion, and dependent settings changes retain the atomic outcomes already proposed. Verify that every statement participating in an outcome uses its intended transaction connection and that rejection rolls back the whole outcome. Do not mix independently scoped ORM and driver transactions without a validated design.

4. **Keep business rules in their existing layers.** Domain operations calculate scheduling and study policies; application use cases coordinate them with persistence. ORM queries must not become an alternative implementation of FSRS or the session lifecycle. Screens and presentation hooks access application operations rather than Drizzle directly. The availability of `useLiveQuery` does not authorize bypassing those boundaries.

5. **Review migration integration separately.** Drizzle documents migration generation and bundling for Expo. Its tooling may assist later schema work, but selecting the ORM does not adopt Drizzle Kit, a migration runner, or a new version-tracking policy. ADR 0005 currently proposes `PRAGMA user_version`; any integration must explain how it preserves that policy or obtain approval to change it. Concrete schema and migration design remain pending.

6. **Use typed queries and explicit mappings.** Translate storage representations into project-owned values at the persistence boundary. Bind imported and user-entered values. Review any necessary raw SQL in the same infrastructure layer and preserve parameter binding. Compile-time query types do not replace validation of imported files, runtime data, or domain invariants.

7. **Validate before adoption in the application.** During authorized persistence work, use a focused Android integration experiment to verify genuinely asynchronous queries and transactions, rollback after a failed statement, foreign-key enforcement on write connections, and representative import and review operations. Review migration initialization, failure, and restart behavior with the concrete migration design. Record the exact versions and results before treating the integration as verified.

## Rationale

- **Fit with the chosen stack:** Official Expo and Drizzle documentation describe integration with the already selected driver. This supports choosing it as a candidate without claiming that it is universally better than other ORMs.
- **TypeScript data access:** Typed queries can make storage operations easier to review and maintain while explicit mappings preserve domain independence.
- **Visible SQL responsibilities:** Query construction remains close to the relational database and its transaction and constraint requirements.
- **Preserved interaction quality:** The user retained asynchronous access; ORM adoption must satisfy that constraint.
- **Limited commitment:** The project can record its preferred tool now while leaving package versions, schemas, migration implementation, and performance conclusions to validated integration work.

## Alternatives Considered

- **Direct asynchronous SQL through `expo-sqlite`.** Fits the driver and asynchronous requirement directly, but leaves query typing and row mapping to the persistence implementation. It remains an alternative if the preferred ORM integration cannot satisfy current constraints; switching requires user direction.
- **Drizzle's default synchronous Expo adapter.** Has an established documented integration, but the inspected implementation conflicts with the user's retained asynchronous requirement. Wrapping its calls in async functions does not resolve that conflict.
- **Another ORM.** Would require its own compatibility and transaction evaluation. The user prefers Drizzle, and no evidence currently requires selecting a different ORM.

## Consequences

- The Drizzle preference is documented, but the ADR remains Proposed pending integration review. The asynchronous requirement in ADR 0005 remains unchanged.
- Official async support is announced in a pre-release; the appropriate release channel and compatible Expo versions remain unresolved. No dependency has been installed or pinned.
- Infrastructure gains responsibility for ORM-specific mappings and transaction integration. Domain scenarios remain executable independently of Expo, SQLite, and Drizzle.
- Migration generation may reduce manual work, but generated SQL still needs review. Migration tooling and version tracking require a coherent design before implementation.
- Database execution, atomicity, responsiveness, and restart behavior have not been validated in this documentation task. The official integration alone does not prove those properties.
- JSON Schema, payload contracts, exact persisted tables, UI state tools, and navigation remain outside this ADR.

## References

- [ADR 0001 — Pure TypeScript Domain and FSRS Integration Boundary](0001-pure-typescript-domain.md): dependency direction and project-owned contracts; currently Proposed.
- [ADR 0004 — Review Consistency and Undo](0004-review-consistency-and-undo.md): atomic rating, sequential undo, and recovery; currently Proposed.
- [ADR 0005 — Local Persistence and Data Evolution](0005-local-persistence-and-data-evolution.md): selected SQLite driver, asynchronous access, constraints, and proposed migration policy; currently Proposed.
- [Project overview](../project-overview.md), [system specification](../system-specification.md), and [agent instructions](../../AGENTS.md): scope, persistence guarantees, and implementation approval gates.
- [Expo SQLite — Drizzle ORM](https://docs.expo.dev/versions/latest/sdk/sqlite/#drizzle-orm): official integration listing; consulted 2026-10-28.
- [Drizzle Expo SQLite integration](https://orm.drizzle.team/docs/connect-expo-sqlite): adapter, live queries, and migration tooling; consulted 2026-10-28.
- [Default Expo adapter session implementation](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/expo-sqlite/session.ts): synchronous execution in the inspected source; consulted 2026-10-28. This branch can change and is not a pinned dependency.
- [Drizzle v1.0.0-rc.5 release notes](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-rc.5): announcement of `expo-sqlite/async` and pre-release status; consulted 2026-10-28.
