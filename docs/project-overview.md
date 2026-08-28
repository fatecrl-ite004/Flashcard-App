# Project Overview

> **Status:** Active  
> **Last reviewed:** 2026-08-28  
> **Working title:** Flashcard App  
> **Required delivery platform:** Android development build  
> **Official institutional deadline:** 11/18/2026

## Document purpose

This document defines why the project exists, who it is intended for, what it aims to achieve, and the boundaries under which it is being developed. It is a high-level reference for the product and the college final project.

Detailed functional requirements belong in the system specification.

Technical organization and implementation decisions belong in [ 📁 Architecture ](architecture/README.md) and [ 📁 Architecture Decision Records ](adr/README.md).

## Problem

Flashcard users can face a difficult trade-off. Some applications provide a simple experience but hide how scheduling works, while more advanced applications can expose complex interfaces and terminology before the user understands why that information matters. Important functionality may also depend on an internet connection or be restricted by paywalls.

This creates unnecessary friction around a study loop that should be straightforward: obtain a deck, review the cards that are due, understand the deck's current state, and return when the next reviews become available.

The project addresses this problem by exploring whether an interface can simplify everyday interaction with spaced repetition while progressively exposing useful FSRS information to users who want greater control or understanding.

## Target users

### Primary users

The initial audience is students who use flashcards for self-directed study, especially language learners. During Phase 1, the application is specifically designed for users who study from imported decks instead of creating their own content inside the app.

These users are expected to value:

- A clear and fast review flow.
- Offline access without requiring an account.
- Reliable preservation of their study progress.
- Simple deck organization.
- Access to scheduling information without being forced to understand FSRS first.

### Secondary users

The product may also serve other students and professionals who use imported flashcard decks and prefer a focused, transparent, local-first study tool.

## Product goal

Build a free, local-first flashcard application for Android that uses FSRS v6 through `ts-fsrs` to schedule reviews. The product should make the essential study experience simple, smooth, intuitive, and accessible while keeping relevant scheduling information available to interested users.

The intended core experience is:

1. Complete the onboarding flow.
2. Import a deck from JSON.
3. Find and open a deck.
4. Review the cards that are due.
5. Rate each answer as `Again`, `Hard`, `Good`, or `Easy`.
6. See the deck and scheduling information updated.
7. Return later and continue from the correctly persisted state.

## College final project goal

The TCC aims to investigate how UI and UX decisions can reduce the perceived complexity of an FSRS-based flashcard application without completely hiding advanced scheduling information.

The project will produce both a working software artifact and academic evidence. Its evaluation will use research with target users, including satisfaction measurements and the completion of representative tasks within predefined time limits. The research protocol will define participant selection, tasks, measurements, and success thresholds before the evaluation is conducted.

The final academic work should connect the identified problem, the design and architectural decisions, the implemented application, the usability findings, and the technical validation of the review and persistence behavior.

## Main goals

- Deliver the complete Phase 1 scope as the minimum result of the TCC.
- Keep the everyday review flow understandable without requiring prior FSRS knowledge.
- Use FSRS v6 correctly for the four supported review ratings.
- Preserve every completed review immediately and reliably.
- Keep all required study functionality available offline.
- Allow users to inspect relevant deck and scheduling information progressively.
- Provide practical organization through deck search, tags, and card flags.
- Make the Android experience simple, responsive, accessible, and consistent.
- Keep essential functionality free and without paywalls.
- Maintain a modular, independently testable technical core.
- Produce research evidence and technical documentation that can support the TCC monograph.

## Delivery scope

The project is divided into three phases. The phases indicate delivery priority rather than architectural layers.

### Phase 1 — Required TCC delivery

Phase 1 is the minimum result required for the project to be considered delivered successfully.

It includes:

- An onboarding flow.
- An Android development build.
- Local-first persistence and offline operation.
- JSON deck import as the initial way to add study content.
- Text cards with a front and back as the baseline card type.
- Listing, searching, opening, and deleting decks.
- Editing deck properties without editing the imported card content.
- Adding tags to decks and filtering decks by their tags.
- Adding card flags and visualizing flagged cards inside a deck.
- A minimal profile or settings area for managing and removing flags.
- A complete due-card review flow.
- The review ratings `Again`, `Hard`, `Good`, and `Easy`.
- FSRS-based calculation of each card's next scheduling state.
- Immediate persistence of every completed review, including reviews made before a session is finished.
- Preservation of progress after closing and reopening the application.
- An undo action for the latest card review.
- Clear deck status, progress, and next-review information.
- Desired retention as the principal user-editable FSRS setting at deck level.
- Progressive display of relevant advanced FSRS information.
- Accessible interaction, clear error handling, and a simple, smooth, and intuitive UI/UX.

### Phase 2 — Desired TCC additions

Phase 2 contains valuable additions that the project aims to deliver when Phase 1 is stable and sufficient time remains. These items improve the final result but do not determine whether the minimum TCC scope was completed.

It includes:

- A dedicated profile page for visualizing flags.
- A fuller local user-profile structure.
- User-level settings that remain stored in the local profile.
- Additional deck imports from CSV and APKG.
- Deck export and local backup capabilities.
- Visual customization, such as interface colors.
- User-level analytics and study statistics.
- Additional card types, including images and cloze deletion.
- Study goals and local reminders.
- Post-session feedback.
- A possible PWA version if project capacity permits.

### Phase 3 — Post-TCC development

Phase 3 represents features that require development beyond the TCC horizon.

It includes:

- Creation and editing of decks and cards inside the application.
- Login using OAuth 2.0 and OpenID Connect.
- A backend for user profiles, public decks, and remote services.
- Cloud backup and synchronization across devices.
- A Discover area containing public decks.
- The ability for each user to publish up to three decks.
- Server-side storage of published decks.
- A simple relevance algorithm for ordering public decks.

## Restrictions and constraints

- The project is primarily developed by one student alongside college, internship, and personal obligations.
- The expected development horizon is approximately twelve months; the official institutional deadline is still to be confirmed.
- Phase 1 must be deliverable as an Android development build. A Play Store release is not required.
- A PWA is desirable but is not a Phase 1 success condition.
- Every Phase 1 study workflow must function without an internet connection.
- Phase 1 does not require accounts, authentication, a backend, cloud storage, or synchronization.
- Phase 1 users import decks from JSON; creating cards or editing imported card content inside the application is deferred to Phase 3.
- Essential functionality must remain free and must not be placed behind paywalls.
- A possible future subscription may only fund optional remote services such as synchronization or cloud storage.
- Review scheduling uses FSRS v6 through `ts-fsrs`; developing a new spaced-repetition algorithm is not part of the project.
- Desired retention is the primary editable scheduling configuration in Phase 1. Deeper FSRS configuration is not required.
- The domain must remain independently testable and must not depend directly on React Native, Expo, SQLite, or device APIs.
- The UI must access scheduling and persistence behavior through the application's public domain operations rather than calling `ts-fsrs` or storage directly.
- Phase 1 takes priority whenever capacity or schedule pressure requires a scope decision.

## Success criteria

The project will be considered successful when all required Phase 1 outcomes are delivered and supported by technical and user-research evidence.

| Area | Success criterion |
| --- | --- |
| Delivery | A stable Android development build can be installed and used to complete the required study workflow. |
| Content entry | A valid JSON deck can be imported and used for study without creating content inside the app. |
| Review flow | A user can review due cards and rate each one as `Again`, `Hard`, `Good`, or `Easy`. |
| Scheduling | Every rating produces and preserves the appropriate next FSRS scheduling state. |
| Data integrity | Each review is saved immediately, including when the user leaves before completing the session. |
| Continuity | Closing and reopening the app preserves decks, reviews, flags, tags, settings, and scheduling progress. |
| Offline operation | All required Phase 1 workflows remain available without an internet connection. |
| Organization | Users can search decks, use deck tags, filter by tags, and identify flagged cards. |
| Transparency | Users can understand the deck's current state and access relevant FSRS information without disrupting the basic flow. |
| Usability | Target users can complete predefined representative tasks within the limits established by the research protocol. |
| Satisfaction | User satisfaction is measured and meets the threshold defined before the formal evaluation begins. |
| Quality | The application provides accessible interactions, understandable error states, and no known critical data-loss defects. |
| Academic result | The project produces research evidence, technical documentation, and a monograph connecting the problem, implementation, and evaluation results. |

Completion of Phase 2 or Phase 3 is not required to satisfy the minimum success criteria.

## Items outside the TCC scope

The following items are explicitly outside the required TCC delivery:

- Accounts and remote user authentication.
- Backend services.
- Cloud backup and synchronization.
- Public deck publishing and Discover.
- In-app creation and editing of decks and cards.
- A public deck marketplace or social network.
- Collaboration between users.
- iOS delivery.
- Mandatory Play Store publication.
- Generative AI features.
- Advanced gamification.
- Replacement or modification of the FSRS algorithm itself.
- Automatic optimization of advanced FSRS parameters.
- Manual scheduling controls beyond the supported Phase 1 configuration.
- Any paywall applied to essential offline study functionality.

Phase 2 items are stretch goals rather than required deliverables. Phase 3 items are future product directions and must not expand the TCC scope unless the required Phase 1 work is already complete and formally stable.
