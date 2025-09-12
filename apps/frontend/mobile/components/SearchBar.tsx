import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';

import { useStore } from '@cwt/state/store';
import { useExercisesFilterStore } from '@cwt/state/stores';
import { useExerciseLibraryStore } from '@cwt/state/stores';

import { CustomTheme } from '../theme';

const SearchBar = () => {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles();

  const appliedFilterSelections = useExercisesFilterStore(
    (state) => state.appliedFilterSelections,
  );
  const appliedExerciseSearch = useStore(
    (state) => state.appliedExerciseSearch,
  );
  const exerciseSearch = useStore((state) => state.exerciseSearch);
  const search = useStore((state) => state.exerciseSearch);
  const refreshDisplayedExercises = useExerciseLibraryStore(
    (state) => state.refreshDisplayedExercises,
  );
  const setAppliedExerciseSearch = useStore(
    (state) => state.setAppliedExerciseSearch,
  );

  const handleClearSearch = () => {
    setAppliedExerciseSearch('');
    refreshDisplayedExercises(
      appliedFilterSelections,
      appliedExerciseSearch,
      exerciseSearch,
    );
  };

  const onChange = (text: string) => {
    if (text.length < search.length) {
      handleClearSearch();
    }
    setAppliedExerciseSearch(text);
    refreshDisplayedExercises(
      appliedFilterSelections,
      appliedExerciseSearch,
      exerciseSearch,
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
