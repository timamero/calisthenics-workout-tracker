import * as React from 'react';
import { Card, Text } from 'react-native-paper';

export default function ExerciseCard() {
  return (
    <Card>
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        // left={LeftContent}
      />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
    </Card>
  );
}
