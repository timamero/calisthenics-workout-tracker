import { ScrollView } from 'react-native';
import AddExerciseOverlay from './AddExerciseOverlay';

interface WorkoutOverlaysProps {
  workoutDataScrollViewRef: React.RefObject<ScrollView | null>;
}

export default function WorkoutOverlays({
  workoutDataScrollViewRef,
}: WorkoutOverlaysProps) {
  return (
    <>
      <AddExerciseOverlay workoutDataScrollViewRef={workoutDataScrollViewRef} />
    </>
  );
}
