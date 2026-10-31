# UC08 — Conduct a Study Session

## 1. Brief description

The user studies a deck by reviewing due cards and introducing eligible new cards. FSRS v6 schedules each card individually.

The study policy uses a global daily goal, an optional limit on distinct cards in each round, an adaptive suggestion for new cards, and voluntary continuation. Each rating is saved locally before the next card appears. While the session is active, the user can undo confirmed ratings sequentially in reverse order within that active session, or leave early; ratings that remain confirmed stay intact after an interruption.

## 2. Actor

- User: primary actor.

## 3. Preconditions

1. The user selects Study from an existing deck (UC05).
2. Local storage is available.
3. The system can read the global settings and deck settings needed for study. UC09 defines how the global settings are changed.
4. The system determines the current study day from the global boundary, which defaults to 04:00 in the device's local time (RN-014). If a timezone transition skips the configured boundary, it uses the first valid local time afterward; if the boundary occurs twice, it uses the first occurrence.

The deck need not have eligible cards. The alternative flow covers an empty round.

## 4. Event flow

### 4.1. Main flow

#### Stage A — Prepare the session and check the daily goal

1. The user selects Study in the chosen deck.
2. The system determines the study day and counts distinct cards with confirmed ratings on that day across all decks. If a timezone change makes this session fall on a study date already used, the system reuses that date's saved daily counts, adaptive state, and any pending due-only continuation.
3. The system checks whether the global daily goal `G` has been reached.
4. If the goal has not been reached, the system continues. Otherwise, it follows FA01.
5. The system starts a review session and fixes its study day and starting timezone context for the entire session, even if the configured boundary passes or the device timezone changes before the session ends (RN-015). A later session uses the then-current device timezone and saved boundary. Before card selection, it offers a choice to keep the `G` distinct-card limit, enabled by default, or disable it for this session (FA09). This choice applies to the session's round. Completing that round closes the session before its summary; choosing Estudar mais starts a new session with fresh preparation and a fresh limit choice.

#### Stage B — Select and suggest cards

6. The system identifies due cards in the selected deck, including overdue cards, whose scheduled due instant is less than or equal to the explicit round-preparation instant. A card scheduled for later in the same study day is not yet due.
7. The system identifies available new cards and how many cards were first studied in that deck on the session's study day.
8. The system follows the round-limit choice made for this session. With the limit kept, a round can contain at most `G` distinct cards, without subtracting cards studied in earlier sessions or other decks. With it disabled, a round has no distinct-card cap.
9. The system checks for a due-only continuation from an earlier capacity overflow on the same study day. If one is pending, it selects due cards through FA05 and skips automatic new-card selection. Otherwise, it selects due cards first: up to `G` with the limit enabled, or all due cards with it disabled.
10. On the deck's first session of the study day, the system adjusts the daily adaptive reference `A_deck` according to section 6. Unless a due-only continuation is pending, it uses that reference to suggest available new cards.
11. The system recalculates how many new cards to suggest using the chosen limit, the deck's current state, and the number of new cards already introduced in that deck on the study day. Only an enabled limit restricts the suggestion by remaining round capacity.
12. The system places selected due cards before suggested new cards in the round.
13. The system begins presenting cards. If none were selected, it follows FA04.

#### Stage C — Present and rate cards

14. The system shows the front of the selected card and keeps its back hidden.
15. The user activates Reveal. The card flips to show its back with a 200 ms animation; the answer remains accessible without relying on the animation alone (RF-019, RNF-008).
16. After the back is revealed, the system offers four ratings: Again, Hard, Good, and Easy, shown to users as Errei, Difícil, Bom, and Fácil (RF-020, RN-010).
17. The user chooses a rating. The chosen rating button enters an emphasized, animated loading state and replaces its visible text with a loading indicator. The other rating buttons and Undo stop accepting input without changing their existing appearance or starting an animation. Repeated taps do not submit another operation. Accessible feedback continues to identify the chosen rating and the pending state.
18. The system validates that the explicit review instant does not precede the card's latest saved review instant, when one exists; otherwise, FE05 applies. With a valid instant, it uses the card's current scheduling state, the rating, that instant, and applicable deck parameters to calculate its next state with FSRS v6. It does not impose a repeat-until-correct loop for Again (RN-011, RN-012).
19. The system attempts to persist the rating, new scheduling state, daily count effects, and data needed for Undo atomically.
20. The system waits for confirmation. The loading state lasts for the actual operation, without an artificial delay or a fixed timer that advances the card. Only after confirmation does the system count the rating as recorded and update progress indicators. If saving fails or its outcome is uncertain, FE01 applies.
21. The system updates the active queue according to the resulting schedule and application selection rules.
22. After the persisted outcome is confirmed, the system leaves the rating-loading state, shows the next currently eligible card, and repeats steps 14–21 while eligible cards remain in the round. When none is eligible now, Stage D applies immediately, even if an evaluated card is scheduled to become due again in a few minutes; the system does not wait or present that card early. The user may manage a flag on the current card through FA08 without rating it.

#### Stage D — End the session and show its summary

23. After the final eligible card's rating is confirmed and no eligible card remains now, end the session and its Undo before showing completion. Do not wait for a card due minutes later. Preserve a read-only completion result for presentation; do not offer Undo from the summary.
24. Show four summary blocks: distinct cards studied in the completed session; how many were new; counts of Errei/Difícil/Bom/Fácil; and global daily-goal progress across all decks. Use confirmed ratings that were not undone. A card rated more than once counts once in the distinct-card total; rating-category counts count retained rating actions and are not an accuracy score. Daily progress uses the completed session's assigned study day.
25. Show varied friendly messages based on the session activity and whether the global goal was met. If due cards remain outside a limited round's capacity, show their count and Estudar mais under FA05. When permitted, extra new cards follow FA06. Voluntary further study always starts a new session through Stage A; it cannot reopen the completed session or its Undo.
26. Back returns to the deck; the user may also return to the library. The completed session remains closed. A fresh session recalculates eligibility and the study day and offers the limit choice again. Early exit or empty/failed preparation does not show this completed-session summary.

### 4.2. Alternative flows

#### FA01 — Global daily goal already reached

1. At main-flow step 3, the system finds that the number of distinct cards studied on the study day is at least `G`.
2. The system tells the user that the daily goal has been reached and asks whether they want to study this deck anyway.
3. If the user continues, the main flow resumes at step 5 and offers the round-limit choice for that session.
4. If the user declines, the system returns to the deck details without starting a session, and the use case ends.

#### FA02 — Undo ratings in reverse session order

1. While the session is active, after a confirmed rating, the user activates Undo. The operation has no visible spinner or loading animation and no artificial delay. Until its persisted outcome is confirmed, rating and further Undo input are blocked without changing the controls' appearance or labels. Accessible control semantics continue to reflect whether input is available.
2. The system identifies the most recent confirmed rating that has not already been undone in the active session.
3. The system retrieves the prior card state and the corresponding round and queue context.
4. The system atomically reverses the rating and its scheduling and daily-count effects where applicable, without removing counts still supported by another confirmed rating.
5. Only after the reversal is confirmed, the system removes that rating from the remaining undo sequence, restores the corresponding round and queue position, and shows the card again.
6. The user may activate Undo again without rating the restored card, repeating steps 2–5 until no confirmed rating from this session remains to undo. The final confirmed eligible rating ends this session and its undo scope before the summary. Further study has a new session and a new sequence.
7. The user may instead rate the restored card, returning to main-flow step 14. A newly confirmed rating becomes the most recent undo target; previously undone ratings remain undone.
8. If no rating remains to undo, Undo is unavailable until another rating is confirmed in this session. A new session cannot undo ratings from an ended session.

#### FA03 — Leave before the round ends

1. The user asks to leave the active session.
2. The system keeps every confirmed rating and does not count any unconfirmed rating.
3. The system ends the session without rating the remaining cards.
4. The user returns to the deck details, and the use case ends.

#### FA04 — No cards selected automatically

1. During main-flow steps 6–13, no due or automatically suggested new cards are selected.
2. If new cards are available and no due-only continuation is pending, the system offers the voluntary new-card choice in FA06, subject to the configured round limit when enabled.
3. Otherwise, the system says that no cards are available for the current round.
4. No card scheduling state changes merely because the round is empty.
5. If the user does not choose FA06, they return to the deck details or another available destination, and the use case ends.

#### FA05 — Continue with remaining due cards

1. A previous limited round left due cards outside its capacity on the same study day. That pending overflow survives session completion and reopening.
2. At Stage D, show the remaining count and optional Estudar mais. Accepting starts a new session through Stage A; returning to the deck and choosing Study has the same fresh-session preparation.
3. In Stage B step 9 of the new session, select due cards only: up to G if the limit is enabled or all remaining due cards if disabled. No new cards enter until the overflow is exhausted.
4. After selection, resume Stage B step 10 with the due-only restriction preserved. Never resume a closed session directly at Stage C. Declining further study leaves the saved same-day continuation available.

#### FA06 — Study new cards beyond the suggestion

1. If available new cards remain and no due-only continuation is pending, the user may voluntarily request more than the automatic suggestion.
2. The system shows how many are available and lets the user choose an amount within the remaining round capacity when the limit is enabled, or up to all available new cards when it is disabled. Due cards retain priority.
3. While a session is active, add authorized new cards within its remaining capacity. A request from the completed-session summary instead starts a new session through Stage A and recalculates eligibility before admitting extras; it never reopens the completed session.
4. These cards follow normal FSRS v6 scheduling.
5. This choice does not automatically change `R_deck` or `A_deck`.
6. The flow continues with card presentation and rating.

#### FA07 — Leave before the first rating

1. The user leaves the session before any rating is confirmed.
2. The system ends the session without changing card scheduling states or recording a studied day from that session.
3. The user returns to the deck details.

#### FA08 — Manage a flag during review

1. While viewing the current card, the user opens its flag action.
2. The user may add one flag with an optional note, edit its note, or remove the flag and note through UC10.
3. On success, the flag change is saved locally. If saving fails, UC10 FE01 applies: preserve the stored flag and note, retain attempted note text for retry while its editor remains open, and offer Tentar novamente and Saiba mais.
4. The user remains on or returns to the same card in the active review session. The flag action and its recovery do not rate or reschedule the card or change review/study-day counts.

#### FA09 — Disable the Round Limit for This Session

1. At main-flow step 5, the user chooses to disable the `G` distinct-card limit for the current session.
2. The system keeps `G` as the daily progress goal and removes the distinct-card cap from this session's round. It selects all due cards before suggesting new cards, subject to a pending due-only continuation under FA05.
3. The main flow resumes at step 6 and recalculates the automatic new-card suggestion for this session. A later session offers a new choice; disabling this session's limit does not change the global goal or deck settings.

#### FA10 — Background and Return While the Application Remains in Execution

1. The user temporarily puts the application in the background while the review session is active.
2. While the process remains in execution, the system preserves the same session, round, queue, current-card presentation state, round-limit choice, captured study-day and timezone context, and full remaining undo sequence for the active session.
3. When the user returns, the system resumes that session rather than starting a new one. It uses a fresh current instant when evaluating eligibility or submitting a rating, while retaining the session's assigned study day.
4. If a rating or undo operation was unresolved, the system checks its persisted outcome before advancing or retrying, following FE01 or FE03 as applicable.
5. The current round continues if a card is eligible now; otherwise, Stage D applies without waiting for a future scheduled instant.
6. If the process ended while backgrounded, FE02 applies instead.

### 4.3. Exception flows

#### FE01 — Rating persistence fails or its result is uncertain

1. At main-flow step 19 or 20, storage fails or the confirmation result is unavailable.
2. The system keeps the same card with its back revealed. It does not advance the queue, update confirmed progress, or present the rating as saved without a confirmed persisted outcome. Conflicting rating and Undo input remains blocked while the operation is unresolved; the unchosen controls retain their appearance.
3. If the system knows the rating was not saved, it leaves the loading state, restores the chosen button's label, and reports that the rating could not be saved. It offers **Tentar novamente** (Retry) and **Sair da revisão** (Leave review). Retrying preserves the card context and follows the existing validation and persistence rules; it must not create a duplicate rating.
4. If the outcome is unknown, the system says it is checking whether the rating was saved rather than reporting a confirmed failure. It reconciles persisted state before enabling a new attempt or advancing. If saved, it reflects that confirmed result once and resumes at main-flow step 21; if not saved, step 3 of this exception applies.
5. The failure or uncertain-outcome feedback includes a local error notification with a **Saiba mais** (Learn more) action. That action opens additional readable information about the error or operation, including the known confirmation state and available diagnostic details. Opening or closing these details preserves the same card, revealed-back state, and session; it does not submit a rating or perform Undo. Details must not claim that an unresolved operation failed or succeeded.
6. If the operation cannot be recovered, the user may leave while earlier confirmed ratings remain intact. Preserve the information needed to determine the unresolved operation's persisted outcome later; leaving must not turn uncertainty into a presumed failure or trigger an automatic duplicate submission.

#### FE02 — Abrupt application interruption

1. The application process ends during a session, whether through user closure, operating-system termination, or an unexpected failure.
2. Confirmed transactions remain saved, and interrupted operations do not leave partial scheduling, count, or Undo state.
3. On reopening, the system reads persisted state to determine which ratings were completed; it does not assume an unacknowledged rating failed.
4. The user may start a new session from the consistent saved state, including the saved daily counts, adaptive state, and any same-day due-only continuation. The previous live queue and session-scoped undo availability are not restored as an active session.

#### FE03 — Undo persistence fails

1. Undo encounters a storage or reversal failure, or its confirmation is unavailable after an interruption.
2. The system preserves the last confirmed card, scheduling, daily counts, and undo target. It does not advance through the undo sequence or report completion without a confirmed persisted outcome. Conflicting rating and Undo input remains blocked while the operation is unresolved, without a visible loading state or appearance change.
3. If the reversal is confirmed not saved, the system offers **Tentar novamente** (Retry) and **Saiba mais** (Learn more) in a local error notification. Retry targets the same rating and cannot skip an earlier rating or partly reverse its effects.
4. If confirmation is unavailable, recovery internally reads the persisted outcome before enabling another study operation or retry. A saved reversal is reflected exactly once through FA02 step 5; a reversal confirmed not saved follows step 3 of this exception. This check does not require a dedicated uncertain-result screen or a user decision about whether saving succeeded, and it does not automatically submit another Undo.
5. Saiba mais exposes the known operation state, cause, and available diagnostics. Opening or closing the details preserves the card and session and neither performs Undo nor submits a rating. It must not describe an unresolved outcome as a confirmed failure or success.
6. If the process ended, FE02 applies: reopening reads consistent stored state and does not replay the interrupted Undo or restore the ended session's undo access. If recovery cannot complete while the session is live, the user may leave under FA03 with earlier confirmed ratings and the information needed for later reconciliation preserved; leaving does not convert an unknown result into a presumed failure.

#### FE04 — Round preparation or adaptive adjustment fails

1. The system cannot retrieve or persist the information needed to prepare a consistent round.
2. It does not partly update `A_deck` or create a round from inconsistent information.
3. It reports temporary unavailability with Tentar novamente and Saiba mais while preserving previously saved data and the valid deck context. It does not show a failed preparation as a successful empty round.
4. The user may retry preparation or return to the deck details; opening diagnostic details neither starts study nor retries automatically.

#### FE05 — Review instant precedes the latest saved review

1. At main-flow step 18, the proposed review instant is earlier than the card's latest saved review instant.
2. The system does not apply or save the rating. It leaves the rating-loading state, restores the chosen button's label, preserves the card's scheduling state, daily counts, and undo state, and keeps the current card available.
3. The system explains that the device clock must be corrected before the rating can be saved.
4. After correcting the clock, the user may retry the rating. The system obtains a fresh explicit review instant and validates it again before calculating or saving changes.
5. The user may also leave the session with earlier confirmed ratings intact. The system does not fabricate a timestamp or alter previous ratings to bypass this check.

## 5. Postconditions

- **Success:** Each confirmed rating is saved individually, FSRS v6 updates the card's scheduling state, and progress reflects confirmed ratings.
- **Daily goal reached:** The progress indicator records this without blocking voluntary study in new sessions.
- **Early exit:** Confirmed ratings remain valid; unrated cards receive no artificial ratings.
- **Background and return:** While the process survives, the same session, round, queue, time context, and full remaining undo sequence remain active.
- **Application closure:** Confirmed ratings and required daily state remain saved. Reopening can start a new session from that state.
- **Final eligible card confirmed:** The round and session end immediately, Undo becomes unavailable, and the four-block summary is shown. Future-scheduled cards keep their schedules; further study starts a new session.
- **No selected cards:** No card is rated or rescheduled.
- **Successful Undo:** The most recent remaining confirmed rating in the active session and its dependent effects are reversed consistently. Earlier ratings in that active session remain available until it ends; the completed-session summary never exposes Undo.
- **Failure:** An incomplete operation makes no partial changes; the previously confirmed state remains intact.

## 6. Associated business rules — Study policy and adaptive suggestion

### 6.1. Variables and counts

- `G`: global daily goal of distinct cards and, when a session keeps the optional round limit, the maximum distinct-card capacity of that session's round. The default is 20. The user sets an integer of at least 10, with no maximum; UC09 warns without blocking when the value exceeds 50.
- `U`: set of distinct card identities studied on the current study day across all decks.
- `R_deck`: daily new-card reference configured for the deck. Its default is the nearest integer to `G / 3`.
- `A_deck`: daily adaptive reference, initially equal to `R_deck` and adjusted according to observed demand.
- `N_deck`: set of card IDs first studied on the current study day in this deck.
- `D`: set of due cards in this deck when the round is prepared, whose scheduled due instant is less than or equal to the explicit preparation instant.

A card appears only once in `U` for a study day and only once in `N_deck` if its first historical rating occurs on that day. A repeated presentation of a card does not make it a new distinct card.

The study day follows the global boundary, defaulting to 04:00 in device local time. A session keeps its starting study day and timezone context even if it crosses the boundary or the device timezone changes. A later session determines its study day from the then-current device timezone and saved boundary. If that study date was already used before a timezone change, the session reuses its daily counts, adaptive state, and pending due-only continuation; changing timezone does not trigger another daily adaptation for the same study date. Each rating still uses its own explicit review instant for FSRS scheduling.

Study-day intervals include their starting boundary and exclude the next one. A skipped boundary resolves to the first valid local time afterward; a repeated boundary resolves to its first occurrence. Passing through the repeated local clock readings does not create a second study-day boundary. A rating earlier than the card's latest saved review follows FE05; an equal instant does not trigger that chronological rejection.

### 6.2. Check the global goal

If `|U| ≥ G` before a deck session starts, the system tells the user that the global goal has been reached and lets them choose whether to continue.

The global goal does not block more sessions. When the session keeps the round limit, each new round has a full capacity of `G`; the limit must not be `G − |U|`. When the session disables it, `G` remains the progress goal and does not cap a round.

### 6.3. Build a round

The system first identifies due cards `D` in the selected deck:

- When the session keeps the round limit: `selectedDue = min(|D|, G)` and `slotsForNew = min(availableNew, G − selectedDue)`. If `|D| > G`, then `slotsForNew = 0`.
- When the session disables the round limit: `selectedDue = |D|` and `slotsForNew = availableNew`. `G` does not reduce the number of due or new cards in the round.
- During a same-day due-only continuation after a previous capacity overflow: `slotsForNew = 0` until the overflow is exhausted, even if the limit has since been disabled.

Selected due cards appear before suggested new cards. With the limit enabled, due cards exceeding the capacity may form further rounds requested voluntarily. If scheduling and application policy cause a card to appear again, it still counts as one distinct card.

### 6.4. Adapt the new-card suggestion

The system updates `A_deck` adaptively at most once per study day for that deck. Reopening it on the same study day does not trigger another adaptive adjustment. Explicitly editing `R_deck` in UC06 makes it a manual reference and resets `A_deck` to that value. Changing `G` in UC09 recalculates `R_deck` as the nearest integer to `G / 3` and resets `A_deck` only for decks whose reference remains automatically linked to G. Decks with a manual `R_deck` keep both their reference and their adaptive value. These settings changes are separate from the daily adaptive adjustment.

The adjustment step is:

`step = max(1, ceil(R_deck / 5))`

The system uses the first session in each of the last five distinct study days on which the deck was studied to build demand history. Only a day with a confirmed rating counts as a studied day for this history.

`lightHistory` is true when the history contains five days and, on at least three of them, the first session began with fewer than `R_deck` due cards.

`overdueNow` is the number of cards that were already due before the current study day began and still have no corresponding rating.

`F[1..10]` contains the numbers of cards in the current deck that are currently scheduled for each of the next ten study days. Cards from other decks are excluded. It is a snapshot of current scheduling, not an exact forecast of future rescheduling.

Calculate:

- `earlyAverage = average(F[1..5])`
- `lateAverage = average(F[6..10])`
- `peak = max(F[1..10])`

The conditions are:

- `futureCapacity`: `lateAverage < R_deck` and `peak + A_deck ≤ G`.
- `noSharpIncrease`: `lateAverage ≤ earlyAverage + step`.
- `lightToday`: `|D| < R_deck` and `overdueNow = 0`.

On the deck's first session of the study day:

- If `R_deck = 0`, set `A_deck = 0`.
- If `lightHistory`, `lightToday`, `futureCapacity`, and `noSharpIncrease` are all true, set `A_deck = min(G, A_deck + step)`.
- Otherwise, set `A_deck = max(R_deck, A_deck − step)`.

Persist the updated `A_deck` so subsequent entries into the deck on the same study day reuse it. Opening and leaving without a confirmed rating can adjust this reference, but does not add a studied day to the history or daily study counts.

### 6.5. Calculate the suggested number of new cards

- `newRemainingSuggestedToday = max(0, A_deck − |N_deck|)`
- `newSuggested = min(slotsForNew, newRemainingSuggestedToday)`

`A_deck` is a daily pace reference, not an absolute limit on new cards the user may study voluntarily. Voluntary extra new cards must fit within the round's distinct-card capacity when the session keeps the limit; when the session disables it, they are limited by the deck's available new cards.

### 6.6. Record distinct cards

After a rating is saved successfully:

- Add the card identity to `U` if it is not already counted on that study day.
- If this is the card's first historical rating, add its ID to `N_deck`.
- Another rating of the same card on the same day adds no second occurrence to either set.

Undo keeps these indicators based only on ratings that remain saved. Reaching `G` during a round does not end it automatically.

### 6.7. Continue studying

After the last eligible rating is confirmed, the completed session is closed. The summary reports global-goal progress and any due cards left out by capacity. Estudar mais starts a new session through Stage A, with a fresh study-day evaluation, eligibility calculation, and limit choice (enabled by default).

Same-day pending due-only continuation survives this boundary until its overflow is exhausted, even when the new session disables the limit. Once none is pending, optional extra new cards remain available subject to due priority and the newly selected capacity. Further study never restores the old session's Undo and does not automatically change R_deck or repeat an already-completed daily adaptation.

### 6.8. Boundary between FSRS and application policy

FSRS v6 calculates each card's scheduling state from review data and applicable parameters. Application policy determines eligibility, admission of new cards, round capacity, due-card selection, progress indicators, and voluntary continuation. The adaptive suggestion does not replace FSRS scheduling.

## 7. Related requirements and use cases

This use case covers RF-017–RF-025, RN-004–RN-015, RN-020, RN-021, RNF-003, and RNF-008. It uses the global goal in RF-008, the deck reference in RF-009, and the study-day setting in RF-028. FA08 invokes UC10 for flag actions under RF-013–RF-015. UC05 starts this session; UC09 configures the global study settings.
