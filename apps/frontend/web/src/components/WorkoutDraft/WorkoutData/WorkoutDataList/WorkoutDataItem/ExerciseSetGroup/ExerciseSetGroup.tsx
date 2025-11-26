import type { Exercise, Set, Superset } from '@cwt/schema/workouts';

interface ExerciseSetGroupProps {
  superset: Superset;
}

type ExerciseInSetGroupType = Pick<
  Exercise,
  'exercise_id' | 'id' | 'tracked'
> & { set: Set };

type ExercisesGroupedBySetsType = {
  setGroupNumber: number;
  exercises: ExerciseInSetGroupType[];
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
      const exerciseInSetGroup: ExerciseInSetGroupType = {
        exercise_id: ex.exercise_id,
        id: ex.id,
        tracked: ex.tracked,
        set: ex.sets[i],
      };
      group.exercises.push(exerciseInSetGroup);
    });

    exercisesGroupedBySets.push(group);
  }

  return exercisesGroupedBySets;
}
