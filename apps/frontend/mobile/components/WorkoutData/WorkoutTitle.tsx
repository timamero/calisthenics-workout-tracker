// import { Title, TextInput, Button, Group } from '@mantine/core';
import { View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';

interface WorkoutTitleProps {
  isEditMode: boolean;
  workoutTitle: string;
  onEditClick: () => void;
  onSaveClick: () => void;
  onTitleChange: (value: string) => void;
}

export default function WorkoutTitle({
  isEditMode,
  workoutTitle,
  onEditClick,
  onSaveClick,
  onTitleChange,
}: WorkoutTitleProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <>
      {!isEditMode && (
        <View style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
          <View
            style={{
              flexGrow: 1,
              // flexShrink: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              // maxWidth: 200,
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
            <Button onPress={onEditClick}>Edit Title</Button>
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
              // minWidth: 200,
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
                // maxWidth:
                fontSize: 18,
              }}
              value={workoutTitle}
              onChangeText={(text) => onTitleChange(text)}
            />
            <Button onPress={onSaveClick}>Save</Button>
          </View>
        </View>
      )}
    </>
  );
}
