import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';
import FieldsList from './FieldsList';

interface SetProps {
  setIndex: number;
  showDeleteButton: boolean;
  onDeleteSetPress: () => void;
}

export default function Set({
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
        {showDeleteButton && (
          <Button
            mode="outlined"
            onPress={() => onDeleteSetPress()}
            labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
          >
            Delete Set
          </Button>
        )}
      </View>
      <FieldsList />
    </View>
  );
}
