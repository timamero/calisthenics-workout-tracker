import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { CustomTheme } from '../theme';
import WorkoutLogPages from '../components/WorkoutLogPages';

export default function HistoryScreen() {
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
      <WorkoutLogPages />
    </View>
  );
}
