import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { CustomTheme } from '../theme';
import { globalStyles } from '../styles/global';

import WorkoutLogPages from '../components/WorkoutLogPages';

export default function HistoryScreen() {
  const theme = useTheme() as CustomTheme;

  const styles = globalStyles(theme);

  return (
    <View
      style={{
        ...styles.container,
        flex: 1,
        paddingBottom: 0,
      }}
    >
      <WorkoutLogPages />
    </View>
  );
}
