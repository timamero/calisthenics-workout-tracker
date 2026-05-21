export function getDifficultyVariant(difficulty: string) {
  return difficulty == 'beginner'
    ? 'outline-lime'
    : difficulty == 'intermediate'
      ? 'outline-teal'
      : 'outline-violet-dark';
}
