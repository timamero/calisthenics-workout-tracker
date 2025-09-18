import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Text } from '../../customText';
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
      <View>
        <Text>Buttons here</Text>
      </View>
    </FullScreenModal>
  );
}
