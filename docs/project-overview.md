# Project Overview

> **Status:** Active  
> **Last reviewed:** 2026-10-28
> **Working title:** Flashcard App  
> **Required delivery platform:** Android development build  
> **Institutional checkpoint — TCC I:** 2026-11-18
> **Target for final TCC delivery:** June 2027

## Document purpose

This document defines why the project exists, who it is intended for, what it aims to achieve, and the boundaries under which it is being developed. It is a high-level reference for the product and the college final project.

Detailed functional requirements, business rules, non-functional requirements, requirement-level phase assignments, priorities, statuses, and traceability belong in the [System Specification](system-specification.md). This overview summarizes that specification instead of duplicating its requirement matrices.

GitHub Issues and GitHub Projects may track implementation work by requirement ID, but they do not replace the system specification as the source of truth. The Markdown documentation should remain readable both in the repository and when published through GitHub Pages.

Technical organization and implementation decisions belong in [ 📁 Architecture ](architecture/README.md) and [ 📁 Architecture Decision Records ](adr/README.md).

## Problem

Flashcard users can face a difficult trade-off. Some applications provide a simple experience but hide how scheduling works, while more advanced applications can expose complex interfaces and terminology before the user understands why that information matters. Important functionality may also depend on an internet connection or be restricted by paywalls.

This creates unnecessary friction around a study loop that should be straightforward: obtain a deck, understand how many cards are currently available, decide when to study, review the applicable due and new cards, understand the deck's updated state, and return later.

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

1. Answer an initial flashcard-app familiarity question, then complete a matching onboarding path or skip it.
2. Import a deck from JSON.
3. Select and open a deck from the local library.
4. Review due cards first, with automatically suggested new cards and the option to study more new cards when available.
5. Rate each answer as `Again`, `Hard`, `Good`, or `Easy`.
6. Have each rating persisted immediately and see the deck and scheduling state updated.
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
- Provide practical organization through the local deck library, tags, chip-based filters, and card flags.
- Let users control desired retention and a daily new-card reference per deck, plus a global daily goal whose round limit can be disabled for each session.
- Make the Android experience simple, responsive, accessible, and consistent.
- Keep essential functionality free and without paywalls.
- Maintain a modular, independently testable technical core.
- Produce research evidence and technical documentation that can support the TCC monograph.

## Delivery scope

The project is divided into three phases. The phases indicate delivery priority rather than architectural layers.

### Phase 1 — Required TCC delivery

Phase 1 is the minimum result required for the project to be considered delivered successfully.

It includes:

- Onboarding that starts with a familiarity question, offers three tailored paths, and can be skipped.
- An Android development build designed for smartphones.
- Local-first persistence and offline operation.
- Atomic JSON deck import as the initial way to add study content: a deck is imported completely or the file is rejected. Duplicate card content triggers a warning; a confirmed duplicate becomes an independent copy with a numbered display name. The app does not generate study content.
- Text cards with a front and back as the baseline card type.
- Listing, opening, and deleting decks from the local library.
- Editing each deck's display name, desired retention, daily new-card reference, and tags without editing imported card content. Automatic new-card references track changes to the global goal; manually edited references retain their values.
- Filtering the home library through selectable tag chips that require every selected tag; with no chip selected, all decks are shown.
- One flag per card, with an optional editable note, which can be added, edited, or removed during review or individual card view.
- Visualizing flagged cards inside their deck.
- A global daily goal of distinct cards across all decks, initially 20 and configurable from 10 upward without a maximum; values above 50 prompt a nonblocking recommendation warning. The goal remains active when the user disables the round limit for a session.
- Starting a review from an open deck, with the round limit enabled by default and a separate choice to disable it for each session.
- Prioritizing due cards in the open deck. When the enabled limit leaves due cards out, optional due-only continuation remains available after reopening the deck on the same study day until that overflow is exhausted.
- Suggesting new cards from the deck's adaptive daily reference after due cards, subject to remaining round capacity when the limit is enabled. The user may choose more available new cards outside the automatic suggestion.
- The review ratings `Again`, `Hard`, `Good`, and `Easy`.
- FSRS-based calculation of each card's next scheduling state.
- Immediate persistence of every completed review before the next card is presented, including reviews made before a session is finished.
- Preservation of progress after closing and reopening the application.
- Sequential undo of confirmed ratings in reverse order across all rounds of the active review session, until no rating from that session remains to undo.
- Minimal round-completion and daily-goal progress feedback; richer post-session feedback belongs to Phase 2.
- A neutral available-card count on each visual deck card in the home library: due cards plus automatically suggested new cards. The library assumes the round limit is enabled and the suggestion is recalculated when the session starts. Whether to show a next-review date remains open.
- Progressive display of relevant advanced FSRS information in a collapsed section after the main deck information.
- A global, user-configurable study-day boundary with a default of 04:00 in the device's local time. A session that crosses the boundary remains associated with the study day on which it started.
- A 200 ms card-flip animation when revealing the back during review.
- Accessible interaction, clear error handling, and a simple, smooth, and intuitive UI/UX.

### Phase 2 — Desired TCC additions

Phase 2 contains valuable additions that the project aims to deliver when Phase 1 is stable and sufficient time remains. These items improve the final result but do not determine whether the minimum TCC scope was completed.

It includes:

- Textual deck search.
- A dedicated profile or settings area for centralized flag visualization and management.
- A fuller local user-profile structure.
- User-level settings that remain stored in the local profile.
- Additional deck imports from CSV and APKG.
- Deck export, local backup, and restoration capabilities.
- Visual customization, including interface colors and dark mode.
- User-level analytics and study statistics.
- Additional card types, including images, cloze deletion, and typed answers.
- Additional study goals, reminders, and a local notification system whose triggers, frequency, content, and silent hours still require definition.
- Richer post-session feedback.
- Complete review history.
- A possible PWA version and tablet adaptation if project capacity permits.

### Phase 3 — Post-TCC development

Phase 3 represents features that require development beyond the TCC horizon.

It includes:

- In-app authoring of decks and cards beyond the Phase 1 deck settings.
- Login using OAuth 2.0 and OpenID Connect.
- A backend for user profiles, public decks, and remote services.
- Cloud backup and synchronization across devices.
- Background synchronization that does not block essential interactions.
- A Discover area containing public decks.
- The ability for each user to publish up to three decks.
- Server-side storage of published decks.
- A simple relevance algorithm for ordering public decks, with criteria to be defined before implementation.
- Security and privacy requirements for accounts, synchronized data, and published decks, to be defined before implementation.

## Restrictions and constraints

- The project is primarily developed by one student alongside college, internship, and personal obligations.
- The expected development horizon is approximately twelve months. The TCC I institutional checkpoint is 2026-11-18; it covers the material required by that course and does not require the complete Phase 1 application.
- The complete Phase 1 application, user validation, technical documentation, and monograph are targeted for the final TCC delivery in June 2027.
- Phase 1 must be deliverable as an Android development build. A Play Store release is not required.
- The application uses React Native with TypeScript and Expo. Native builds use cloud EAS Build, while compatible development binaries support local JavaScript/TypeScript iteration without a new native compilation for each change. [ADR 0006](adr/0006-android-application-with-react-native-and-expo.md) records the proposed platform design and the pending offline delivery-profile clarification.
- Phase 1 targets Android smartphones. Tablet adaptation and a PWA are Phase 2 additions, not Phase 1 success conditions.
- Every Phase 1 study workflow must function without an internet connection.
- The selected local persistence technology for Android is SQLite through `expo-sqlite`; [ADR 0005](adr/0005-local-persistence-and-data-evolution.md) records the proposed persistence and data-evolution design. The domain remains independent of this integration.
- Drizzle ORM is the preferred data-access tool, subject to validating asynchronous integration with `expo-sqlite`. [ADR 0007](adr/0007-drizzle-orm-for-local-data-access.md) records the proposal and pending compatibility checks; no package version or pre-release dependency has been adopted.
- The selected interface approach uses Expo Router and React's built-in state facilities. [ADR 0008](adr/0008-ui-state-and-navigation.md) records the proposed navigation and presentation design while preserving application ownership of the active study session.
- Phase 1 does not require accounts, authentication, a backend, cloud storage, or synchronization.
- Phase 1 users import decks from JSON; the application does not generate study content. Creating decks or cards and editing imported card content inside the application are deferred to Phase 3.
- Essential functionality must remain free and must not be placed behind paywalls.
- A possible future subscription may only fund optional remote services such as synchronization or cloud storage.
- Review scheduling uses FSRS v6 through `ts-fsrs`; developing a new spaced-repetition algorithm is not part of the project.
- Desired retention is the only required user-editable FSRS parameter in Phase 1. The global daily goal, optional per-session round limit, and deck-level new-card reference and adaptive suggestion are application policies rather than internal FSRS parameters.
- The application must follow validated FSRS v6 scheduling outcomes and must not add a mandatory repeat-until-correct loop for cards rated `Again`.
- The domain must remain independently testable and must not depend directly on React Native, Expo, SQLite, or device APIs.
- The UI must access scheduling and persistence behavior through the application's public domain operations rather than calling `ts-fsrs` or storage directly.
- Phase 1 takes priority whenever capacity or schedule pressure requires a scope decision.

## Success criteria

The project will be considered successful when all required Phase 1 outcomes are delivered and supported by technical and user-research evidence.

| Area | Success criterion |
| --- | --- |
| Delivery | A stable Android development build can be installed and used to complete the required study workflow. |
| Content entry | A valid JSON deck can be imported completely and used for study without creating content inside the app; a partial import is not accepted. |
| Review flow | A user can review due cards first, choose whether to apply the per-round limit for that session, study suggested or additional available new cards, and rate each one as `Again`, `Hard`, `Good`, or `Easy`. |
| Scheduling | Every rating produces and preserves the appropriate next FSRS scheduling state. |
| Data integrity | Each review is saved before the next card is presented, without partially updating the card, scheduling, daily counts, or undo state, including when the user leaves before completing the session. |
| Continuity | Closing and reopening the app preserves decks, confirmed review progress, flag notes, tags, deck and global settings, and scheduling progress. Same-day due-only continuation remains available when due cards overflowed a limited round. |
| Offline operation | All required Phase 1 workflows remain available without an internet connection. |
| Organization | Users can use deck tags, filter the library by every selected tag, and identify flagged cards inside a deck. |
| Transparency | Each home-library deck card shows a neutral count of due cards plus automatically suggested new cards, and users can progressively access relevant FSRS information without disrupting the basic flow. |
| Study day | The application respects the global configurable study-day boundary and keeps a session that crosses it associated with its starting study day. |
| Usability | Target users can complete predefined representative tasks within the limits established by the research protocol. |
| Satisfaction | User satisfaction is measured and meets the threshold defined before the formal evaluation begins. |
| Quality | The application provides accessible interactions, understandable error states, and no known critical data-loss defects. |
| Academic result | The project produces research evidence, technical documentation, and a monograph connecting the problem, implementation, and evaluation results. |

Completion of Phase 2 or Phase 3 is not required to satisfy the minimum success criteria.

Any Phase 1 behavior still marked `Em discussão` in the system specification must be resolved and accepted before its final validation criterion is considered fixed.

## Items outside the TCC scope

The following items are explicitly outside the required TCC delivery:

- Accounts and remote user authentication.
- Backend services.
- Cloud backup and synchronization.
- Public deck publishing and Discover.
- In-app authoring of decks and cards beyond the Phase 1 deck settings.
- A public deck marketplace or social network.
- Collaboration between users.
- iOS delivery.
- Mandatory Play Store publication.
- Generative AI features.
- Advanced gamification.
- Replacement or modification of the FSRS algorithm itself.
- Automatic optimization of advanced FSRS parameters.
- Manual editing of FSRS parameters beyond desired retention.
- Any paywall applied to essential offline study functionality.

Phase 2 items are stretch goals rather than required deliverables. Phase 3 items are future product directions and must not expand the TCC scope unless the required Phase 1 work is already complete and formally stable.
