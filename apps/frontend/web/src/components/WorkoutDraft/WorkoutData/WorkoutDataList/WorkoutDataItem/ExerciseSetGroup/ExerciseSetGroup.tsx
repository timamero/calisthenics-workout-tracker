import type { Exercise, Superset } from '@cwt/schema/workouts';

interface ExerciseSetGroupProps {
  superset: Superset;
}

type ExercisesGroupedBySetsType = {
  setGroupNumber: number;
  exercises: Exercise[];
};

export default function ExerciseSetGroup({ superset }: ExerciseSetGroupProps) {
  console.log('ExerciseSetGroup - superset', superset);
  const exercisesGroupedBySets = groupExercisesBySet(superset);
  console.log(
    'ExerciseSetGroup - exercisesGroupedBySets',
    exercisesGroupedBySets,
  );
  return <div>map over ExerciseSetGroupItemContainers</div>;
}

function groupExercisesBySet(superset: Superset): ExercisesGroupedBySetsType[] {
  const exercises = superset.exercises;

  // Check that all exercises have the same number of sets
  if (
    !exercises.map((ex) => ex.sets.length).every((l, _, arr) => l === arr[0])
  ) {
    console.warn('Warning: Exercises have different number of sets');
  }

  const numOfSets = exercises[0].sets.length;

  const exercisesGroupedBySets: ExercisesGroupedBySetsType[] = [];
  for (let i = 0; i < numOfSets; i++) {
    const group: ExercisesGroupedBySetsType = {
      setGroupNumber: i,
      exercises: [],
    };
    exercises.forEach((ex: Exercise) => {
      group.exercises.push(ex);
    });

    exercisesGroupedBySets.push(group);
  }

  return exercisesGroupedBySets;
}
