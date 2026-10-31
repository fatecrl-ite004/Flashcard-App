# UC10 — View Card and Manage Flag

## 1. Brief Description

Allows the user to view an individual card outside a review session and to add, edit, or remove that card's single flag and optional note. The same flag actions are available on the current card during a review session (UC08). Imported card content remains view-only.

## 2. Actors

- User: primary actor.

## 3. Preconditions

1. The card belongs to an existing deck.
2. The user has selected the card from the deck details (UC05), or the card is currently being presented in an active review session (UC08).

## 4. Event Flow

### 4.1. Basic Flow — Individual Card View

1. The user selects a card in the deck details (UC05).
2. The system retrieves the card's front, back, and any existing flag and note from local storage.
3. The system presents the card's imported content and current flag state without offering content editing.
4. The user views the card and may use one of the flag actions below.
5. The user returns to the deck details (UC05).

### 4.2. Alternative Flows — Flag Actions

#### FA01: Add a Flag

1. At step 4 of the basic flow, or while the current card is presented in UC08, the user chooses to flag a card that has no flag.
2. The system offers an optional text note.
3. The user saves the flag, with or without a note.
4. The system saves the flag and optional note locally and shows the card as flagged.
5. The user remains in the individual card view or returns to the same current card in the active review session.

#### FA02: Edit a Flag Note

1. At step 4 of the basic flow, or while the current card is presented in UC08, the user chooses to edit the note on a flagged card.
2. The system displays the current note, if any.
3. The user changes or clears the note and saves it.
4. The system saves the revised optional note locally, retaining the card's flag.
5. The user remains in the individual card view or returns to the same current card in the active review session.

#### FA03: Remove a Flag

1. At step 4 of the basic flow, or while the current card is presented in UC08, the user chooses to remove its flag.
2. The system removes the flag and its associated note from local storage and updates the card's flag state.
3. The user remains in the individual card view or returns to the same current card in the active review session.

#### FA04: Cancel a Flag Change

1. Before saving an addition or note edit, the user cancels the change.
2. The system retains the previously saved flag and note, if any.
3. The user remains in the individual card view or returns to the same current card in the active review session.

### 4.3. Exception Flows

#### FE01: Local Save Failure

1. During a flag addition, note edit, or flag removal, local storage confirms that the change could not be saved. An unresolved outcome must not be presented as a confirmed failure or success.
2. The system preserves the previously stored flag and note together. A failed addition does not mark the card as successfully flagged; a failed edit keeps the stored note; a failed removal keeps both the flag and its note.
3. For an addition or note edit, the system retains the attempted note text while the flag editor remains open, identifies it as **não salvo** (not saved), and does not replace it with the stored note. Clearing a note is also an attempted change that can be retried.
4. A local error notification explains that the flag change could not be saved and offers **Tentar novamente** (Retry) and **Saiba mais** (Learn more).
5. Retry repeats the same attempted flag action for the same card, retaining the entered or cleared note without requiring re-entry. Saiba mais exposes the known cause and available diagnostic details; opening or closing it neither changes the flag or note nor submits another action.
6. The user may retry or return to the current card with the stored flag and note unchanged. During review, the same card and active session remain in place; the failed action, diagnostic view, and retry do not rate or reschedule the card or change review/study-day counts. A successful retry updates only the flag and its optional note.

#### FE02: Individual Card Read Fails

1. Reading the selected card or its saved flag/note fails.
2. Preserve the valid deck/review origin and offer Tentar novamente and Saiba mais. Do not show an absent card, empty note, or unflagged state as a successful read.
3. Retry reading or return safely to the origin. An invalid card/deck relationship must not open another card. A route alone cannot create a study session.

## 5. Postconditions

- View only: The card's content and flag state remain unchanged.
- Successful flag action: The card has at most one flag, and its optional note reflects the locally saved change. Removing the flag also removes its note.
- During review: The active review session stays open on the same card. A flag action does not rate the card or change its scheduling state, review count, or study-day counts.
- Cancellation or failure: The previously stored flag and note remain unchanged.
