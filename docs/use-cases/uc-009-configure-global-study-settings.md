# UC09 — Configure Global Study Settings

## 1. Brief Description

Allows the user to configure the global daily goal for distinct cards (G) and the global study-day boundary through sliders or option selectors. Each selection saves automatically without Save Changes or Cancel actions. G defaults to 20 and sets a round's capacity when the user keeps the optional limit for a study session. G must be at least 10, has no maximum, and prompts a nonblocking recommendation warning above 50. Changing G recalculates the daily new-card and adaptive references for decks whose reference remains automatically linked to G. The study-day boundary uses the device's local time and defaults to 04:00.

## 2. Actors

- User: primary actor.

## 3. Preconditions

1. The user has opened the local [deck library (UC03)](uc-003-view-deck-library.md).
2. Local storage is available for reading the current settings.

## 4. Event Flow

### 4.1. Basic Flow — Main Path

1. The user opens the avatar/profile-preferences entry from the deck library and selects the essential global study settings. Back returns through that entry to the library.
2. The system displays the current global daily distinct-card goal (G) and study-day boundary. If G has not been changed, it displays the default of 20. If the boundary has not been changed, it displays the 04:00 default in the device's local time.
3. The user selects a new value. Controls constrain the goal to integers of at least 10 and the boundary to valid local times. The control design must preserve the goal's lack of a maximum; using a slider does not authorize a new finite goal cap.
4. Selecting an option starts automatic saving; for a slider, saving starts when the user finishes the adjustment and releases the control. Internal validation remains in effect, without a user-facing invalid-input correction flow. If G exceeds 50, FA02 applies without blocking the save.
5. If G changed, the system recalculates each existing deck's daily new-card reference as the nearest integer to `G / 3` and resets its adaptive reference to that value only when its reference is automatically linked to G. It preserves the configured and adaptive references of decks whose value was manually set.
6. The system saves the changed global setting and any dependent recalculated deck references consistently in local storage. It preserves other confirmed settings and does not report an unresolved operation as a confirmed save.
7. After persistence confirms the change, the system reflects it as saved and remains on the settings screen. A confirmed failure follows FE02.
8. The user may select another value, returning to step 3, or leave through FA01.

### 4.2. Alternative Flows

#### FA01: Return from Settings

1. The user uses Back to leave Global Study Settings and return to the avatar/profile-preferences entry; Back from that entry returns to the library (UC03).
2. Back is navigation, not a batch cancellation: all previously confirmed automatic saves remain applied. An unresolved or failed update must not be reported as saved.
3. There is no Save Changes or Cancel action for this settings screen.

#### FA02: Goal Above the Recommended Value

1. At step 4 of the basic flow, the selected G exceeds 50.
2. The system warns that this value is not recommended, without imposing a maximum or requiring a separate confirmation before automatic saving.
3. The basic flow continues at step 5. The user may select a different value afterward, which starts another automatic save.

### 4.3. Exception Flows

The former FE01 invalid-setting correction flow is replaced by constrained controls. Internal validation remains in effect.

#### FE02: Local Automatic-Save Failure

1. At step 6 or 7 of the basic flow, local storage confirms that the attempted change could not be saved.
2. The system preserves the last confirmed global settings and deck references. Earlier successful automatic saves remain applied; a failed goal change must not leave only some dependent references updated.
3. While the user remains on the settings screen, the system keeps the attempted selection visible, clearly marked as **não salvo** (not saved), and shows a local error notification with **Tentar novamente** (Retry) and **Saiba mais** (Learn more).
4. Retry resubmits the attempted change without requiring a new selection. Saiba mais exposes the known cause and available diagnostic details; opening or closing it neither changes the selection nor submits another save.
5. The user may retry, select another value through the basic flow, or leave through FA01. A failed selection must not be represented as persisted. There is no Cancel action that discards earlier successful changes.

## 5. Postconditions

- Success: The saved daily distinct-card goal is available for subsequent round setup and becomes the capacity of rounds in sessions where the user keeps the optional limit. If G changed, decks whose daily new-card reference remains linked to G have that reference recalculated to the nearest integer to `G / 3` and their adaptive reference reset to the result. Decks with manually set references retain both values. The saved study-day boundary is applied in the device's local time when determining the study day of subsequent sessions. A review session already in progress remains associated with the study day on which it started.
- Confirmed failure: The failed update leaves the previously stored global settings and deck references unchanged, without undoing other confirmed updates. The attempted selection remains available for retry while the settings screen is open.
- Return: Back preserves all confirmed changes. Reopening settings reads confirmed stored values; this flow does not establish persistent storage for unsaved drafts.
