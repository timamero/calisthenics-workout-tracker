import * as React from 'react';
import { Card, Text } from 'react-native-paper';

export default function ExerciseCard() {
  return (
    <Card>
      <Card.Title title="Push Ups" right={() => <Text>Beginner</Text>} />
      <Card.Content>
        <Text variant="bodyMedium">Muscle</Text>
        <Text variant="bodySmall">Chest</Text>
        <Text variant="bodySmall">Triceps</Text>
        <Text variant="bodyMedium">Equipment</Text>
        <Text variant="bodySmall">None</Text>
      </Card.Content>
    </Card>
  );
}
