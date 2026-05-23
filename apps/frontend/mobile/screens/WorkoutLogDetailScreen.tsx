import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
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

  const localStyles = getStyles(theme);

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
          <View>
            <Text variant="bodySmall" style={localStyles.metadataTitle}>
              Date
            </Text>
            <Text style={localStyles.metadataValue}>{date}</Text>
            {workoutLogDetail?.description && (
              <>
                <Text variant="bodySmall" style={localStyles.metadataTitle}>
                  Description
                </Text>
                <Text variant="bodyLarge" style={localStyles.metadataValue}>
                  {workoutLogDetail?.description}
                </Text>
              </>
            )}
            {workoutLogDetail?.goal && (
              <>
                <Text variant="bodySmall" style={localStyles.metadataTitle}>
                  Goal
                </Text>
                <Text variant="bodyLarge" style={localStyles.metadataValue}>
                  {workoutLogDetail?.goal}
                </Text>
              </>
            )}
            {duration && (
              <>
                <Text variant="bodySmall" style={localStyles.metadataTitle}>
                  Duration
                </Text>
                <Text variant="bodyLarge" style={localStyles.metadataValue}>
                  {duration}
                </Text>
              </>
            )}
          </View>
        </View>
        <WorkoutData />
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    metadataTitle: {
      fontWeight: 700,
      textTransform: 'uppercase',
      color: theme.colors.onBackground,
      marginBottom: 2,
      marginInline: 16,
    },
    metadataValue: {
      fontWeight: 700,
      color: theme.colors.onBackground,
      marginBottom: 8,
      marginInline: 20,
    },
    flexRowStart: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    pillsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
  });
