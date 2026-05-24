import * as React from 'react';
import { Card, useTheme } from 'react-native-paper';
import { View, StyleSheet, Platform } from 'react-native';

import { ExerciseResponse, Attributes } from '@cwt/schema/exercises';

import { CustomTheme } from '../../../theme';
import { Text } from '../../../customText';

import Pill from '../../Pill';

interface ExerciseCardProps {
  exercise: ExerciseResponse;
  isSelected: boolean;
  onExercisePress: () => void;
}

export default function ExerciseCard({
  exercise,
  isSelected,
  onExercisePress,
}: ExerciseCardProps) {
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

  return (
    <Card
      style={isSelected ? styles.cardActive : styles.card}
      onPress={(e) => onExercisePress()}
    >
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
      backgroundColor: theme.colors.elevation.level3,
      paddingBlock: 12,
      paddingInline: 16,
      borderColor: theme.colors.gray3,
      borderWidth: 1,
    },
    cardActive: {
      backgroundColor: theme.colors.lime0,
      paddingBlock: 12,
      paddingInline: 16,
      boxShadow:
        'rgba(222, 226, 230, 0.05) 0px 1px 3px 0px, rgba(222, 226, 230, 0.05) 0px 28px 23px -7px, rgba(222, 226, 230, 0.04) 0px 12px 12px -7px',
      borderColor: theme.colors.secondary,
      borderWidth: 1,
    },
    cardContent: {
      paddingHorizontal: 0,
      paddingVertical: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
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
