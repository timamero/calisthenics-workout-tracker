import { useState } from 'react';
import { Stack, Text, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import type { WorkoutExercise } from '@cwt/schema/workouts';
import type { Set } from '@cwt/schema/workouts';
import { useStore } from '@cwt/state/store';

import RepField from './RepField';
import TimeField from './TimeField';
import RestField from './RestField';
import ConfirmationOverlay from '../common/ConfirmationOverlay';

export default function Sets({
  tracked,
  sets,
  exerciseIndex,
}: Pick<WorkoutExercise, 'sets' | 'tracked'> & { exerciseIndex: number }) {
  const [selectedSetIndex, setSelectedSetIndex] = useState<number | null>(null);

  const workout = useStore((state) => state.workout);
  const deleteSet = useStore((state) => state.deleteSet);
  const updateSet = useStore((state) => state.updateSet);
  console.log(`workout state: ${JSON.stringify(workout)}`);

  const [deleteSetOverlayOpened, deleteSetOverlayHandler] =
    useDisclosure(false);

  const handleSetFieldChange = (
    set: Set,
    setIndex: number,
    updatedField: Pick<Set, 'fields'>,
  ) => {
    const updatedSet: Set = {
      ...set,
      fields: {
        ...set.fields,
        ...updatedField.fields,
      },
    };
    updateSet(exerciseIndex, setIndex, updatedSet);
  };

  const workoutSets = sets.map((set, i) => {
    const fields = tracked.map((field) => {
      if (field === 'reps') {
        return (
          <Stack key={field}>
            <RepField
              set={set}
              index={i}
              value={set.fields.reps!}
              handleSetFieldChange={handleSetFieldChange}
            />
            <RestField
              set={set}
              index={i}
              value={set.fields.rest!}
              handleSetFieldChange={handleSetFieldChange}
            />
          </Stack>
        );
      }
      if (field === 'duration') {
        return (
          <Stack key={field}>
            <TimeField />
            <RestField
              set={set}
              index={i}
              value={set.fields.rest!}
              handleSetFieldChange={handleSetFieldChange}
            />
          </Stack>
        );
      }
      return <></>;
    });

    const handleDeleteSetOpen = (i: number) => {
      setSelectedSetIndex(i);
      deleteSetOverlayHandler.open();
    };
    return (
      <Stack key={i} bg="gray.1">
        <Group>
          <Text>{`Set ${i + 1}`}</Text>
          <Button
            color="red"
            variant="white"
            onClick={() => handleDeleteSetOpen(i)}
          >
            Delete
          </Button>
        </Group>
        {fields}
      </Stack>
    );
  });
  return (
    <Stack>
      {workoutSets}
      <ConfirmationOverlay
        title="Delete Set"
        message="Delete set from this exercise?"
        confirmButtonLabel="Delete"
        opened={deleteSetOverlayOpened}
        handler={deleteSetOverlayHandler}
        onConfirmationClick={() => deleteSet(exerciseIndex, selectedSetIndex!)}
      />
    </Stack>
  );
}
