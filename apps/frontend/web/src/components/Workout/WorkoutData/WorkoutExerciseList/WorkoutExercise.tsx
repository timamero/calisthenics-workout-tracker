import * as React from 'react';
import { Stack, Text, Button, Group } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { WorkoutExercise } from '@cwt/schema/workouts';

import { WorkoutExerciseContext } from '../../../../contexts/WorkoutExerciseContext';
import Sets from './Sets';
// import ConfirmationOverlay from '../../../common/ConfirmationOverlay';

// interface WorkoutExerciseProps {
//   exerciseIndex: number;
//   workoutExercise: WorkoutExercise;
// }

export default function WorkoutExercise() {
  const exerciseIndex: number = React.useContext(
    WorkoutExerciseContext,
  )!.exerciseIndex;
  const workoutExercise: WorkoutExercise = React.useContext(
    WorkoutExerciseContext,
  )!.workoutExercise;
  const deleteExOverlayHandler = React.useContext(
    WorkoutExerciseContext,
  )!.deleteExOverlayHandler;

  const addSet = useWorkoutDraftStore((state) => state.addSet);
  const setSelectedExerciseIndexToDel = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIndexToMod,
  );
  // const deleteExercise = useWorkoutDraftStore((state) => state.removeExercise);
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );
  const name = getExerciseNameById(workoutExercise.exercise_id);

  // const [deleteExOverlayOpened, deleteExOverlayHandler] = useDisclosure(false);
  const handleDeleteExerciseClick = () => {
    setSelectedExerciseIndexToDel(exerciseIndex);
    deleteExOverlayHandler.open();
  };

  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Group>
        <Text>{name}</Text>
        <Button
          color="red"
          variant="white"
          onClick={() => handleDeleteExerciseClick()}
        >
          Delete
        </Button>
      </Group>
      <Sets
        tracked={workoutExercise.tracked}
        sets={workoutExercise.sets}
        exerciseIndex={exerciseIndex}
      />
      <Button
        variant="outline"
        color="dark"
        onClick={() => addSet(exerciseIndex)}
      >
        Add Set
      </Button>
      {/* <ConfirmationOverlay
        title="Delete Exercise"
        message="Delete exercise from this workout?"
        confirmButtonLabel="Delete exercise"
        opened={deleteExOverlayOpened}
        handler={deleteExOverlayHandler}
        onConfirmationClick={() => deleteExercise(exerciseIndex)}
      /> */}
    </Stack>
  );
}
