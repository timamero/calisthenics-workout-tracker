import { useWorkoutDraftStore } from '@cwt/state/stores';

import type { UseDisclosureHandlers } from '@mantine/hooks';

import { WorkoutDataContext } from '../../../../contexts/WorkoutDataContext';
// import { WorkoutDataContainer as WorkoutData } from './WorkoutData';

interface WorkoutDataListProps {
  deleteItemOverlayHandler: UseDisclosureHandlers;
  deleteSetOverlayHandler: UseDisclosureHandlers;
}

export default function WorkoutDataList({
  deleteItemOverlayHandler,
  deleteSetOverlayHandler,
}: WorkoutDataListProps) {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  const workoutDataItems = workoutData.map((item) => {
    return (
      <WorkoutDataContext.Provider
        key={item.id}
        value={{
          item: item,
          deleteItemOverlayHandler: deleteItemOverlayHandler,
          deleteSetOverlayHandler: deleteSetOverlayHandler,
        }}
      >
        <div>workout data placeholder</div>
      </WorkoutDataContext.Provider>
    );
  });
  return <>{workoutDataItems}</>;
}
