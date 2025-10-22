import { useContext } from 'react';
import { Stack, Group, Text, Button } from '@mantine/core';

import type { Mode, Section } from '@cwt/schema/workouts';

import { WorkoutContext } from '../../../../../../contexts/WorkoutContext';
import { WorkoutDataItemContext } from '../../../../../../contexts/WorkoutDataItemContext';
import { ExerciseItemContainer } from '../ExerciseItem';
import { SupersetItemContainer } from '../SupersetItem';
import { useWorkoutDraftStore } from '@cwt/state/stores';

interface SectionItemProps {
  mode: Mode;
  section: Section;
  handleDeleteSectionClick: () => void;
}

export default function SectionItem({
  mode,
  section,
  handleDeleteSectionClick,
}: SectionItemProps) {
  const addExerciseOverlayHandler =
    useContext(WorkoutContext)?.addExerciseOverlayHandler;
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const handleOpenAddExerciseOverlay = () => {
    setSectionIDToMod(section.id);
    addExerciseOverlayHandler!.open();
  };
  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
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
      {section.items.map((item) => {
        if (item.type === 'exercise') {
          return (
            <WorkoutDataItemContext.Provider
              key={item.id}
              value={{ item: item, parentType: 'section', parentSectionID: section.id, parentSupersetID: null }}
            >
              <ExerciseItemContainer />
            </WorkoutDataItemContext.Provider>
          );
        }
        return <SupersetItemContainer />;
      })}
      <Button
        variant="filled"
        color="orange.9"
        onClick={() => handleOpenAddExerciseOverlay()}
      >
        Add Exercise
      </Button>
    </Stack>
  );
}
