import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';

import FullScreenModal from '../common/FullScreenModal';
import ExerciseCard from './ExerciseCard';
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
          height: 460,
          backgroundColor: theme.colors.background,
          paddingInline: 20,
          paddingBlock: 16,
        }}
      >
        <ExerciseList />
        {/* <ExerciseCard
          exercise={{
            id: 12,
            name: 'pull ups',
            target_muscles: ['chest'],
            required_equipment: ['none'],
            emphasis: 'power',
            difficulty: 'beginner',
            tags: [],
            instructions: ['1', '2'],
            default_tracking_type: ['reps'],
          }}
        /> */}
      </ScrollView>
      <View>
        <Text>Buttons here</Text>
      </View>
    </FullScreenModal>
  );
}
