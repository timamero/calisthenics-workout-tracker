import { View, ScrollView } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  useWorkoutLogDetailContextMobile,
  useWorkoutContextMobile,
} from '@cwt/hooks';
import { formatDuration } from '@cwt/utils';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutLogResponse } from '@cwt/schema/workouts';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';
import { globalStyles } from '../../styles/global';
import WorkoutData from '../../components/Workout/WorkoutData';
import WorkoutLogDetailMenu from './WorkoutLogDetailMenu';
import DeleteLogConfirmationOverlay from './DeleteLogConfirmationOverlay';

export default function WorkoutLogDetail() {
  const navigation = useNavigation<any>();
  const theme = useTheme() as CustomTheme;
  const styles = globalStyles(theme);
  const { top, bottom } = useSafeAreaInsets();

  const workoutLogDetail = useWorkoutLogDetailContextMobile()
    .workout as WorkoutLogResponse;
  const setDetailWorkout = useWorkoutLogDetailContextMobile().setWorkout;

  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);

  const setIsDeleteLogOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      ?.setIsDeleteLogOverlayVisible;

  if (!workoutLogDetail) return null;

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

  const handleDeletePress = () => {
    if (setIsDeleteLogOverlayVisible) {
      setIsDeleteLogOverlayVisible(true);
    } else {
      console.error('setIsDeleteLogOverlayVisible not defined');
    }
  };
  return (
    <View
      style={{
        ...styles.container,
        flex: 1,
        paddingInline: 0,
        paddingBottom: bottom + 24,
        paddingTop: top + 24,
        backgroundColor: theme.colors.elevation.level3,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingInline: 24,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.gray3,
        }}
      >
        <Button
          mode="outlined"
          textColor={theme.colors.onBackground}
          onPress={handleCloseDetails}
        >
          Back to Workouts
        </Button>
        <WorkoutLogDetailMenu handleDeletePress={() => handleDeletePress()} />
        <DeleteLogConfirmationOverlay />
      </View>
      <ScrollView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <Text
          variant="headlineLarge"
          style={{
            color: theme.colors.onBackground,
            paddingInline: 24,
            paddingBlock: 16,
          }}
        >
          {workoutLogDetail?.title}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 12,
            marginBlock: 24,
            marginInline: 24,
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
