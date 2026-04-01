import { ScrollView } from 'react-native';
import AddExerciseOverlay from './AddExerciseOverlay';
import ConfirmationOverlays from './ConfirmationOverlays';

interface WorkoutOverlaysProps {
  workoutDataScrollViewRef: React.RefObject<ScrollView | null>;
}

export default function WorkoutOverlays({
  workoutDataScrollViewRef,
}: WorkoutOverlaysProps) {
  return (
    <>
      <AddExerciseOverlay workoutDataScrollViewRef={workoutDataScrollViewRef} />
      <ConfirmationOverlays />
    </>
  );
}
