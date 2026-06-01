import { Text, Stack } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import LargeButton from '../common/LargeButton';

export default function EmptyLogsPlaceholder() {
  const initializeWorkout = useWorkoutDraftStore(
    (state) => state.initializeWorkout,
  );

  const handleCreateWorkoutLogClick = () => {
    initializeWorkout('edit');
  };
  return (
    <Stack align="center">
      <Text>No force generated yet. Time to change that.</Text>
      <LargeButton to="/workout" onButtonClick={handleCreateWorkoutLogClick}>
        <Text fz="h4" fw={700} ta="center" lh="xxs">
          Start Workout
        </Text>
      </LargeButton>
    </Stack>
  );
}
