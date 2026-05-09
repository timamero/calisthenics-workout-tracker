import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import { CustomTheme } from '../../../theme';
import { Text } from '../../../customText';
import CustomButton from '../CustomButton';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';

interface TextInputWithEditUIProps {
  isEditMode: boolean;
  text: string;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
  onTextChange: (value: string) => void;
  hideEdit: boolean;
  variant: 'title' | 'body';
  size: 'lg' | 'md' | 'sm';
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
  size,
}: TextInputWithEditUIProps) {
  const theme = useTheme() as CustomTheme;

  let appliedVariant: VariantProp<string>;

  if (variant === 'title') {
    if (size === 'lg') {
      appliedVariant = 'headlineLarge';
    } else if (size === 'md') {
      appliedVariant = 'headlineMedium';
    } else {
      appliedVariant = 'headlineSmall';
    }
  } else {
    if (size === 'lg') {
      appliedVariant = 'bodyLarge';
    } else if (size === 'md') {
      appliedVariant = 'bodyMedium';
    } else {
      appliedVariant = 'bodySmall';
    }
  }

  return (
    <View>
      {!isEditMode && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingInline: 16,
            paddingBlock: 4,
            borderRadius: 8,
            marginBlock: 4,
            gap: 8,
          }}
        >
          <Text
            // variant={variant === 'title' ? 'headlineLarge' : 'bodyLarge'}
            variant={appliedVariant}
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
            <CustomButton
              mode="contained-tonal"
              onPress={onEditClick}
              icon="pencil"
            >
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
            paddingBlock: 4,
            borderRadius: 8,
            marginBlock: 4,
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
              <CustomButton
                mode="contained-tonal"
                onPress={() => onSaveClick()}
                icon="check-bold"
              >
                Save
              </CustomButton>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
