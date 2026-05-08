import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import { CustomTheme } from '../../../theme';
import { Text } from '../../../customText';
import CustomButton from '../CustomButton';

interface TextInputWithEditUIProps {
  isEditMode: boolean;
  text: string;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
  onTextChange: (value: string) => void;
  hideEdit: boolean;
  variant: 'title' | 'body';
}

export default function TextInputWithEditUI({
  isEditMode,
  text,
  onEditClick,
  onCancelClick,
  onSaveClick,
  onTextChange,
  hideEdit,
  variant,
}: TextInputWithEditUIProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <View style={{ paddingBottom: 24 }}>
      {!isEditMode && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingInline: 16,
            paddingBlock: 32,
            borderRadius: 8,
            gap: 8,
          }}
        >
          <Text
            variant={variant === 'title' ? 'headlineLarge' : 'bodyLarge'}
            numberOfLines={3}
            style={{
              color: theme.colors.onBackground,
              minWidth: 'auto',
              flexShrink: 1,
            }}
          >
            {text}
          </Text>
          {!hideEdit && (
            <CustomButton mode="contained" onPress={onEditClick}>
              Edit
            </CustomButton>
          )}
        </View>
      )}
      {isEditMode && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            backgroundColor: theme.colors.background,
            paddingInline: 16,
            paddingBlock: 32,
            borderRadius: 8,
          }}
        >
          <View
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <TextInput
              mode="outlined"
              textColor={theme.colors.dark5}
              style={{
                height: 40,
                minWidth: 240,
                flexShrink: 1,
                fontSize: 18,
              }}
              value={text}
              onChangeText={(text) => onTextChange(text)}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 16,
                paddingTop: 16,
              }}
            >
              <CustomButton
                theme={{
                  colors: {
                    primary: theme.colors.dark4,
                  },
                }}
                onPress={() => onCancelClick()}
              >
                Cancel
              </CustomButton>
              <CustomButton mode="contained" onPress={() => onSaveClick()}>
                Save
              </CustomButton>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
