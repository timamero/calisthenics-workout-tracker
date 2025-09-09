import { Stack, Text, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import type { WorkoutExercise } from '@cwt/schema/workouts';
import { useStore } from '@cwt/state/store';

import RepField from './RepField';
import DurationField from './DurationField';
import ConfirmationOverlay from '../common/ConfirmationOverlay';

export default function Sets({
  tracked,
  sets,
  exerciseIndex,
}: Pick<WorkoutExercise, 'sets' | 'tracked'> & { exerciseIndex: number }) {
  const setSelectedSetIndexToMod = useStore(
    (state) => state.setSelectedSetIndexToMod,
  );
  const deleteSet = useStore((state) => state.deleteSet);
  const updateSet = useStore((state) => state.updateSet);

  const [deleteSetOverlayOpened, deleteSetOverlayHandler] =
    useDisclosure(false);

  const handleSetFieldChange = (
    setIndex: number,
    updatedField: {
      reps?: number | undefined;
      weight?: number | undefined;
      time?: string | undefined;
      rest?: string | undefined;
    },
  ) => {
    setSelectedSetIndexToMod(setIndex);
    updateSet(exerciseIndex, updatedField);
  };

  const workoutSets = sets.map((set, i) => {
    const fields = tracked.map((field) => {
      if (field === 'reps') {
        return (
          <Stack key={set.id}>
            <RepField
              index={i}
              value={set.fields.reps!}
              handleSetFieldChange={handleSetFieldChange}
            />
            <DurationField
              index={i}
              value={set.fields.rest!}
              fieldName="rest"
              handleSetFieldChange={handleSetFieldChange}
              label="Rest"
            />
          </Stack>
        );
      }
      if (field === 'time') {
        return (
          <Stack key={set.id}>
            <DurationField
              index={i}
              value={set.fields.time!}
              fieldName="time"
              handleSetFieldChange={handleSetFieldChange}
              label="Time"
            />
            <DurationField
              index={i}
              value={set.fields.rest!}
              fieldName="rest"
              handleSetFieldChange={handleSetFieldChange}
              label="Rest"
            />
          </Stack>
        );
      }
      return <></>;
    });

    const handleDeleteSetOpen = (i: number) => {
      setSelectedSetIndexToMod(i);
      deleteSetOverlayHandler.open();
    };
    return (
      <Stack key={`set-${i}`} bg="gray.1">
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
        onConfirmationClick={() => deleteSet(exerciseIndex)}
      />
    </Stack>
  );
}
