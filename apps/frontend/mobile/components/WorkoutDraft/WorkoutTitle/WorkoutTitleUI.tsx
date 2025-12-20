import { View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

import { Mode } from '@cwt/schema/workouts';

import { CustomTheme } from '../../../theme';
import { Text } from '../../../customText';

interface WorkoutTitleUIProps {
  mode: Mode;
  isEditMode: boolean;
  workoutTitle: string;
  onEditClick: () => void;
  onSaveClick: () => void;
  onTitleChange: (value: string) => void;
}

export default function WorkoutTitleUI({
  mode,
  isEditMode,
  workoutTitle,
  onEditClick,
  onSaveClick,
  onTitleChange,
}: WorkoutTitleUIProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <View style={{ paddingBottom: 24 }}>
      {!isEditMode && (
        <View style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
          <View
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Text
              variant="bodyLarge"
              numberOfLines={2}
              style={{
                color: theme.colors.light,
                fontWeight: 800,
                minWidth: 200,
                flexShrink: 1,
              }}
            >
              {workoutTitle}
            </Text>
            {mode !== 'log' && (
              <Button onPress={onEditClick}>Edit Title</Button>
            )}
          </View>
        </View>
      )}
      {isEditMode && (
        <View style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
          <View
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <TextInput
              mode="outlined"
              textColor={theme.colors.grey}
              style={{
                height: 40,
                fontWeight: 800,
                minWidth: 240,
                flexShrink: 1,
                fontSize: 18,
              }}
              value={workoutTitle}
              onChangeText={(text) => onTitleChange(text)}
            />
            <Button onPress={onSaveClick}>Save</Button>
          </View>
        </View>
      )}
    </View>
  );
}
