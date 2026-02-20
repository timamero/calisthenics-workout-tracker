import { Stack, Group, Text, Button } from '@mantine/core';

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
  handleOpenAddExerciseOverlay: () => void;
}

export default function SupersetItemUI({
  mode,
  isFirst,
  isLast,
  handleUpClick,
  handleDownClick,
  handleDeleteSupersetClick,
  handleOpenAddExerciseOverlay,
}: SupersetItemUIProps) {
  return (
    <Group align="flex-start">
      {(mode === 'edit' || mode === 'build') && (
        <ReorderButtonGroup
          handleUpClick={() => handleUpClick()}
          handleDownClick={() => handleDownClick()}
          isFirst={isFirst}
          isLast={isLast}
        />
      )}

      <Stack
        bg="transparent"
        p="xs"
        bd="4px solid var(--mantine-color-default-border)"
        bdrs="md"
      >
        <Group>
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
            onClick={() => handleOpenAddExerciseOverlay()}
          >
            Add Exercise
          </Button>
        )}
      </Stack>
    </Group>
  );
}
