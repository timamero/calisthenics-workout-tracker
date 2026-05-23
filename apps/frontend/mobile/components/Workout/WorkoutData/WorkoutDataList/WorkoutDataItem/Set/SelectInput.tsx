import { useContext, useState } from 'react';
import { View } from 'react-native';
import { useTheme, Menu } from 'react-native-paper';
import { SetContext } from '@cwt/context';
import {
  useLeveragesAssistsStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';
import { useFieldInputChange } from '@cwt/hooks';

import { Text } from '../../../../../../customText';
import CustomButton from '../../../../../common/CustomButton';
import type { CustomTheme } from '../../../../../../theme';
import TextInputReading from './TextInputReading';

interface SelectInputProps {
  label: string;
  fieldID: string;
  trackingType?: string | null;
}

type OptionType = {
  key: string;
  value: string;
};

export default function SelectInput({
  label,
  fieldID,
  trackingType = null,
}: SelectInputProps) {
  const theme = useTheme() as CustomTheme;

  const set = useContext(SetContext)!.set;
  const mode = useWorkoutDraftStore((state) => state.mode);

  const leverageOrAssistID =
    trackingType === 'leverages'
      ? (set.fields.leverages?.find((field) => field.id === fieldID)!
          .leverages_assists_id as number)
      : (set.fields.assists?.find((field) => field.id === fieldID)!
          .leverages_assists_id as number);

  const leverageOrAssist = useLeveragesAssistsStore((state) =>
    state.getLeverageOrAssistByID(leverageOrAssistID),
  );

  const handleChange = useFieldInputChange('value', 'select', fieldID);

  const options: OptionType[] = leverageOrAssist.value_options.map(
    (option: string) => ({
      key: option,
      value: option,
    }),
  );

  const selectedValue =
    trackingType === 'leverages'
      ? set.fields.leverages?.find((field) => field.id === fieldID)?.value
      : set.fields.assists?.find((field) => field.id === fieldID)?.value;

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  if (mode === 'read') {
    return (
      <TextInputReading
        label={label}
        labelWidth={116}
        value={
          selectedValue === undefined || !selectedValue
            ? ''
            : selectedValue.toString()
        }
      />
    );
  }

  return (
    <View style={{ display: 'flex', gap: 4 }}>
      <View style={{ width: 116 }}>
        <Text variant="labelMedium">{leverageOrAssist.name}</Text>
      </View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <CustomButton
            mode="contained"
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderColor: theme.colors.outline,
            }}
            disabled={set.completed}
            labelStyle={{ fontFamily: 'SourceCodePro-Regular' }}
            onPress={openMenu}
            theme={{
              colors: {
                primary: theme.colors.background,
                onPrimary: theme.colors.onBackground,
              },
            }}
          >
            {selectedValue || label}
          </CustomButton>
        }
        anchorPosition="top"
      >
        {options.map((option) => {
          return (
            <Menu.Item
              key={option.key}
              titleStyle={{ fontFamily: 'SourceCodePro-Regular', fontSize: 14 }}
              onPress={() => {
                closeMenu();
                handleChange(option.value);
              }}
              title={option.value}
            />
          );
        })}
      </Menu>
    </View>
  );
}
