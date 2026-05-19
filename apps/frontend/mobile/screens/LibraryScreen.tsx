import { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { ExerciseResponse } from '@cwt/schema/exercises';
import {
  useExerciseLibraryStore,
  useExercisesFilterStore,
  useExercisesSearchStore,
} from '@cwt/state/stores';
import { useClearExerciseSearchAndFilters } from '@cwt/hooks';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

import { Text } from '../customText';
import { CustomTheme } from '../theme';

import ExerciseList from '../components/ExerciseList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import FilterOverlay from '../components/FilterOverlay';
import ExerciseDetailOverlay from '../components/ExerciseDetailOverlay';

export default function LibraryScreen() {
  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation<any>();

  // --- Hooks ---
  const { clearExerciseSearch, clearExerciseFilters } =
    useClearExerciseSearchAndFilters();

  // --- State ---
  const [exerciseDetail, setExerciseDetail] = useState<ExerciseResponse | null>(
    null,
  );
  const [visibleExerciseDetail, setVisibleExerciseDetail] = useState(false);

  const loading = useExerciseLibraryStore((state) => state.loading);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );

  const filters = useExercisesFilterStore(
    (state) => state.appliedFilterSelections,
  );
  const search = useExercisesSearchStore(
    (state) => state.appliedExerciseSearch,
  );

  // --- Handlers ---
  const showExerciseDetailModal = () => setVisibleExerciseDetail(true);
  const hideExerciseDetailModal = () => setVisibleExerciseDetail(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if ((filters.length === 0 || filters === undefined) && !search) {
        return;
      }

      clearExerciseFilters();
      clearExerciseSearch();
    });
    return unsubscribe;
  }, [navigation, filters, search, clearExerciseFilters, clearExerciseSearch]);

  if (!isExercisesSet || loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <Text
          variant="headlineMedium"
          style={{ color: theme.colors.onBackground }}
        >
          Loading
        </Text>
      </View>
    );
  }

  return (
    <ExerciseDetailContext.Provider
      value={{
        exercise: exerciseDetail,
        setExercise: setExerciseDetail,
        visible: visibleExerciseDetail,
        setVisible: setVisibleExerciseDetail,
        showModal: showExerciseDetailModal,
        hideModal: hideExerciseDetailModal,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <ScrollView>
          <SearchBar />
          <Filter />
          <ExerciseList />
        </ScrollView>
        <FilterOverlay />
        <ExerciseDetailOverlay />
      </View>
    </ExerciseDetailContext.Provider>
  );
}
