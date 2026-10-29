# UC06 — Edit Deck Settings

## 1. Brief Description

Allows the user to edit an imported deck's display name, desired retention, daily new-card reference, and tags. The changes are saved locally. Imported card content is view-only.

## 2. Actors

- User: primary actor.

## 3. Preconditions

1. The user has opened the deck details (UC05) and selected Edit Deck.

## 4. Event Flow

### 4.1. Basic Flow — Main Path

1. The system displays the deck's current display name, desired retention, daily new-card reference, and tags in an editable form.
2. The user changes the desired fields, including adding or removing deck tags.
3. The user selects Save Changes.
4. The system validates the entered values against the accepted rules for these settings.
5. If the user explicitly changed the daily new-card reference, the system treats it as a manual reference and resets the deck's adaptive reference to that value. Editing only the other fields leaves an automatically derived reference linked to G. The system saves the updated references, other deck settings, and tags together in local storage.
6. The system confirms the save and returns the user to the deck details (UC05).

### 4.2. Alternative Flows

#### FA01: Cancel Editing

1. Before saving, the user selects Cancel.
2. The system discards the unsaved form changes.
3. The user returns to the deck details (UC05) with the stored settings and tags unchanged.

### 4.3. Exception Flows

#### FE01: Invalid Values

1. At step 4 of the basic flow, the system identifies an invalid value or a missing required value.
2. The system does not save any of the proposed changes and identifies the field requiring correction.
3. The user may correct the value and return to step 3 of the basic flow, or cancel.

#### FE02: Local Save Failure

1. At step 5 of the basic flow, local storage fails to save the changes.
2. The system preserves the previously stored settings and tags and explains that the changes were not saved.
3. The user may retry or cancel.

## 5. Postconditions

- Success: The deck's display name, desired retention, daily new-card reference, and tags reflect the saved changes in local storage. An explicitly edited new-card reference is manual and resets the adaptive reference to that value. A later change to the global daily goal in UC09 recalculates both references only for decks still linked automatically to G; manual references and their adaptive values remain unchanged.
- Cancellation or failure: The previously stored deck settings and tags remain unchanged.
