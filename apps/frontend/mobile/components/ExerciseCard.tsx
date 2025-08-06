import { Card, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { CustomTheme } from '../theme';
import { Text } from '../customText';

import Pill from './Pill';

export default function ExerciseCard() {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        {/* <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}> */}
        <View style={styles.difficultyContainer}>
          <Pill>Beginner</Pill>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pull Ups</Text>
        </View>
        <View style={styles.exerciseMetadataContainer}>
          <Text variant="bodySmall" style={styles.exerciseMetadataTitle}>
            Muscle:
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
            <Pill>Bicep</Pill>
            <Pill>Triceps</Pill>
          </View>
        </View>
        <View style={styles.exerciseMetadataContainer}>
          <Text variant="bodySmall" style={styles.exerciseMetadataTitle}>
            Equipment:
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
            <Pill>None</Pill>
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
    title: { fontSize: 16, fontWeight: 700 },
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
  });
