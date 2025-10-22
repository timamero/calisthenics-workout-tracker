import { Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Mode } from '@cwt/schema/workouts';

import EmptyWorkoutPlaceholder from './EmptyWorkoutPlaceholder';
// import WorkoutExerciseList from './WorkoutExerciseList';
import ConfirmationOverlay from '../../common/ConfirmationOverlay';
import WorkoutDataList from './WorkoutDataList';

export default function WorkoutData() {
  // const [deleteExOverlayOpened, deleteExOverlayHandler] = useDisclosure(false);
  const [deleteRootItemOverlayOpened, deleteRootItemOverlayHandler] =
    useDisclosure(false);
  const [deleteSetOverlayOpened, deleteSetOverlayHandler] =
    useDisclosure(false);

  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;

  const workoutExercisesLength = useWorkoutDraftStore(
    (state) => state.workoutData,
  ).length;
  const selectedExerciseIndexToMod = useWorkoutDraftStore(
    (state) => state.selectedExerciseIndexToMod,
  );
  const exerciseIDToMod = useWorkoutDraftStore(
    (state) => state.exerciseIDToMod,
  );
  const sectionIDToMod = useWorkoutDraftStore((state) => state.sectionIDToMod);
  const supersetIDToMod = useWorkoutDraftStore(
    (state) => state.supersetIDToMod,
  );

  // const rootItemIDToMod = exerciseIDToMod
  //   ? exerciseIDToMod
  //   : sectionIDToMod
  //     ? sectionIDToMod
  //     : supersetIDToMod;

  const deleteItem = useWorkoutDraftStore((state) => state.removeRootItem);
  const deleteSet = useWorkoutDraftStore((state) => state.deleteSet);

  // const handleDeleteItem = () => {
  //   console.log('root')
  //   deleteItem(rootItemIDToMod!);
  // };

  if (!workoutData) {
    return <Text>Loading</Text>;
  }

  return (
    <Stack gap="xl" align="center">
      {workoutExercisesLength === 0 && <EmptyWorkoutPlaceholder mode={mode} />}
      <WorkoutDataList
        deleteRootItemOverlayHandler={deleteRootItemOverlayHandler}
        deleteSetOverlayHandler={deleteSetOverlayHandler}
      />
      {/* <WorkoutExerciseList
        deleteExOverlayHandler={deleteExOverlayHandler}
        deleteSetOverlayHandler={deleteSetOverlayHandler}
      /> */}
      <ConfirmationOverlay
        title={`Delete ${exerciseIDToMod ? 'Exercise' : supersetIDToMod ? 'Superset' : 'Section'}`}
        message={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'} from this workout?`}
        confirmButtonLabel={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'}`}
        opened={deleteRootItemOverlayOpened}
        handler={deleteRootItemOverlayHandler}
        onConfirmationClick={() =>
          deleteItem(
            exerciseIDToMod
              ? exerciseIDToMod!
              : supersetIDToMod
                ? supersetIDToMod!
                : sectionIDToMod!,
          )
        }
      />
      {/* <ConfirmationOverlay
        title="Delete Exercise"
        message="Delete exercise from this workout?"
        confirmButtonLabel="Delete exercise"
        opened={deleteExOverlayOpened}
        handler={deleteExOverlayHandler}
        onConfirmationClick={() => deleteExercise(exerciseIDToMod!)}
      /> */}
      <ConfirmationOverlay
        title="Delete Set"
        message="Delete set from this exercise?"
        confirmButtonLabel="Delete"
        opened={deleteSetOverlayOpened}
        handler={deleteSetOverlayHandler}
        onConfirmationClick={() => deleteSet(selectedExerciseIndexToMod!)}
      />
    </Stack>
  );
}
