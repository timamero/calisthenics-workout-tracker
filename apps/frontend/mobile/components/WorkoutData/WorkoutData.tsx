import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

// import { useStore } from '@cwt/state/store';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutExercise from './WorkoutExercise';
import { CustomTheme } from '../../theme';
import { Text } from '../../customText';

export default function Workout() {
  const theme = useTheme() as CustomTheme;

  const workoutData = useWorkoutDraftStore((state) => state.workoutData);

  const workoutExercises = workoutData.exercises.map((ex, i) => {
    return (
      <WorkoutExercise key={ex.id} workoutExercise={ex} exerciseIndex={i} />
    );
  });

  const EmptyWorkoutPlaceholder = () => {
    if (workoutData.exercises.length === 0) {
      return (
        <View
          style={{
            borderColor: theme.colors.grey,
            borderWidth: 2,
            borderStyle: 'dashed',
            display: 'flex',
            alignItems: 'center',
            marginInline: 20,
            padding: 16,
            gap: 16,
          }}
        >
          <Text
            variant="bodyLarge"
            style={{
              color: theme.colors.light,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            Ready to start building your workout?
          </Text>
          <Text style={{ color: theme.colors.light, textAlign: 'center' }}>
            Add your first exercise to begin
          </Text>
        </View>
      );
    }
  };

  return (
    // <Stack gap="xl" align="center">
    <View>
      <EmptyWorkoutPlaceholder />
      {workoutExercises}
    </View>
  );
}
