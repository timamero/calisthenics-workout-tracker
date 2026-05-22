import * as React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const height = Dimensions.get('window').height;
  const { top, bottom } = useSafeAreaInsets();
  const overlayHeight = height - (top + bottom);

  const getDifficultyStyles = () => {
    switch (exercise?.difficulty) {
      case 'beginner':
        return {
          backgroundColor: theme.colors.lime2,
          textColor: theme.colors.dark7,
          borderColor: theme.colors.dark7,
        };
      case 'intermediate':
        return {
          backgroundColor: theme.colors.teal2,
          textColor: theme.colors.dark7,
          borderColor: theme.colors.dark7,
        };
      default:
        return {
          backgroundColor: theme.colors.violet2,
          textColor: theme.colors.dark7,
          borderColor: theme.colors.dark7,
        };
    }
  };

  const difficultyStyles = getDifficultyStyles();

  const containerStyle = {
    backgroundColor: theme.colors.elevation.level3,
  };
  const muscleMetadata = exercise?.target_muscles.map((muscle, i) => {
    return (
      <View key={i} style={styles.flexRowStart}>
        <Pill
          backgroundColor={theme.colors.gray2}
          textColor={theme.colors.dark4}
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
            backgroundColor={theme.colors.dark7}
            textColor={theme.colors.white}
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
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderColor: theme.colors.onBackground,
            borderWidth: 1,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.colors.onBackground,
            }}
          >
            {i + 1}
          </Text>
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
        <View style={{ padding: 16, height: overlayHeight }}>
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
          <ScrollView>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 12,
                marginBlock: 24,
              }}
            >
              <View>
                <Text style={styles.metadataTitle}>Difficulty</Text>
                <View style={styles.flexRowStart}>
                  <Pill
                    backgroundColor={difficultyStyles.backgroundColor}
                    textColor={difficultyStyles.textColor}
                    borderColor={difficultyStyles.borderColor}
                  >
                    {(exercise?.difficulty as Difficulty) || ''}
                  </Pill>
                </View>
              </View>
              <View>
                <Text style={styles.metadataTitle}>Emphasis</Text>
                <View style={styles.flexRowStart}>
                  <Pill
                    backgroundColor={theme.colors.lime0}
                    textColor={theme.colors.onBackground}
                  >
                    {(exercise?.emphasis as Emphasis) || ''}
                  </Pill>
                </View>
              </View>
              <View>
                <Text style={styles.metadataTitle}>Target Muscles</Text>
                <View style={styles.pillsContainer}>{muscleMetadata}</View>
              </View>
              <View>
                <Text style={styles.metadataTitle}>Required Equipment</Text>
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
                style={{
                  color: theme.colors.onBackground,
                  textTransform: 'uppercase',
                  letterSpacing: 0.64,
                }}
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
      fontFamily: 'ElmsSans-Bold',
      letterSpacing: 1.6,
      textTransform: 'uppercase',
      color: theme.colors.gray7,
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
