import { useWorkoutDraftStore } from '@cwt/state/stores';

// import type { UseDisclosureHandlers } from '@mantine/hooks';

// import { WorkoutDataContext } from '../../../../contexts/WorkoutDataContext';
// import { WorkoutDataContainer as WorkoutData } from './WorkoutData';

// interface WorkoutExerciseListProps {
//   deleteExOverlayHandler: UseDisclosureHandlers;
//   deleteSetOverlayHandler: UseDisclosureHandlers;
// }

export default function WorkoutDataList() {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  const workoutExercises = workoutData.map((ex) => {
    // console.log('exercise: ', JSON.stringify(ex));
    if (ex.type !== 'exercise') return null;
    // console.log('return exercises');
    return (
      // <WorkoutExerciseContext.Provider
      //   key={ex.id}
      //   value={{
      //     workoutExercise: ex,
      //     exerciseIndex: i,
      //     deleteExOverlayHandler: deleteExOverlayHandler,
      //     deleteSetOverlayHandler: deleteSetOverlayHandler,
      //   }}
      // >
      <div>workout data placeholder</div>
      // </WorkoutExerciseContext.Provider>
    );
  });
  return <>{workoutExercises}</>;
}
