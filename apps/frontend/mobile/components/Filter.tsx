import { useContext } from 'react';
import { Button, useTheme } from 'react-native-paper';
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
        justifyContent: 'flex-end',
        marginTop: 16,
        // paddingBlock: 12,
        // paddingInline: 36,
      }}
    >
      <Button
        icon="filter-variant"
        mode="outlined"
        textColor={theme.colors.onBackground}
        contentStyle={{
          flexDirection: 'row-reverse',
        }}
        style={{
          borderColor: theme.colors.onBackground,
        }}
        onPress={() => setIsExerciseFilterVisible(true)}
      >
        Filter
      </Button>
    </View>
  );
};

export default Filter;
