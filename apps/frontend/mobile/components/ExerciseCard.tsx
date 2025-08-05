import { Card, Text, useTheme } from 'react-native-paper';
import { View } from 'react-native';

import { CustomTheme } from '../App';
import Pill, { sizeTypes } from './Pill';
// use colors from mantine to match web
// set up theme, the earlier i set it up the better in the long run
export default function ExerciseCard() {
  const { colors } = useTheme() as CustomTheme;

  return (
    <Card
      style={{
        marginBlock: 12,
        marginInline: 36,
        backgroundColor: colors.background,
        boxShadow:
          'rgba(0, 0, 0, 0.05) 0px 1px 3px 0px, rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
        padding: 16,
      }}
    >
      {/* <Card.Content style={{ paddingTop: 0, paddingHorizontal: 0 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Pill size={sizeTypes.lg}>Beginner</Pill>
        </View>
      </Card.Content> */}
      {/* <Card.Title
        title="Push Ups"
        style={{
          paddingLeft: 0,
          minHeight: 'auto',
          marginBottom: 12,
        }}
      /> */}
      <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Pill size={sizeTypes.lg}>Beginner</Pill>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 16 }}>Pull Ups</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Text variant="bodyMedium" style={{ textTransform: 'uppercase' }}>
              Muscle:
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
              <Pill>Bicep</Pill>
              <Pill>Triceps</Pill>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Text variant="bodyMedium" style={{ textTransform: 'uppercase' }}>
              Equipment
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
              <Pill>None</Pill>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
