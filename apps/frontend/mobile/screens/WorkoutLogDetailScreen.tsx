import { View, ScrollView, Dimensions } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useWorkoutLogDetailContextMobile } from '@cwt/hooks';
import { formatDuration } from '@cwt/utils';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutLogResponse } from '@cwt/schema/workouts';

import { Text } from '../customText';
import { CustomTheme } from '../theme';
import { globalStyles } from '../styles/global';
import WorkoutData from '../components/Workout/WorkoutData';

export default function WorkoutLogDetailScreen() {
  const navigation = useNavigation<any>();
  const theme = useTheme() as CustomTheme;
  const styles = globalStyles(theme);
  const { top, bottom } = useSafeAreaInsets();

  const workoutLogDetail = useWorkoutLogDetailContextMobile()
    .workout as WorkoutLogResponse;
  const setDetailWorkout = useWorkoutLogDetailContextMobile().setWorkout;

  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);

  if (!workoutLogDetail) return null;

  const windowHeight = Dimensions.get('window').height;

  const duration = workoutLogDetail.duration
    ? formatDuration(workoutLogDetail.duration)
    : null;
  const date = new Date(workoutLogDetail.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleCloseDetails = () => {
    setDetailWorkout(null);
    resetWorkout();
    navigation.navigate('App', { screen: 'History' });
  };

  return (
    <View
      style={{
        ...styles.container,
        paddingBottom: bottom + 24,
        paddingTop: top + 24,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          mode="outlined"
          textColor={theme.colors.onBackground}
          onPress={handleCloseDetails}
        >
          Back to Workouts
        </Button>
      </View>
      <Text
        variant="headlineLarge"
        style={{ color: theme.colors.onBackground, padding: 16 }}
      >
        {workoutLogDetail?.title}
      </Text>
      <ScrollView style={{ height: windowHeight - 200 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 12,
            marginBlock: 24,
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 8,
              }}
            >
              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onBackground,
                  textTransform: 'uppercase',
                }}
              >
                Date:
              </Text>
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.onBackground, flexShrink: 1 }}
              >
                {date}
              </Text>
            </View>
            {workoutLogDetail?.description && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 8,
                }}
              >
                <Text
                  variant="bodyMedium"
                  style={{
                    color: theme.colors.onBackground,
                    textTransform: 'uppercase',
                  }}
                >
                  Duration:
                </Text>
                <Text
                  variant="labelLarge"
                  style={{ color: theme.colors.onBackground, flexShrink: 1 }}
                >
                  {workoutLogDetail.description}
                </Text>
              </View>
            )}
            {workoutLogDetail?.goal && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 8,
                }}
              >
                <Text
                  variant="bodyMedium"
                  style={{
                    color: theme.colors.onBackground,
                    textTransform: 'uppercase',
                  }}
                >
                  Workout Goal:
                </Text>
                <Text
                  variant="labelLarge"
                  style={{ color: theme.colors.onBackground, flexShrink: 1 }}
                >
                  {workoutLogDetail.goal.toUpperCase()}
                </Text>
              </View>
            )}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 8,
              }}
            >
              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onBackground,
                  textTransform: 'uppercase',
                }}
              >
                Duration (HH:MM:SS):
              </Text>
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.onBackground, flexShrink: 1 }}
              >
                {duration}
              </Text>
            </View>
          </View>
        </View>
        <WorkoutData />
      </ScrollView>
    </View>
  );
}
