# UC04 — Import a Deck

## 1. Brief Description

Allows the user to add a complete JSON deck of text cards to the local library. The entire file is validated before the deck is accepted, and the import either saves the whole deck or saves none of it. Duplicate detection uses card content independently of the file name or deck title. A duplicate requires confirmation and, if accepted, becomes an independent copy with a numbered display name. The application does not generate study content.

## 2. Actors

- User: Primary actor.

## 3. Preconditions

1. The application is open and local storage is available.
2. The user is viewing the [Deck Library (UC03)](uc-003-view-deck-library.md).

## 4. Flow of Events

### 4.1. Basic Flow (Main Success Scenario)

1. The user chooses the library action to import a deck.
2. The system opens the device's file picker.
3. The user selects a JSON deck file.
4. The system reads the complete file and validates the complete JSON deck and all of its cards before accepting it (RN-001). Every card must have text content for its front and back (RN-002). It checks for duplicate card content among locally stored decks, independently of the file name or deck title; if a duplicate is detected, FA02 applies (RN-022).
5. The system saves the complete validated deck and all its cards locally as one import outcome.
6. The system refreshes the [Deck Library (UC03)](uc-003-view-deck-library.md) to include the new deck and confirms successful import to the user.
7. The use case ends.

### 4.2. Alternative Flows

#### FA01: User Cancels File Selection

1. At step 2 or 3 of the basic flow, the user closes or cancels the file picker.
2. The system returns to the deck library without importing a deck.
3. The use case ends.

#### FA02: Duplicate Deck Content

1. At step 4 of the basic flow, the system identifies an existing deck with duplicate card content, even if the selected file or its deck title has a different name.
2. The system warns that this content has already been imported and lets the user cancel or continue.
3. If the user cancels, the system returns to the deck library without adding a deck or cards, and the use case ends.
4. If the user continues, the system assigns the independent copy a display name with an incrementing numeric suffix, such as `Deck (1)`, `Deck (2)`, and so on for repeated imports. Existing decks and their study progress are preserved.
5. The flow resumes at step 5 of the basic flow. The duplicate copy is accepted only when its complete deck and cards are saved successfully under RN-001.

### 4.3. Exception Flows

#### FE01: Invalid JSON Deck (RN-001, RN-002)

1. At step 4 of the basic flow, the system finds invalid JSON, an invalid deck structure, missing required data, or a card without text content for both front and back.
2. The system rejects the entire file and explains that the selected deck file is invalid and needs correction.
3. No deck or card from this import is saved, and the use case ends.

#### FE02: Selected File Cannot Be Read

1. At step 4 of the basic flow, the system cannot read the selected file, for example because access to it was denied or a device read failed.
2. The system explains that the file could not be read and, when known, identifies the access problem.
3. No deck or card from this import is saved, and the use case ends.

#### FE03: Insufficient Local Storage Capacity

1. At step 5 of the basic flow, the device lacks enough space to save the complete deck.
2. The system explains that there is insufficient local storage for the import.
3. No deck or card from this import remains saved, and the use case ends.

#### FE04: Local Write Permission or Other Save Failure

1. At step 5 of the basic flow, saving fails because local write access is denied or another device storage error occurs.
2. The system explains the permission problem when known, or otherwise explains that the deck could not be saved.
3. No deck or card from this import remains saved, and the use case ends.

## 5. Postconditions

- Success: The entire validated deck and all its cards are stored locally and visible in the library.
- Confirmed duplicate: A separate deck with a numbered display name has been imported; existing decks retain their saved progress.
- Cancellation or failure: The import adds no deck or cards; a partial deck is never retained.
