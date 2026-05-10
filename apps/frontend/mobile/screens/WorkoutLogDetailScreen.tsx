import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useWorkoutLogDetailContextMobile } from '@cwt/hooks';
import { formatDuration } from '@cwt/utils';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutLogResponse } from '@cwt/schema/workouts';

import { Text } from '../customText';
import { CustomTheme } from '../theme';
import WorkoutData from '../components/WorkoutDraft/WorkoutData';

export default function WorkoutLogDetailScreen() {
  const navigation = useNavigation<any>();
  const theme = useTheme() as CustomTheme;

  const workoutLogDetail = useWorkoutLogDetailContextMobile()
    .workout as WorkoutLogResponse;
  // const setVisible =
  //   useWorkoutLogDetailContextMobile().mobileOverlayHandlers
  //     .setIsOverlayVisible!;
  const setDetailWorkout = useWorkoutLogDetailContextMobile().setWorkout;

  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);

  if (!workoutLogDetail) return null;

  const styles = getStyles(theme);

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
    // setVisible(false);
    setDetailWorkout(null);
    resetWorkout();
    navigation.navigate('History');
  };

  return (
    // <Portal>
    //   <Modal
    //     visible={visible || false}
    //     onDismiss={handleCloseModal}
    //     contentContainerStyle={containerStyle}
    //   >
    <View
      style={{
        paddingTop: 16,
        paddingInline: 16,
        display: 'flex',
        flexDirection: 'column',
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
        style={{ color: theme.colors.onBackground }}
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
            <Text variant="bodySmall" style={styles.metadataTitle}>
              Date
            </Text>
            <Text style={styles.metadataValue}>{date}</Text>
            {workoutLogDetail?.description && (
              <>
                <Text variant="bodySmall" style={styles.metadataTitle}>
                  Description
                </Text>
                <Text variant="bodyLarge" style={styles.metadataValue}>
                  {workoutLogDetail?.description}
                </Text>
              </>
            )}
            {workoutLogDetail?.goal && (
              <>
                <Text variant="bodySmall" style={styles.metadataTitle}>
                  Goal
                </Text>
                <Text variant="bodyLarge" style={styles.metadataValue}>
                  {workoutLogDetail?.goal}
                </Text>
              </>
            )}
            {duration && (
              <>
                <Text variant="bodySmall" style={styles.metadataTitle}>
                  Duration
                </Text>
                <Text variant="bodyLarge" style={styles.metadataValue}>
                  {duration}
                </Text>
              </>
            )}
          </View>
        </View>
        <WorkoutData />
      </ScrollView>
    </View>
    //   </Modal>
    // </Portal>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    metadataTitle: {
      fontWeight: 700,
      textTransform: 'uppercase',
      color: theme.colors.onBackground,
      marginBottom: 2,
    },
    metadataValue: {
      fontWeight: 700,
      color: theme.colors.onBackground,
      marginBottom: 8,
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
