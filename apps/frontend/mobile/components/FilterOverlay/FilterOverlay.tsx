import { useContext } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';

import {
  useExercisesFilterStore,
  useExerciseLibraryStore,
  useExercisesSearchStore,
} from '@cwt/state/stores';

import { useFilterSelectors } from '@cwt/hooks';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';
import FilterSelections from './FilterSelections';

export default function FilterOverlay() {
  const theme = useTheme() as CustomTheme;
  const containerStyle = {
    backgroundColor: theme.colors.background,
    paddingBlock: 20,
    marginInline: 16,
    borderWidth: 2,
    borderColor: theme.colors.orange1,
  };

  const { hasFilters } = useFilterSelectors();

  const isExerciseFilterVisible =
    useContext(WorkoutDraftContext)?.isExerciseFilterVisible!;
  const setIsExerciseFilterVisible =
    useContext(WorkoutDraftContext)?.setIsExerciseFilterVisible!;

  const clearFilterCheckboxSelections = useExercisesFilterStore(
    (state) => state.clearFilterCheckboxSelections,
  );
  const clearAppliedFilterCheckboxSelections = useExercisesFilterStore(
    (state) => state.clearAppliedFilterCheckboxSelections,
  );
  const setAppliedFilterSelections = useExercisesFilterStore(
    (state) => state.setAppliedFilterSelections,
  );
  const revertFilterCheckboxSelections = useExercisesFilterStore(
    (state) => state.revertFilterCheckboxSelections,
  );
  const refreshDisplayedExercises = useExerciseLibraryStore(
    (state) => state.refreshDisplayedExercises,
  );

  const handleApplyFiltersPress = () => {
    setAppliedFilterSelections();
    refreshDisplayedExercises(
      useExercisesFilterStore.getState().appliedFilterSelections,
      useExercisesSearchStore.getState().appliedExerciseSearch,
      useExercisesSearchStore.getState().exerciseSearch,
    );

    setIsExerciseFilterVisible(false);
  };

  const handleClearFiltersPress = () => {
    clearFilterCheckboxSelections();
    clearAppliedFilterCheckboxSelections();
    refreshDisplayedExercises(
      useExercisesFilterStore.getState().appliedFilterSelections,
      useExercisesSearchStore.getState().appliedExerciseSearch,
      useExercisesSearchStore.getState().exerciseSearch,
    );

    setIsExerciseFilterVisible(false);
  };

  const onModalClose = () => {
    setIsExerciseFilterVisible(false);
    if (!hasFilters) {
      // Do not clear the filter selection if there are currently filters applied
      clearFilterCheckboxSelections();
    } else {
      // Revert the state of filterCheckboxSelections when changes are cancelled
      revertFilterCheckboxSelections();
    }
  };

  return (
    <Portal>
      <Modal
        visible={isExerciseFilterVisible}
        onDismiss={onModalClose}
        contentContainerStyle={containerStyle}
      >
        <View
          style={{
            paddingLeft: 20,
            paddingBottom: 16,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.orange1,
          }}
        >
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.light, opacity: 0.9 }}
          >
            Filter Exercises
          </Text>
        </View>
        <FilterSelections />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingTop: 20,
            borderTopWidth: 2,
            borderTopColor: theme.colors.orange1,
          }}
        >
          <Button
            mode="outlined"
            textColor="rgb(134, 142, 150)"
            onPress={handleClearFiltersPress}
            style={{
              borderColor: 'rgb(134, 142, 150)',
              borderRadius: 4,
            }}
          >
            Clear All
          </Button>
          <Button
            mode="contained"
            onPress={handleApplyFiltersPress}
            style={{
              borderRadius: 4,
            }}
          >
            Apply Filters
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
