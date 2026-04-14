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
    console.log('SearchBar || onChange called with text: ', text);
    if (text.length < exerciseSearch.length) {
      console.log(
        'SearchBar || onchange - in conditional for text.length < exerciseSearch.length and clearning search',
      );
      handleClearSearch();
    }

    console.log(
      'SearchBar || onchange - setting setAppliedExerciseSearch with text: ',
      text,
    );
    // setAppliedExerciseSearch(text);
    setAppliedExerciseSearch(text);
    refreshDisplayedExercises(
      useExercisesFilterStore.getState().appliedFilterSelections,
      useExercisesSearchStore.getState().appliedExerciseSearch,
      useExercisesSearchStore.getState().exerciseSearch,
    );

    if (text === '') {
      console.log(
        "SearchBar || onchange - in conditional for text === '' and clearning search",
      );
      handleClearSearch();
    }
  };

  console.log('SearchBar || exerciseSearch: ', exerciseSearch);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChange}
        value={exerciseSearch}
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
