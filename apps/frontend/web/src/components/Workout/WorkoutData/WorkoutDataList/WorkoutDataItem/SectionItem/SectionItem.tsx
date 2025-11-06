import { useContext } from 'react';
import { Stack, Group, Text, Button } from '@mantine/core';

import type { Mode, Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutContext } from '@cwt/context';
import { WorkoutDataItemContext } from '@cwt/context';

import { ExerciseItemContainer } from '../ExerciseItem';
import { SupersetItemContainer } from '../SupersetItem';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';

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
  const addExerciseOverlayHandler =
    useContext(WorkoutContext)?.addExerciseOverlayHandler;
  const addSupersetOverlayHandler =
    useContext(WorkoutContext)?.addSupersetOverlayHandler;
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const handleOpenAddExerciseOverlay = () => {
    setSectionIDToMod(section.id);
    addExerciseOverlayHandler!.open();
  };
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
        {section.items.map((item) => {
          if (item.type === 'exercise') {
            return (
              <WorkoutDataItemContext.Provider
                key={item.id}
                value={{
                  item: item,
                  parentType: 'section',
                  parentItemsLength: section.items.length,
                  parentSectionID: section.id,
                  parentSupersetID: null,
                }}
              >
                <ExerciseItemContainer />
              </WorkoutDataItemContext.Provider>
            );
          }
          return (
            <WorkoutDataItemContext.Provider
              key={item.id}
              value={{
                item: item,
                parentType: 'section',
                parentItemsLength: section.items.length,
                parentSectionID: section.id,
                parentSupersetID: null,
              }}
            >
              <SupersetItemContainer />
            </WorkoutDataItemContext.Provider>
          );
        })}
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
