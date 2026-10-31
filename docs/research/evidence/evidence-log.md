# Evidence log

## UX-E01 — Rating feedback and persistence errors

- **Date:** 2026-10-29.
- **Evidence type:** explicit product-owner approval and documentation review; no application execution.
- **Authorization:** the owner confirmed the mapped rating-loading, success, confirmed-failure, and uncertain-outcome behavior and explicitly authorized formalizing E01. The owner refined the pending state: only the selected rating button shows loading and emphasis; the other rating buttons and Undo stop accepting input without a visual change. Error feedback must offer additional information through **Saiba mais**.
- **Documents:** [UC08 Stage C and FE01](../../use-cases/uc-008-conduct-study-session.md), [RNF-005 in the system specification](../../system-specification.md), and [UI interaction decisions](../../architecture/ui/README.md).
- **Outcome:** E01 is documented as approved behavior. Runtime persistence, accessibility, visual behavior, and Android interaction remain unverified until implementation and corresponding checks exist.

### Other confirmed directions from the same discussion

These confirmations are retained for coordinated follow-up edits. Their mention here does not replace the canonical requirements or silently rewrite the existing session lifecycle, study policy, or scope.

| Direction | Owner confirmation | Follow-up documentation |
| --- | --- | --- |
| Review completion | A compact review summary and varied messages based on the study outcome and daily goal are desired. Undo ends when its session ends. | Resolved in UX-READY-1.1.0 below: four-block summary closes the session and Undo; further study starts another session, replacing the earlier cross-round interpretation. |
| Deck settings | Editable name/title, description, tags, desired retention, and a deck-level new-card quantity. Indicate whether the new-card reference follows the global default or has a deck override. | Carried into UC06 and the corresponding requirement references in UX-E03 below. The current G/3 automatic-reference rule is preserved. |
| JSON contracts | Card, deck, and profile schemas will be specified in a future ADR. | Link UC04 to the accepted contract when available; no concrete JSON schema is established here. |
| Advanced information | Remove the separate advanced FSRS area; do not show a next-review date in Phase 1. | Consolidated in UX-READY-1.1.0 below: RF-027 retained as discarded, next-review date excluded from Phase 1, and affected references aligned. |
| Navigation and onboarding | One library root, deck/card navigation, and profile/preferences access through an avatar; confirm onboarding level and skip, prevent backward steps during the demonstration, and do not record interrupted onboarding as complete. | Consolidated in UX-READY-1.1.0 below, including distinct Back/interruption and Skip confirmation. |

### Project source selection

The owner identified the Drive folder **Flashcard-App** below as the primary TCC source location. Start future project-context retrieval there and in its relevant subfolders before using older coursework material. The new Android Figma is the definitive design workspace; the former iOS Figma is historical and must not determine the new flow.

- [Primary TCC Drive folder](https://drive.google.com/drive/folders/1crDYkSS_QwJjk2-xmhEcxkgAt2lPF_Cn).
- [Prototyping subfolder](https://drive.google.com/drive/folders/1m_DekmC0VOLHZbj0AK7Ha438Nh0Hzlmd).
- [Current four hypothetical personas](https://docs.google.com/document/d/1DVl8vbfSVBsjooI5ESn9v5tNjF1Zvp2r/edit).
- [Empathy maps for those four hypothetical profiles](https://docs.google.com/document/d/1n3naZp4seCH03yDe_K8phwYZl6HHViH9/edit).
- [Exploratory observed user journey](https://docs.google.com/document/d/164bI-RMRjMnWQouEVRJ26RhT6a45HrMj/edit).
- [Definitive Android Figma](https://www.figma.com/design/iu8EH2Uky9EOuJXkceBKvU/Flashcard-App).

The personas and empathy maps explicitly describe hypotheses. The journey reports an exploratory observation with one participant; it is not a formal validation of the new Android interface.

## UX-E02 — JSON import error feedback

- **Date:** 2026-10-29.
- **Evidence type:** explicit product-owner approval and documentation review; no application execution.
- **Authorization:** the owner approved E02 after reviewing the proposed local notification with **Saiba mais**, distinct messages for invalid JSON, reading problems, and saving failures, cause-specific next steps, and file-picker cancellation without an error alert.
- **Documents:** [UC04 FA01, FE01–FE04, and section 4.4](../../use-cases/uc-004-import-deck.md), [RNF-005 in the system specification](../../system-specification.md), and [UI interaction decisions](../../architecture/ui/README.md).
- **Outcome:** error feedback and recovery are documented as approved behavior. Complete validation, atomic import, and duplicate confirmation are preserved. The future JSON schema is not defined by these changes. Implementation and Android error-injection checks remain pending.

## UX-E03 — Settings autosave, text limits, and persistence errors

- **Date:** 2026-10-29.
- **Evidence type:** product-owner decisions and documentation review; no application execution.
- **Authorization:** the owner replaced the proposed invalid-input/Save/Cancel flow with valid choices through sliders or selectors and automatic saving on changes. They accepted retaining the attempted value on a persistence failure and clarified that name and description are free-text exceptions saved on leaving the field. They required only maximum text lengths and then explicitly selected **50 characters for the name** and **500 for the description** instead of the proposed 100/1,000.
- **Documents:** [UC06](../../use-cases/uc-006-edit-deck-settings.md), [UC09](../../use-cases/uc-009-configure-global-study-settings.md), [system specification](../../system-specification.md), [project overview](../../project-overview.md), and [UI interaction decisions](../../architecture/ui/README.md).
- **Outcome:** the approved settings flows now use automatic saving, preserve confirmed updates when returning, and distinguish an attempted unsaved value after failure with Retry and Saiba mais. RF-006 now includes the previously confirmed deck description and accepted text limits. Former FE01 input-correction flows are superseded by constrained controls; FE02 identifiers remain for persistence failures. The deck default/override indication is documented without changing the existing G/3 policy or reference recalculation rules.
- **Clarifications for consistency:** a slider submits on release; an above-50 goal warning remains nonblocking and does not require a separate save confirmation; internal validation and dependent-reference consistency remain. This change does not define the JSON schema, a persistent unsaved-draft store, or new textual restrictions beyond the approved maxima. E01/E02 remain in effect.
- **Validation status:** documentation review only. Runtime autosave, focus/Back behavior, text counters, persistence recovery, and Android checks remain pending implementation.

## UX-E04 — Deck deletion failure and renewed confirmation

- **Date:** 2026-10-29.
- **Evidence type:** explicit product-owner approval and documentation review; no application execution.
- **Authorization:** the owner approved preserving all data on a deletion failure, returning to deck details, offering Retry and Saiba mais, and requiring another explicit deletion confirmation before retrying.
- **Documents:** [UC07 FE01](../../use-cases/uc-007-delete-deck.md), [RNF-005 in the system specification](../../system-specification.md), and [UI interaction decisions](../../architecture/ui/README.md).
- **Outcome:** the approved recovery path now returns Retry to the existing confirmation step. Error details do not change data or trigger another deletion; canceling a repeated confirmation preserves all data. The existing atomic deletion, successful-deletion scope, and return to the library remain unchanged. This failure path applies to confirmed failures, without mislabeling an unresolved outcome.
- **Validation status:** documentation review only. Atomic rollback, diagnostics, repeated confirmation, cancellation, and Android interaction checks remain pending implementation. E01–E03 remain in effect.

## UX-E05 — Flag and note persistence errors

- **Date:** 2026-10-29.
- **Evidence type:** explicit product-owner approval and documentation review; no application execution.
- **Authorization:** the owner approved preserving the saved flag/note, retaining attempted text for retry, offering Retry and Saiba mais, and remaining on the same review card without changing ratings, scheduling, or progress.
- **Documents:** [UC10 FE01](../../use-cases/uc-010-view-card-and-manage-flag.md), [UC08 FA08](../../use-cases/uc-008-conduct-study-session.md), [RNF-005 in the system specification](../../system-specification.md), and [UI interaction decisions](../../architecture/ui/README.md).
- **Outcome:** additions, note edits/clearing, and removals share the approved failure feedback. A failed change preserves stored flag/note data; attempted note text remains available while the editor is open, and retry repeats the same intended action on the same card. Error details do not modify data or submit another action. The existing single-flag rule, successful flag actions, and review continuity remain in effect.
- **Validation status:** documentation review only. Failure injection, note retention/retry, diagnostic feedback, and Android/card-session checks remain pending implementation. E01–E04 remain in effect.

## UX-E06 — Seamless Undo and internal recovery

- **Recorded on:** 2026-10-31.
- **Evidence type:** explicit product-owner approval of the revised treatment and documentation review; no application execution.
- **Authorization:** the owner prioritized seamless Undo without visible loading, accepted confirmation before updating card/counts/sequence, confirmed retry and Saiba mais for failures, and approved internal recovery of interrupted confirmations after discussing what an unavailable result means. They authorized concluding E06 and reiterated that instruction after the connection interruption.
- **Documents:** [UC08 FA02/FE03](../../use-cases/uc-008-conduct-study-session.md), [RF-024 and RNF-005 in the system specification](../../system-specification.md), and [UI interaction decisions](../../architecture/ui/README.md).
- **Outcome:** normal Undo has no visible loading or artificial delay; conflicting input is blocked without a visual change until persistence is confirmed. Confirmed failures keep the same saved state and target for retry. Interrupted confirmations are reconciled internally without a dedicated uncertain-result screen, blind resubmission, or revival of an ended session's undo access. The existing sequential Undo scope remains unchanged.
- **Exploration follow-up:** preparing reversal information in memory is a candidate for the domain exploration, not an adopted cache/schema design or a verified latency result.
- **Validation status:** documentation review only. Actual latency, accessibility, failure injection, reconciliation, process interruption, and Android interaction checks remain pending implementation. E01–E05 remain in effect.

## UX-READY-1.1.0 — Pre-Figma document review and decision consolidation

- **Date:** 2026-10-31.
- **Purpose:** prepare the Phase 1 flow contract and screen/state content for designing the new Android prototype.
- **Owner approvals in this review:** end the session and Undo before summary; Estudar mais creates another session; use four summary blocks (distinct cards, new cards, four rating counts, global daily goal); isolate tutorial examples; apply the common error pattern to initialization/reading, preparation and onboarding completion; allow tag creation with a 30-character maximum, nonblank name and reuse of an existing name; Back during demonstration confirms interruption separately from Skip.
- **Prior approvals carried forward:** library root/avatar preferences, forward-only level-specific onboarding and friendly confirmations, removal of advanced FSRS UI and next-review date, 50/500-character deck text limits, autosave and E01–E06.
- **Source freshness:** Figma read-only metadata was fetched on this date from the definitive Android file. It still lists the two pages and 19 empty Phase 1 frames. [Captured metadata](../../ux/phase-1-figma-metadata.xml) identifies the inspected page and frame IDs. Research links remain the primary Drive sources recorded above; no new participant study or re-fetch of those documents is claimed here.
- **Documentation:** [handoff](../../ux/phase-1-figma-handoff.md), [screen inventory](../../ux/phase-1-screen-inventory.csv), [walkthrough](../../ux/phase-1-document-walkthrough.csv), [source fingerprints](../../ux/phase-1-review-sources.json), canonical specification, affected UCs, overview, agent guidance and proposed ADRs 0003/0004/0008.
- **Coverage:** all 27 active Phase 1 RFs have a screen/state or visible interaction mapping; RF-027 is retained as discarded, making 28 tracked identifiers. Document walkthrough scenarios are checked against the contract, not executed against an app. The owner approved the listed decisions in chat; this is not empirical usability evidence.
- **Scope history:** the session boundary replaces the earlier multi-round active-session interpretation. RF-027 is discarded by the owner's previous direction; no requirement ID is removed or reused. The four-block current-session summary is Phase 1; expanded feedback/history remains Phase 2. ADR status is not promoted.
- **Remaining evidence:** Figma click-through, real-device Android Back/keyboard/gestures, TalkBack/font scaling, FSRS/domain and persistence fault checks, actual latency, and formal usability/satisfaction study remain unverified. Numeric control ranges/defaults/steps and the public JSON schema still need domain decisions; they do not require new navigation branches.
