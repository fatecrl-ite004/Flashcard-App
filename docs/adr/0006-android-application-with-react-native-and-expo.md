# ADR 0006 — Android Application with React Native and Expo

- **ADR number:** 0006
- **Title:** Android Application with React Native and Expo
- **Date:** 2026-10-28
- **Owner:** Enzo
- **Status:** Proposed

## Context

Flashcard App targets Android smartphones for the required TCC delivery. Its study behavior must work offline, preserve locally stored progress, and remain accessible and understandable to users. The domain is being explored in pure TypeScript before the application shell is introduced.

The initial context recovered from the ChatGPT conversation “Flashcard-Domain-Lab” establishes React Native/TypeScript as the intended application direction and keeps the domain exploration independent of Expo, Android, and storage. The user has now reaffirmed using Expo's cloud build service and clarified the intended workflow: install a native development build, then make ordinary local code changes without recompiling that binary on EAS each time.

ADR 0001 proposes domain and application boundaries, ADR 0003 defines the session lifecycle, and ADR 0005 records the selected `expo-sqlite` integration. The repository has no adopted Expo application configuration, EAS configuration, SDK version, or generated Android artifact yet.

The specification currently calls the delivery an Android development build. A development workflow using Metro and an independently runnable offline evaluation artifact need distinct acceptance checks. This ADR proposes a profile distinction for review; the delivery terminology in RNF-009 requires user confirmation before it is changed.

## Decision

Use React Native with TypeScript and Expo for the Android application, generate native builds through EAS Build in the cloud, and reuse an installed development build during local JavaScript/TypeScript iteration.

1. **Use Expo as the application platform around the existing study core.** React Native implements the interface, application use cases coordinate study operations, and native integrations remain behind infrastructure boundaries. The same independently testable TypeScript domain serves scenarios and the application. The selected `expo-sqlite` integration supplies local persistence through the boundary defined in ADR 0005. Platform lifecycle events reach application coordination without becoming domain dependencies.

2. **Generate native application binaries through cloud EAS Build.** This is the selected regular compilation workflow for Android. EAS is a hosted build service for Expo and React Native applications; see the [EAS Build introduction](https://docs.expo.dev/build/introduction/). Build creation and download require developer access to the service, while installed study behavior remains governed by the offline requirements. Cloud compilation does not make a backend or account part of the user's study experience.

3. **Reuse the development binary for local iteration.** With a compatible development build installed, ordinary JavaScript/TypeScript changes are served from local Metro without another EAS native build. Rebuild when the native code or native configuration changes, including relevant SDK or native dependency changes. This workflow follows [Expo's development-build guidance](https://docs.expo.dev/develop/development-builds/use-development-builds/). Reusing a binary does not automatically update the embedded code of a separately distributed APK.

4. **Provide a development profile for programming.** The proposed `development` profile uses `expo-dev-client` and internal Android distribution. It supports local iteration and native integration debugging. Running code supplied by Metro is appropriate for that workflow, but does not by itself validate independent offline delivery. Expo describes development and preview profiles in its [build-profile documentation](https://docs.expo.dev/build/eas-json/).

5. **Propose a separate offline evaluation profile.** In addition to development iteration, this draft proposes an internally distributed Android APK with the application JavaScript and required assets included, suitable for installation and evaluation without Metro. The profile name and exact settings will be defined during application setup. This proposal needs confirmation alongside RNF-009's delivery wording. Its acceptance check must include a fresh launch without a development server or network, followed by the required study workflows and restart validation. Expo documents [directly installable Android APKs](https://docs.expo.dev/build-reference/apk/) and [internal distribution](https://docs.expo.dev/build/internal-distribution/).

6. **Keep build configuration explicit and reviewable.** When application setup is authorized, record the selected compatible React Native and Expo versions, adopted dependency lockfile, native configuration, and EAS profile definitions in the repository. Relate each distributed evaluation artifact to its source revision and profile so research and technical evidence identify what was tested. Concrete package versions, Android identifiers, signing arrangements, native-project generation, and supported device levels remain setup decisions.

7. **Validate on the actual Android artifact.** Pure domain scenarios validate business calculations. The installed application must additionally validate native persistence, import access, background and restart behavior, accessibility, and the 200 ms flip animation. An emulator may support development; the smartphone scope and offline delivery checks remain part of the required validation. Successful cloud compilation alone does not verify these behaviors.

The EAS choice covers native build generation. It does not adopt EAS Update, automated store publication, cloud study-data storage, or an automatic build on every commit. UI routing, presentation state tools, exact build profiles, and executable commands will be documented when those parts of the application are introduced. Current domain exploration continues without creating the Expo project or running cloud builds.

## Rationale

- **Continuity with the existing work:** The application can consume the TypeScript domain and its `ts-fsrs` integration through the boundaries already discussed.
- **Chosen development environment:** Expo provides the application environment for the user-selected native persistence integration and Android workflow.
- **Cloud compilation:** EAS matches the user's decision to generate native binaries through Expo's cloud service.
- **Efficient local iteration:** Reusing the native development build keeps routine JavaScript and interface work from requiring another native compilation.
- **Clear delivery evidence:** Distinguishing developer iteration from offline artifact validation makes the TCC's installation and study requirements testable.
- **Preserved product scope:** Developer build services support producing the application while the required study data and workflows remain local.

## Alternatives Considered

- **Compile Android binaries locally as the regular workflow.** This remains a possible technical approach, but the user has selected cloud EAS Build. The project does not require local native compilation for the chosen regular workflow.
- **Run a cloud build for every JavaScript/TypeScript change.** This repeatedly recompiles a compatible native environment and consumes build capacity without being required by the selected development workflow.
- **Use Expo Go as the only application artifact.** It can support exploration, but does not supply the project-owned installable Android artifact required for delivery and native integration validation.
- **Build a separate native Android application.** This would require a separate integration approach for the existing TypeScript study core and its scheduling library, with no demonstrated need in the current scope.
- **Use the Metro-backed development workflow as the only delivery evidence.** This demonstrates interactive development, but does not establish that the installed application launches and completes the study workflows independently offline.

## Consequences

- Native changes require a new compatible binary; ordinary local JavaScript/TypeScript iteration can reuse the development build. The team must distinguish those changes when planning cloud builds.
- Cloud compilation depends on service availability and the developer account's actual build allowance. Check the [current EAS limits](https://expo.dev/pricing) when planning usage; a fixed monthly quota is not an architectural guarantee.
- Local Metro iteration still needs a running development server. Cloud compilation does not host the changing local JavaScript application during that workflow.
- The proposed offline evaluation profile and corresponding RNF-009 wording remain the open delivery clarification in this draft. The current specification remains authoritative until that clarification is approved.
- Application setup must establish reproducible configuration and an artifact record before formal user evaluation. Platform and native integration checks complement the domain scenarios.
- No cloud build, dependency installation, account configuration, or artifact distribution is performed by this documentation decision. Runtime behavior and offline delivery remain unverified until the corresponding application exists and is tested.

## References

- [ADR 0001 — Pure TypeScript Domain and FSRS Integration Boundary](0001-pure-typescript-domain.md): application and infrastructure responsibilities; currently Proposed.
- [ADR 0003 — Session and Round Lifecycle](0003-session-and-round-lifecycle.md): background continuity and process termination; currently Proposed.
- [ADR 0005 — Local Persistence and Data Evolution](0005-local-persistence-and-data-evolution.md): the selected `expo-sqlite` integration; currently Proposed.
- [Project overview](../project-overview.md): Android smartphone delivery and offline scope.
- [System specification](../system-specification.md): RNF-001–RNF-009 and the required local study workflows.
- [Agent instructions](../../AGENTS.md): current domain exploration and infrastructure isolation.
- [“Flashcard-Domain-Lab” — ChatGPT conversation](https://chatgpt.com/c/6a878967-6b08-83e9-b8e7-9650ac6f0d3f): historical TypeScript/React Native direction and attached domain-exploration context; current requirements take precedence over earlier exploratory details.
- [EAS Build](https://docs.expo.dev/build/introduction/), [development-build workflow](https://docs.expo.dev/develop/development-builds/use-development-builds/), [build profiles](https://docs.expo.dev/build/eas-json/), and [Android APK distribution](https://docs.expo.dev/build-reference/apk/): official workflow references, consulted 2026-10-28.
- [Expo pricing](https://expo.dev/pricing): current public build allowances, consulted 2026-10-28; account usage and future quotas are not established by this ADR.
- [ADR conventions](README.md): record structure and preservation of decision history.
