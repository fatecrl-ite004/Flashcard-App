export const REVIEW_RATINGS = ["again", "hard", "good", "easy"] as const;

export type ReviewRating = (typeof REVIEW_RATINGS)[number];
