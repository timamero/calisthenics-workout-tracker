import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sampleExercises = [
  {
    id: 1,
    name: 'Standard Push-Up',
    target_muscles: ['chest', 'triceps', 'shoulders'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['push', 'upper'],
  },
  {
    id: 2,
    name: 'Knee Push-Up',
    target_muscles: ['chest', 'triceps', 'shoulders'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['push', 'upper'],
  },
  {
    id: 3,
    name: 'Incline Push-Up',
    target_muscles: ['chest', 'triceps', 'shoulders'],
    required_equipment: ['bar'],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['push', 'upper'],
  },
  {
    id: 4,
    name: 'Decline Push-Up',
    target_muscles: ['chest', 'triceps', 'shoulders'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['push', 'upper'],
  },
  {
    id: 5,
    name: 'Diamond Push-Up',
    target_muscles: ['triceps', 'chest', 'shoulders'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['push', 'upper'],
  },
  {
    id: 6,
    name: 'Archer Push-Up',
    target_muscles: ['chest', 'triceps', 'shoulders'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'advanced',
    tags: ['push', 'upper'],
  },
  {
    id: 7,
    name: 'Pike Push-Up',
    target_muscles: ['shoulders', 'triceps'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['push', 'upper'],
  },
  {
    id: 8,
    name: 'Wall Handstand Push-Up (Assisted)',
    target_muscles: ['shoulders', 'triceps'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'advanced',
    tags: ['push', 'upper'],
  },
  {
    id: 9,
    name: 'Squat',
    target_muscles: ['quadriceps', 'glutes', 'hamstrings'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['leg day', 'lower'],
  },
  {
    id: 10,
    name: 'Lunge',
    target_muscles: ['quadriceps', 'glutes', 'hamstrings'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['leg day', 'lower'],
  },
  {
    id: 11,
    name: 'Bulgarian Split Squat',
    target_muscles: ['quadriceps', 'glutes', 'hamstrings'],
    required_equipment: ['bench'],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['leg day', 'lower'],
  },
  {
    id: 12,
    name: 'Pistol Squat (Assisted)',
    target_muscles: ['quadriceps', 'glutes', 'hamstrings'],
    required_equipment: ['resistance bands'],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['leg day', 'lower'],
  },
  {
    id: 13,
    name: 'Calf Raise',
    target_muscles: ['calf'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['leg day', 'lower'],
  },
  {
    id: 14,
    name: 'Glute Bridge',
    target_muscles: ['glutes', 'hamstrings', 'lower back'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['lower'],
  },
  {
    id: 15,
    name: 'Single-Leg Glute Bridge',
    target_muscles: ['glutes', 'hamstrings', 'lower back'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['lower'],
  },
  {
    id: 16,
    name: 'Plank',
    target_muscles: ['abs', 'obliques', 'lower back'],
    required_equipment: [],
    emphasis: 'endurance',
    difficulty: 'beginner',
    tags: ['core'],
  },
  {
    id: 17,
    name: 'Side Plank',
    target_muscles: ['obliques', 'abs'],
    required_equipment: [],
    emphasis: 'endurance',
    difficulty: 'beginner',
    tags: ['core'],
  },
  {
    id: 18,
    name: 'Crunches',
    target_muscles: ['abs'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['core'],
  },
  {
    id: 19,
    name: 'Leg Raises',
    target_muscles: ['abs'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['core'],
  },
  {
    id: 20,
    name: 'Flutter Kicks',
    target_muscles: ['abs'],
    required_equipment: [],
    emphasis: 'endurance',
    difficulty: 'intermediate',
    tags: ['core'],
  },
  {
    id: 21,
    name: 'V-Ups',
    target_muscles: ['abs', 'obliques', 'full body'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'advanced',
    tags: ['core', 'full body'],
  },
];

export const Route = createFileRoute('/library')({
  component: LibraryView,
});

function LibraryView() {
  return (
    <div>
      <Title>Library Page</Title>
      <p>
        This page will be the hub for exercises, progressions and progression
        exercises.
      </p>
    </div>
  );
}
