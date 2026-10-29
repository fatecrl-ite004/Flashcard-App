# UC09 — Configure Global Study Settings

## 1. Brief Description

Allows the user to configure the global daily goal for distinct cards (G) and the global study-day boundary. G defaults to 20 and sets a round's capacity when the user keeps the optional limit for a study session. G must be at least 10, has no maximum, and prompts a nonblocking recommendation warning above 50. Changing G recalculates the daily new-card and adaptive references for decks whose reference remains automatically linked to G. The study-day boundary uses the device's local time and defaults to 04:00.

## 2. Actors

- User: primary actor.

## 3. Preconditions

1. The user has opened the local deck library (UC03).
2. Local storage is available for reading the current settings.

## 4. Event Flow

### 4.1. Basic Flow — Main Path

1. The user opens Global Study Settings from the deck library.
2. The system displays the current global daily distinct-card goal (G) and study-day boundary. If G has not been changed, it displays the default of 20. If the boundary has not been changed, it displays the 04:00 default in the device's local time.
3. The user changes one or both settings.
4. The user selects Save Changes.
5. The system validates the goal as an integer of at least 10 and the boundary as a valid local time. If the goal exceeds 50, FA02 applies before saving.
6. If G changed, the system recalculates each existing deck's daily new-card reference as the nearest integer to `G / 3` and resets its adaptive reference to that value only when its reference is automatically linked to G. It preserves the configured and adaptive references of decks whose value was manually set.
7. The system saves the global settings and any recalculated deck references consistently in local storage.
8. The system confirms the save and returns the user to the deck library (UC03).

### 4.2. Alternative Flows

#### FA01: Cancel Editing

1. Before saving, the user selects Cancel.
2. The system discards the unsaved changes and returns to the deck library (UC03).

#### FA02: Goal Above the Recommended Value

1. At step 5 of the basic flow, the system finds that G exceeds 50.
2. The system warns that this value is not recommended, without imposing a maximum or preventing the save.
3. The user may continue with the selected value and proceed to step 6, revise it and return to step 4, or cancel.

### 4.3. Exception Flows

#### FE01: Invalid Setting

1. At step 5 of the basic flow, the system identifies an invalid goal or study-day boundary.
2. The system does not save the proposed changes and identifies the setting that needs correction.
3. The user may correct the setting and return to step 4 of the basic flow, or cancel.

#### FE02: Local Save Failure

1. At step 7 of the basic flow, local storage fails to save the changes.
2. The system preserves the previously stored global settings and deck references and explains that the changes were not saved.
3. The user may retry or cancel.

## 5. Postconditions

- Success: The saved daily distinct-card goal is available for subsequent round setup and becomes the capacity of rounds in sessions where the user keeps the optional limit. If G changed, decks whose daily new-card reference remains linked to G have that reference recalculated to the nearest integer to `G / 3` and their adaptive reference reset to the result. Decks with manually set references retain both values. The saved study-day boundary is applied in the device's local time when determining the study day of subsequent sessions. A review session already in progress remains associated with the study day on which it started.
- Cancellation or failure: The previously stored global settings and deck references remain unchanged.
