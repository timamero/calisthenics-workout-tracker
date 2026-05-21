import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';

import {
  useExercisesFilterStore,
  useExercisesSearchStore,
  useExerciseLibraryStore,
} from '@cwt/state/stores';

import { CustomTheme } from '../theme';

const SearchBar = () => {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles();

  const exerciseSearch = useExercisesSearchStore(
    (state) => state.appliedExerciseSearch,
  );
  const refreshDisplayedExercises = useExerciseLibraryStore(
    (state) => state.refreshDisplayedExercises,
  );
  const setAppliedExerciseSearch = useExercisesSearchStore(
    (state) => state.setAppliedExerciseSearch,
  );
  const setSearch = useExercisesSearchStore((state) => state.setExerciseSearch);

  const handleClearSearch = () => {
    setAppliedExerciseSearch('');
    setSearch('');
    refreshDisplayedExercises(
      useExercisesFilterStore.getState().appliedFilterSelections,
      useExercisesSearchStore.getState().appliedExerciseSearch,
      useExercisesSearchStore.getState().exerciseSearch,
    );
  };

  const onChange = (text: string) => {
    if (text.length < exerciseSearch.length) {
      handleClearSearch();
    }

    setAppliedExerciseSearch(text);
    refreshDisplayedExercises(
      useExercisesFilterStore.getState().appliedFilterSelections,
      useExercisesSearchStore.getState().appliedExerciseSearch,
      useExercisesSearchStore.getState().exerciseSearch,
    );

    if (text === '') {
      handleClearSearch();
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChange}
        value={exerciseSearch}
        onClearIconPress={handleClearSearch}
        iconColor={theme.colors.onBackground}
        placeholderTextColor={theme.colors.gray5}
        inputStyle={{
          color: theme.colors.onBackground,
        }}
        style={{
          // paddingBlock: 0,
          backgroundColor: theme.colors.background,
          borderWidth: 1,
          borderColor: theme.colors.onBackground,
        }}
      />
    </View>
  );
};

export default SearchBar;

const getStyles = () =>
  StyleSheet.create({
    container: {
      // paddingBlock: 12,
      // paddingInline: 36,
    },
  });
