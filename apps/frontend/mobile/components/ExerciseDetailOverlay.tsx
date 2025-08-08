import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';

import { Text } from '../customText';
import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

import Pill from './Pill';

export default function ExerciseDetailOverlay() {
  const hideModal = React.useContext(ExerciseDetailContext)?.hideModal;
  const visible = React.useContext(ExerciseDetailContext)?.visible;
  const exercise = React.useContext(ExerciseDetailContext)?.exercise;
  const theme = useTheme();
  const styles = getStyles();

  const difficultyColor =
    exercise?.difficulty === 'beginner'
      ? '#228be6'
      : exercise?.difficulty === 'intermediate'
        ? '#fab005'
        : '#fa5252';

  const containerStyle = {
    backgroundColor: theme.colors.background,
    paddingBlock: 20,
    marginInline: 16,
  };

  const muscleMetadata = exercise?.target_muscles.map((muscle, i) => {
    return (
      <View key={i} style={styles.flexRowStart}>
        <Pill
          backgroundColor="rgba(190, 75, 219, .1)"
          textColor="rgb(190, 75, 219)"
        >
          {muscle}
        </Pill>
      </View>
    );
  });
  const equipmentMetadata = exercise?.required_equipment?.map(
    (equipment, i) => {
      return (
        <View key={i} style={styles.flexRowStart}>
          <Pill
            backgroundColor="white"
            textColor="rgb(46, 46, 46)"
            borderColor="rgb(46, 46, 46)"
          >
            {equipment}
          </Pill>
        </View>
      );
    },
  );
  const instructions = exercise?.instructions.map((instruction, i) => {
    const regex = /\d\. /g;
    return (
      <View key={i}>
        <View
          style={{
            borderColor: 'rgb(46, 46, 46)',
          }}
        >
          <Text>{i + 1}</Text>
        </View>
        <Text>{instruction.split(regex)[1]}</Text>
      </View>
    );
  });

  return (
    <Portal>
      <Modal
        visible={visible || false}
        onDismiss={hideModal}
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
            <Button mode="outlined" textColor="rgb(46, 46, 46)">
              Back to Exercises
            </Button>
          </View>
          <Text variant="headlineLarge">{exercise?.name}</Text>
          <View
            style={{ display: 'flex', flexDirection: 'column', rowGap: 12 }}
          >
            <View>
              <Text variant="bodyLarge" style={styles.metadataTitle}>
                Difficulty
              </Text>
              <View style={styles.flexRowStart}>
                <Pill backgroundColor={difficultyColor} textColor="white">
                  {exercise?.difficulty || ''}
                </Pill>
              </View>
            </View>
            <View>
              <Text variant="bodyLarge" style={styles.metadataTitle}>
                Emphasis
              </Text>
              <View style={styles.flexRowStart}>
                <Pill
                  backgroundColor="rgba(73, 80, 87, 0.1)"
                  textColor="rgb(46, 46, 46)"
                >
                  {exercise?.emphasis || ''}
                </Pill>
              </View>
            </View>
            <View>
              <Text variant="bodyLarge" style={styles.metadataTitle}>
                Target Muscles
              </Text>
              <View style={styles.pillsContainer}>{muscleMetadata}</View>
            </View>
            <View>
              <Text variant="bodyLarge" style={styles.metadataTitle}>
                Required Equipment
              </Text>
              <View style={styles.pillsContainer}>
                {exercise?.required_equipment == null ||
                exercise.required_equipment.length === 0 ? (
                  <Pill backgroundColor="white" textColor="rgb(46, 46, 46)">
                    ---
                  </Pill>
                ) : (
                  equipmentMetadata
                )}
              </View>
            </View>
          </View>
          <View>
            <Text>Instructions</Text>
            <View>{instructions}</View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const getStyles = () =>
  StyleSheet.create({
    metadataTitle: {
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'rgb(73, 80, 87)',
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
