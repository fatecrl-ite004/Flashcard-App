# ADR 0002 — Time and Study-Day Semantics

- **ADR number:** 0002
- **Title:** Time and Study-Day Semantics
- **Date:** 2026-10-28
- **Owner:** Enzo
- **Status:** Proposed

## Context

Flashcard App uses time for FSRS scheduling, due-card eligibility, daily progress, the adaptive new-card suggestion, and same-day due-only continuation. These operations need a consistent interpretation of both review instants and study days.

The specification establishes a global configurable study-day boundary, defaulting to 04:00 in the device's local time. An active session remains associated with the study day on which it started, including when it crosses that boundary. The user has also confirmed that the session must preserve its starting timezone context if the device's timezone changes.

The user has confirmed that due-card eligibility follows the scheduled instant. A card scheduled for 18:00 is not eligible at 10:00 merely because both times belong to the same study day. If a later session resolves to a study date already used after a timezone change, it reuses that date's daily progress and adaptive state.

ADR 0001 proposes explicit time inputs and a domain independent of device APIs. This ADR develops the time semantics for that boundary. It does not select a date library, public TypeScript API, or storage format.

## Decision

Represent scheduling instants independently of local display time, derive study days from explicit local-time context, and capture the context used by each review session when it starts.

1. **Distinguish instants from study days.** A review instant and a scheduled due instant identify moments on the UTC timeline. A study day is a calendar-based grouping determined by a local boundary and timezone. Domain concepts must preserve this distinction. Concrete timestamp units, serialization, and TypeScript representations will be defined with their respective API and persistence designs.

2. **Resolve study days from explicit inputs.** The application obtains the current instant, device timezone, and saved global study-day boundary through system boundaries. A deterministic calculation resolves the boundary instants for the relevant local dates and identifies the interval containing the supplied instant. Each interval includes its starting boundary and excludes the next one. Under ordinary local-time conditions, an instant before the configured boundary belongs to the preceding study date; at the boundary, it belongs to the new study date. Local calendar and timezone rules determine the boundaries, rather than adding a fixed 24-hour duration. If a timezone transition skips the configured local boundary, use the first valid local time afterward. If the boundary occurs twice, use its first occurrence. Returning to an earlier local clock reading during that repeated interval does not create a second boundary or move the study date backward.

3. **Capture the session's starting time context.** At session start, capture its assigned study day, the configured boundary, and the device timezone context used to determine that day. The proposed representation of timezone context includes a named timezone and the resolved starting-day boundaries, rather than only the UTC offset observed at launch. Application and domain code receive this context explicitly.

4. **Keep that context stable throughout the session.** Passing the daily boundary, changing the device timezone, or changing the global boundary does not reassign the active session to another study day. Its rounds, daily-count effects, adaptive-suggestion bookkeeping, and due-only continuation use the assigned study day and captured timezone context. A subsequent session obtains the then-current device context and saved boundary. Capturing context does not freeze the clock: each rating still has its own explicit review instant.

5. **Use scheduled instants for due-card eligibility.** When preparing a round, a previously studied card is due only if its scheduled due instant is less than or equal to the preparation instant. The same comparison applies whenever due eligibility is evaluated during the session. Sharing a study date does not make a future card eligible early. At the exact due instant, the card is eligible. Admission and ordering otherwise follow the accepted session policy.

6. **Keep study-day attribution separate from scheduling.** FSRS receives the explicit instant of each review through its internal domain integration. Confirmed ratings contribute to the active session's assigned study day even after its boundary passes. Study-day accounting does not replace a review instant with midnight, the boundary time, or the session-start instant. Undo restores the effects of the original rating in the day to which it was attributed.

7. **Reuse daily progress by assigned study date.** If a new session after a timezone change resolves to a study date already recorded, it reuses that date's distinct-card counts and each deck's new-card count, adaptive state, and pending due-only continuation. The changed timezone does not create a second daily progress record or authorize another daily adaptation for that date. The new session still captures its own current timezone context. This defines logical grouping, not a persisted key or schema.

8. **Preserve time meaning across persistence and presentation.** Stored scheduling data must retain the same instants when read back, regardless of the device's current timezone. The daily state required by the specification must retain enough attribution context to avoid silently moving confirmed study between days. Date formatting belongs to presentation; storage and business calculations must not depend on parsing display text or the host environment's implicit timezone.

9. **Reject ratings that precede the card's latest saved review.** Before scheduling and saving a rating, compare its explicit review instant with the latest saved review instant for that card, when one exists. If the proposed instant is earlier, preserve the card, its scheduling state, daily counts, and undo state, and ask the user to correct the device clock. Keep the current card available for a retry or allow the user to leave with earlier confirmed progress intact. A retry obtains a fresh explicit review instant and validates it again. Do not save the rejected rating or replace its instant with a fabricated later time. Equality does not trigger this chronological rejection.

For example, with a 04:00 boundary, a session beginning at 03:50 belongs to the preceding study date. A rating at 04:10 in that session uses its actual review instant and still contributes to the preceding study date. If the device timezone changes before the session ends, the session retains its captured context. The next session determines its study day from the current settings and device timezone.

## Rationale

- **Scheduling correctness:** Comparing explicit instants prevents cards from becoming eligible early simply because they share a calendar date.
- **Stable sessions:** Daily attribution remains consistent while the user studies across a boundary or a device timezone change.
- **Deterministic validation:** Fixed instants, timezone context, and boundaries make scenarios reproducible without relying on the machine running them.
- **Consistent daily behavior:** Counts, adaptation, and overflow continuation can use the same assigned day instead of independently deriving conflicting dates during one session.
- **Clear system boundaries:** Device access and date formatting remain outside core business rules, consistent with ADR 0001.
- **Predictable exception handling:** Explicit transition rules give each study day one boundary, while chronological validation prevents an invalid rating from changing confirmed state.

## Alternatives Considered

- **Use UTC midnight as the study-day boundary.** This simplifies grouping, but does not satisfy the configurable local-time boundary required by RN-014.
- **Recalculate the active session's day from the current device settings on every operation.** This follows device changes immediately, but can move ratings and session state between study days during the same session, conflicting with RN-015 and the approved timezone behavior.
- **Use only a fixed UTC offset as timezone context.** This is a small representation, but does not express the calendar rules needed to resolve other dates in that timezone. A named timezone with explicit resolved boundaries makes those assumptions visible.
- **Treat every card scheduled within the study day as immediately due.** This simplifies daily selection, but permits a review before its scheduled instant and conflicts with the user's eligibility decision.
- **Let domain code read the device clock and default timezone.** This reduces explicit inputs, but makes business behavior environment-dependent and conflicts with the proposed domain boundary in ADR 0001.
- **Shift a skipped boundary by the duration of the timezone jump, or choose its second occurrence when repeated.** These are possible resolution policies, but the approved behavior uses the first valid time after a gap and the first occurrence during a repetition.
- **Save a backward-dated rating or silently replace its timestamp.** The first option accepts an inconsistent review chronology; the second records an instant that the user did not actually supply. The approved behavior preserves state and requests clock correction before retrying.

## Consequences

- Session preparation must obtain and pass time context explicitly. The domain must not call the wall clock or read device settings.
- A date alone is insufficient to describe all session time assumptions. The session and persistence designs must explain which context is stored and which is reconstructed.
- Capturing a session's timezone does not authorize changing previously stored scheduling instants or moving confirmed daily counts when the device timezone changes.
- Calendar-day calculations and elapsed-time calculations require distinct operations. The ten-day schedule snapshot in RN-020 must use study-day boundaries in the relevant captured context.
- Timezone-boundary calculations must implement the approved gap and repetition rules explicitly. Selecting a date library or device API requires checking that its behavior matches these rules.
- Rating validation requires the card's latest saved review instant when one exists. A clock-correction error must preserve the current card and all confirmed state; correction and retry must not rewrite prior ratings.
- Required validation includes instants before, at, and after 04:00; a session crossing the boundary; a timezone change during a session; the next session using the updated context and reusing existing progress when its study date repeats; eligibility before, at, and after a card's due instant; skipped and repeated local boundaries; and backward-dated rating rejection followed by a valid retry. The same-instant case must also be covered separately from an earlier instant.
- This document records a proposed architecture and the approved product clarifications. Scheduling behavior and persistence guarantees remain unverified until corresponding scenarios and implementation checks exist.

## References

- [ADR 0001 — Pure TypeScript Domain and FSRS Integration Boundary](0001-pure-typescript-domain.md): explicit time inputs and domain independence; currently Proposed.
- [Project overview](../project-overview.md): the configurable local study day and continuity of active sessions.
- [System specification](../system-specification.md): RF-028, RN-005, RN-008, RN-011, RN-013–RN-015, RN-020, and RN-021.
- [UC08 — Conduct a Study Session](../use-cases/uc-008-conduct-study-session.md): session preparation, scheduling, daily attribution, and adaptive suggestions.
- [UC09 — Configure Global Study Settings](../use-cases/uc-009-configure-global-study-settings.md): boundary changes apply to subsequent sessions.
- [Agent instructions](../../AGENTS.md): explicit time, fixed scenarios, and timezone assumptions at system boundaries.
- [ADR conventions](README.md): record structure and preservation of decision history.
