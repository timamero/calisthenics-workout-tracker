import { useState, useContext, useEffect } from 'react';
import {
  createFileRoute,
  // useBlocker,
} from '@tanstack/react-router';
import { Title, Stack, Group, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoFilterOutline } from 'react-icons/io5';

import type { ExerciseResponse } from '@cwt/schema/exercises';
import { ExerciseDetailContext } from '@cwt/context';
import {
  useExercisesFilterStore,
  useExercisesSearchStore,
} from '@cwt/state/stores';
import { useClearExerciseSearchAndFilters } from '@cwt/hooks';

import WorkoutDraftContext from '../../../contexts/WorkoutDraftContext';

import ExercisesList from '../../../components/ExercisesList';
import ExercisesFilterOverlay from '../../../components/ExercisesFilterOverlay';
import ExerciseDetailOverlay from '../../../components/ExerciseDetailOverlay';
import ExerciseSearchBar from '../../../components/ExerciseSearchBar';

export const Route = createFileRoute('/_auth/dashboard/library')({
  component: LibraryView,
});

function LibraryView() {
  const [exerciseDetail, setExerciseDetail] = useState<ExerciseResponse | null>(
    null,
  );

  const [detailOpened, detailHandlers] = useDisclosure(false);

  const { clearExerciseSearch, clearExerciseFilters } =
    useClearExerciseSearchAndFilters();

  const filters = useExercisesFilterStore(
    (state) => state.appliedFilterSelections,
  );
  const search = useExercisesSearchStore(
    (state) => state.appliedExerciseSearch,
  );

  const exerciseFilterOverlayHandler =
    useContext(WorkoutDraftContext)?.exerciseFilterOverlayHandler;

  // useBlocker({
  //   shouldBlockFn: () => {
  //     if ((filters.length === 0 || filters === undefined) && !search) {
  //       console.log('no need to clear');
  //       return false;
  //     }

  //     clearExerciseFilters();
  //     clearExerciseSearch();
  //     proceed();
  //     // return true;
  //   },
  // });

  useEffect(() => {
    function clearSearchAndFilters() {
      console.log('clearing');
      clearExerciseFilters();
      clearExerciseSearch();
    }
    return () => {
      console.log('Component is unmounting');
      if ((filters.length === 0 || filters === undefined) && !search) {
        console.log('no need to clear');
        return;
      }
      clearSearchAndFilters();
    };
  }, [clearExerciseFilters, clearExerciseSearch, filters, search]);

  return (
    <ExerciseDetailContext.Provider
      value={{
        exercise: exerciseDetail,
        setExercise: setExerciseDetail,
        opened: detailOpened,
        handlers: detailHandlers,
      }}
    >
      <Stack gap="xl">
        <Title size="h6">Exercise Library</Title>
        <Group>
          <ExerciseSearchBar />
          <ActionIcon
            variant="outline"
            color="gray.5"
            aria-label="Exercise filter"
            onClick={() => exerciseFilterOverlayHandler?.open()}
          >
            <IoFilterOutline />
          </ActionIcon>
        </Group>
        <Stack align="center">
          <ExercisesList />
        </Stack>
        <ExercisesFilterOverlay />
        <ExerciseDetailOverlay />
      </Stack>
    </ExerciseDetailContext.Provider>
  );
}
