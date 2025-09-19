import { View } from 'react-native';
import { Divider, useTheme, Button } from 'react-native-paper';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';
import SetList from './SetList';

interface WorkoutExerciseProps {
  name: string;
  exerciseIndex: number;
  handleAddSet: (exerciseIndex: number) => void;
  handleDeleteExercisePress: () => void;
}

export default function WorkoutExercise({
  name,
  exerciseIndex,
  handleAddSet,
  handleDeleteExercisePress,
}: WorkoutExerciseProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <View style={{ marginInline: 16 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.light,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          {name}
        </Text>
        <Button
          mode="outlined"
          onPress={handleDeleteExercisePress}
          labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
          textColor={theme.colors.grey}
          style={{ borderColor: theme.colors.error }}
        >
          Delete Exercise
        </Button>
      </View>
      <SetList exerciseIndex={exerciseIndex} />
      <View style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button
          mode="contained"
          onPress={() => handleAddSet(exerciseIndex)}
          buttonColor={theme.colors.grey}
          textColor={theme.colors.dark9}
        >
          Add Set
        </Button>
      </View>
      <Divider style={{ marginTop: 24 }} />
    </View>
  );
}
