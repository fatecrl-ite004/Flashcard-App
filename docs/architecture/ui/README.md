# UI and interaction decisions

This document records approved presentation behavior for the future Android interface. It does not report an implemented screen or a runtime validation result. Requirement meaning remains in the [system specification](../../system-specification.md); the complete flows remain in [UC08](../../use-cases/uc-008-conduct-study-session.md) for study, [UC04](../../use-cases/uc-004-import-deck.md) for import, [UC06](../../use-cases/uc-006-edit-deck-settings.md) / [UC09](../../use-cases/uc-009-configure-global-study-settings.md) for settings, [UC07](../../use-cases/uc-007-delete-deck.md) for deletion, and [UC10](../../use-cases/uc-010-view-card-and-manage-flag.md) for flags and notes.

## E01 — Rating persistence feedback

- **Approved by:** the project owner in the UX-flow discussion on 2026-10-29, including an explicit go-ahead to formalize E01.
- **Affected requirements:** RF-020, RF-022, RF-023, RNF-003, RNF-005, and RNF-006.
- **Use-case locations:** UC08 Stage C and FE01.
- **Status:** approved behavior documented; implementation and Android validation pending.

Only the selected rating button changes visually while its operation is pending: its visible text becomes an animated loading indicator, and the button receives visual emphasis. The other rating buttons and Undo ignore input without an appearance change or animation. Accessible feedback retains the selected action's identity and pending state. Visual silence on the other controls must not allow a second rating or Undo to race the unresolved operation.

Loading reflects the actual operation. It does not establish a microsecond response-time requirement, require an artificial delay, or authorize advancing before persistence confirmation. Confirmed success advances to another currently eligible card or reaches the existing completion flow when none remains.

A confirmed failure keeps the same card's revealed back and offers Retry or Leave review. An uncertain result is checked before retrying or advancing; a recovered saved result is reflected once. Error feedback offers **Saiba mais** for readable operation and diagnostic details, without losing the session or submitting another action. The exact placement and graphic treatment of the notification remain part of screen design.

The existing application/domain ownership and persistence boundaries remain unchanged. This decision does not choose a logging service, an error-log retention schema, or an external notification channel.

## Validation when the interface is implemented

1. Confirm that only the selected rating button changes visually and that repeated input on any rating or Undo has no effect during the unresolved operation.
2. Confirm that a successful saved rating advances exactly once, and that a final eligible card reaches completion only after confirmation.
3. Inject a confirmed save failure: preserve the revealed card, show Retry and Leave review, and retain previously confirmed ratings.
4. Lose the save acknowledgment after a successful write: reconcile, reflect the rating once, and prevent duplicate submission.
5. Open and close **Saiba mais** for confirmed and uncertain failures: retain the card/session and describe the actual known outcome accurately.
6. Check accessible action names and pending feedback while the selected button's visible text is replaced.

Validation above is planned, not executed by this documentation change.

## E02 — JSON import error feedback

- **Approved by:** the project owner in the UX-flow discussion on 2026-10-29, with explicit approval of E02.
- **Affected requirements:** RF-002, RN-001, RN-002, RN-022, and RNF-005.
- **Use-case locations:** UC04 FA01, FE01–FE04, and section 4.4.
- **Status:** approved behavior documented; implementation and Android validation pending.

Import failures use a local error notification with **Saiba mais**. The message identifies the known failure category and next action: select another or corrected file for invalid JSON, select an accessible file for a reading problem, or address the reported local-storage problem before trying a new import. Insufficient space is distinguished from another saving failure. Details provide available diagnostic information without guessing a cause or defining the future JSON schema.

Canceling the file picker returns to the library without an error alert. A duplicate-content warning remains its existing confirmation flow. Opening diagnostics does not change the source file or library, and does not start another import automatically. The existing complete-validation and all-or-nothing persistence guarantees apply to every attempt.

### Validation when import is implemented

1. Cancel the picker: return to the library with no new deck and no error alert.
2. Select invalid JSON or an invalid deck: reject the entire import and offer a new selection with understandable error details.
3. Deny file reading or inject a read failure: identify the known reading/access problem without claiming the file's structure was validated.
4. Inject insufficient space and another save failure: present the corresponding cause and recovery, with no partial deck or cards retained.
5. Open and close **Saiba mais** for each failure category: retain recovery actions and existing data; do not modify the file or retry automatically.
6. Exercise duplicate cancellation and confirmation: keep the existing independent numbered-copy behavior and preserve existing progress.

These checks are planned, not executed by the documentation change.

## E03 — Settings autosave and persistence errors

- **Approved by:** the project owner in the UX-flow discussion on 2026-10-29, replacing explicit Save/Cancel with automatic saving, accepting name and description as free-text exceptions saved on leaving the field, and setting their maximum lengths to 50 and 500 characters.
- **Affected requirements:** RF-006, RF-007, RF-008, RF-009, RF-010, RF-028, RN-020, RNF-004, and RNF-005.
- **Use-case locations:** UC06 and UC09 basic flows, return alternatives, and FE02; UC06 FA02 for text limits.
- **Status:** approved behavior documented; implementation and Android validation pending.

Option selection saves automatically. A slider submits its selected value when the user releases it after adjusting. Non-text controls offer valid choices rather than requiring a user-facing input-error correction flow; internal application/domain validation remains. Controls must retain the accepted rules, including a global goal with no maximum. A goal above 50 produces a nonblocking recommendation without an additional Save or confirmation step.

Name and description are free text with maximum lengths of **50** and **500 characters**, respectively, and save when the user leaves the changed field. Each shows a character counter and prevents typed or pasted text from exceeding its limit, without an error notification. This change adds no minimum-length or content-format restriction and does not define the future JSON schema or authorize truncating imported data. The deck's new-card setting indicates whether it inherits the global default or is a manual override.

Successful persistence keeps the user on settings and reflects the confirmed value. Back navigates while preserving confirmed updates; there is no screen-level Save or Cancel action. A text field losing focus through Back follows the same save trigger. A pending operation must not be shown as saved. A confirmed failure preserves the last stored value and dependent values, leaves earlier successful updates intact, and keeps the attempted selection or text visible as **não salvo** while settings remain open. The local notification offers **Tentar novamente** and **Saiba mais**. Details show the known cause and available diagnostics without submitting another save. Retry reuses the attempted value. Leaving settings does not establish a persistent unsaved-draft feature; reopening reads confirmed storage.

### Validation when settings are implemented

1. Change a selector and release a changed slider: trigger automatic saves without Save/Cancel actions or leaving settings after success.
2. Enter and paste name/description values at 50/500 characters and beyond: enforce the respective limits and matching counters without a general error alert; save a changed field on loss of focus, including through Back.
3. Confirm that the non-text controls cannot select invalid values and that internal rules remain enforced; retain the goal minimum of 10, no maximum, and the nonblocking warning above 50.
4. Confirm the deck's inherited/manual indication and existing G/3 policy: a global-goal change updates only automatic references, while a manual new-card change resets that deck's adaptive value.
5. Inject a confirmed save failure: preserve last confirmed values and dependent references, retain the attempted value as not saved, and expose Retry and Saiba mais. Earlier successful changes must survive.
6. Open/close error details and retry: preserve the attempted value, avoid an automatic retry from opening details, and mark saved only after persistence confirms success.
7. Return and reopen settings after confirmed saves: retain values, including earlier successes when a later change failed. Verify that a goal-save failure never leaves a subset of its dependent deck references updated.

These checks are planned, not executed by this documentation change.

## E04 — Deck deletion failure and retry

- **Approved by:** the project owner in the UX-flow discussion on 2026-10-29, explicitly approving the proposed E04 treatment.
- **Affected requirements:** RF-005, RN-016, and RNF-005.
- **Use-case location:** UC07 FE01, with retry returning to the basic confirmation flow and cancellation following FA01.
- **Status:** approved behavior documented; implementation and Android validation pending.

A confirmed deletion failure preserves the deck and all associated data through the existing atomic rollback guarantee. The user returns to the deck details and receives the local notification **Não foi possível excluir o deck.**, with **Tentar novamente** and **Saiba mais**. Diagnostics expose the known cause and available details without changing data or retrying automatically.

Retry reopens the deletion confirmation. Only a new explicit confirmation starts another deletion attempt; canceling keeps the deck intact. The user may remain on the details or navigate normally. The existing successful-deletion scope and return to the library remain unchanged. An unresolved deletion outcome must not be labeled as a confirmed failure or success.

### Validation when deletion is implemented

1. Inject a confirmed local deletion failure: keep the deck, cards, scheduling, flags/notes, tag associations, adaptive data, and undo data intact and return to the deck details with both notification actions.
2. Open and close **Saiba mais**: expose only known diagnostic information, without a deletion or automatic retry.
3. Select **Tentar novamente**: show a new confirmation and perform no deletion before it is accepted.
4. Cancel the repeated confirmation: remain on the deck details with all data intact.
5. Confirm the repeated deletion and complete it successfully: apply the existing atomic deletion and return to the refreshed library.

These checks are planned, not executed by this documentation change.

## E05 — Flag and note persistence errors

- **Approved by:** the project owner in the UX-flow discussion on 2026-10-29, explicitly approving preservation of the saved flag/note, attempted note text for retry, Retry/Learn more actions, and continuity on the same card during review.
- **Affected requirements:** RF-013, RF-014, RF-015, RN-003, and RNF-005.
- **Use-case locations:** UC10 FE01 and UC08 FA08.
- **Status:** approved behavior documented; implementation and Android validation pending.

A confirmed flag-action save failure preserves the stored flag and its note together. A failed addition leaves the saved card unflagged, a failed note edit retains its stored note, and a failed removal retains both the flag and note. An attempted addition/edit keeps the entered or cleared note visible as **não salvo** while its editor remains open, so retry does not require re-entry.

The local error notification offers **Tentar novamente** and **Saiba mais**. Retry repeats the same attempted flag action for the same card with its attempted note. Details show the known cause and available diagnostics; opening or closing them does not change data or submit another action. The user may retry or return to the current card with the stored flag and note unchanged. An unresolved outcome must not be labeled as a confirmed save or failure.

During review, the active session stays on the same card. The flag action, failure feedback, diagnostics, and retry do not rate or reschedule it or change review/study-day counts. A successful retry changes only the flag and its optional note. The retained text is available while the editor remains open; this behavior does not establish persistent storage for unsaved drafts.

### Validation when flags are implemented

1. Fail an addition with and without a note: preserve the prior unflagged state and retain any entered text for retry.
2. Fail a note edit, including clearing it: retain the saved note and the attempted edited/empty value separately; retry the attempted value without re-entry.
3. Fail removal: preserve the flag and its complete note together.
4. Open and close **Saiba mais**: show the known cause/diagnostics without modifying the flag, losing entered text, or retrying automatically.
5. Retry successfully: apply the same intended action to the same card, updating only the flag/note and preserving the one-flag invariant.
6. Exercise each failure, details view, and retry from both individual card view and review. In review, retain the same card/session and unchanged scheduling, rating, and daily counts; returning without retry preserves the saved flag/note.

These checks are planned, not executed by this documentation change.

## E06 — Seamless Undo and internal interruption recovery

- **Recorded on:** 2026-10-31, after the project owner approved the revised E06 in the UX-flow discussion and authorized completing its documentation.
- **Affected requirements:** RF-024, RN-013, RNF-003, RNF-005, and RNF-006.
- **Use-case locations:** UC08 FA02 and FE03; process termination follows FE02.
- **Status:** approved behavior documented; implementation and Android validation pending.

Undo has no visible spinner or loading animation and no artificial delay. While its persisted outcome is pending, rating and further Undo input are blocked without changing the controls' appearance or labels; accessible semantics reflect input availability. After confirmation, restore the card, corresponding round/queue context, attributable counts, and remaining undo sequence through the existing FA02 behavior.

A confirmed failure preserves the last saved state and the same undo target, with **Tentar novamente** and **Saiba mais**. Retry reverses that same rating. Details expose the known cause, operation state, and available diagnostics without submitting Undo or a rating. The stored outcome of an interrupted confirmation is checked internally before another operation is allowed. Reflect an already saved reversal exactly once; allow a retry only after determining that the reversal was not saved. This recovery does not introduce a dedicated uncertain-result screen or ask the user to decide whether the write succeeded.

If the process ended, reopening follows the existing new-session recovery: read consistent storage without automatically replaying Undo or reviving the old session's undo sequence. If live-session recovery cannot complete, the existing ability to leave remains, preserving confirmed progress and the information needed to reconcile the operation later.

Keeping the information needed to reverse each session rating ready in memory is a candidate to validate during domain exploration. The owner prioritized a seamless interaction; no cache structure, storage schema, fixed latency target, or optimistic update before persistence confirmation is established here. The sequential scope described here was revised by UX baseline 1.1.0 below: the final summary closes the session and Undo; further study starts a new session. The no-spinner and recovery behavior remains in effect.

### Validation when Undo is implemented

1. Undo successfully without a spinner, label replacement, appearance change, or artificial delay; reflect the restored card/counts/sequence only after persistence confirmation.
2. Tap rating or Undo repeatedly during the unresolved operation: do not submit conflicting operations; retain accessible control semantics.
3. Inject a confirmed reversal failure: preserve the saved state and same target, show Retry and Saiba mais, and retry without skipping or reversing another rating.
4. Withhold acknowledgment after saving a reversal: reconcile internally and reflect it once without a duplicate Undo or a user-facing uncertain-result decision. Also check an interrupted reversal confirmed not saved before enabling retry.
5. Open and close Saiba mais: preserve the card, session, and target without a rating or another reversal.
6. End the process around a reversal and reopen: preserve consistent stored effects, do not replay the old request, and do not restore ended-session undo access.
7. Retain sequential Undo checks while the session is active, including repeated ratings, supported counts and unrelated flag-note changes; confirm Undo is unavailable after the completed-session boundary under UX baseline 1.1.0 below.

These checks are planned, not executed by this documentation change.

## UX baseline 1.1.0 — Ready for Figma flow design

- **Date:** 2026-10-31.
- **Owner decisions:** the completed-session summary ends the session and Undo; Estudar mais starts another session. The summary contains distinct cards, new cards, rating-category counts and global daily-goal progress. The owner approved isolated onboarding examples, the remaining error-feedback pattern, creation of tags (30-character maximum, no blank names, reuse an existing name), and Android Back interruption confirmation during the demonstration.
- **Earlier decisions consolidated:** sole library root with avatar preferences; level/skip confirmation; forward-only onboarding; removal of the advanced FSRS area and next-review date; settings autosave and E01–E06 recovery.
- **Lifecycle revision:** this replaces the cross-round continuation/Undo scope described in the earlier E06 text. E06's no-spinner, confirmation, retry and internal-recovery treatment remains. A completed summary has no Undo; new study has a new sequence and limit choice.
- **Design packet:** [Figma handoff](../../ux/phase-1-figma-handoff.md), [screen/state inventory](../../ux/phase-1-screen-inventory.csv), and [document walkthrough](../../ux/phase-1-document-walkthrough.csv).

Initialization/read failures, failed study preparation, and failed onboarding completion/skip preserve valid data/context and offer Tentar novamente and Saiba mais. A failed read must not impersonate an empty library/list or zero progress. Failed preparation does not create a usable inconsistent session. Completion/skip opens the library only after confirmation. These are presentation contracts awaiting implementation and Android validation.

The four summary blocks show only confirmed, not-undone activity. Distinct-card and new-card totals count identities once. Errei/Difícil/Bom/Fácil counts are rating actions, not a measured accuracy score. Global goal progress includes all decks on the completed session's study day. Example: three cards, one new, four retained ratings gives 3 distinct cards, 1 new card and 4 ratings across the four categories; those totals need not match each other. Expanded history remains Phase 2.

The profile/preferences entry is a navigation hub for the essential Phase 1 preferences. Its avatar does not authorize accounts, editable full profiles, analytics or another root tab. Menus and icon placement remain design work. Tag creation is a newly approved text-entry exception in addition to deck name/description; its action saves the tag and association consistently.

Existing E01–E06 entries record their original approval. Where lifecycle wording conflicts, this dated revision and the canonical specification govern. The ADRs remain Proposed. No screen, real-device gesture, persistence performance or user-test success is claimed by this packet.
