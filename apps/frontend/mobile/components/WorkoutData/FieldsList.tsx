import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import type { SetFields, Set, WorkoutExercise } from '@cwt/schema/workouts';

interface FieldsListProps {
  tracked: Pick<WorkoutExercise, 'tracked'>;
  set: Set;
  handleSetFieldChange: (updatedField: Partial<SetFields>) => void;
}

export default function FieldsList({
  tracked,
  set,
  handleSetFieldChange,
}: FieldsListProps) {
  const fields = tracked.tracked.map((field) => {
    if (field === 'reps') {
      return (
        <View key={set.id}>
          <TextInput
            keyboardType="number-pad"
            label="Reps"
            value={set.fields.reps!.toString()}
            onChangeText={(text) =>
              handleSetFieldChange({ reps: Number(text) })
            }
          />
        </View>
      );
    }
  });
  return <View>{fields}</View>;
}
