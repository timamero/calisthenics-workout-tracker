import { View } from 'react-native';
import FullScreenModal from '../common/FullScreenModal';

export default function AddExerciseOverlay() {
  return (
    <FullScreenModal
      title="Add Exercise"
      visible={false}
      handleHideModal={() => console.log('close')}
    >
      <View>Add Exercise Overlay</View>
    </FullScreenModal>
  );
}
