# ADR 0003 — Session and Round Lifecycle

- **ADR number:** 0003
- **Title:** Session and Round Lifecycle
- **Date:** 2026-10-28
- **Owner:** Enzo
- **Status:** Proposed
- **Product-contract revision:** 2026-10-31. The owner chose session closure before the summary and a new session for further study, replacing the earlier multi-round-session proposal. Architecture remains Proposed.

## Context

Flashcard App starts study from an open deck. A session contains its selected round and ends when its final eligible rating is confirmed. Voluntary further study starts a new session with a fresh limit choice. Due-card priority, automatic new-card suggestions, voluntary extra new cards, and same-day due-only continuation are defined in the system specification and UC08.

The interface needs to preserve a coherent study experience while each rating is calculated and saved. Completed-session summary, early exit, backgrounding and process termination have distinct presentation and recovery effects.

The user has confirmed that returning from the background while the application remains in execution must preserve the same session, round, queue, and undo availability. Closing the application must preserve evaluated information through the existing guarantee that each confirmed rating is saved before the next card appears. UC08 already specifies starting a new session from consistent stored state after an abrupt application interruption.

The user has also confirmed that a round ends immediately when no card in that round is currently eligible, even if an evaluated card is scheduled to become due again a few minutes later.

ADR 0001 proposes domain-owned rules with application coordination. ADR 0002 proposes explicit scheduling instants and a stable study-day and timezone context for each session. This ADR develops the ownership and lifetime of session and round state within those boundaries.

## Decision

Keep the live session and round state under application coordination, independently of individual screens and hooks. Persist confirmed study effects and the daily state required across sessions through explicit persistence boundaries.

1. **A session belongs to one deck and its selected round.** Starting study establishes the deck, assigned study day, captured timezone context, and limit choice. The final eligible rating closes this session before its summary. Further study follows preparation again, including a fresh study day, eligibility calculation, and limit choice enabled by default. Same-day saved continuation remains governed by RN-008.

2. **Domain operations determine eligibility and round policy.** Application use cases obtain current saved data and explicit time inputs, ask the domain to apply the accepted rules, and coordinate any required persistence before exposing a prepared round. The domain determines due eligibility, accepted capacity, suggested new cards, and count effects. The application maintains the live round's selected card identities, current position, and operation status using those results. Concrete types and operation signatures belong in the architecture documentation when designed.

3. **Represent lifecycle transitions explicitly.** Distinguish preparation, card presentation, an unresolved rating or undo operation, round completion, and session end. These are responsibilities to represent in application state, without requiring a state-machine library or a particular class hierarchy. A screen render, component remount, or background event must not independently create a replacement session or round.

4. **Advance only from a confirmed operation.** A rating calculation does not itself authorize queue advancement. The application coordinates saving the rating, scheduling state, daily-count effects, and required undo information consistently, then updates the live queue and reports the result. If confirmation is uncertain, reconcile persisted state before retrying or advancing, as required by UC08. A lifecycle event must not turn the same unresolved submission into a second rating.

5. **Complete a round when no card in it is eligible now.** After confirmed operations, evaluate the round against the explicit current instant. Present the next eligible card when one exists. Otherwise, complete the round immediately and offer the applicable UC08 completion actions. A future due instant does not keep the round waiting or permit an early review. The card retains its FSRS schedule and can be selected when due in a later round or session. Repeated presentations remain subject to the accepted distinct-card count and do not imply a repeat-until-correct loop.

6. **The completed-round summary follows session closure.** After the final eligible rating is confirmed, close the session and its Undo and show a read-only four-block summary under RF-025. Estudar mais explicitly starts another session. Returning from the summary cannot resume the old queue or Undo. Ending early preserves confirmed ratings without showing a completed-session summary. The former multi-round active-session design is replaced by the owner's 2026-10-31 product decision.

7. **Backgrounding preserves live state while execution survives.** Returning to the foreground retains the same session, round, queue position, current-card presentation state, limit choice, captured time context, and full remaining undo sequence for the active session. Obtain a fresh current instant when evaluating eligibility or submitting a new rating. Passing a boundary while backgrounded does not change the session's assigned study day. If an operation was unresolved, reconcile its outcome before advancing. Domain code does not observe platform lifecycle events directly.

8. **Process termination preserves confirmed progress through immediate persistence.** Each rating is saved during its own operation; exiting or backgrounding the application is not the trigger for saving study progress. Once the process ends, the live session ends. On reopening, read consistent stored state and determine which interrupted operations completed. The user can start a new session through UC08. The previous queue, revealed-card state, and session-scoped undo availability are not restored as an active session by this decision.

9. **Daily study state survives independently of the live session.** Preserve the required scheduling progress, distinct-card and first-study counts, adaptive reference and adjustment status, demand information required by RN-020, and pending due-only continuation. Leaving or terminating a session must not clear this information. A same-day reopen applies the saved continuation policy even though it starts a new session. Reopening after a timezone change reuses an already recorded study date as established in ADR 0002. Preparing a session without a confirmed rating does not by itself register a studied day.

This decision defines state ownership and lifetime. Storage technology, persisted schemas, transaction and retry mechanisms, queue ordering among equally eligible cards, and concrete public operation contracts require their respective design work. It does not introduce complete review history or authorize implementing session infrastructure during the current domain exploration.

## Rationale

- **Study continuity:** A temporary interruption of interaction can preserve the user's current work without making screen components responsible for the session's lifetime.
- **Data integrity:** Saving every confirmed rating independently protects progress when the process ends before the session finishes.
- **Consistent time semantics:** Preserving session context while supplying fresh operation instants supports the approved behavior across study-day boundaries and timezone changes.
- **Voluntary study:** Round completion remains immediate when there is nothing eligible to present, with further study controlled by the user and the accepted selection rules.
- **Independent daily policy:** Counts, adaptation, and overflow continuation retain their required meaning across separate sessions and application restarts.
- **Proportional implementation:** Explicit state and ordinary TypeScript operations can express the lifecycle without introducing a workflow framework or persistent session-replay infrastructure.

## Alternatives Considered

- **Own the session entirely inside a screen or hook.** This reduces initial coordination code, but ties the study lifecycle to component mounting and risks reconstructing the queue or losing undo availability during UI changes.
- **Save ratings only when a session ends or the application backgrounds.** This reduces the number of writes, but can lose progress on abrupt termination and conflicts with RF-022.
- **Persist and automatically restore the complete active session after process termination.** This could restore the prior queue and presentation state, but expands the recovery contract beyond UC08's new-session flow and adds durable session-state requirements. Preserve confirmed study effects and required daily state for the current scope.
- **Wait within the round for cards scheduled in the future.** This could keep a round open until a later review becomes due, but conflicts with the approved immediate-completion behavior.
- **Treat backgrounding as leaving the session.** This simplifies lifecycle handling, but loses the same session and undo scope that the user has explicitly asked to preserve.

## Consequences

- The application needs a cohesive owner for live session and round state outside the lifetime of individual UI components. Its concrete module structure remains to be designed.
- Platform lifecycle handling must distinguish returning to an existing process from reopening after process termination. The domain receives explicit operations and time inputs through the application boundary.
- Foreground restoration must preserve session identity and context while checking any unresolved operation before further interaction can advance the queue.
- The completed-session summary is read-only with no Undo. Further study creates a new session; same-day due-only continuation survives independently of the ended session.
- The persistence design must support progress and daily-policy recovery without requiring restoration of the old active queue. Any stored undo information must not make a previous session's rating undoable from a new session.
- Required validation includes background and foreground transitions with the same queue and undo availability; backgrounding across a study-day boundary; interruption after a confirmed rating; an interrupted operation with uncertain confirmation; same-day overflow continuation after reopening; and immediate round completion with only future-scheduled cards remaining.
- This ADR records proposed architecture and approved lifecycle behavior. Runtime behavior, persistence consistency, and recovery remain unverified until corresponding implementation and validation evidence exist.

## References

- [ADR 0001 — Pure TypeScript Domain and FSRS Integration Boundary](0001-pure-typescript-domain.md): domain rules, application coordination, and UI responsibilities; currently Proposed.
- [ADR 0002 — Time and Study-Day Semantics](0002-time-and-study-day-semantics.md): explicit time inputs, stable session context, and reuse of daily state; currently Proposed.
- [ADR 0004 — Review Consistency and Undo](0004-review-consistency-and-undo.md): consistent rating persistence, recovery, and sequential undo; currently Proposed.
- [Project overview](../project-overview.md): immediate persistence and required study continuity.
- [System specification](../system-specification.md): RF-017, RF-022–RF-025, RN-004–RN-009, RN-012–RN-015, RN-020, RN-021, and RNF-003–RNF-004.
- [UC08 — Conduct a Study Session](../use-cases/uc-008-conduct-study-session.md): preparation, rating, undo, voluntary continuation, backgrounding, and interruption recovery.
- [Agent instructions](../../AGENTS.md): dependency direction, local data integrity, and proportional modularity.
- [ADR conventions](README.md): record structure and preservation of decision history.
