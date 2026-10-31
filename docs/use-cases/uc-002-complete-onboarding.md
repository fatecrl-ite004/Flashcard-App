# UC02 — Complete Onboarding

## 1. Brief Description

Introduces the essential study flow through three familiarity-based demonstration paths. The user confirms the level and understands the forward-only demonstration before starting. Examples remain isolated from real study data.

## 2. Actors

- User: primary actor.

## 3. Preconditions

1. The application has made local data available through [UC01](uc-001-initialize-application.md).
2. No completed/skipped onboarding record is confirmed locally.

## 4. Flow of Events

### 4.1. Basic Flow

1. Ask how familiar the user is with flashcard applications: new, some experience, or confident experience. Offer Skip.
2. The user selects a level.
3. Show a friendly illustrated confirmation of the selected level and explain that a demonstration follows, previous demonstration steps cannot be reopened, and leaving before completion means restarting next time. The user may confirm or return to choose a level before the demonstration starts.
4. Run the selected path in FA01, FA02, or FA03. Use example cards isolated from the library, scheduling, daily goal, counts, and real Undo. Progress forward; Back does not open an earlier demonstration step. Skip remains available through FA04.
5. After the user finishes, save onboarding completion locally.
6. Only after saving is confirmed, open the [library (UC03)](uc-003-view-deck-library.md), removing onboarding from normal Back history.

### 4.2. Alternative Flows

#### FA01: New to Flashcard Applications

Explain front/back, review over time, and the four ratings with an example interaction. Then demonstrate JSON import and starting study from a deck. Return to basic step 5 when completed.

#### FA02: Some Experience

Use a shorter demonstration of JSON import, due/new cards, and ratings. Return to basic step 5 when completed.

#### FA03: Confident Experience

Use concise guidance on JSON import, starting a review, and the desired-retention/new-card settings. Return to basic step 5 when completed.

#### FA04: Skip Onboarding

1. From the question or a demonstration step, the user chooses Skip.
2. Show a friendly illustrated confirmation. Canceling this confirmation returns to the same question/step without moving backward through the demonstration.
3. Confirming Skip saves completion locally. Open the library only after saving is confirmed; otherwise FE01 applies.

#### FA05: Leave Before Completion

1. Leaving the app or ending onboarding before confirmed completion/skip does not record completion.
2. During the forward-only demonstration, Android Back first dismisses an open overlay; otherwise it opens a friendly interruption confirmation with Continuar demonstração or Sair. Continuing stays on the same step. Sair leaves onboarding incomplete; it does not confirm Skip or revisit earlier steps. Skip remains the separate completion action in FA04.
3. The next launch starts again at the familiarity question. Example interactions have not changed real study data.

### 4.3. Exception Flows

#### FE01: Completion or Skip Cannot Be Saved

1. A local save failure prevents confirmation of completion/skip.
2. Stay at the current completion/skip context, preserve the user's intention, and explain the failure through Tentar novamente and Saiba mais.
3. Retry the intended completion/skip without replaying the demonstration. Details show the known cause and do not save automatically.
4. Do not open the library or mark onboarding completed before confirmation. Leaving is allowed, but the next launch treats unconfirmed onboarding as incomplete.

## 5. Postconditions

- Confirmed completion/skip: onboarding is recorded and the library is accessible.
- Interruption/failure before confirmation: no false completion; next launch starts at the question.
- Demonstration: no real deck, rating, daily progress, or schedule is created by the examples.
