import * as React from 'react';
import { Card, useTheme } from 'react-native-paper';
import { View, StyleSheet, Keyboard, Platform } from 'react-native';

import { ExerciseResponse, Attributes } from '@cwt/schema/exercises';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';
import { CustomTheme } from '../theme';
import { Text } from '../customText';

import Pill from './Pill';

interface ExerciseCardProps {
  exercise: ExerciseResponse;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const showModal = React.useContext(ExerciseDetailContext)?.showModal;
  const setExercise = React.useContext(ExerciseDetailContext)?.setExercise;
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  const getDifficultyStyles = () => {
    switch (exercise.difficulty) {
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

  const handleShowModal = () => {
    if (showModal && setExercise) {
      setExercise(exercise);
      showModal();
      Keyboard.dismiss();
    }
  };

  return (
    <Card style={styles.card} onPress={handleShowModal}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.difficultyContainer}>
          <Pill
            backgroundColor={difficultyStyles.backgroundColor}
            textColor={difficultyStyles.textColor}
            borderColor={difficultyStyles.borderColor}
          >
            {exercise.difficulty}
          </Pill>
        </View>
        <View style={styles.titleContainer}>
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.onBackground }}
          >
            {exercise.name}
          </Text>
        </View>
        <View style={styles.exerciseMetadataContainer}>
          <Text variant="bodySmall" style={styles.exerciseMetadataTitle}>
            Muscle:
          </Text>
          <View style={styles.metadataPillsContainer}>
            {exercise.target_muscles.map((muscle, i) => {
              return (
                <Pill
                  backgroundColor={theme.colors.gray2}
                  textColor={theme.colors.dark4}
                  key={i}
                >
                  {muscle}
                </Pill>
              );
            })}
          </View>
        </View>
        <View style={styles.exerciseMetadataContainer}>
          <Text variant="bodySmall" style={styles.exerciseMetadataTitle}>
            Equipment:
          </Text>
          <View style={styles.metadataPillsContainer}>
            {exercise.required_equipment == null ||
            exercise.required_equipment.length === 0 ? (
              <Pill
                backgroundColor={theme.colors.background}
                textColor={theme.colors.dark7}
              >
                {`---` as '---'}
              </Pill>
            ) : (
              exercise.required_equipment.map((equipment, i) => (
                <Pill
                  backgroundColor={theme.colors.dark7}
                  textColor={theme.colors.white}
                  key={i}
                >
                  {equipment as Attributes}
                </Pill>
              ))
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    card: {
      // marginBlock: 12,
      // marginInline: 36,
      backgroundColor: theme.colors.background,
      boxShadow:
        'rgba(222, 226, 230, 0.05) 0px 1px 3px 0px, rgba(222, 226, 230, 0.05) 0px 28px 23px -7px, rgba(222, 226, 230, 0.04) 0px 12px 12px -7px',
      padding: 16,
      borderColor: theme.colors.onBackground,
      borderWidth: 1,
    },
    cardContent: {
      paddingHorizontal: 0,
      paddingVertical: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    },
    difficultyContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 12,
    },
    exerciseMetadataContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    exerciseMetadataTitle: {
      textTransform: 'uppercase',
      color: theme.colors.dark5,
      fontFamily: Platform.select({
        web: 'ElmsSans-Bold, source-sans-pro, sans-serif',
        ios: 'ElmsSans-Bold',
        android: 'ElmsSans-Bold',
        default: 'sans-serif',
      }),
    },
    metadataPillsContainer: {
      width: '80%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
  });
