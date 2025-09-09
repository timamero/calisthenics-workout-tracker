import { useState } from 'react';
import { Title, TextInput, Button, Group } from '@mantine/core';

import { useStore } from '@cwt/state/store';

export default function WorkoutTitle() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const workoutTitle = useStore((state) => state.workoutTitle);
  const setWorkoutTitle = useStore((state) => state.setWorkoutTitle);
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
