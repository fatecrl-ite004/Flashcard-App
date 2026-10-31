# UC06 — Edit Deck Settings

## 1. Brief Description

Allows the user to edit an imported deck's display name, description, desired retention, daily new-card reference, and tags. Each change is saved automatically to local storage, without Save Changes or Cancel actions. Name and description are free-text fields alongside tag creation: their maximum lengths are 50 and 500 characters, respectively, and they save when the user leaves the field. Imported card content is view-only.

## 2. Actors

- User: primary actor.

## 3. Preconditions

1. The user has opened the [deck details (UC05)](uc-005-view-deck-details.md) and selected Edit Deck.

## 4. Event Flow

### 4.1. Basic Flow — Main Path

1. The system displays the deck's current display name, description, desired retention, daily new-card reference, and tags. It indicates whether the new-card reference follows the global default or is a deck-specific manual override.
2. The user changes a setting. Non-text settings use sliders or option selection constrained to valid choices. Tags use a selector with a Criar tag action under FA03. Selecting an option starts automatic saving; for a slider, saving starts when the user finishes the adjustment and releases the control.
3. For name or description, the user edits free text. Each field shows a character counter and prevents typing or pasting beyond its maximum: 50 characters for the name and 500 for the description. Leaving a changed text field starts its automatic save. Only maximum-length restrictions are introduced for these text fields; no new minimum-length or content-format rule is imposed.
4. The system retains internal validation of the accepted setting rules. Constrained controls prevent a user-facing invalid-input correction flow; they do not remove validation at application/domain boundaries.
5. If the user explicitly changes the daily new-card reference, the system treats it as a manual reference and resets the deck's adaptive reference to that value. Editing only the other fields leaves an automatically derived reference linked to G. Each automatic save preserves the consistency of the changed setting and its dependent references and leaves unrelated confirmed settings unchanged.
6. After persistence confirms the change, the system reflects it as saved and remains on the settings screen. An unresolved operation is not presented as a confirmed save. A confirmed failure follows FE02.
7. The user may make another change, returning to step 2, or return to the deck details through FA01.

### 4.2. Alternative Flows

#### FA01: Return to Deck Details

1. The user uses Back to return to the deck details (UC05). Leaving a changed text field follows step 3 of the basic flow, including when the field loses focus through Back.
2. Back is navigation, not a batch cancellation: all previously confirmed automatic saves remain applied. The system must not report an unresolved or failed update as saved.
3. The deck details reflect confirmed stored values. There is no Save Changes or Cancel action for the settings screen.

#### FA02: Text Reaches Its Maximum Length

1. At step 3 of the basic flow, the name reaches 50 characters or the description reaches 500.
2. The field's counter identifies the limit and the control prevents further characters beyond it, including pasted text. The user may replace or remove text normally; no error notification is required for reaching the limit.
3. The flow remains at step 3. This editing constraint does not define the future JSON import schema or authorize silent truncation of existing imported data.

#### FA03: Create and Select a Tag

1. In the tag selector, the user chooses Criar tag and enters a label of at most 30 characters. The control prevents exceeding that limit and prevents creation with an empty or whitespace-only name.
2. If that name already exists, select the existing tag instead of creating a duplicate.
3. Criar e selecionar saves the new tag and its deck association consistently; selecting/removing an existing tag also saves automatically. On failure, FE02 preserves saved tags and the attempted label/selection for retry while editing remains open.
4. Return to the deck settings with the tag selection updated only as confirmed. This flow adds no tag-management root or central flag area.

### 4.3. Exception Flows

The former FE01 invalid-input correction flow is replaced by constrained controls and the text-length behavior in FA02. Internal validation remains in effect.

#### FE02: Local Automatic-Save Failure

1. At step 5 or 6 of the basic flow, local storage confirms that the attempted change could not be saved.
2. The system preserves the last confirmed setting and dependent references. Earlier successful automatic saves remain applied; this failure does not roll them back.
3. While the user remains on the settings screen, the system keeps the attempted value visible, clearly marked as **não salvo** (not saved), and shows a local error notification with **Tentar novamente** (Retry) and **Saiba mais** (Learn more).
4. Retry resubmits the attempted change without requiring re-entry. Saiba mais exposes the known cause and available diagnostic details; opening or closing it neither changes the value nor submits another save.
5. The user may retry, choose or edit another value through the basic flow, or leave through FA01. A failed value must not be represented as persisted. There is no Cancel action that discards the screen's earlier successful changes.

## 5. Postconditions

- Success: Each confirmed update to the deck's display name, description, desired retention, daily new-card reference, or tags is stored locally. An explicitly edited new-card reference is manual and resets the adaptive reference to that value. A later global-goal change in [UC09](uc-009-configure-global-study-settings.md) recalculates both references only for decks still linked automatically to G; manual references and their adaptive values remain unchanged.
- Confirmed failure: The failed update leaves the previously stored value and dependent references unchanged, without undoing other confirmed updates. The attempted value remains available for retry while the settings screen is open.
- Return: Back preserves all confirmed changes. Reopening settings reads confirmed stored values; this flow does not establish persistent storage for unsaved drafts.
