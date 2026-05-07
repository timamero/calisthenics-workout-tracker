import { Stack, Group, Text, Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import type { Mode, Superset } from '@cwt/schema/workouts';

import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import ExerciseSetGroup from '../ExerciseSetGroup';
import ExercisesList from './ExercisesList';

interface SupersetItemUIProps {
  mode: Mode;
  superset: Superset;
  isFirst: boolean;
  isLast: boolean;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleDeleteSupersetClick: () => void;
  handleOpenAddExerciseClick: () => void;
}

export default function SupersetItemUI({
  mode,
  isFirst,
  isLast,
  handleUpClick,
  handleDownClick,
  handleDeleteSupersetClick,
  handleOpenAddExerciseClick,
}: SupersetItemUIProps) {
  return (
    <Stack
      bg="transparent"
      p="xs"
      bd="4px solid var(--mantine-color-default-border)"
      bdrs="md"
      w="100%"
      maw={600}
    >
      <Group>
        {(mode === 'edit' || mode === 'build') && (
          <ReorderButtonGroup
            handleUpClick={() => handleUpClick()}
            handleDownClick={() => handleDownClick()}
            isFirst={isFirst}
            isLast={isLast}
          />
        )}
        <Text>Superset</Text>
        {(mode === 'edit' || mode === 'build') && (
          <Button
            color="red"
            variant="white"
            onClick={() => handleDeleteSupersetClick()}
          >
            Delete
          </Button>
        )}
      </Group>
      {mode === 'edit' || mode === 'build' ? (
        <ExercisesList />
      ) : (
        <ExerciseSetGroup />
      )}
      {(mode === 'edit' || mode === 'build') && (
        <Button
          variant="filled"
          color="orange.9"
          component={Link}
          to="/workout/add-exercise"
          onClick={() => handleOpenAddExerciseClick()}
        >
          Add Exercise
        </Button>
      )}
    </Stack>
  );
}
