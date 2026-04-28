import { ScrollView } from 'react-native';
import ConfirmationOverlays from './ConfirmationOverlays';

interface WorkoutOverlaysProps {
  workoutDataScrollViewRef: React.RefObject<ScrollView | null>;
}

export default function WorkoutOverlays({
  workoutDataScrollViewRef,
}: WorkoutOverlaysProps) {
  return (
    <>
      <ConfirmationOverlays />
    </>
  );
}
