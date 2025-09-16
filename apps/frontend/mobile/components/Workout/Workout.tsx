import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

// import { useStore } from '@cwt/state/store';
import { useWorkoutDraftStore } from '@cwt/state/stores';

// import WorkoutExercise from './WorkoutExercise';
import { CustomTheme } from '../../theme';
import { Text } from '../../customText';

export default function Workout() {
  const theme = useTheme() as CustomTheme;

  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  console.log('rendering workout');
  // if (!workoutData) {
  //   return <Text>Loading</Text>;
  // }

  const EmptyWorkoutPlaceholder = () => {
    if (workoutData.exercises.length === 0) {
      return (
        // <Stack align="center" bd="2px dashed gray.6" p="lg">
        <View>
          {/* <Text size="lg" fw={800}> */}
          <Text style={{ color: theme.colors.light }}>
            Ready to start building your workout?
          </Text>
          <Text style={{ color: theme.colors.light }}>
            Add your first exercise to begin
          </Text>
        </View>
      );
    }
  };

  // const workoutExercises = workoutData.exercises.map((ex, i) => {
  //   return (
  //     <WorkoutExercise key={ex.id} workoutExercise={ex} exerciseIndex={i} />
  //   );
  // });
  return (
    // <Stack gap="xl" align="center">
    <View>
      <EmptyWorkoutPlaceholder />
      {/* {workoutExercises} */}
    </View>
  );
}
