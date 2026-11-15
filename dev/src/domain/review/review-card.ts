import {
  fsrs,
  Rating,
  State,
  type Card as FsrsCard,
  type Grade,
} from "ts-fsrs";

import {
  assertValidDate,
  copySchedulingState,
  type Card,
  type CardLearningState,
  type SchedulingState,
} from "../entities/card";
import {
  assertValidDesiredRetention,
  type Deck,
} from "../entities/deck";
import type { ReviewRating } from "./review-rating";

export interface ReviewCardCommand {
  readonly deck: Deck;
  readonly card: Card;
  readonly rating: ReviewRating;
  readonly reviewedAt: Date;
}

export interface ReviewTransition {
  readonly cardId: string;
  readonly rating: ReviewRating;
  readonly reviewedAt: Date;
  readonly before: SchedulingState;
  readonly after: SchedulingState;
}

export interface ReviewCardResult {
  readonly card: Card;
  readonly review: ReviewTransition;
}

const FSRS_RATING_BY_DOMAIN_RATING = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
} as const satisfies Record<ReviewRating, Grade>;

const FSRS_STATE_BY_DOMAIN_STATE = {
  new: State.New,
  learning: State.Learning,
  review: State.Review,
  relearning: State.Relearning,
} as const satisfies Record<CardLearningState, State>;

/**
 * Applies one chosen review rating and returns a new Card.
 * The input Card is never mutated.
 */
export function reviewCard(command: ReviewCardCommand): ReviewCardResult {
  const { deck, card, rating, reviewedAt } = command;

  assertReviewCommand(command);

  // fsrs(partialParameters) fills every other parameter with library defaults.
  const scheduler = fsrs({
    request_retention: deck.desiredRetention,
  });

  const result = scheduler.next(
    toFsrsCard(card.scheduling),
    reviewedAt,
    FSRS_RATING_BY_DOMAIN_RATING[rating],
  );

  const before = copySchedulingState(card.scheduling);
  const after = fromFsrsCard(result.card);
  const reviewedAtCopy = new Date(reviewedAt.getTime());

  return {
    card: {
      ...card,
      scheduling: after,
    },
    review: {
      cardId: card.id,
      rating,
      reviewedAt: reviewedAtCopy,
      before,
      after: copySchedulingState(after),
    },
  };
}

function assertReviewCommand(command: ReviewCardCommand): void {
  const { deck, card, reviewedAt } = command;

  assertValidDesiredRetention(deck.desiredRetention);
  assertValidDate(reviewedAt, "Review date");

  if (card.deckId !== deck.id) {
    throw new Error(
      `Card "${card.id}" belongs to deck "${card.deckId}", not "${deck.id}".`,
    );
  }

  const lastReviewedAt = card.scheduling.lastReviewedAt;
  if (lastReviewedAt && reviewedAt.getTime() < lastReviewedAt.getTime()) {
    throw new RangeError("Review date cannot be before the previous review.");
  }
}

function toFsrsCard(scheduling: SchedulingState): FsrsCard {
  return {
    due: new Date(scheduling.due.getTime()),
    stability: scheduling.stability,
    difficulty: scheduling.difficulty,

    // Required by ts-fsrs 5.4.1, but recomputed from last_review on every
    // scheduling operation and already deprecated for the next package major.
    elapsed_days: 0,

    scheduled_days: scheduling.scheduledDays,
    learning_steps: scheduling.learningStep,
    reps: scheduling.repetitions,
    lapses: scheduling.lapses,
    state: FSRS_STATE_BY_DOMAIN_STATE[scheduling.state],
    ...(scheduling.lastReviewedAt
      ? { last_review: new Date(scheduling.lastReviewedAt.getTime()) }
      : {}),
  };
}

function fromFsrsCard(card: FsrsCard): SchedulingState {
  return {
    due: new Date(card.due.getTime()),
    stability: card.stability,
    difficulty: card.difficulty,
    scheduledDays: card.scheduled_days,
    learningStep: card.learning_steps,
    repetitions: card.reps,
    lapses: card.lapses,
    state: fromFsrsState(card.state),
    ...(card.last_review
      ? { lastReviewedAt: new Date(card.last_review.getTime()) }
      : {}),
  };
}

function fromFsrsState(state: State): CardLearningState {
  switch (state) {
    case State.New:
      return "new";
    case State.Learning:
      return "learning";
    case State.Review:
      return "review";
    case State.Relearning:
      return "relearning";
    default:
      throw new Error(`Unsupported ts-fsrs card state: ${String(state)}`);
  }
}
