import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { ExerciseResponse } from '@cwt/schema/exercises';
import { useExerciseLibraryStore } from '@cwt/state/stores';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

import { Text } from '../customText';
import { CustomTheme } from '../theme';

import ExerciseList from '../components/ExerciseList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import FilterOverlay from '../components/FilterOverlay';
import ExerciseDetailOverlay from '../components/ExerciseDetailOverlay';
// import { useFetchExercises } from '../hooks/useFetchExercises';

export default function LibraryScreen() {
  const theme = useTheme() as CustomTheme;

  const loading = useExerciseLibraryStore((state) => state.loading);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );

  // const [visible, setVisible] = useState(false);
  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);

  const [exerciseDetail, setExerciseDetail] = useState<ExerciseResponse | null>(
    null,
  );
  const [visibleExerciseDetail, setVisibleExerciseDetail] = useState(false);
  const showExerciseDetailModal = () => setVisibleExerciseDetail(true);
  const hideExerciseDetailModal = () => setVisibleExerciseDetail(false);

  // useFetchExercises();

  if (!isExercisesSet || loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <Text variant="headlineMedium" style={{ color: theme.colors.light }}>
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
