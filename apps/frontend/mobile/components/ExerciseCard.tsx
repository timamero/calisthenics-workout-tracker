import { Card, Text } from 'react-native-paper';
import { View } from 'react-native';

import Pill, { sizeTypes } from './Pill';

export default function ExerciseCard() {
  return (
    <Card>
      <Card.Title
        title="Push Ups"
        right={() => <Pill size={sizeTypes.lg}>Beginner</Pill>}
      />
      <Card.Content>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text variant="bodyMedium">Muscle:</Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Pill>Bicep</Pill>
            <Pill>Triceps</Pill>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text variant="bodyMedium">Equipment</Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Pill>None</Pill>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

// styles = StyleSheet.create({

// })
