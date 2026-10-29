# ADR 0008 — UI State and Navigation with Expo Router

- **ADR number:** 0008
- **Title:** UI State and Navigation with Expo Router
- **Date:** 2026-10-28
- **Owner:** Enzo
- **Status:** Proposed

## Context

Phase 1 includes onboarding, a local deck library, deck details and settings, JSON import, study, global study settings, and individual card and flag interactions. These flows share confirmed local data while maintaining temporary presentation state such as form input, selected tag chips, and expanded information sections.

ADR 0001 separates domain rules, application coordination, and UI responsibilities. ADR 0003 places the live study session outside individual screens and hooks: backgrounding while the process survives preserves it, whereas process termination ends it while confirmed progress remains stored. ADR 0004 requires confirmed persistence before advancing after a rating or undo.

The user selected Expo Router with React's own state-management facilities for this proposal. [Expo recommends Expo Router for Expo projects](https://docs.expo.dev/develop/app-navigation/), and React documents both [reducer and Context composition](https://react.dev/learn/scaling-up-with-reducer-and-context) and [subscriptions to external state](https://react.dev/reference/react/useSyncExternalStore). These tools can connect the planned interface to the existing application boundaries without making a screen the owner of study behavior.

The repository has no adopted Expo application, route structure, or UI implementation. This ADR defines the navigation and state approach for later authorized application work. It does not establish a complete screen design or authorize implementing the application shell during domain exploration.

## Decision

Use Expo Router for navigation and React's built-in facilities for presentation state. Preserve application ownership of live study state and database ownership of confirmed persistent data. Do not adopt an additional global state library for the current scope.

1. **Keep route files focused on navigation and composition.** Expo Router maps route files to screens. Route components select and compose presentation components and application dependencies; they do not calculate scheduling, select cards, execute database queries, or implement persistence rules. Navigation stays in the presentation integration. Domain and application operations remain independent of Expo Router and React.

2. **Use route parameters to identify the destination.** Pass identifiers needed to open a deck or card and validate them before displaying dependent content. Load current data through application operations. Do not place complete decks, scheduling state, undo sequences, database objects, or live session snapshots in route parameters. Navigating to a study destination alone must not start or reconstruct a session.

3. **Keep ordinary visual state local.** Use `useState` for simple presentation values and `useReducer` when several related UI transitions need clearer structure. Lift state to the nearest shared presentation owner when necessary. Use focused Context providers for dependencies or genuinely shared presentation values. Avoid one application-wide Context containing every screen's state. Unsaved form input remains presentation state until its application save operation succeeds.

4. **Subscribe to the existing application owner of study.** The live session, round, current card, operation status, and undo availability retain the ownership established in ADR 0003. Create that owner with the running application, outside the lifetime of individual review screens. React adapters may subscribe to its project-owned snapshots using `useSyncExternalStore`; they must not create an independent authoritative copy of the queue or undo sequence in a reducer or Context. Subscriptions need stable lifecycle handling and snapshots that remain unchanged between actual updates, as described in the React API documentation.

5. **Match presentation-state lifetime to the interaction.** A temporary screen or hook remount must not reset the active session. Preserve whether the current card has been revealed across background and foreground transitions while the process survives, as required by ADR 0003. This session-scoped presentation information belongs with the session's presentation context. Transient animation progress may remain inside the UI. Revealing a card and running its 200 ms flip animation do not rate it or alter its schedule.

6. **Render confirmed outcomes and explicit pending states.** Hooks adapt application operations to loading, success, and error presentation. A rating or undo cannot advance the displayed queue or confirmed progress until its required persistence is confirmed. Disable conflicting submissions while an operation is unresolved, following ADR 0004. Form drafts may update immediately, but persisted settings and progress are presented as saved only after confirmation. Async results for a screen that has changed destination must not overwrite the new destination's presentation.

7. **Refresh dependent views through application reads.** The database remains authoritative for persisted information. After a successful mutation, update or reload affected presentation data through the relevant application operations. Re-entering a deck or library must not show an obsolete summary as current. Current time and saved state must be supplied to the existing rules when recalculating availability; presentation code must not reproduce those calculations. Exact refresh triggers and read representations belong in the concrete UI design.

8. **Coordinate navigation with the accepted session lifecycle.** Returning to the deck or library or explicitly finishing study ends the session through application coordination. Android Back, navigation gestures, and visible exit actions must reach the same exit behavior when they leave study. Opening and closing a flag interaction within review preserves the same card and session. A component unmount or background event alone is not an instruction to end study. Handle unresolved operations according to the existing reconciliation and exit flows; navigation must not convert an uncertain rating into a presumed failure or a duplicate submission.

9. **Initialize before exposing dependent flows.** Application startup makes local data available and reads onboarding state before selecting the appropriate initial flow under UC01. Initialization and migration failures must not expose study against unavailable or incompatible storage. Reopening after process termination follows the new-session behavior in ADR 0003; restoring a navigation destination must not revive the previous queue or undo availability.

The route hierarchy, visible navigation controls, exact providers, screen contracts, subscription implementation, and package versions remain implementation-design details. This decision does not add persisted navigation state, automatic active-session restoration, remote data fetching, or a second persistence mechanism.

## Rationale

- **Fit with Expo:** Expo Router provides the selected routing model within the planned platform.
- **Proportional state management:** Local React state, focused Context, and subscriptions cover the identified presentation needs without an additional global store.
- **Consistent study behavior:** Preserving a single application owner avoids coupling the queue and undo lifetime to rendering or navigation.
- **Reliable feedback:** Pending and confirmed states reflect the application's persistence outcomes instead of assuming success from a button press.
- **UI iteration:** Screens can evolve through usability research while domain rules and application operations retain their responsibilities.

## Alternatives Considered

- **Expo Router with Zustand for shared UI state.** Provides a dedicated store and subscription facilities, but adds a dependency before the current scope demonstrates a need beyond React's facilities and the existing application session owner. The user selected the React approach.
- **React Navigation with manually declared routes and React state.** Is an alternative supported by Expo and offers explicit navigator composition. The user chose Expo Router's file-based approach for the planned Expo application.
- **Place all data and study state in a global React reducer or Context.** Centralizes access, but duplicates persistent data and moves session lifetime into presentation. This conflicts with the ownership already proposed in ADRs 0001 and 0003.

## Consequences

- Expo Router is the selected navigation direction; the complete design remains Proposed. No dependency or application scaffolding is introduced by this documentation task.
- UI code needs small adapters for application operations, subscriptions, error presentation, and refresh coordination. Context supplies access without becoming the owner of domain rules.
- Route state, form drafts, session-scoped presentation context, and confirmed stored data have distinct owners. Reviews must check that updates occur through the responsible boundary.
- Required later validation includes onboarding entry, deck and card navigation, Android Back and gestures, return from flag editing, screen remounts, background and foreground continuity, pending-operation navigation, confirmed-data refresh, and reopening after process termination.
- The 200 ms flip and accessible feedback require UI validation on the Android application. They have not been tested here.
- An additional state or query library requires a concrete current need and approval. This ADR does not adopt one in anticipation of future phases.

## References

- [ADR 0001 — Pure TypeScript Domain and FSRS Integration Boundary](0001-pure-typescript-domain.md): application and presentation responsibilities; currently Proposed.
- [ADR 0003 — Session and Round Lifecycle](0003-session-and-round-lifecycle.md): state ownership, background behavior, and process termination; currently Proposed.
- [ADR 0004 — Review Consistency and Undo](0004-review-consistency-and-undo.md): confirmation, sequential undo, and unresolved operations; currently Proposed.
- [ADR 0006 — Android Application with React Native and Expo](0006-android-application-with-react-native-and-expo.md): platform direction; currently Proposed.
- [Project overview](../project-overview.md), [system specification](../system-specification.md), and [agent instructions](../../AGENTS.md): Phase 1 scope and dependency constraints.
- [UC01 — Initialize the Application](../use-cases/uc-001-initialize-application.md), [UC03 — View the Deck Library](../use-cases/uc-003-view-deck-library.md), [UC08 — Conduct a Study Session](../use-cases/uc-008-conduct-study-session.md), and [UC10 — View a Card and Manage Its Flag](../use-cases/uc-010-view-card-and-manage-flag.md): relevant navigation and continuity flows.
- [Expo application navigation](https://docs.expo.dev/develop/app-navigation/): Expo Router and manually composed React Navigation alternatives; consulted 2026-10-28.
- [React — Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context): presentation state sharing; consulted 2026-10-28.
- [React — useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore): subscribing to externally owned state and snapshot requirements; consulted 2026-10-28.
