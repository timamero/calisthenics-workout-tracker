import * as React from 'react';
import { Card, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

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

  return (
    <Card
      style={isSelected ? styles.cardActive : styles.card}
      onPress={(e) => onExercisePress()}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.titleContainer}>
          {/* <Text variant="headlineMedium" style={{ color: theme.colors.light }}> */}
          <Text variant="headlineMedium">{exercise.name}</Text>
        </View>
        <View style={styles.exerciseMetadataContainer}>
          <Text variant="bodySmall" style={styles.exerciseMetadataTitle}>
            Muscle:
          </Text>
          <View style={styles.metadataPillsContainer}>
            {exercise.target_muscles.map((muscle, i) => {
              return (
                <Pill
                  backgroundColor={theme.colors.musclePillBgColor}
                  textColor={theme.colors.musclePillColor}
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
                textColor={theme.colors.onBackground}
              >
                {`---` as '---'}
              </Pill>
            ) : (
              exercise.required_equipment.map((equipment, i) => (
                <Pill
                  backgroundColor={theme.colors.background}
                  textColor={theme.colors.onBackground}
                  borderColor={theme.colors.onBackground}
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
      marginBlock: 12,
      marginInline: 12,
      backgroundColor: theme.colors.background,
      boxShadow:
        'rgba(222, 226, 230, 0.05) 0px 1px 3px 0px, rgba(222, 226, 230, 0.05) 0px 28px 23px -7px, rgba(222, 226, 230, 0.04) 0px 12px 12px -7px',
      padding: 16,
      borderColor: theme.colors.onBackground,
      borderWidth: 1,
    },
    cardActive: {
      marginBlock: 12,
      marginInline: 12,
      backgroundColor: theme.colors.background,
      boxShadow:
        'rgba(222, 226, 230, 0.05) 0px 1px 3px 0px, rgba(222, 226, 230, 0.05) 0px 28px 23px -7px, rgba(222, 226, 230, 0.04) 0px 12px 12px -7px',
      padding: 16,
      borderColor: theme.colors.secondary,
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
      // flexWrap: 'wrap',
      alignItems: 'center',
      gap: 12,
    },
    exerciseMetadataTitle: {
      textTransform: 'uppercase',
      color: theme.colors.dark5,
    },
    metadataPillsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      maxWidth: 240,
    },
  });
