import { Stack, Group, Text, Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';

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
  handleOpenAddExerciseClick: () => void;
  handleAddSupersetClick: () => void;
}

export default function SectionItemUI({
  mode,
  isFirst,
  isLast,
  handleUpClick,
  handleDownClick,
  handleDeleteSectionClick,
  handleOpenAddExerciseClick,
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
          {(mode === 'edit' || mode === 'build') && (
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
        {(mode === 'edit' || mode === 'build') && (
          <Stack>
            <Button
              variant="filled"
              color="orange.9"
              component={Link}
              to="/workout/add-exercise"
              onClick={() => handleOpenAddExerciseClick()}
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
