import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';

import { Text } from '../customText';
import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

import Pill from './Pill';

export default function ExerciseDetailOverlay() {
  const hideModal = React.useContext(ExerciseDetailContext)?.hideModal;
  const visible = React.useContext(ExerciseDetailContext)?.visible;
  const exercise = React.useContext(ExerciseDetailContext)?.exercise;
  const theme = useTheme();

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
      <Pill
        key={i}
        backgroundColor="rgba(190, 75, 219, .1)"
        textColor="rgb(190, 75, 219)"
      >
        {muscle}
      </Pill>
    );
  });
  const equipmentMetadata = exercise?.required_equipment?.map(
    (equipment, i) => {
      return (
        <Pill
          key={i}
          backgroundColor="white"
          textColor="rgb(46, 46, 46)"
          borderColor="rgb(46, 46, 46)"
        >
          {equipment}
        </Pill>
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
        <View>
          <Button>Go back to Exercises</Button>
          <Text>{exercise?.name}</Text>
          <View>
            <View>
              <Text>Difficulty</Text>
              <Pill backgroundColor={difficultyColor} textColor="white">
                {exercise?.difficulty || ''}
              </Pill>
            </View>
            <View>
              <Text>Emphasis</Text>
              <Pill
                backgroundColor="rgba(73, 80, 87, 0.1)"
                textColor="rgb(46, 46, 46)"
              >
                {exercise?.emphasis || ''}
              </Pill>
            </View>
            <View>
              <Text>Target Muscles</Text>
              <View>{muscleMetadata}</View>
            </View>
            <View>
              <Text>Required Equipment</Text>
              <View>
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
