# UC05 — View Deck Details

## 1. Brief Description

Allows the user to view an imported deck's information and cards, identify flagged cards, and access the actions available for that deck.

## 2. Actors

- User: primary actor.

## 3. Preconditions

1. The user has selected an existing deck from the local library (UC03).

## 4. Event Flow

### 4.1. Basic Flow — Main Path

1. The system retrieves the deck's information and associated cards from local storage.
2. The system displays the deck's main information, its card list, and actions to study, edit, or delete the deck. There is no separate advanced FSRS section or next-review date in Phase 1. Deck/card actions remain distinct from rating actions.
3. The user browses the deck's cards and information. The system identifies cards that have a flag.
4. The user may select an available action or leave the deck details after viewing them.

### 4.2. Alternative Flows

#### FA01: Show Flagged Cards

1. At step 3 of the basic flow, the user chooses to show flagged cards.
2. The system displays the flagged cards within this deck. The user may return to the full card list.
3. The flow returns to step 3 of the basic flow.

#### FA02: View an Individual Card

1. At step 3 of the basic flow, the user selects a card, including a flagged card.
2. The system opens the individual card view (UC10).
3. When the user returns, the flow resumes at step 3 of the basic flow.

#### FA03: Start a Review Session

1. At step 4 of the basic flow, the user selects Study.
2. The system starts the review-session flow (UC08).

#### FA04: Edit Deck Settings

1. At step 4 of the basic flow, the user selects Edit Deck.
2. The system opens the deck-editing flow (UC06).

#### FA05: Delete the Deck

1. At step 4 of the basic flow, the user selects Delete Deck.
2. The system opens the deck-deletion flow (UC07).

### 4.3. Exception Flows

#### FE01: Deck or Card-List Read Fails

1. Reading the selected deck or its cards fails.
2. Preserve the valid origin and saved data; show Tentar novamente and Saiba mais. Do not replace the failure with an empty list or zero progress.
3. Retry reading or return to the library. If the identifier is no longer valid, return safely without showing another deck's content or starting study.

## 5. Postconditions

- Success: The deck information and its associated cards have been shown to the user. Viewing them does not change the deck or its cards.
