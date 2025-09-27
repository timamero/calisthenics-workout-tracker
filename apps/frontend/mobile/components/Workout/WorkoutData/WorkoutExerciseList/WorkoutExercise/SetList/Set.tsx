import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import { Mode } from '@cwt/schema/workouts';

import { Text } from '../../../../../../customText';
import { CustomTheme } from '../../../../../../theme';
import FieldsList from './FieldsList';

interface SetProps {
  mode: Mode;
  setIndex: number;
  showDeleteButton: boolean;
  onDeleteSetPress: () => void;
}

export default function Set({
  mode,
  setIndex,
  showDeleteButton,
  onDeleteSetPress,
}: SetProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      key={`set-${setIndex}`}
      style={{
        borderWidth: 1,
        borderColor: theme.colors.darkGrey,
        paddingInline: 8,
        paddingBlock: 16,
        marginBlock: 8,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{ color: theme.colors.light }}
        >{`Set ${setIndex + 1}`}</Text>
        {showDeleteButton && mode !== 'log' && (
          <Button
            mode="outlined"
            onPress={() => onDeleteSetPress()}
            labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
            textColor={theme.colors.grey}
            style={{ borderColor: theme.colors.error }}
          >
            Delete Set
          </Button>
        )}
      </View>
      <FieldsList />
    </View>
  );
}
