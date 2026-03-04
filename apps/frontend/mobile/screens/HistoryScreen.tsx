import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useWorkoutLibraryStore } from '@cwt/state/stores';
import { formatDuration } from '@cwt/utils';

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
      <ScrollView>
        {workoutLogs.map((wo) => {
          const date = new Date(wo.date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          const duration = formatDuration(wo.duration!);
          return (
            <CardButton key={wo.workout_build_id}>
              <Text
                variant="headlineMedium"
                style={{ color: theme.colors.light }}
              >
                {wo.title}
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.light }}>
                {date}
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.light }}>
                {wo.goal}
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.light }}>
                {wo.description}
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.light }}>
                {duration}
              </Text>
            </CardButton>
          );
        })}
      </ScrollView>
    </View>
  );
}
