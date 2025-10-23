import { useContext } from 'react';
import { Stack, Group, Text, Button } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Mode, Superset } from '@cwt/schema/workouts';

import { WorkoutContext } from '../../../../../../contexts/WorkoutContext';
import { WorkoutDataItemContext } from '../../../../../../contexts/WorkoutDataItemContext';
import { ExerciseItemContainer } from '../ExerciseItem';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';

interface SupersetItemProps {
  mode: Mode;
  superset: Superset;
  isFirst: boolean;
  isLast: boolean;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleDeleteSupersetClick: () => void;
}

export default function SupersetItem({
  mode,
  superset,
  isFirst,
  isLast,
  handleUpClick,
  handleDownClick,
  handleDeleteSupersetClick,
}: SupersetItemProps) {
  const addExerciseOverlayHandler =
    useContext(WorkoutContext)?.addExerciseOverlayHandler;
  const supersetParentsSectionID = useContext(
    WorkoutDataItemContext,
  )?.parentSectionID;
  console.log('supersetParentsSectionID', supersetParentsSectionID);

  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const handleOpenAddExerciseOverlay = () => {
    setSupersetIDToMod(superset.id);
    if (supersetParentsSectionID) {
      setSectionIDToMod(supersetParentsSectionID);
    }
    addExerciseOverlayHandler!.open();
  };
  return (
    <Group align="flex-start">
      <ReorderButtonGroup
        handleUpClick={() => handleUpClick()}
        handleDownClick={() => handleDownClick()}
        isFirst={isFirst}
        isLast={isLast}
      />
      <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
        <Group>
          <Text>Superset</Text>
          {mode !== 'log' && (
            <Button
              color="red"
              variant="white"
              onClick={() => handleDeleteSupersetClick()}
            >
              Delete
            </Button>
          )}
        </Group>
        {superset.exercises.map((exercise) => {
          return (
            <WorkoutDataItemContext.Provider
              key={exercise.id}
              value={{
                item: exercise,
                parentType: 'superset',
                parentItemsLength: superset.exercises.length,
                parentSectionID: supersetParentsSectionID
                  ? supersetParentsSectionID
                  : null,
                parentSupersetID: superset.id,
              }}
            >
              <ExerciseItemContainer />
            </WorkoutDataItemContext.Provider>
          );
        })}
        {mode !== 'log' && (
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
