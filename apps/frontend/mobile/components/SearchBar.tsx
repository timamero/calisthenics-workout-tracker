import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';

import { useStore } from '@cwt/state/store';
import { useFiltersAndSearchStatus } from '@cwt/hooks/useFiltersAndSearchStatus';

import { CustomTheme } from '../theme';

const SearchBar = () => {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles();

  const search = useStore((state) => state.exerciseSearch);
  // const isFilterApplied = useStore((state) => state.isFilterApplied);
  const setSearch = useStore((state) => state.setExerciseSearch);
  const refreshDisplayedExercises = useStore(
    (state) => state.refreshDisplayedExercises,
  );
  const setAppliedExerciseSearch = useStore(
    (state) => state.setAppliedExerciseSearch,
  );

  const { hasSearch } = useFiltersAndSearchStatus();

  // const resetDisplayedExerciseBySearch = useStore(
  //   (state) => state.resetDisplayedExerciseBySearch,
  // );
  // const filterDisplayedExercisesBySearch = useStore(
  //   (state) => state.filterDisplayedExercisesBySearch,
  // );
  // const filterDisplayedExercise = useStore(
  //   (state) => state.filterDisplayedExercises,
  // );

  const handleClearSearch = () => {
    setAppliedExerciseSearch('');
    refreshDisplayedExercises();

    // resetDisplayedExerciseBySearch();

    // if (isFilterApplied) {
    //   filterDisplayedExercise();
    // }
  };

  const onChange = (text: string) => {
    if (text.length < search.length) {
      handleClearSearch();
    }
    setSearch(text);
    refreshDisplayedExercises();
    // filterDisplayedExercisesBySearch();

    if (text === '') {
      handleClearSearch();
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChange}
        value={search}
        onClearIconPress={handleClearSearch}
        iconColor={theme.colors.light}
        placeholderTextColor={theme.colors.grey}
        inputStyle={{
          color: theme.colors.light,
        }}
        style={{
          backgroundColor: theme.colors.background,
          borderWidth: 1,
          borderColor: theme.colors.light,
        }}
      />
    </View>
  );
};

export default SearchBar;

const getStyles = () =>
  StyleSheet.create({
    container: {
      paddingBlock: 12,
      paddingInline: 36,
    },
  });
