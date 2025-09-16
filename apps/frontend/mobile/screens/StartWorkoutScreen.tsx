import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { CustomTheme } from '../theme';
import { Text } from '../customText';
import CardButton from '../components/common/CardButton';

export default function StartWorkoutScreen() {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={{ color: theme.colors.light }}>
        Create or Begin A Workout
      </Text>
      <CardButton>Example card</CardButton>
    </View>
  );
}
