import { Card, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { Exercise } from '@cwt/schema/exerciseSchema';

import { CustomTheme } from '../theme';
import { Text } from '../customText';

import Pill from './Pill';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.difficultyContainer}>
          <Pill>{exercise.difficulty}</Pill>
        </View>
        <View style={styles.titleContainer}>
          <Text variant="headlineMedium">{exercise.name}</Text>
        </View>
        <View style={styles.exerciseMetadataContainer}>
          <Text variant="bodySmall" style={styles.exerciseMetadataTitle}>
            Muscle:
          </Text>
          <View style={styles.metadataPillsContainer}>
            {exercise.target_muscles.map((muscle, i) => {
              return <Pill key={i}>{muscle}</Pill>;
            })}
          </View>
        </View>
        <View style={styles.exerciseMetadataContainer}>
          <Text variant="bodySmall" style={styles.exerciseMetadataTitle}>
            Equipment:
          </Text>
          <View style={styles.metadataPillsContainer}>
            {exercise.required_equipment == null ||
            exercise.required_equipment.length == 0 ? (
              <Pill>---</Pill>
            ) : (
              exercise.required_equipment.map((equipment, i) => (
                <Pill key={i}>{equipment}</Pill>
              ))
            )}
          </View>
        </View>
        {/* </View> */}
      </Card.Content>
    </Card>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    card: {
      marginBlock: 12,
      marginInline: 36,
      backgroundColor: theme.colors.background,
      boxShadow:
        'rgba(0, 0, 0, 0.05) 0px 1px 3px 0px, rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
      padding: 16,
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
      alignItems: 'center',
      gap: 12,
    },
    exerciseMetadataTitle: {
      textTransform: 'uppercase',
      color: theme.colors.grey,
    },
    metadataPillsContainer: { display: 'flex', flexDirection: 'row', gap: 8 },
  });
