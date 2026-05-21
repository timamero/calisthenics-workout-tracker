import type { BadgeExtendedVariants } from '../types';

export function getDifficultyVariant(
  difficulty: string,
): BadgeExtendedVariants {
  return difficulty == 'beginner'
    ? 'outline-lime'
    : difficulty == 'intermediate'
      ? 'outline-teal'
      : 'outline-violet-dark';
}
