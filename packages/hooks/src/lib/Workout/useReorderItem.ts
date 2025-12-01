import { useContext } from 'react';
import { Section, Superset, Exercise } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutDataItemContext } from '@cwt/context';

export default function useReorderItem(item: Section | Superset | Exercise) {
  const parentType = useContext(WorkoutDataItemContext)?.parentType;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;

  const reorderRootItem = useWorkoutDraftStore(
    (state) => state.reorderRootItem
  );
  const reorderNestedItem = useWorkoutDraftStore(
    (state) => state.reorderNestedItem
  );
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod
  );

  const setIDs = () => {
    if (item.type === 'exercise') {
      setExerciseIDToMod(item!.id);
    }
    if (item.type === 'superset') {
      setSupersetIDToMod(item!.id);
    }

    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }
  };

  const handleUpClick = () => {
    if (!parentType) {
      reorderRootItem(item!.id, item!.order - 1);
    } else {
      setIDs();
      reorderNestedItem(item!.order - 1);
    }
  };
  const handleDownClick = () => {
    if (!parentType) {
      reorderRootItem(item!.id, item!.order + 1);
    } else {
      setIDs();
      reorderNestedItem(item!.order + 1);
    }
  };
  return {
    handleUpClick,
    handleDownClick,
  };
}
