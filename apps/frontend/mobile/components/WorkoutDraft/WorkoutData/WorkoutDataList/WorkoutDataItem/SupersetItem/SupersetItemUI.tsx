import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import type { Mode, Superset } from '@cwt/schema/workouts';
// import { WorkoutDataItemContext } from '@cwt/context';

// import { ExerciseItemContainer } from '../ExerciseItem';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import { CustomTheme } from '../../../../../../theme';
import { Text } from '../../../../../../customText';
import ExercisesList from './ExercisesList';
import ExerciseSetGroup from '../ExerciseSetGroup';

interface SupersetItemUIProps {
  mode: Mode;
  superset: Superset;
  isFirst: boolean;
  isLast: boolean;
  handleUpPress: () => void;
  handleDownPress: () => void;
  handleDeleteSupersetPress: () => void;
  handleOpenAddExercisePress: () => void;
}

export default function SupersetItemUI({
  mode,
  isFirst,
  isLast,
  handleUpPress,
  handleDownPress,
  handleDeleteSupersetPress,
  handleOpenAddExercisePress,
}: SupersetItemUIProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.outline,
        borderWidth: 1,
        paddingInline: 4,
        paddingBlock: 16,
        marginBlock: 8,
        marginInline: 4,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          {(mode === 'build' || mode === 'edit') && (
            <ReorderButtonGroup
              handleUpPress={() => handleUpPress()}
              handleDownPress={() => handleDownPress()}
              isFirst={isFirst}
              isLast={isLast}
            />
          )}
          <Text style={{ color: theme.colors.onBackground }}>Superset</Text>
        </View>
        {(mode === 'build' || mode === 'edit') && (
          <Button
            mode="outlined"
            labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
            textColor={theme.colors.onBackground}
            style={{ borderColor: theme.colors.error, flexShrink: 0 }}
            onPress={() => handleDeleteSupersetPress()}
          >
            Delete
          </Button>
        )}
      </View>
      {mode === 'build' || mode === 'edit' ? (
        <ExercisesList />
      ) : (
        <ExerciseSetGroup />
      )}
      {(mode === 'build' || mode === 'edit') && (
        <Button
          mode="outlined"
          labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
          textColor={theme.colors.primary}
          style={{ borderColor: theme.colors.primary, flexShrink: 0 }}
          onPress={() => handleOpenAddExercisePress()}
        >
          Add Exercise
        </Button>
      )}
    </View>
  );
}
