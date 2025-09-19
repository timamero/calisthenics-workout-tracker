import * as React from 'react';
import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import type { Set, SetFields, WorkoutExercise } from '@cwt/schema/workouts';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';
import FieldsList from './FieldsList';

interface SetProps {
  setIndex: number;
  showDeleteButton: boolean;
  // tracked: Pick<WorkoutExercise, 'tracked'>;
  // set: Set;
  onDeleteSetPress: () => void;
  // handleSetFieldChange: (updatedField: Partial<SetFields>) => void;
}

export default function Set({
  setIndex,
  showDeleteButton,
  // tracked,
  // set,
  onDeleteSetPress,
  // handleSetFieldChange,
}: SetProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <View key={`set-${setIndex}`}>
      <View>
        <Text
          style={{ color: theme.colors.light }}
        >{`Set ${setIndex + 1}`}</Text>
        {showDeleteButton && (
          <Button mode="outlined" onPress={() => onDeleteSetPress()}>
            Delete
          </Button>
        )}
      </View>
      <FieldsList
      // tracked={tracked}
      // set={set}
      // handleSetFieldChange={handleSetFieldChange}
      />
    </View>
  );
}
