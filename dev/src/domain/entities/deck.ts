export const DEFAULT_DESIRED_RETENTION = 0.9;

export interface Deck {
  readonly id: string;
  readonly name: string;
  readonly desiredRetention: number;
}

export interface CreateDeckInput {
  readonly id: string;
  readonly name: string;
  readonly desiredRetention?: number;
}

export function createDeck(input: CreateDeckInput): Deck {
  assertNonBlank(input.id, "Deck id");
  assertNonBlank(input.name, "Deck name");

  const desiredRetention =
    input.desiredRetention ?? DEFAULT_DESIRED_RETENTION;

  assertValidDesiredRetention(desiredRetention);

  return {
    id: input.id,
    name: input.name,
    desiredRetention,
  };
}

/**
 * This is only the technical FSRS range for now.
 * A narrower product/UX range can be decided after later experiments.
 */
export function assertValidDesiredRetention(value: number): void {
  if (!Number.isFinite(value) || value <= 0 || value > 1) {
    throw new RangeError("Desired retention must be in the range (0, 1].");
  }
}

function assertNonBlank(value: string, field: string): void {
  if (value.trim().length === 0) {
    throw new TypeError(`${field} must not be blank.`);
  }
}
