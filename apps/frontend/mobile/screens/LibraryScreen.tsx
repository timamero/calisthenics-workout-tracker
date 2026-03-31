import { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { ExerciseResponse } from '@cwt/schema/exercises';
import {
  useExerciseLibraryStore,
  useAuthStore,
  useLeveragesAssistsStore,
} from '@cwt/state/stores';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

import { getExercises } from '../services/exercisesService';
import { getLeveragesAssists } from '../services/leveragesAssistsService';

import { Text } from '../customText';
import { CustomTheme } from '../theme';

import ExerciseList from '../components/ExerciseList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import FilterOverlay from '../components/FilterOverlay';
import ExerciseDetailOverlay from '../components/ExerciseDetailOverlay';

export default function LibraryScreen() {
  const theme = useTheme() as CustomTheme;

  const supabaseSession = useAuthStore((state) => state.session);
  const loading = useExerciseLibraryStore((state) => state.loading);
  const setLoading = useExerciseLibraryStore((state) => state.setLoading);
  // const isExercisesFetched = useExerciseLibraryStore(
  //   (state) => state.isExercisesFetched,
  // );
  // const setIsExercisesFetched = useExerciseLibraryStore(
  //   (state) => state.setIsExercisesFetched,
  // );
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );
  const setLeveragesAssists = useLeveragesAssistsStore(
    (state) => state.setLeveragesAssists,
  );

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [exerciseDetail, setExerciseDetail] = useState<ExerciseResponse | null>(
    null,
  );
  const [visibleExerciseDetail, setVisibleExerciseDetail] = useState(false);
  const showExerciseDetailModal = () => setVisibleExerciseDetail(true);
  const hideExerciseDetailModal = () => setVisibleExerciseDetail(false);

  useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession?.access_token && !isExercisesSet) {
        const leveragesAssists = await getLeveragesAssists(
          supabaseSession.access_token,
        );
        if (leveragesAssists) {
          setLeveragesAssists(leveragesAssists);
        }
        const exercises = await getExercises(supabaseSession.access_token);
        if (exercises) {
          setExercises(exercises);
          setLoading(false);
        }
      }
    };
    if (!isExercisesSet) {
      console.log('fetching and setting the data');
      asyncFetchData();
    }
  }, [
    setExercises,
    supabaseSession,
    setLeveragesAssists,
    isExercisesSet,
    setLoading,
  ]);

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
          <Filter handleShowModal={showModal} />
          <ExerciseList />
        </ScrollView>
        <FilterOverlay visible={visible} handleHideModal={hideModal} />
        <ExerciseDetailOverlay />
      </View>
    </ExerciseDetailContext.Provider>
  );
}
