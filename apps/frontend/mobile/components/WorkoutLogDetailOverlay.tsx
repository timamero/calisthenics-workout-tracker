import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';

import { useWorkoutLogDetailContextMobile } from '@cwt/hooks';
import { formatDuration } from '@cwt/utils';

import { Text } from '../customText';
import { CustomTheme } from '../theme';
import { WorkoutLogResponse } from '@cwt/schema/workouts';

export default function ExerciseDetailOverlay() {
  const theme = useTheme() as CustomTheme;

  const workoutLogDetail = useWorkoutLogDetailContextMobile()
    .workout as WorkoutLogResponse;
  const visible =
    useWorkoutLogDetailContextMobile().mobileOverlayHandlers.isOverlayVisible;
  const setVisible =
    useWorkoutLogDetailContextMobile().mobileOverlayHandlers
      .setIsOverlayVisible!;

  if (!workoutLogDetail) return null;

  const styles = getStyles(theme);

  const containerStyle = {
    backgroundColor: theme.colors.background,
    paddingBlock: 20,
    marginInline: 16,
  };

  const duration = workoutLogDetail.duration
    ? formatDuration(workoutLogDetail.duration)
    : null;
  const date = new Date(workoutLogDetail.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Portal>
      <Modal
        visible={visible || false}
        onDismiss={() => setVisible(!visible)}
        contentContainerStyle={containerStyle}
      >
        <View style={{ paddingInline: 16 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 12,
            }}
          >
            <Button
              mode="outlined"
              textColor={theme.colors.light}
              onPress={() => setVisible(!visible)}
            >
              Back to Workouts
            </Button>
          </View>
          <Text variant="headlineLarge" style={{ color: theme.colors.light }}>
            {workoutLogDetail?.title}
          </Text>
          <ScrollView style={{ height: 660 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 12,
                marginBlock: 24,
              }}
            >
              <View>
                <Text variant="bodyLarge" style={styles.metadataTitle}>
                  {date}
                </Text>
                <Text variant="bodyLarge" style={styles.metadataTitle}>
                  {workoutLogDetail?.description}
                </Text>
                <Text variant="bodyLarge" style={styles.metadataTitle}>
                  {workoutLogDetail?.goal}
                </Text>
                {duration && (
                  <Text variant="bodyLarge" style={styles.metadataTitle}>
                    {duration}
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    metadataTitle: {
      fontWeight: 700,
      // textTransform: 'uppercase',
      // color: theme.colors.grey,
      color: theme.colors.light,
      marginBottom: 4,
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
