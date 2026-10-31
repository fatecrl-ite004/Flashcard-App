# Phase 1 — Figma flow-design handoff

> **Version:** 1.1.0<br>
> **Reviewed:** 2026-10-31<br>
> **Readiness:** ready to design the Phase 1 screen families and connect their prototype flows; domain parameters and runtime checks remain explicitly deferred.<br>
> **Authority:** [system specification](../system-specification.md) and linked use cases; this packet organizes their design coverage.<br>
> **Evidence:** owner decisions in chat and a document walkthrough, not empirical usability or Android verification.

The earlier 2026-10-29 assessment is historical. It used a multi-round live-session interpretation and still listed decisions that the owner has since resolved. This revision consolidates the current contract without replacing or editing the older captured artifacts. Working-tree document fingerprints are recorded in [review sources](phase-1-review-sources.json); there is no new Git commit or publication.

## What can be validated before drawing

| Check | Review outcome | Evidence boundary |
| --- | --- | --- |
| Phase 1 feature coverage | 27 active RFs mapped; RF-027 retained as discarded | Contract coverage, not implemented features |
| Main and alternate paths | 44 document scenarios checked against the specification/UCs | Logical review, no live UI clicks |
| Navigation hierarchy | One library root; avatar preference entry; deck/card hierarchy | Android behavior awaits device execution |
| Completion and Undo | Final rating confirmed -> session closed -> summary; more study -> new session | Storage consistency and timing await implementation |
| Empty/error/return states | Distinct empty data vs failed read; retry/details and safe return mapped | Fault injection awaits implementation |
| Inputs/settings | Autosave; 50/500 deck text limits; 30-character tag creation; global goal rules | Exact retention/new-reference control parameters remain domain work |
| Definitive Figma inventory | Read-only metadata still contains 19 empty frames on the Android page | No visual, interaction or usability validation yet |

## Approved product decisions

1. Biblioteca is the sole root. Avatar -> Perfil e preferências -> essential preferences. No bottom tab bar, Discover, You tab, account flow or expanded profile is required.
2. Confirm familiarity level before the forward-only demonstration. Use three distinct paths with isolated example cards. Confirm Skip separately. Android Back during demonstration confirms interruption; interruption remains incomplete and restarts next launch.
3. Import JSON through the native file picker. Cancellation is normal; duplicates require confirmation; the import is whole-deck or none.
4. Deck text and numerical settings save automatically. Name/description save on leaving the field; selectors save on choice and sliders on release. Tags can also be created through the selector with the approved 30-character/nonblank/reuse rules.
5. The final eligible rating must be confirmed before closing the session and its Undo and showing Sessão concluída. Estudar mais always prepares a new session. Same-day pending due-only continuation still survives.
6. The summary has four blocks: distinct cards in the session, how many were new, counts of Errei/Difícil/Bom/Fácil, and the global daily goal across all decks. Messages vary with activity and goal. Retained rating counts are not an accuracy score; undone ratings are excluded.
7. There is no separate advanced FSRS area or next-review date. RF-027 remains recorded as discarded. Desired retention remains an essential accepted setting.
8. E01–E06 remain the approved feedback patterns, with the newer completion boundary superseding former cross-round Undo wording. Common read/preparation/onboarding-save recovery is now defined as well.

## Flow and screen/state table

Use [the CSV inventory](phase-1-screen-inventory.csv) as the complete reference and [the logical navigation graph](phase-1-navigation.json) for reachability checks. A logical surface may be a screen, sheet, dialog, inline state or native boundary; it is not a requirement to create a separate full screen for every row.

| Journey | Main route | Mandatory alternate states and return |
| --- | --- | --- |
| First use | T00 -> T01 -> T15 -> T02 -> T03 | Three paths; Skip T16; Back interruption T19; save failure; restart incomplete onboarding |
| Find content | T03 -> T05 -> T08 | Empty library; AND filter; no results/clear; flagged-only list; valid same-deck return |
| Import | T03 -> T04 -> T03 | Native cancel; duplicate cancel/confirm; invalid/read/space/save errors; no partial data |
| Deck settings | T05 -> T06 -> T17 -> T06 -> T05 | Autosave; inherited/manual reference; counters; tag creation/reuse; not-saved/retry |
| Preferences | T03 -> T14 -> T10 -> T14 -> T03 | Goal minimum/default/warning/no cap; study-day time; autosave failure |
| Study | T05 -> T11 -> T12 -> T13 | Goal warning; optional limit; no eligible cards; due-only continuation; rating errors; early exit |
| Flag | T08 or T12 -> T09 -> same origin | Add/edit/clear/remove; failed note retained while editor open; same card/session |
| Undo | Active T12 -> confirmed reversal in T12 | No spinner; same target on failure; internal interrupted-write check; no Undo in T13 |
| Further study | T13 -> new T11/session -> T12 | Fresh day/eligibility/default-on limit choice; same-day due-only overflow preserved |
| Delete | T05 -> T07 -> T03 | Cancel to deck; confirmed failure preserves all data; Retry opens confirmation again |

### Summary content ready to draw

| Block | Meaning | Example label |
| --- | --- | --- |
| Session cards | Distinct identities with confirmed, non-undone activity in this session | Cards estudados |
| New cards | Those identities whose first-ever confirmed rating belongs to this session | Novos cards |
| Ratings | Counts of retained confirmed rating actions; can exceed distinct-card count | Errei / Difícil / Bom / Fácil |
| Daily goal | Distinct confirmed cards across all decks on the completed session's assigned study day | Meta do dia: 18 de 20 |

The summary is a read-only completion result, not a history browser. Early exit and failed/empty preparation do not show successful completion. Do not add duration, streak, accuracy percentage, next-review date or history as mandatory blocks without a further scope decision.

### Android Back contract to represent and later test

| Context | Expected return | Data/lifetime consequence |
| --- | --- | --- |
| Library root | Android environment; no hierarchy Up arrow | Saved data remains; completed onboarding is not reopened |
| Deck | Library with prior filter context | No study session starts |
| Individual card | Same deck/list | No rating/count change |
| Preferences | T10 -> avatar hub -> library | Confirmed autosaves remain |
| Deck settings | Same deck; changed text losing focus triggers autosave | No general discard/cancel; failed updates remain distinguished from saved values |
| Keyboard/dialog/details open | Handle the top layer first | Hiding keyboard alone is not a batch discard; exact focus behavior is a device check |
| Flag editor | Same individual/review card after cancellation or saved action | Keep review session and card context; canceling unsaved note does not change stored flag |
| Level confirmation | Familiarity question before demo starts | No completion |
| Demo | Interruption confirmation T19; Continue stays on step, Sair exits incomplete | Skip is a different confirmed completion action |
| Skip/interruption confirmation | Dismiss to the same question/demo step | No implicit save or prior-step navigation |
| Study preparation | Deck | No false completed-session summary or studied day from opening alone |
| Active review | End session and return deck using existing pending-operation recovery | Confirmed ratings stay; Undo scope ends |
| Completed summary | Deck, or explicit Biblioteca action to root | Session already closed; never return to its live queue/Undo |
| Stale destination | Valid deck when known, otherwise library | No wrong card/deck or implicit study session |
| Background with surviving process | Same active card/session, or same closed summary | Background alone does not finish live study |
| Process ended | Startup and confirmed stored state | No replay of old request or revived session Undo |

For ordinary in-app destinations, the Back/Up contract follows the [Android navigation principles](https://developer.android.com/guide/navigation/principles); conditional onboarding has its explicit interruption behavior. Completing and canceling [predictive Back](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture) must be checked on Android later. Canceling a gesture must not perform a save, deletion, exit or Undo on its own. This table specifies intended behavior, not proof of a working build.

## Figma drawing order

1. Draw the core study loop first: Biblioteca -> Deck -> Preparar estudo -> Frente -> Verso/ratings -> Sessão concluída -> new preparation or deck. Connect at least three example cards and show that only the last confirmed rating reaches summary. Add Undo before the final boundary.
2. Draw onboarding with three branches and the three distinct confirmations (level, Skip, interruption).
3. Add import/duplicates, deck settings/tags, avatar preferences, individual card and flag flows, and deletion.
4. Add empty/no-results, pending/error/retry, details and invalid-destination variants to those same families. A shared error component can be reused instead of a new full screen for every failure.
5. Run the [44-scenario checklist](phase-1-document-walkthrough.csv) as actual prototype click-through; record Figma version/date, reviewer and result. Then revise visual usability and accessibility with the prototype.

Existing frames can be reused: 4:4/4:5 onboarding, 4:7–4:9 import, 4:11–4:13 library, 4:15–4:21 deck/cards/flag, 4:23–4:26 review/summary and 4:28 essential settings. New overlays/variants and the avatar hub/preparation/tag selector still need composition. Review is based on [captured metadata](phase-1-figma-metadata.xml), not an assumption that the 19 frames cover every state.

## Remaining decisions and evidence

| Item | Can drawing proceed? | Next validation |
| --- | --- | --- |
| Exact retention bounds/default/step and new-reference selector parameters | Yes for layout and interaction structure; keep values parameterized rather than inventing product defaults | Domain exploration, then update component values |
| Infinite global goal vs finite slider | Yes: a +/- numeric selector is a design recommendation compatible with the current no-maximum rule | Prototype usability; do not add a finite goal cap |
| JSON card/deck/profile contracts and zero-card import decision | Yes: picker, validation categories, duplicate and error flows are already mapped | Future schema ADR and import tests |
| Text character-count convention and tag case/normalization policy | Yes for the approved limits and flows; no extra case rule is introduced here | Agree details before implementing constraints; counters/storage must agree |
| Exact copy, illustration, icon placement and component layout | This is the intended Figma work | Prototype review with representative tasks |
| FSRS correctness, transactions, interruption recovery, latency | Yes for screen design; no implementation claims | Domain/persistence tests and Android development build |
| Back, keyboard, gestures, TalkBack and font scaling | Intentions are mapped; behavior remains unverified | Prototype where possible, then real Android |
| Formal usability/satisfaction thresholds and participants | Does not block initial screen design | Research protocol before the formal evaluation |

The preliminary domain-model sketch is not a second source of screen requirements. Use the canonical specification/UCs for design; exact storage and domain APIs are later work. The primary Drive folder is [Flashcard-App](https://drive.google.com/drive/folders/1crDYkSS_QwJjk2-xmhEcxkgAt2lPF_Cn), and the definitive [Android Figma](https://www.figma.com/design/iu8EH2Uky9EOuJXkceBKvU/Flashcard-App) is the design destination. Current persona/empathy/journey sources are the links in the [evidence log](../research/evidence/evidence-log.md); hypotheses and one exploratory observed journey do not establish a validated interface.

## Traceability

| Requirement | Surface/state mapping | Status |
| --- | --- | --- |
| RF-001 | T01, T02, T15, T16, T19 | Covered by design contract |
| RF-002 | T04 | Covered by design contract |
| RF-003 | T03, T14 | Covered by design contract |
| RF-004 | T05 | Covered by design contract |
| RF-005 | T07 | Covered by design contract |
| RF-006 | T06 | Covered by design contract |
| RF-007 | T06 | Covered by design contract |
| RF-008 | T10, T11, T14 | Covered by design contract |
| RF-009 | T06, T11 | Covered by design contract |
| RF-010 | T06, T17 | Covered by design contract |
| RF-011 | T03 | Covered by design contract |
| RF-012 | T08 | Covered by design contract |
| RF-013 | T09 | Covered by design contract |
| RF-014 | T09 | Covered by design contract |
| RF-015 | T09 | Covered by design contract |
| RF-016 | T05 | Covered by design contract |
| RF-017 | T11 | Covered by design contract |
| RF-018 | T12 | Covered by design contract |
| RF-019 | T12 | Covered by design contract |
| RF-020 | T12 | Covered by design contract |
| RF-021 | T12 | Covered by design contract |
| RF-022 | T12 | Covered by design contract |
| RF-023 | T12 | Covered by design contract |
| RF-024 | T12 | Covered by design contract |
| RF-025 | T13 | Covered by design contract |
| RF-026 | T03 | Covered by design contract |
| RF-027 | No screen: separate advanced area removed | Discarded; identifier retained |
| RF-028 | T10, T14 | Covered by design contract |

## Files consolidated in this review

- [System specification](../system-specification.md) and [project overview](../project-overview.md).
- [UC01](../use-cases/uc-001-initialize-application.md), [UC02](../use-cases/uc-002-complete-onboarding.md), [UC03](../use-cases/uc-003-view-deck-library.md), [UC05](../use-cases/uc-005-view-deck-details.md), [UC06](../use-cases/uc-006-edit-deck-settings.md), [UC08](../use-cases/uc-008-conduct-study-session.md), [UC09](../use-cases/uc-009-configure-global-study-settings.md), and [UC10](../use-cases/uc-010-view-card-and-manage-flag.md). UC04 and UC07 are preserved from their earlier approvals.
- [Agent guidance](../../AGENTS.md); proposed [ADR 0003](../adr/0003-session-and-round-lifecycle.md), [ADR 0004](../adr/0004-review-consistency-and-undo.md), and [ADR 0008](../adr/0008-ui-state-and-navigation.md), with product-contract revision notes and Proposed status retained.
- [UI decisions](../architecture/ui/README.md) and [evidence log](../research/evidence/evidence-log.md).
- This handoff, inventory CSV, walkthrough CSV, logical navigation JSON, captured Figma XML and source fingerprints JSON form the new design packet.

## Review result

The contract is ready for screen-family drawing and flow prototyping. Document consistency, requirement mapping, return paths and approved alternate states have been reviewed; no requirement is promoted to Implementado or Verificado. Exact component parameter values and all empirical/runtime checks retain the limits listed above.
