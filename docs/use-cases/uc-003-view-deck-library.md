# UC03 — View the Deck Library

## 1. Brief Description

Allows the user to browse imported decks stored locally. The home library presents each deck as a visual card with its title, general deck information, and a neutral count of cards currently available to study: due cards plus new cards in that deck's automatic suggestion. The preview assumes the round limit is enabled, as it is by default at the start of a session. New cards available only through the user's voluntary choice are excluded from this count.

## 2. Actors

- User: Primary actor.

## 3. Preconditions

1. The application is open and local study data is available.
2. The user has completed or skipped onboarding (UC02).

## 4. Flow of Events

### 4.1. Basic Flow (Main Success Scenario)

1. The system retrieves the user's locally stored decks and their current summary information.
2. The system displays the home library as the sole root, without a bottom tab bar. An avatar opens the profile/preferences entry for essential settings; this does not add the expanded Phase 2 profile. The import action and tag filters remain reachable. Each deck opens its own details. Each deck appears as a visual card showing its title, general deck information, and a neutral count covering due cards and only the new cards automatically suggested for the current study day under the default enabled round limit. If a same-day due-only continuation is pending, the count includes no new cards until that overflow is exhausted. At session start, the system recalculates the suggestion using the user's limit choice and the deck's current state.
3. With no tag chips selected, the system shows all decks.
4. The user browses the library and selects a deck.
5. The system opens [UC05 — View Deck Details](uc-005-view-deck-details.md).
6. The use case ends.

### 4.2. Alternative Flows

#### FA01: Filter Decks by Tags

1. At step 3 or 4 of the basic flow, the user selects one or more tag chips.
2. The system shows only decks that have every selected tag.
3. The user may clear any selection. When no chips remain selected, the system again shows all decks.
4. The flow returns to step 4 of the basic flow.

#### FA02: Empty Library

1. At step 1 of the basic flow, the system finds no imported decks.
2. The system displays an empty library state with an action to [import a JSON deck (UC04)](uc-004-import-deck.md).
3. The user may start the JSON import or remain in the empty library.
4. The use case ends.

#### FA03: Configure Global Study Settings

1. While viewing the library, the user opens the avatar/profile-preferences entry and chooses [UC09 — Configure Global Study Settings](uc-009-configure-global-study-settings.md).
2. The system opens the global study settings flow.
3. This use case ends.

#### FA04: No Deck Matches the Selected Tags

1. A successful library read finds no deck containing every selected tag.
2. Show a no-results state with Limpar filtros; clearing selections shows all decks. Filtering never deletes data.

### 4.3. Exception Flows

#### FE01: Library Read Fails

1. Loading decks or summaries fails.
2. Preserve available confirmed context and offer Tentar novamente and Saiba mais. Do not present a successful empty-library/no-results state or zero progress in place of the failure.
3. Retry reading; do not open a deck from unavailable data.

## 5. Postconditions

- The user can view the local deck library, with each displayed deck's general information and current neutral available-card count, and can open a deck or follow another available library path.
