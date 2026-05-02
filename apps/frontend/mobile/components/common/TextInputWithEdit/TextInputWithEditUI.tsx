import { View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

import { CustomTheme } from '../../../theme';
import { Text } from '../../../customText';

interface TextInputWithEditUIProps {
  isEditMode: boolean;
  text: string;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
  onTextChange: (value: string) => void;
}

export default function TextInputWithEditUI({
  isEditMode,
  text,
  onEditClick,
  onCancelClick,
  onSaveClick,
  onTextChange,
}: TextInputWithEditUIProps) {
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
              {text}
            </Text>
            <Button onPress={onEditClick}>Edit</Button>
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
              value={text}
              onChangeText={(text) => onTextChange(text)}
            />
            <Button onPress={() => onCancelClick()}>Cancel</Button>
            <Button onPress={() => onSaveClick()}>Save</Button>
          </View>
        </View>
      )}
    </View>
  );
}
