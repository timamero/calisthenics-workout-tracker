import { useContext } from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { View } from 'react-native';

import { CustomTheme } from '../theme';
import WorkoutDraftContext from '../contexts/WorkoutDraftContext';

const Filter = () => {
  const theme = useTheme() as CustomTheme;

  const setIsExerciseFilterVisible =
    useContext(WorkoutDraftContext)?.setIsExerciseFilterVisible!;

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <IconButton
        icon="filter-variant"
        mode="outlined"
        size={36}
        onPress={() => setIsExerciseFilterVisible(true)}
      />
    </View>
  );
};

export default Filter;
