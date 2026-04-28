import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import type { Superset } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import {
  useReorderItemMobile,
  useDeleteItemMobile,
  useParentItemsLength,
} from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import WorkoutDraftContext from '../../../../../../contexts/WorkoutDraftContext';
import SupersetItemUI from './SupersetItemUI';

export default function SupersetItem() {
  const navigation = useNavigation<any>();

  const superset = useContext(WorkoutDataItemContext)!.item as Superset;
  const supersetParentsSectionID = useContext(
    WorkoutDataItemContext,
  )?.parentSectionID;
  const mode = useWorkoutDraftStore((state) => state.mode);
  const { handleUpPress, handleDownPress } = useReorderItemMobile(superset);
  const handleDeleteSupersetPress = useDeleteItemMobile(
    'superset',
    superset.id,
  ).handleDeleteItemPress;

  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const setIsAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.setIsAddWorkoutItemButtonsVisible!;

  const handleOpenAddExercisePress = () => {
    setSupersetIDToMod(superset!.id);
    if (supersetParentsSectionID) {
      setSectionIDToMod(supersetParentsSectionID);
    }

    setIsAddWorkoutItemButtonsVisible(false);
    navigation.navigate('WorkoutStack', { screen: 'AddExercise' });
  };

  return (
    <SupersetItemUI
      mode={mode!}
      superset={superset}
      isFirst={superset!.order === 0}
      isLast={superset!.order === useParentItemsLength() - 1}
      handleUpPress={handleUpPress}
      handleDownPress={handleDownPress}
      handleDeleteSupersetPress={handleDeleteSupersetPress}
      handleOpenAddExercisePress={handleOpenAddExercisePress}
    />
  );
}
