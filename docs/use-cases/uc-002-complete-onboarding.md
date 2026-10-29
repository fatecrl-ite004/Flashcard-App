# UC02 — Complete Onboarding

## 1. Brief Description

Introduces the user to the essential study flow on first use. A familiarity question selects one of three distinct onboarding paths. The paths differ in the amount and focus of guidance, while all lead to the local deck library.

## 2. Actors

- User: Primary actor.

## 3. Preconditions

1. The application has been launched and local study data is available (UC01).
2. Onboarding completion has not been recorded locally, whether this is the first launch or a later launch after an interruption.

## 4. Flow of Events

### 4.1. Basic Flow (Main Success Scenario)

1. The system asks how familiar the user is with flashcard applications, offering three levels of experience: new to flashcard apps, some experience, and confident experience.
2. The user selects one level.
3. The system presents the onboarding path for that level, as described in FA01, FA02, or FA03.
4. The user progresses through the selected path and completes it.
5. The system records onboarding as completed in local storage.
6. The system opens the [Deck Library (UC03)](uc-003-view-deck-library.md).
7. The use case ends.

### 4.2. Alternative Flows

#### FA01: New to Flashcard Applications

1. At step 3 of the basic flow, the system presents introductory guidance on the front and back of a card, reviewing over time, and the four review ratings.
2. The path then shows how to import a JSON deck and begin a review from that deck.
3. The flow returns to step 4 of the basic flow.

#### FA02: Some Experience

1. At step 3 of the basic flow, the system presents a shorter path focused on importing a deck, finding due and eligible new cards, and using review ratings.
2. The flow returns to step 4 of the basic flow.

#### FA03: Confident Experience

1. At step 3 of the basic flow, the system presents a concise orientation to JSON import, the review session flow, and where to find advanced FSRS information in a deck.
2. The flow returns to step 4 of the basic flow.

#### FA04: Skip Onboarding

1. At the familiarity question or at any point in a selected path, the user chooses to skip onboarding.
2. The system records onboarding as completed in local storage.
3. The system opens the deck library as described in step 6 of the basic flow.
4. The use case ends.

## 5. Postconditions

- On completion or skip, onboarding is recorded as completed locally and the user can access the deck library.
- If the user leaves before completing or skipping onboarding, completion is not recorded; the next launch follows UC01's incomplete-onboarding path.
