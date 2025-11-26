import type { Superset } from '@cwt/schema/workouts';

interface ExerciseSetGroupProps {
  superset: Superset;
}

export default function ExerciseSetGroup({ superset }: ExerciseSetGroupProps) {
  console.log('ExerciseSetGroup - superset', superset);
  return <div>map over ExerciseSetGroupItemContainers</div>;
}
