import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import type { SetFields, Set } from '@cwt/schema/workouts';

interface SetListItemProps {
  field: 'reps' | 'time' | 'weight' | 'rpe';
  set: Set;
  setIndex: number;
  handleSetFieldChange: (
    setIndex: number,
    updatedField: Partial<SetFields>,
  ) => void;
}

export default function SetListItem({
  field,
  set,
  setIndex,
  handleSetFieldChange,
}: SetListItemProps) {
  if (field === 'reps') {
    return (
      <View key={set.id}>
        <TextInput
          keyboardType="number-pad"
          label="Reps"
          value={set.fields.reps!.toString()}
          onChangeText={(text) =>
            handleSetFieldChange(setIndex, { reps: Number(text) })
          }
        />
      </View>
    );
  }
}
