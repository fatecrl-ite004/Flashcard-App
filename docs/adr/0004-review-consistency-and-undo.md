# ADR 0004 — Review Consistency and Undo

- **ADR number:** 0004
- **Title:** Review Consistency and Undo
- **Date:** 2026-10-28
- **Owner:** Enzo
- **Status:** Proposed
- **Product-contract revision:** 2026-10-31. Sequential Undo remains available during the active session, which now ends before its summary. The owner replaced continuation within that session with new-session further study; architecture remains Proposed.

## Context

Flashcard App must save each confirmed rating before presenting the next card. A rating changes scheduling state and can affect daily distinct-card counts, the deck's first-study count, and the demand information used by its adaptive suggestion. An interrupted write must not leave these effects inconsistent.

The user has confirmed that undo must support successive reversals throughout the active session. Each action reverses the most recent remaining confirmed rating, until the active session's sequence is exhausted. The final eligible confirmed rating ends that session before its summary; further study creates a new session and Undo scope. Backgrounding while the process survives preserves this sequence. Ending the session ends its undo scope, as established by UC08 and ADR 0003.

A single previous-state record is insufficient for this behavior. Repeated ratings of the same card also require care: undoing a later rating must not remove a daily count still supported by an earlier confirmed rating. A storage operation may complete even when the application does not receive its confirmation, so both rating and undo require a way to reconcile an uncertain result before retrying.

ADR 0001 proposes domain calculations with application coordination. ADR 0002 establishes explicit review instants and study-day attribution. ADR 0003 describes the live session and interruption lifecycle. This ADR develops their consistency guarantees without selecting a database, persisted schema, identifier format, or storage library.

## Decision

Treat each rating and each undo as a complete, recoverable persistence operation. Maintain an ordered sequence of the active session's confirmed, not-yet-undone ratings with enough information to reverse them consistently.

1. **Commit a rating and its required effects together.** The application obtains the confirmed card state, validates the explicit review instant, and invokes the domain calculation. Persistence must atomically record the rating's resulting scheduling state, daily-count effects, any study-day demand effects required by RN-020 and RN-021, and the information needed to reverse that rating. Evidence needed to recognize the operation's persisted outcome must be consistent with those effects. The application advances the queue and confirms progress only after a successful persisted outcome is known.

2. **Order undo by confirmed operation sequence.** Every newly confirmed rating becomes the most recent target in its session. Each successful undo exposes the preceding remaining rating as the next target. Use the session's confirmed operation order, rather than sorting review timestamps, to determine this sequence. Its scope ends when the final eligible confirmed rating closes the session before the summary. There is no single-rating undo cap: every remaining confirmed rating from the active session must be reachable through successive undo actions.

3. **Retain exact prior scheduling state and reversal context.** Each rating's undo information must be sufficient to restore that card's immediately preceding scheduling state, the corresponding round and queue context, and its attributable daily-count and study-history effects. Restore the saved prior scheduling values rather than calculating a different FSRS result to approximate undo. The integration still preserves all library scheduling fields needed for correct later reviews through project-owned representations, as required by ADR 0001. Exact storage and in-memory structures remain to be designed.

4. **Preserve effects supported by other ratings.** Daily membership and study-history updates must reflect the confirmed ratings that remain after each reversal, including contributions from earlier sessions on the same study date. Undoing a repeated rating of a card does not remove its distinct-card or new-card count while another remaining rating supports that count. If undo removes the last confirmed rating supporting a studied day, that day no longer qualifies as studied for RN-020. Undo does not itself repeat or reverse the preparatory daily adaptation, which is a separate operation under RN-020.

5. **Commit each reversal before advancing the undo sequence.** Resolve the most recent remaining target, calculate its inverse effects, and persist the restored scheduling state, attributable daily effects, and removal of that target from the remaining undo sequence atomically. Only then restore the live round and queue position and report success. If persistence fails, keep the target available and preserve the last confirmed state. If confirmation is uncertain, reconcile the outcome before retrying or exposing another target.

6. **Give each submitted operation a stable identity across retries.** A rating or undo submission must be distinguishable from a later intentional operation. Retrying the same unresolved submission uses the same identity and intended target. A persisted outcome can then be recognized without applying its effects again. A newly submitted rating after an undo is a new operation and becomes the newest undo target; earlier undone ratings remain undone. Identifier generation, lookup structures, and recovery-record retention belong in the persistence design.

7. **Resolve one study mutation before accepting the next in that session.** Rating and undo submissions must not race each other or overlap an unresolved predecessor. Repeated taps must not submit independent mutations for the same pending user action. The application coordinates this ordering and communicates pending or failed status to the UI; storage must still enforce consistent outcomes. Domain calculations remain independent of UI and device APIs.

8. **Preserve unrelated changes.** Undo reverses a rating's scheduling, count, study-history, and queue effects. It does not restore an old whole-card or whole-application snapshot that would erase later flag-note edits, deck settings, tags, or other changes outside that rating. Global counts must retain contributions unrelated to the reversal. Undo also retains the original rating's study-day attribution even if the active session has crossed a boundary.

9. **Keep recovery information distinct from later-session undo access.** Preserve the complete remaining undo sequence while the session is active, including background returns while that session remains active. Once the session ends, a new session cannot use that sequence to reverse previous ratings. Retain whatever evidence is still needed to reconcile interrupted operations before cleaning up temporary recovery data. Information retained for these operations does not introduce the complete, user-queryable review history assigned to Phase 2.

For example, if one card is rated twice in the session, it contributes once to that day's distinct-card count. Undoing its second rating restores the state after its first rating and keeps that contribution. Undoing its first rating then removes the contribution only if no other confirmed rating on that study date still supports it. Each reversal must be confirmed before the next one is offered.

## Rationale

- **Coherent progress:** The stored card, scheduling state, counts, and undo sequence agree after every confirmed operation.
- **Successive correction:** Per-rating reversal information supports the user's approved ability to undo earlier session ratings in sequence.
- **Reliable retries:** Recognizable operation outcomes prevent an uncertain confirmation from duplicating a rating or skipping an undo target.
- **Correct daily policy:** Distinct-card counts and studied-day history continue to describe only the confirmed effects that remain.
- **Controlled responsibility:** Domain operations calculate effects, application use cases order and coordinate them, and infrastructure supplies the persistence guarantees.
- **Phase 1 scope:** Operational reversal and recovery information supports current requirements without establishing a complete review-history product feature.

## Alternatives Considered

- **Keep only one prior rating snapshot.** This uses less reversal data, but cannot support the approved successive undo behavior.
- **Write scheduling, counts, and undo information independently.** This can simplify individual writes, but permits partial outcomes during interruption and conflicts with RNF-003 and UC08.
- **Update the UI immediately and persist later.** This can make the interface appear to advance sooner, but reports unconfirmed progress and conflicts with RF-022.
- **Retry after every missing confirmation without checking stored state.** This avoids outcome reconciliation, but can duplicate an already saved rating or reverse the next rating unintentionally.
- **Reconstruct earlier state through a full event history.** This can support more extensive historical queries, but establishes broader retention and reconstruction machinery than the current session undo requires. The selected design retains the reversal and recovery information needed by current operations.
- **Restore a whole-application snapshot for each undo.** This makes reversal appear simple, but can overwrite unrelated edits and counts supported by other study activity.

## Consequences

- Sequential undo requires reversal information for all remaining confirmed ratings in the active session. Its storage and memory needs grow with that session's study activity, including repeated ratings; retention and cleanup must be designed accordingly.
- The persistence choice must support the required atomic operations and consistent outcome recognition. A specific database or transaction API is not selected here.
- Application use cases need explicit pending, confirmed, and failed or uncertain outcomes for both rating and undo. The public API and module organization still require design.
- A recovered persisted result must update the live state once. Reconciliation must not make an ended session's undo sequence available to a newly started session.
- The persistence design must preserve enough information to distinguish counts supported by the current target from those supported by other ratings. Restoring a prior global counter blindly is insufficient.
- Required validation includes successive undo to the start of a session; no Undo from the completed-session summary or across subsequent sessions; repeated ratings of one card; counts supported by previous sessions; background return with the remaining sequence intact; a new rating after undo; unrelated flag-note edits; interruption before and after commit; uncertain rating and undo confirmations; and failure without partial reversal or sequence advancement.
- This ADR records a proposed consistency design and the approved sequential-undo behavior. No runtime behavior or storage guarantee is verified until implementation and corresponding validation evidence exist.

## References

- [ADR 0001 — Pure TypeScript Domain and FSRS Integration Boundary](0001-pure-typescript-domain.md): domain rules and application coordination; currently Proposed.
- [ADR 0002 — Time and Study-Day Semantics](0002-time-and-study-day-semantics.md): review instants and original study-day attribution; currently Proposed.
- [ADR 0003 — Session and Round Lifecycle](0003-session-and-round-lifecycle.md): active session scope, background continuity, and interruption recovery; currently Proposed.
- [Project overview](../project-overview.md): required persistence and sequential session undo.
- [System specification](../system-specification.md): RF-020–RF-024, RN-011, RN-013, RN-020, RN-021, RNF-003, and RNF-004.
- [UC08 — Conduct a Study Session](../use-cases/uc-008-conduct-study-session.md): rating persistence, successive undo, and uncertain-operation recovery.
- [Agent instructions](../../AGENTS.md): local data integrity, deterministic validation, and Phase 1 scope.
- [ADR conventions](README.md): record structure and preservation of decision history.
