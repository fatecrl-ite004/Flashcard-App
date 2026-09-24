# Flashcard App — Development Workflow

> **Audience:** new contributors to the Flashcard App TCC project  
> **Last reviewed:** 2026-09-23  
> **Scope:** how work moves through GitHub Issues, the Project, branches, pull requests, review, and completion

## Start here

| Resource | What it is for |
| --- | --- |
| [Repository](https://github.com/fatecrl-ite004/Flashcard-App) | Versioned code and project documentation. Its default branch is `main`. |
| [Flashcard App Project](https://github.com/orgs/fatecrl-ite004/projects/1) | Planning work, assigning people and iterations, and tracking Status and execution blocks. |
| [AGENTS.md](https://github.com/fatecrl-ite004/Flashcard-App/blob/main/AGENTS.md) | Repository-wide working, architecture, documentation, and validation rules. Read this before changing the repository. |
| [Project overview](https://github.com/fatecrl-ite004/Flashcard-App/blob/main/docs/project-overview.md) | Product goals, delivery phases, scope, and deadlines. |
| [System specification](https://github.com/fatecrl-ite004/Flashcard-App/blob/main/docs/system-specification.md) | Authoritative RF, RN, and RNF text, status, and acceptance requirements. |

**The distinction:** the specification defines what the product must do; an Issue describes work to deliver it; the Project places that work in the plan; a branch holds repository changes; a pull request (PR) proposes merging those changes into `main`. Closing an Issue does not, by itself, verify a requirement. Record the evidence and update the specification when a requirement has actually been verified.

Phase 1 is the required TCC delivery, targeted for **June 2027**. The **2026-11-18 TCC I** checkpoint is an intermediate academic delivery, not the Phase 1 deadline. Phase 2 is conditional; Phase 3 is a post-TCC roadmap. See [Issue #107](https://github.com/fatecrl-ite004/Flashcard-App/issues/107) for the work to correct or separate potentially misleading milestones.

## How work is represented

- **Feature:** an implementable product requirement, usually identified by an `RF-...` ID, such as [#30 — RF-004: Open a deck](https://github.com/fatecrl-ite004/Flashcard-App/issues/30).
- **Task:** a distinct technical, UX, research, quality, documentation, management, or TCC deliverable, such as [#78 — Define information architecture and main flows](https://github.com/fatecrl-ite004/Flashcard-App/issues/78) or [#83 — Configure domain tooling](https://github.com/fatecrl-ite004/Flashcard-App/issues/83).
- **Bug:** a reproducible defect to investigate and correct when one is found.
- **Checklist item:** a small step or acceptance criterion inside an Issue. It does not need a separate Issue unless it needs its own owner, schedule, dependency, or independently reviewable outcome.
- **Sub-issue:** an independently tracked part of a larger Issue when decomposition helps. There is no mandatory one-to-one mapping between requirements, Issues, sub-issues, branches, and PRs.

Use the Project fields according to their different jobs:

| Field | Question it answers |
| --- | --- |
| **Fase** | Is this Phase 1, conditional Phase 2, or post-TCC Phase 3? |
| **Área** | Which kind of work is this? |
| **Prioridade** | How urgently should it be considered? |
| **Bloco de execução** | Where does it sit in the broad implementation sequence? This is not a sprint date. |
| **Iteração** | In which scheduled cycle will the team work on it? |
| **Assignee** | Who owns moving the Issue forward? |
| **Status** | Where is the Issue in the actual workflow below? |

Select work for an iteration using dependencies, priority, and available capacity. The execution block helps order the work; the iteration commits it to a time window. A branch does not replace either field.

## Status: the team's agreed sequence

| Status | Meaning | Typical next action |
| --- | --- | --- |
| **Backlog** | Work identified but not yet assigned for execution. | Check scope, dependencies, and whether it belongs in an iteration. |
| **A fazer** | An assignee has taken responsibility; work has not started. | Confirm the Issue's checklist and begin the work. |
| **Em andamento** | The assignee is producing the deliverable. For repository changes, this usually means working on a branch. | Complete the substantive work and perform author-side checks. |
| **Pronto** | The Issue's main tasks are done, but its review phase has not started. A PR or external evidence can already be prepared. | Request or arrange review; keep the Issue open. |
| **Em revisão** | Review of the PR or other deliverable is under way. Requested changes may return the work to `Em andamento` when substantial. | Address feedback, repeat relevant checks, and obtain acceptance. |
| **Concluído** | The deliverable has been accepted, applicable checklist and validation are complete, documentation and evidence are updated, and any applicable PR is merged. | Close or confirm closure of the Issue and check its Project Status. |

**Pronto is after the main work, not before development.** A draft PR can be opened during `Em andamento`. An open PR is not proof that review has begun. The Issue's open/closed state and its Project Status are separate; inspect both when finishing work.

## Workflow for changes to the repository

1. **Choose and assign the Issue.** Check its Phase, Iteração, Bloco de execução, dependencies, checklist, and requirement IDs. Move it from `Backlog` to `A fazer` when assigned. Starting work moves it to `Em andamento`.
2. **Create a branch for a cohesive change.** From the Issue, use **Development → Create a branch** if the branch should be linked automatically. GitHub creates it from the default branch by default. A readable example for #30 is `feat/30-open-deck`; the exact naming pattern is a convention, not an existing repository rule. The Issue remains an Issue, and `main` is unchanged while work happens on the branch. [GitHub: creating a branch for an Issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-a-branch-for-an-issue).
3. **Implement and validate.** Make focused commits on the branch. Complete the Issue's substantive checklist, run relevant checks that are actually configured, record manual validation when appropriate, and update affected documentation. Never invent a test command or report a check as passed without running it; consult the current repository configuration and `AGENTS.md`.
4. **Prepare a PR targeting `main`.** Describe the outcome, the linked Issue, significant decisions, validation performed, documentation changed, and anything still outstanding. A draft PR is useful while the work is developing; make it ready for review when appropriate. A PR from a branch created through the Issue is linked to that Issue automatically. A separately created branch can be linked using **Development** or a closing keyword such as `Closes #30`. [GitHub: about PRs](https://docs.github.com/en/pull-requests/get-started/about-pull-requests); [linking PRs to Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue).
5. **Review together.** When the main work is done but review has not begun, set `Pronto`. Once the other team member starts reviewing, set `Em revisão`. The reviewer inspects the changed files, relevant checks, acceptance criteria, and documentation; feedback is addressed in the same branch and PR. Keep the PR focused enough to review and merge within a reasonable part of the iteration.
6. **Merge and finish.** Merge only after the agreed completion criteria are satisfied. Check the Issue's closure, its Project Status, and the evidence. A linked PR merged into the default branch can **automatically close the Issue**, so do not use that merge as a substitute for the checklist and acceptance review. Delete a merged branch when it is no longer needed.

**Large Issues and partial PRs:** one Issue can involve multiple branches or PRs. Because merging a linked PR into `main` can close its Issue, avoid tying a partial PR to a broad parent Issue as though it finishes the whole deliverable. Prefer smaller independently reviewable sub-issues, or clearly reference the parent for context and link the closing PR only when the parent is ready to finish.

## Workflow for work outside the repository

Some Tasks produce a Figma prototype, a user-research result, an interview record, or another external artifact. They still move through the same Status sequence, but creating an empty branch or PR provides no useful review. For these Tasks:

1. Put the outcome and its link in the Issue, preferably in a dated **completion comment**; attach a supported file or screenshot if useful.
2. Mark the actual checklist items and describe the applicable validation. For example, say who checked a UX flow and what was changed after feedback.
3. Move from `Pronto` to `Em revisão` when the other team member starts reviewing the artifact and evidence.
4. After acceptance, update relevant project documentation or the evidence record, set `Concluído`, and close the Issue manually.

**PRs are expected when the deliverable changes repository files.** An external-only Task is completed through its reviewed evidence and checklist. If that Task also updates a versioned document, use a normal branch and PR for that repository change.

## What counts as finished

Before closing an Issue, confirm:

- Its relevant checklist items and acceptance conditions are met.
- Appropriate checks or other validation were actually performed, with results or links recorded. A UX or research Task may have different validation from a code Feature.
- The relevant documentation and evidence have been updated; if a requirement is claimed as `Verificado`, the specification has supporting evidence.
- A repository-changing deliverable has a linked, reviewed, merged PR. An external-only deliverable has a reviewable Issue comment or attachment instead.
- The Issue and Project Status reflect the real outcome. Review automatic Project workflows rather than assuming that closing an Issue sets the intended custom Status.

At the end of an iteration, count only accepted work as `Concluído`. Replan unfinished Issues into another iteration and record any blocker or remaining work. Do not infer completion from a branch, an open PR, or a checked box alone.

## Current tooling and a practical first example

At the time of this guide, the repository's `main` contains project documentation and has no established root `package.json` test commands or active PR history. Read the repository again when starting work: tooling and checks will evolve. GitHub reported `main` as unprotected when this guide was drafted, so the peer-review practice described here is a team agreement rather than a verified GitHub-enforced merge requirement. Branch protection and required checks can be added later if the team chooses to enforce them.

For [#30 — Open a deck](https://github.com/fatecrl-ite004/Flashcard-App/issues/30), a typical path is: assign an owner and iteration → `A fazer` → begin `feat/30-open-deck` → `Em andamento` → complete the main work and author checks → `Pronto` → begin PR review with the other team member → `Em revisão` → merge after acceptance → confirm `Concluído`. For an external-only UX Task, use the same statuses and replace the branch/PR steps with links, attachments, and a reviewed completion comment.

> **Project configuration note:** the Status order and use of Iteração are confirmed by the project owner. This guide does not assume that Project automations or branch-protection rules have been enabled; check the live Project's **Workflows** settings before relying on automatic Status changes.
