import { useContext } from 'react';
import { IconButton } from 'react-native-paper';
import { View } from 'react-native';

import WorkoutDraftContext from '../contexts/WorkoutDraftContext';

const Filter = () => {
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
