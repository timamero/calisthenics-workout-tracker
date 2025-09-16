import { View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useWorkoutLibraryStore } from '@cwt/state/stores';

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

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="headlineLarge" style={{ color: theme.colors.light }}>
        Create or Begin A Workout
      </Text>

      <LargeButton onButtonClick={() => navigation.navigate('Workout')}>
        Build New Workout
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
