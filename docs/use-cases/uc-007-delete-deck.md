# UC07 — Delete Deck

## 1. Brief Description

Allows the user to permanently remove a deck from the local library, including its associated data, after an explicit confirmation.

## 2. Actors

- User: primary actor.

## 3. Preconditions

1. The user is viewing the deck details (UC05) and has selected Delete Deck.

## 4. Event Flow

### 4.1. Basic Flow — Main Path

1. The system displays a confirmation dialog: "Are you sure you want to delete this deck and all its cards? This action cannot be undone."
2. The user confirms the deletion.
3. The system starts an atomic local transaction to delete together:
   - The deck record.
   - Every card in the deck.
   - Orphaned tags or tag associations linked to the deck.
   - Associated FSRS scheduling states, flags and their notes, daily data needed for the adaptive suggestion, and undo data.
4. The system completes the transaction and returns the user to the deck library (UC03), where the deleted deck is no longer shown.
5. The use case ends.

### 4.2. Alternative Flows

#### FA01: Cancel Deletion

1. At step 1 or 2 of the basic flow, the user selects Cancel in the confirmation dialog.
2. The system aborts the deletion.
3. The user returns to the deck details (UC05) with local data unchanged.

### 4.3. Exception Flows

#### FE01: Local Storage Failure During Deletion

1. At step 3 of the basic flow, local storage confirms that the deletion failed because of a device or storage problem. An unresolved outcome must not be presented as a confirmed failure or success.
2. The system rolls back the atomic transaction so that the deck and all its associated data remain intact, without partial deletion or corruption.
3. The system returns the user to the deck details (UC05) and displays a local notification: **Não foi possível excluir o deck.** (The deck could not be deleted.) It offers **Tentar novamente** (Retry) and **Saiba mais** (Learn more).
4. Saiba mais exposes the known cause and available diagnostic details. Opening or closing these details neither modifies the deck nor starts another deletion.
5. Tentar novamente returns to step 1 of the basic flow and requires a new explicit deletion confirmation. It does not execute another deletion immediately. Canceling that confirmation follows FA01; confirming follows the normal atomic deletion flow.
6. The user may instead remain on the deck details or navigate normally. No retry occurs automatically, and the confirmed failure preserves all deck data.

## 5. Postconditions

- Success: The deck, its cards, and all associated data, including scheduling states, tag associations, flags and their notes, adaptive-suggestion data, and undo states, have been permanently removed from local storage.
- Cancellation or failure: Local storage remains intact and unchanged.
