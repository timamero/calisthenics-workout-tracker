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

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';
import { globalStyles } from '../../styles/global';
import WorkoutData from '../../components/Workout/WorkoutData';
import WorkoutLogDetailMenu from './WorkoutLogDetailMenu';
import DeleteLogConfirmationOverlay from './DeleteLogConfirmationOverlay';

/**
 * WorkoutLogDetail component displays detailed information about a specific
 * workout log in a modal overlay. It provides options to update or delete the
 * workout log and shows relevant metadata such as date, description, goal,
 * and duration.
 *
 * The component uses various hooks to access the workout log context,
 * authentication state, and navigation. It also includes error handling to
 * ensure that all necessary data is available before rendering the overlay.
 *
 * @component
 * @example
 * return (
 *   <WorkoutLogDetail />
 * )
 * @returns {JSX.Element | null} The WorkoutLogDetail component or null if required
 * data is missing.
 */
export default function WorkoutLogDetail() {
  // --- UI Hooks ---
  const navigation = useNavigation<any>();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme() as CustomTheme;

  // --- State Management ---
  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);

  // --- Context ---
  const workout = useWorkoutLogDetailContextMobile().workout;
  const setDetailWorkout = useWorkoutLogDetailContextMobile().setWorkout;
  const workoutOverlayHandlers =
    useWorkoutContextMobile().mobileOverlayHandlers;

  // --- Error Handling ---
  if (!workout) {
    console.log('DEBUG: workout is null in WorkoutLogDetail');
    console.error('Error: Workout log not found');
    return null;
  }

  if (!workoutOverlayHandlers) {
    console.error(
      'Error: useWorkoutContextMobile().mobileOverlayHandlers is null',
    );
    return null;
  }

  // --- Styles ---
  const styles = globalStyles(theme);

  // --- Variables ---
  const setIsDeleteLogOverlayVisible =
    workoutOverlayHandlers.setIsDeleteLogOverlayVisible;

  const duration = workout.duration ? formatDuration(workout.duration) : null;
  const date = new Date(workout.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // --- Handlers ---
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
          {workout.title}
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
            {workout.description && (
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
                  {workout.description}
                </Text>
              </View>
            )}
            {workout.goal && (
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
                  {workout.goal.toUpperCase()}
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
