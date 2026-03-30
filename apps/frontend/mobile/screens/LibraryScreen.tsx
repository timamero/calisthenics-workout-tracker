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

import ExerciseList from '../components/ExerciseList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import FilterOverlay from '../components/FilterOverlay';
import ExerciseDetailOverlay from '../components/ExerciseDetailOverlay';

export default function LibraryScreen() {
  const theme = useTheme();

  const supabaseSession = useAuthStore((state) => state.session);
  const isExercisesFetched = useExerciseLibraryStore(
    (state) => state.isExercisesFetched,
  );
  const setIsExercisesFetched = useExerciseLibraryStore(
    (state) => state.setIsExercisesFetched,
  );
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);

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
      if (supabaseSession?.access_token && !isExercisesFetched) {
        const leveragesAssists = await getLeveragesAssists(
          supabaseSession.access_token,
        );
        if (leveragesAssists) {
          setLeveragesAssists(leveragesAssists);
        }
        const exercises = await getExercises(supabaseSession.access_token);
        if (exercises) {
          setExercises(exercises);
          setIsExercisesFetched(true);
        }
      }
    };
    asyncFetchData();
  }, [
    setExercises,
    supabaseSession,
    setLeveragesAssists,
    isExercisesFetched,
    setIsExercisesFetched,
  ]);

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
