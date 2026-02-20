import { Stack, Group, Text, Button } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';

import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import ItemsList from './ItemsList';

interface SectionItemUIProps {
  mode: Mode;
  isFirst: boolean;
  isLast: boolean;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleDeleteSectionClick: () => void;
  handleOpenAddExerciseOverlay: () => void;
  handleAddSupersetClick: () => void;
}

export default function SectionItemUI({
  mode,
  isFirst,
  isLast,
  handleUpClick,
  handleDownClick,
  handleDeleteSectionClick,
  handleOpenAddExerciseOverlay,
  handleAddSupersetClick,
}: SectionItemUIProps) {
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
      <Stack bg="gray.1" p="xl" bdrs="sm">
        <Group>
          <Text>Section</Text>
          {mode !== 'log' && (
            <Button
              color="red"
              variant="white"
              onClick={() => handleDeleteSectionClick()}
            >
              Delete
            </Button>
          )}
        </Group>
        <ItemsList />
        {mode !== 'log' && (
          <Stack>
            <Button
              variant="filled"
              color="orange.9"
              onClick={() => handleOpenAddExerciseOverlay()}
            >
              Add Exercise
            </Button>
            <Button
              variant="filled"
              color="orange.9"
              onClick={() => handleAddSupersetClick()}
            >
              Add Superset
            </Button>
          </Stack>
        )}
      </Stack>
    </Group>
  );
}
