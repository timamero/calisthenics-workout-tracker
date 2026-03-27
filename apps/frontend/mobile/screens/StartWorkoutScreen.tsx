import { View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import {
  useWorkoutLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';
import { startWorkoutContent } from '@cwt/content';

import { CustomTheme } from '../theme';
import { Text } from '../customText';
import CardButton from '../components/common/CardButton';
import LargeButton from '../components/common/LargeButton';

export default function StartWorkoutScreen() {
  const navigation = useNavigation<any>();
  const theme = useTheme() as CustomTheme;

  const workoutBuilds = useWorkoutLibraryStore(
    (state) => state.displayedWorkoutBuilds,
  );
  const workoutLogs = useWorkoutLibraryStore(
    (state) => state.displayedWorkoutLogs,
  );
  const initializeWorkout = useWorkoutDraftStore(
    (state) => state.initializeWorkout,
  );

  const onBuildNewWorkoutPress = () => {
    initializeWorkout('build');
    navigation.navigate('Workout');
  };

  const onLogNewWorkoutPress = () => {
    initializeWorkout('edit');
    navigation.navigate('Workout');
  };

  const workoutBuildCards = workoutBuilds.map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Template ${i + 1}`;
    return (
      <CardButton handlePress={() => console.log('clicked card')} key={i}>
        <Text variant="headlineMedium" style={{ color: theme.colors.light }}>
          {workoutTitle}
        </Text>
      </CardButton>
    );
  });

  const workoutLogCards = workoutLogs.map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Template ${i + 1}`;
    return (
      <CardButton handlePress={() => console.log('clicked card')} key={i}>
        <Text variant="headlineMedium" style={{ color: theme.colors.light }}>
          {workoutTitle}
        </Text>
      </CardButton>
    );
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <LargeButton handlePress={onBuildNewWorkoutPress}>
        {startWorkoutContent().createNewBuildButton}
      </LargeButton>
      <LargeButton handlePress={onLogNewWorkoutPress}>
        {startWorkoutContent().createNewLogButton}
      </LargeButton>

      <Text variant="headlineSmall" style={{ color: theme.colors.light }}>
        {startWorkoutContent().workoutBuildListHeading}
      </Text>
      <View>
        <ScrollView horizontal>{workoutBuildCards}</ScrollView>
      </View>
      <Text variant="headlineSmall" style={{ color: theme.colors.light }}>
        {startWorkoutContent().workoutLogListHeading}
      </Text>
      <View>
        <ScrollView horizontal>{workoutLogCards}</ScrollView>
      </View>
    </View>
  );
}
