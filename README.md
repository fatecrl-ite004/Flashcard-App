# Flashcard App

Flashcard App is a free Android flashcard application under development. It aims to simplify studying with spaced repetition using **FSRS v6** through [`ts-fsrs`](https://github.com/open-spaced-repetition/ts-fsrs), with local storage and offline access to essential study features.

The application is being developed as a college final project (**TCC**) for the Internet Systems program at **Fatec Rubens Lara**, in Santos, São Paulo, Brazil. The project investigates how UI and UX can reduce the perceived complexity of spaced repetition while keeping useful scheduling information understandable and accessible.

## Current status

> **Early development — no runnable Android application is available yet.**

Current implementation work focuses on exploring `ts-fsrs` and developing the core domain in pure TypeScript. The React Native/Expo application environment has not been set up, and no Android development build is available.

Phase 1 defines the required TCC delivery. Its planned features include JSON deck import, a local deck library, offline reviews, FSRS scheduling, study preferences, and preservation of review progress. These are delivery goals and must not be interpreted as features already available in this repository.

See the [project overview](./docs/project-overview.md) for scope and delivery phases, and the [system specification](./docs/system-specification.md) for detailed requirements and their statuses.

## Source code and repository structure

The current development source is maintained on the [`dev` branch](https://github.com/fatecrl-ite004/Flashcard-App/tree/dev), inside the [`dev/` directory](./dev/). The branch and the directory share the same name.

```text
Flashcard-App/
├── dev/                        # Initial TypeScript implementation
│   ├── src/
│   │   ├── application/        # Application layer placeholder
│   │   ├── domain/
│   │   │   ├── entities/       # Card and deck entities
│   │   │   └── review/         # Review ratings and FSRS integration
│   │   └── infra/              # Infrastructure placeholders
│   ├── package.json            # Domain exploration dependencies and scripts
│   ├── package-lock.json       # Dependency lockfile
│   └── tsconfig.json           # TypeScript configuration
├── docs/                       # Project documentation
│   ├── adr/                    # Architectural decision records
│   ├── architecture/           # Architecture documentation
│   ├── research/               # Research and supporting evidence
│   ├── use-cases/              # Detailed use cases
│   └── ux/                     # Screen inventories and flow-design material
├── AGENTS.md                   # Repository guidance for coding agents
├── LICENSE
└── README.md
```

Some files and directories are placeholders for future work. Their presence does not indicate a completed application layer, persistence implementation, or interface.

## Application prototype

The [original application prototype on Figma](https://www.figma.com/design/M205FZxJyTh5MPDG9vN6Zf/Flashcard-App--Original--Antigo-) is available as a design reference.

**The Android prototype aligned with Phase 1 of the TCC is under development** in the [Android Figma file](https://www.figma.com/design/iu8EH2Uky9EOuJXkceBKvU/Flashcard-App). The original prototype may differ from the current scope; consult the project specification for the current requirements.

The [Phase 1 design handoff](./docs/ux/phase-1-figma-handoff.md) documents the planned flows, screen coverage, and remaining validation work.

## Project documentation

Documentation is maintained in [`docs/`](./docs/README.md):

| Reference | Contents |
| --- | --- |
| [Project overview](./docs/project-overview.md) | Purpose, audience, goals, scope, and delivery phases |
| [System specification](./docs/system-specification.md) | Functional requirements, business rules, and non-functional requirements |
| [Use cases](./docs/use-cases/) | User flows, alternate paths, and expected behavior |
| [Architecture](./docs/architecture/) | Domain, persistence, and interface design |
| [Architectural decision records](./docs/adr/README.md) | Proposed and accepted technical decisions, with their rationale and status |
| [Research](./docs/research/) | Technical exploration and supporting evidence |
| [UX material](./docs/ux/) | Screen inventories, navigation flows, and prototype handoff |
| [Development workflow](./docs/development-workflow.md) | Development process and project conventions |

Documentation is evolving alongside the implementation. Some documents and diagrams are still placeholders.

## Requirements to run the application

**Application prerequisites are not available yet.** The supported development environment, tool versions, device or emulator requirements, and build requirements will be documented when the React Native/Expo application environment is established.

The existing TypeScript domain files do not provide a runnable Android application.

## Configuration and installation

**Application configuration files and installation instructions are not available yet.**

The files currently present in `dev/` — `package.json`, `package-lock.json`, and `tsconfig.json` — support the initial TypeScript work. They do not constitute the React Native/Expo application setup.

Environment setup, required application configuration, build generation, installation, and launch instructions will be added when the first runnable application version is available.

## License

This project is distributed under the [MIT License](./LICENSE).

