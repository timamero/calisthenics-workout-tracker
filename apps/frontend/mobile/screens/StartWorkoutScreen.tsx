import { View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import {
  useWorkoutLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';

import { CustomTheme } from '../theme';
import { Text } from '../customText';
import CardButton from '../components/common/CardButton';
import LargeButton from '../components/common/LargeButton';

export default function StartWorkoutScreen() {
  const navigation = useNavigation<any>();
  const theme = useTheme() as CustomTheme;

  const initializeWorkout = useWorkoutDraftStore(
    (state) => state.initializeWorkout,
  );

  const workoutBuilds = useWorkoutLibraryStore(
    (state) => state.displayedWorkoutBuilds,
  );

  const workoutData = useWorkoutDraftStore((state) => state.workoutData); // DELETE THIS LINE LATER
  console.log('workout - workoutData: ', workoutData); // DELETE THIS LINE LATER

  const workoutBuildCards = workoutBuilds.map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Template ${i + 1}`;
    return (
      <CardButton key={i}>
        <Text variant="headlineMedium" style={{ color: theme.colors.light }}>
          {workoutTitle}
        </Text>
      </CardButton>
    );
  });

  const onBuildNewWorkoutPress = () => {
    initializeWorkout('build');
    navigation.navigate('Workout');
  };

  const onLogNewWorkoutPress = () => {
    initializeWorkout('edit');
    navigation.navigate('Workout');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <LargeButton handlePress={onBuildNewWorkoutPress}>
        Build New Workout
      </LargeButton>
      <LargeButton handlePress={onLogNewWorkoutPress}>
        Start Blank Workout
      </LargeButton>

      <Text variant="headlineSmall" style={{ color: theme.colors.light }}>
        Start from a template
      </Text>
      <View>
        <ScrollView horizontal>{workoutBuildCards}</ScrollView>
      </View>
    </View>
  );
}
