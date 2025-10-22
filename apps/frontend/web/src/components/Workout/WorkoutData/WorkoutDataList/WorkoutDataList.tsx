import { useWorkoutDraftStore } from '@cwt/state/stores';

// import type { UseDisclosureHandlers } from '@mantine/hooks';

// import { WorkoutDataContext } from '../../../../contexts/WorkoutDataContext';
import { WorkoutDataItemContainer } from './WorkoutDataItem';
// import { WorkoutDataItemContainer as WorkoutDataItem } from './WorkoutDataItem';

// interface WorkoutDataListProps {
//   deleteRootItemOverlayHandler: UseDisclosureHandlers;
//   deleteSetOverlayHandler: UseDisclosureHandlers;
// }

export default function WorkoutDataList() {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  const workoutDataItems = workoutData.map((item) => {
    return (
      // <WorkoutDataContext.Provider
      //   key={item.id}
      //   value={{
      //     item: item,
      //     deleteRootItemOverlayHandler: deleteRootItemOverlayHandler,
      //     deleteSetOverlayHandler: deleteSetOverlayHandler,
      //   }}
      // >
      <WorkoutDataItemContainer item={item} />
      // </WorkoutDataContext.Provider>
    );
  });
  return <>{workoutDataItems}</>;
}
