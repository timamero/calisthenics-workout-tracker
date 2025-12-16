import { useContext } from 'react';
import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

// import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Mode, Superset } from '@cwt/schema/workouts';
import {
  useAddExerciseOverlayMobile,
  // useWorkoutContextMobile,
} from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import { ExerciseItemContainer } from '../ExerciseItem';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import { CustomTheme } from '../../../../../../theme';
import { Text } from '../../../../../../customText';

interface SupersetItemProps {
  mode: Mode;
  superset: Superset;
  isFirst: boolean;
  isLast: boolean;
  handleUpPress: () => void;
  handleDownPress: () => void;
  handleDeleteSupersetPress: () => void;
}

export default function SupersetItem({
  mode,
  superset,
  isFirst,
  isLast,
  handleUpPress,
  handleDownPress,
  handleDeleteSupersetPress,
}: SupersetItemProps) {
  const theme = useTheme() as CustomTheme;

  // const setIsAddExerciseOverlayVisible =
  //   useWorkoutContextMobile().mobileOverlayHandlers
  //     .setIsAddExerciseOverlayVisible;
  // useContext(WorkoutContext)?.setIsAddExerciseOverlayVisible;
  const supersetParentsSectionID = useContext(
    WorkoutDataItemContext,
  )?.parentSectionID;
  // console.log('supersetParentsSectionID', supersetParentsSectionID);

  // const setSupersetIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSupersetIDToMod,
  // );
  // const setSectionIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSectionIDToMod,
  // );

  const handleOpenAddExerciseOverlay =
    useAddExerciseOverlayMobile('superset').handleOpenAddExerciseOverlayPress;
  // const handleOpenAddExerciseOverlay = () => {
  //   setSupersetIDToMod(superset.id);
  //   if (supersetParentsSectionID) {
  //     setSectionIDToMod(supersetParentsSectionID);
  //   }
  //   if (setIsAddExerciseOverlayVisible) setIsAddExerciseOverlayVisible(true);
  // };
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: theme.colors.orange950,
        borderColor: theme.colors.orange500,
        borderWidth: 2,
        paddingInline: 16,
        paddingBlock: 16,
        marginBlock: 8,
        marginInline: 16,
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
          {mode !== 'log' && (
            <ReorderButtonGroup
              handleUpPress={() => handleUpPress()}
              handleDownPress={() => handleDownPress()}
              isFirst={isFirst}
              isLast={isLast}
            />
          )}
          <Text style={{ color: theme.colors.light }}>Superset</Text>
        </View>
        {mode !== 'log' && (
          <Button
            mode="outlined"
            labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
            textColor={theme.colors.grey}
            style={{ borderColor: theme.colors.error, flexShrink: 0 }}
            onPress={() => handleDeleteSupersetPress()}
          >
            Delete
          </Button>
        )}
      </View>
      {superset.exercises.map((exercise) => {
        return (
          <WorkoutDataItemContext.Provider
            key={exercise.id}
            value={{
              item: exercise,
              parentType: 'superset',
              parentItemsLength: superset.exercises.length,
              parentSectionID: supersetParentsSectionID
                ? supersetParentsSectionID
                : null,
              parentSupersetID: superset.id,
            }}
          >
            <ExerciseItemContainer />
          </WorkoutDataItemContext.Provider>
        );
      })}
      {mode !== 'log' && (
        <Button
          mode="outlined"
          labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
          textColor={theme.colors.primary}
          style={{ borderColor: theme.colors.primary, flexShrink: 0 }}
          onPress={() => handleOpenAddExerciseOverlay()}
        >
          Add Exercise
        </Button>
      )}
    </View>
  );
}
