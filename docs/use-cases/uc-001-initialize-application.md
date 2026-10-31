# UC01 — Initialize the Application

## 1. Brief Description

Allows the user to open the application and access locally stored study data without an internet connection. On first use, the application starts onboarding before opening the deck library.

## 2. Actors

- User: Primary actor.

## 3. Preconditions

1. The application is installed on the device.

## 4. Flow of Events

### 4.1. Basic Flow (Main Success Scenario)

1. The user opens the application.
2. The system makes the local study data available.
3. The system checks whether onboarding completion has been recorded locally.
4. The system finds that onboarding was completed or skipped on an earlier launch.
5. The system opens the [Deck Library (UC03)](uc-003-view-deck-library.md).
6. The use case ends.

### 4.2. Alternative Flows

#### FA01: First Use or Incomplete Onboarding

1. At step 3 of the basic flow, the system finds no record of onboarding completion. This includes first use and a later launch after onboarding was interrupted.
2. The system opens [Onboarding (UC02)](uc-002-complete-onboarding.md), beginning with a question about the user's familiarity with flashcard applications.
3. When the user completes or skips onboarding, the system opens the deck library as described in step 5 of the basic flow.
4. The use case ends.

### 4.3. Exception Flows

#### FE01: Local Data Cannot Be Initialized or Read

1. Initialization or reading the onboarding/study state fails.
2. Keep dependent flows unavailable, preserve existing data, and offer **Tentar novamente** and **Saiba mais** with the known cause.
3. Retry initialization/reading before choosing onboarding or the library. Opening details does not modify data or retry automatically.
4. A read failure is not an empty library, zero progress, or proof that onboarding was never completed. Do not erase data or reset completion to recover silently.

## 5. Postconditions

- On successful launch, local study data is available and the user reaches either onboarding or the deck library according to the recorded onboarding state.
