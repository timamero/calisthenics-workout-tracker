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
        backgroundColor: theme.colors.elevation.level4,
        // borderColor: theme.colors.outline,
        // borderWidth: 1,
        // paddingInline: 4,
        // paddingBlock: 16,
        marginBlock: 60,
        marginInline: 4,
        borderRadius: 8,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: theme.colors.gray3,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderWidth: 2,
          paddingInline: 4,
          backgroundColor: theme.colors.elevation.level5,
        }}
      >
        {/* <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        > */}
        {(mode === 'build' || mode === 'edit') && (
          <ReorderButtonGroup
            handleUpPress={() => handleUpPress()}
            handleDownPress={() => handleDownPress()}
            isFirst={isFirst}
            isLast={isLast}
          />
        )}
        <Text style={{ color: theme.colors.onBackground }}>Superset</Text>
        {/* </View> */}
        {(mode === 'build' || mode === 'edit') && (
          <WorkoutItemMenu
            itemType="superset"
            isFirst={isFirst}
            isLast={isLast}
            handleUpPress={handleUpPress}
            handleDownPress={handleDownPress}
            handleDeletePress={handleDeleteSupersetPress}
          />
          // <Button
          //   mode="outlined"
          //   labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
          //   textColor={theme.colors.onBackground}
          //   style={{ borderColor: theme.colors.error, flexShrink: 0 }}
          //   onPress={() => handleDeleteSupersetPress()}
          // >
          //   Delete
          // </Button>
        )}
      </View>
      {mode === 'build' || mode === 'edit' ? (
        <ExercisesList />
      ) : (
        <ExerciseSetGroup />
      )}
      {(mode === 'build' || mode === 'edit') && (
        <CustomButton
          mode="elevated"
          // labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
          // textColor={theme.colors.primary}
          // style={{ borderColor: theme.colors.primary, flexShrink: 0 }}
          onPress={() => handleOpenAddExercisePress()}
          icon="plus"
          // style={{ flexShrink: 1 }}
        >
          Exercise
        </CustomButton>
      )}
    </View>
  );
}
