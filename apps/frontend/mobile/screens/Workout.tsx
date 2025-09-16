import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { CustomTheme } from '../theme';
import { Text } from '../customText';

export default function WorkoutScreen() {
  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation<any>();

  navigation.setOptions({ title: 'Workout Title Here' });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="headlineLarge" style={{ color: theme.colors.light }}>
        Workout Page
      </Text>
    </View>
  );
}
