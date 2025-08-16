import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Exercise } from '@cwt/schema/exercises';

import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

import ExerciseList from '../components/ExerciseList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import FilterOverlay from '../components/FilterOverlay';
import ExerciseDetailOverlay from '../components/ExerciseDetailOverlay';

export default function LibraryScreen() {
  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [exerciseDetail, setExerciseDetail] = React.useState<Exercise | null>(
    null,
  );
  const [visibleExerciseDetail, setVisibleExerciseDetail] =
    React.useState(false);
  const showExerciseDetailModal = () => setVisibleExerciseDetail(true);
  const hideExerciseDetailModal = () => setVisibleExerciseDetail(false);

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
