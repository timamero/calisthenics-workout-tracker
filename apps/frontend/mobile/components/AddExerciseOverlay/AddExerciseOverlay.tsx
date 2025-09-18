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
}

export default function AddExerciseOverlay({
  isVisible,
  handleHideModal,
}: AddExerciseOverlayProps) {
  const theme = useTheme() as CustomTheme;

  const selectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.selectedExerciseIDToAdd,
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd,
  );
  const addExercise = useWorkoutDraftStore((state) => state.addExercise);
  const getExerciseById = useExerciseLibraryStore(
    (state) => state.getExerciseByID,
  );

  const handleAddExerciseClick = () => {
    addExercise(
      getExerciseById(selectedExerciseIDToAdd as number).default_tracking_type,
    );
    setSelectedExerciseIDToAdd(null);
    handleHideModal();
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
          textColor="rgb(134, 142, 150)"
          onPress={() => handleHideModal()}
          style={{
            borderColor: 'rgb(134, 142, 150)',
            borderRadius: 4,
          }}
        >
          Clear All
        </Button>
        <Button
          mode="contained"
          onPress={() => handleAddExerciseClick()}
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
