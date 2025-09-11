import { useState } from 'react';
import { Title, TextInput, Button, Group } from '@mantine/core';

// import { useStore } from '@cwt/state/store';
import { useWorkoutDraftStore } from '@cwt/state/stores';

export default function WorkoutTitle() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const workoutTitle = useWorkoutDraftStore((state) => state.workoutTitle);
  const setWorkoutTitle = useWorkoutDraftStore(
    (state) => state.setWorkoutTitle,
  );
  return (
    <>
      {!isEditMode && (
        <Group>
          <Title size="h6">{workoutTitle}</Title>
          <Button
            onClick={() => setIsEditMode(true)}
            variant="outline"
            color="dark"
          >
            Edit Title
          </Button>
        </Group>
      )}
      {isEditMode && (
        <Group>
          <TextInput
            value={workoutTitle!}
            onChange={(event) => setWorkoutTitle(event.currentTarget.value)}
          />
          <Button
            onClick={() => setIsEditMode(false)}
            variant="outline"
            color="dark"
          >
            Save
          </Button>
        </Group>
      )}
    </>
  );
}
