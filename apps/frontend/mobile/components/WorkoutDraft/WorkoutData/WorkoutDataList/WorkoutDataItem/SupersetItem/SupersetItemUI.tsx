import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import type { Mode, Superset } from '@cwt/schema/workouts';
// import { WorkoutDataItemContext } from '@cwt/context';

// import { ExerciseItemContainer } from '../ExerciseItem';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import { CustomTheme } from '../../../../../../theme';
import { Text } from '../../../../../../customText';
import ExercisesList from './ExercisesList';
import ExerciseSetGroup from '../ExerciseSetGroup';
import WorkoutItemMenu from '../WorkoutItemMenu';
import CustomButton from '../../../../../common/CustomButton';

interface SupersetItemUIProps {
  mode: Mode;
  superset: Superset;
  isFirst: boolean;
  isLast: boolean;
  parentType?: 'superset' | 'section' | null;
  handleUpPress: () => void;
  handleDownPress: () => void;
  handleDeleteSupersetPress: () => void;
  handleOpenAddExercisePress: () => void;
}

export default function SupersetItemUI({
  mode,
  isFirst,
  isLast,
  parentType,
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
        backgroundColor: theme.colors.elevation.level3,
        borderColor: theme.colors.violet2,
        borderWidth: 1,
        marginInline: parentType === 'section' ? 20 : 4,
        marginTop: parentType === 'section' ? 24 : 44,
        marginBottom: isLast && !parentType ? 44 : 0,
        borderRadius: 8,
        alignItems: 'stretch',
      }}
    >
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomColor: theme.colors.violet2,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomWidth: 1,
          // backgroundColor: theme.colors.elevation.level3,
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
        <View
          style={{
            padding: 8,
            display: 'flex',
            alignItems: 'flex-end',
            width: `${mode === 'log' ? '100%' : 'auto'}`,
          }}
        >
          <Text variant="titleSmall" style={{ color: theme.colors.dark3 }}>
            Superset
          </Text>
        </View>
        {(mode === 'build' || mode === 'edit') && (
          <WorkoutItemMenu
            itemType="superset"
            isFirst={isFirst}
            isLast={isLast}
            handleUpPress={handleUpPress}
            handleDownPress={handleDownPress}
            handleDeletePress={handleDeleteSupersetPress}
          />
        )}
      </View>
      {mode === 'build' || mode === 'edit' ? (
        <ExercisesList />
      ) : (
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <ExerciseSetGroup />
        </View>
      )}
      {(mode === 'build' || mode === 'edit') && (
        <View
          style={{
            marginBlock: 8,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CustomButton
            mode="elevated"
            onPress={() => handleOpenAddExercisePress()}
            icon="plus"
            theme={{ colors: { primary: theme.colors.violet8 } }}
          >
            Exercise
          </CustomButton>
        </View>
      )}
    </View>
  );
}
