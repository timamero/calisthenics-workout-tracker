import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import FullScreenModal from '../common/FullScreenModal';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';

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
          height: 460,
          backgroundColor: theme.colors.background,
          paddingInline: 20,
          paddingBlock: 16,
        }}
      >
        <Text>Exercises will be here</Text>
      </ScrollView>
      <View>
        <Text>Buttons here</Text>
      </View>
    </FullScreenModal>
  );
}
