import { useContext } from 'react';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import { CustomTheme } from '../theme';
import { Text } from '../customText';
import { globalStyles } from '../styles/global';
import WorkoutDraftContext from '../contexts/WorkoutDraftContext';
import LargeButton from './common/LargeButton';

export default function EmptyLogsPlaceholder() {
  const navigation = useNavigation<any>();
  const theme = useTheme() as CustomTheme;

  const styles = globalStyles(theme);
  const initializeWorkout = useWorkoutDraftStore(
    (state) => state.initializeWorkout,
  );
  const setIsAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.setIsAddWorkoutItemButtonsVisible!;

  const onLogNewWorkoutPress = () => {
    initializeWorkout('edit');
    setIsAddWorkoutItemButtonsVisible(true);
    navigation.navigate('WorkoutStack', { screen: 'Workout' });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            transform: 'translateY(-100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Text variant="bodyLarge">
            No force generated yet. Time to change that.
          </Text>
          <LargeButton handlePress={onLogNewWorkoutPress}>
            <Text
              variant="headlineMedium"
              style={{ color: theme.colors.onSecondary }}
            >
              Start Workout
            </Text>
          </LargeButton>
        </View>
      </View>
    </View>
  );
}
