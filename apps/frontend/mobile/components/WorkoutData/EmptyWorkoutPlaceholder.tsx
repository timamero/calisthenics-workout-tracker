import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { CustomTheme } from '../../theme';
import { Text } from '../../customText';

export default function EmptyWorkoutPlaceholder() {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={{
        borderColor: theme.colors.grey,
        borderWidth: 2,
        borderStyle: 'dashed',
        display: 'flex',
        alignItems: 'center',
        marginInline: 20,
        padding: 16,
        gap: 16,
      }}
    >
      <Text
        variant="bodyLarge"
        style={{
          color: theme.colors.light,
          fontWeight: 800,
          textAlign: 'center',
        }}
      >
        Ready to start building your workout?
      </Text>
      <Text style={{ color: theme.colors.light, textAlign: 'center' }}>
        Add your first exercise to begin
      </Text>
    </View>
  );
}
