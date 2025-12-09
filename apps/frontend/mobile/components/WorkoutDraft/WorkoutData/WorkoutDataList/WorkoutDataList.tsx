import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutDataItemContainer from './WorkoutDataItem';

export default function WorkoutDataList() {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  const workoutDataItems = workoutData.map((item, i) => {
    return <WorkoutDataItemContainer key={item.id} item={item} />;
  });

  return <>{workoutDataItems}</>;
}
