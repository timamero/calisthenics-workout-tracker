import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';

import { useStore } from '@cwt/state/store';

const SearchBar = () => {
  const theme = useTheme();
  const styles = getStyles();

  const search = useStore((state) => state.exerciseSearch);
  const isFilterApplied = useStore((state) => state.isFilterApplied);
  const setSearch = useStore((state) => state.setExerciseSearch);
  const resetDisplayedExerciseBySearch = useStore(
    (state) => state.resetDisplayedExerciseBySearch,
  );
  const filterDisplayedExercisesBySearch = useStore(
    (state) => state.filterDisplayedExercisesBySearch,
  );
  const filterDisplayedExercise = useStore(
    (state) => state.filterDisplayedExercises,
  );

  const handleClearSearch = () => {
    resetDisplayedExerciseBySearch();

    if (isFilterApplied) {
      filterDisplayedExercise();
    }
  };

  const onChange = (text: string) => {
    if (text.length < search.length) {
      handleClearSearch();
    }
    setSearch(text);
    filterDisplayedExercisesBySearch();

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
        style={{
          backgroundColor: theme.colors.background,
          borderWidth: 1,
          borderColor: 'rgb(46, 46, 46)',
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
