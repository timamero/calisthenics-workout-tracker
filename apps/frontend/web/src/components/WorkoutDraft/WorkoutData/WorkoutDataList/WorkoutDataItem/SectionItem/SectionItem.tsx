import { useContext } from 'react';
import { Stack, Group, Text, Button } from '@mantine/core';

import type { Mode, Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutContext } from '@cwt/context';

import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import ItemsList from './ItemsList';
import { useAddExerciseOverlay } from '@cwt/hooks';

interface SectionItemProps {
  mode: Mode;
  section: Section;
  isFirst: boolean;
  isLast: boolean;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleDeleteSectionClick: () => void;
}

export default function SectionItem({
  mode,
  section,
  isFirst,
  isLast,
  handleUpClick,
  handleDownClick,
  handleDeleteSectionClick,
}: SectionItemProps) {
  const addSupersetOverlayHandler =
    useContext(WorkoutContext)?.addSupersetOverlayHandler;
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const handleOpenAddExerciseOverlay = useAddExerciseOverlay('section');

  const handleOpenAddSupersetOverlay = () => {
    setSectionIDToMod(section.id);
    addSupersetOverlayHandler!.open();
  };
  return (
    <Group align="flex-start">
      {mode !== 'log' && (
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
              onClick={() => handleOpenAddSupersetOverlay()}
            >
              Add Superset
            </Button>
          </Stack>
        )}
      </Stack>
    </Group>
  );
}
