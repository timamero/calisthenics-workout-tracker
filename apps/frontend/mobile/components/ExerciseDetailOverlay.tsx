import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';

import { Equipment, Difficulty, Emphasis } from '@cwt/schema/exercises';

import { Text } from '../customText';
import { CustomTheme } from '../theme';
import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

import Pill from './Pill';

export default function ExerciseDetailOverlay() {
  const hideModal = React.useContext(ExerciseDetailContext)?.hideModal;
  const visible = React.useContext(ExerciseDetailContext)?.visible;
  const exercise = React.useContext(ExerciseDetailContext)?.exercise;
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  const difficultyColor =
    exercise?.difficulty === 'beginner'
      ? theme.colors.beginnerPillColor
      : exercise?.difficulty === 'intermediate'
        ? theme.colors.intermediatePillColor
        : theme.colors.advancedPillColor;

  const containerStyle = {
    backgroundColor: theme.colors.background,
    paddingBlock: 20,
    marginInline: 16,
  };
  const muscleMetadata = exercise?.target_muscles.map((muscle, i) => {
    return (
      <View key={i} style={styles.flexRowStart}>
        <Pill
          backgroundColor={theme.colors.musclePillBgColor}
          textColor={theme.colors.musclePillColor}
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
            backgroundColor={theme.colors.background}
            textColor={theme.colors.onBackground}
            borderColor={theme.colors.onBackground}
          >
            {equipment as Equipment}
          </Pill>
        </View>
      );
    },
  );
  const instructions = exercise?.instructions.map((instruction, i) => {
    const regex = /\d\. /g;
    return (
      <View key={i} style={{ ...styles.flexRowStart, gap: 16 }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              borderColor: theme.colors.onBackground,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              paddingInline: 8,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: theme.colors.onBackground,
              }}
            >
              {i + 1}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.colors.onBackground }}>
            {instruction.split(regex)[1]}
          </Text>
        </View>
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
            <Button
              mode="outlined"
              textColor={theme.colors.onBackground}
              onPress={hideModal}
            >
              Back to Exercises
            </Button>
          </View>
          <Text
            variant="headlineLarge"
            style={{ color: theme.colors.onBackground }}
          >
            {exercise?.name}
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
                  Difficulty
                </Text>
                <View style={styles.flexRowStart}>
                  <Pill
                    backgroundColor={difficultyColor}
                    textColor={theme.colors.onBackground}
                  >
                    {(exercise?.difficulty as Difficulty) || ''}
                  </Pill>
                </View>
              </View>
              <View>
                <Text variant="bodyLarge" style={styles.metadataTitle}>
                  Emphasis
                </Text>
                <View style={styles.flexRowStart}>
                  <Pill
                    backgroundColor={theme.colors.background}
                    textColor={theme.colors.onBackground}
                  >
                    {(exercise?.emphasis as Emphasis) || ''}
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
                    <Pill
                      backgroundColor={theme.colors.background}
                      textColor={theme.colors.onBackground}
                    >
                      {'---' as '---'}
                    </Pill>
                  ) : (
                    equipmentMetadata
                  )}
                </View>
              </View>
            </View>
            <View>
              <Text
                variant="headlineMedium"
                style={{ color: theme.colors.onBackground }}
              >
                Instructions
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  marginTop: 12,
                }}
              >
                {instructions}
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
      textTransform: 'uppercase',
      color: theme.colors.onBackground,
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
