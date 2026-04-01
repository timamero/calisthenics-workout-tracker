import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { WorkoutLogDetailContextProvider } from '@cwt/context';

import { CustomTheme } from '../theme';
import WorkoutLogPages from '../components/WorkoutLogPages';
import { useFetchExercises } from '../hooks/useFetchExercises';

export default function HistoryScreen() {
  const theme = useTheme() as CustomTheme;

  useFetchExercises();

  return (
    <WorkoutLogDetailContextProvider>
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
    </WorkoutLogDetailContextProvider>
  );
}
