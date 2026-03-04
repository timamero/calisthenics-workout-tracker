import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useWorkoutLibraryStore } from '@cwt/state/stores';

import { CustomTheme } from '../theme';
import { Text } from '../customText';
import CardButton from '../components/common/CardButton';

export default function HistoryScreen() {
  const theme = useTheme() as CustomTheme;

  const workoutLogs = useWorkoutLibraryStore(
    (state) => state.displayedWorkoutLogs,
  );
  // console.log('workout logs', workoutLogs);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      {workoutLogs.map((log) => {
        return (
          <CardButton key={log.workout_build_id}>
            <Text
              variant="headlineMedium"
              style={{ color: theme.colors.light }}
            >
              {log.title}
            </Text>
          </CardButton>
        );
      })}
    </View>
  );
}
