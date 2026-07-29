import { View, ScrollView, StyleSheet } from 'react-native';
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
  const global = globalStyles(theme);
  const styles = createStyles(theme, top, bottom);

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
    <View style={[global.container, styles.screenContainer]}>
      <View style={styles.headerRow}>
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
      <ScrollView style={styles.scrollView}>
        <Text variant="headlineLarge" style={styles.workoutTitle}>
          {workout.title}
        </Text>
        <View style={styles.detailsSection}>
          <View style={styles.detailsList}>
            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={global.uppercaseLabel}>
                Date:
              </Text>
              <Text variant="labelLarge" style={styles.detailValue}>
                {date}
              </Text>
            </View>
            {workout.description && (
              <View style={styles.detailRow}>
                <Text variant="bodyMedium" style={global.uppercaseLabel}>
                  Duration:
                </Text>
                <Text variant="labelLarge" style={styles.detailValue}>
                  {workout.description}
                </Text>
              </View>
            )}
            {workout.goal && (
              <View style={styles.detailRow}>
                <Text variant="bodyMedium" style={global.uppercaseLabel}>
                  Workout Goal:
                </Text>
                <Text variant="labelLarge" style={styles.detailValue}>
                  {workout.goal.toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={global.uppercaseLabel}>
                Duration (HH:MM:SS):
              </Text>
              <Text variant="labelLarge" style={styles.detailValue}>
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

const createStyles = (
  theme: CustomTheme,
  topInset: number,
  bottomInset: number,
) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      paddingInline: 0,
      paddingTop: topInset + 24,
      paddingBottom: bottomInset + 24,
      backgroundColor: theme.colors.elevation.level3,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingInline: 24,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray3,
    },
    scrollView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    workoutTitle: {
      color: theme.colors.onBackground,
      paddingInline: 24,
      paddingBlock: 16,
    },
    detailsSection: {
      marginInline: 24,
      marginBlock: 24,
      rowGap: 12,
    },
    detailsList: {
      flexDirection: 'column',
      gap: 12,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
    },
    detailValue: {
      color: theme.colors.onBackground,
      flexShrink: 1,
    },
  });
