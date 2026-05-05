import { useContext, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { SetContext } from '@cwt/context';
import type { CustomTheme } from '../../../../../../theme';
import {
  useLeveragesAssistsStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';
import { useFieldInputChange } from '@cwt/hooks';

interface SelectInputProps {
  label: string;
  fieldID: string;
  trackingType?: string | null;
}

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

  const options = leverageOrAssist.value_options.map((option: string) => ({
    key: option,
    value: option,
  }));

  const selectedValue =
    trackingType === 'leverages'
      ? set.fields.leverages?.find((field) => field.id === fieldID)?.value
      : set.fields.assists?.find((field) => field.id === fieldID)?.value;

  const [isOpen, setIsOpen] = useState(false);

  const styles = StyleSheet.create({
    container: {
      minWidth: 150,
      position: 'relative',
    },
    button: {
      borderWidth: 1,
      borderColor: theme.colors.outline,
      backgroundColor: 'transparent',
      padding: 12,
      borderRadius: 4,
    },
    buttonText: {
      color: theme.colors.onBackground,
    },
    modal: {
      margin: 0,
      justifyContent: 'flex-end',
    },
    dropdown: {
      maxHeight: 200,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.outline,
      borderWidth: 1,
      borderRadius: 4,
    },
    option: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    optionText: {
      color: theme.colors.onBackground,
    },
  });

  if (mode === 'read') {
    return (
      <View>
        <Text style={{ color: theme.colors.onBackground }}>{label}</Text>
        <Text style={{ color: theme.colors.onBackground }}>
          {selectedValue}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setIsOpen(true)}>
        <Text style={styles.buttonText}>{selectedValue || label}</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setIsOpen(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    handleChange(item.value);
                    setIsOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.value}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
