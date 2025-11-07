import { useWorkoutDraftStore } from '@cwt/state/stores';

import { Text } from '../../../../customText';

export default function WorkoutDataList() {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  const workoutDataItems = workoutData.map((item, i) => {
    return <Text key={i}>item</Text>;
  });

  return <>{workoutDataItems}</>;
}
