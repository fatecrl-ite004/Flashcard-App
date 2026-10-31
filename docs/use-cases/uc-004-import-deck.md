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
2. The system returns to the deck library without importing a deck or displaying an error alert. Canceling the file picker is a normal alternative, not an import failure.
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
2. The system rejects the entire file. Through the feedback in section 4.4, it explains that the selected JSON deck is invalid and needs correction, distinguishing this from a file-reading or local-saving problem.
3. No deck or card from this import is saved. The user may select another or externally corrected file, returning to step 2 of the basic flow, or return to the deck library and end the use case.

#### FE02: Selected File Cannot Be Read

1. At step 4 of the basic flow, the system cannot read the selected file, for example because access to it was denied or a device read failed.
2. Through the feedback in section 4.4, the system explains that the file could not be read and, when known, identifies the access or device-reading problem. It does not describe an unread file as structurally invalid.
3. No deck or card from this import is saved. The user may select another accessible file, returning to step 2 of the basic flow, or return to the deck library and end the use case.

#### FE03: Insufficient Local Storage Capacity

1. At step 5 of the basic flow, the device lacks enough space to save the complete deck.
2. Through the feedback in section 4.4, the system explains that there is insufficient local storage for the import and indicates that the user can free space before trying again.
3. No deck or card from this import remains saved. After resolving the storage problem, the user may start a new import attempt; they may also select another file or return to the deck library and end the use case. A new attempt still follows complete validation and atomic import.

#### FE04: Local Write Permission or Other Save Failure

1. At step 5 of the basic flow, saving fails because local write access is denied or another device storage error occurs.
2. Through the feedback in section 4.4, the system explains the local write-permission problem when known, or otherwise explains that the deck could not be saved. It does not invent a cause when diagnostic information is unavailable.
3. No deck or card from this import remains saved. The user may address the reported local storage problem and start a new import attempt, select another file, or return to the deck library and end the use case. A new attempt still follows complete validation and atomic import.

### 4.4. Import Error Feedback

1. Each failure in FE01–FE04 produces a local error notification that explains the known problem and the applicable next step in understandable language: invalid JSON deck, file-reading failure, insufficient local storage, or another local-saving failure. Error presentation must preserve these distinctions.
2. The notification offers **Saiba mais** (Learn more), which opens additional readable information about the cause and available diagnostic details. It must not invent schema rules, claim a cause that has not been established, or present a rejected file as successfully imported.
3. Opening or closing these details does not modify the source file or the saved library and does not automatically retry the import. The user retains access to the recovery or return actions described by the relevant exception.
4. No error alert is shown for the file-picker cancellation in FA01. The duplicate-content warning and confirmation in FA02 remain a separate alternative flow, not an invalid-file error.

## 5. Postconditions

- Success: The entire validated deck and all its cards are stored locally and visible in the library.
- Confirmed duplicate: A separate deck with a numbered display name has been imported; existing decks retain their saved progress.
- Cancellation or failure: The import adds no deck or cards; a partial deck is never retained.
