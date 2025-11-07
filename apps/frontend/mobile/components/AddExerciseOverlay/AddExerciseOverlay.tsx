import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import {
  useWorkoutDraftStore,
  useExerciseLibraryStore,
} from '@cwt/state/stores';

import { CustomTheme } from '../../theme';

import FullScreenModal from '../common/FullScreenModal';
import ExerciseList from './ExerciseList';

interface AddExerciseOverlayProps {
  isVisible: boolean;
  handleHideModal: () => void;
  workoutDataScrollViewRef: React.RefObject<ScrollView | null>;
}

export default function AddExerciseOverlay({
  isVisible,
  handleHideModal,
  workoutDataScrollViewRef,
}: AddExerciseOverlayProps) {
  const theme = useTheme() as CustomTheme;

  const selectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.selectedExerciseIDToAdd,
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd,
  );
  const addExercise = useWorkoutDraftStore((state) => state.addExerciseUpdated);
  const getExerciseById = useExerciseLibraryStore(
    (state) => state.getExerciseByID,
  );

  const handleAddExercisePress = () => {
    addExercise(
      getExerciseById(selectedExerciseIDToAdd as number).default_tracking_type,
    );
    setSelectedExerciseIDToAdd(null);
    handleHideModal();
    workoutDataScrollViewRef.current?.scrollToEnd({ animated: true });
  };
  return (
    <FullScreenModal
      title="Add Exercise"
      visible={isVisible}
      handleHideModal={handleHideModal}
    >
      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
          paddingInline: 16,
          paddingBlock: 16,
        }}
      >
        <ExerciseList />
      </ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingTop: 20,
          borderTopWidth: 2,
          borderTopColor: theme.colors.orange1,
        }}
      >
        <Button
          mode="outlined"
          textColor={theme.colors.light}
          onPress={() => handleHideModal()}
          style={{
            borderColor: 'rgb(134, 142, 150)',
            borderRadius: 4,
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={selectedExerciseIDToAdd === null}
          mode="contained"
          onPress={() => handleAddExercisePress()}
          style={{
            borderRadius: 4,
          }}
        >
          Add Exercise
        </Button>
      </View>
    </FullScreenModal>
  );
}
