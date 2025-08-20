import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';

import { useStore } from '@cwt/state/store';
import { useFiltersAndSearchStatus } from '@cwt/hooks/useFiltersAndSearchStatus';

import { Text } from '../../customText';

import FilterSelections from './FilterSelections';

export type FilterOverlayProps = {
  visible: boolean;
  handleHideModal: () => void;
};

export default function FilterOverlay({
  visible,
  handleHideModal,
}: FilterOverlayProps) {
  const theme = useTheme();
  const containerStyle = {
    backgroundColor: theme.colors.background,
    paddingBlock: 20,
    marginInline: 16,
  };

  const { hasFilters } = useFiltersAndSearchStatus();
  // const isFilterApplied = useStore((state) => state.isFilterApplied);
  // const isFilterBySearchApplied = useStore(
  //   (state) => state.isFilterBySearchApplied,
  // );
  const clearFilterCheckboxSelections = useStore(
    (state) => state.clearFilterCheckboxSelections,
  );
  const clearAppliedFilterCheckboxSelections = useStore(
    (state) => state.clearAppliedFilterCheckboxSelections,
  );
  const setAppliedFilterSelections = useStore(
    (state) => state.setAppliedFilterSelections,
  );
  const revertFilterCheckboxSelections = useStore(
    (state) => state.revertFilterCheckboxSelections,
  );
  const refreshDisplayedExercises = useStore(
    (state) => state.refreshDisplayedExercises,
  );
  // const filterDisplayedExercises = useStore(
  //   (state) => state.filterDisplayedExercises,
  // );
  // const filterDisplayedExercisesBySearch = useStore(
  //   (state) => state.filterDisplayedExercisesBySearch,
  // );
  // const resetDisplayedExercises = useStore(
  //   (state) => state.resetDisplayedExercises,
  // );

  const handleApplyFiltersPress = () => {
    setAppliedFilterSelections();
    refreshDisplayedExercises();
    // filterDisplayedExercises();
    handleHideModal();
  };

  const handleClearFiltersPress = () => {
    clearFilterCheckboxSelections();
    clearAppliedFilterCheckboxSelections();
    refreshDisplayedExercises();
    // resetDisplayedExercises();
    // if (isFilterBySearchApplied) {
    //   filterDisplayedExercisesBySearch();
    // }
    handleHideModal();
  };

  const onModalClose = () => {
    handleHideModal();
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
        visible={visible}
        onDismiss={onModalClose}
        contentContainerStyle={containerStyle}
      >
        <View style={{ paddingLeft: 20 }}>
          <Text variant="headlineMedium">Filter Exercises</Text>
        </View>
        <FilterSelections />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingTop: 20,
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
