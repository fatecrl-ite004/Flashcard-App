export type CardLearningState =
  | "new"
  | "learning"
  | "review"
  | "relearning";

/**
 * The scheduling data our application owns.
 *
 * Names are intentionally independent from ts-fsrs. Deprecated library fields,
 * such as elapsed_days, do not become part of our persisted domain model.
 */
export interface SchedulingState {
  readonly due: Date;
  readonly stability: number;
  readonly difficulty: number;
  readonly scheduledDays: number;
  readonly learningStep: number;
  readonly repetitions: number;
  readonly lapses: number;
  readonly state: CardLearningState;
  readonly lastReviewedAt?: Date;
}

export interface Card {
  readonly id: string;
  readonly deckId: string;
  readonly front: string;
  readonly back: string;
  readonly scheduling: SchedulingState;
}

export interface CreateCardInput {
  readonly id: string;
  readonly deckId: string;
  readonly front: string;
  readonly back: string;
}

export function createCard(input: CreateCardInput, createdAt: Date): Card {
  assertNonBlank(input.id, "Card id");
  assertNonBlank(input.deckId, "Deck id");
  assertNonBlank(input.front, "Card front");
  assertNonBlank(input.back, "Card back");
  assertValidDate(createdAt, "Card creation date");

  return {
    ...input,
    scheduling: {
      due: copyDate(createdAt),
      stability: 0,
      difficulty: 0,
      scheduledDays: 0,
      learningStep: 0,
      repetitions: 0,
      lapses: 0,
      state: "new",
    },
  };
}

export function copySchedulingState(
  scheduling: SchedulingState,
): SchedulingState {
  return {
    ...scheduling,
    due: copyDate(scheduling.due),
    ...(scheduling.lastReviewedAt
      ? { lastReviewedAt: copyDate(scheduling.lastReviewedAt) }
      : {}),
  };
}

export function assertValidDate(value: Date, field: string): void {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    throw new TypeError(`${field} must be a valid Date.`);
  }
}

function copyDate(value: Date): Date {
  return new Date(value.getTime());
}

function assertNonBlank(value: string, field: string): void {
  if (value.trim().length === 0) {
    throw new TypeError(`${field} must not be blank.`);
  }
}
