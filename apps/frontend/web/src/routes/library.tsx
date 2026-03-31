import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Group, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoFilterOutline } from 'react-icons/io5';

import type { ExerciseResponse } from '@cwt/schema/exercises';
import { ExerciseDetailContext } from '@cwt/context';
import { useAuthStore, useExerciseLibraryStore } from '@cwt/state/stores';

import { getExercises } from '../services/exercisesService';

import ExercisesList from '../components/ExercisesList';
import ExercisesFilterOverlay from '../components/ExercisesFilterOverlay';
import ExerciseDetailOverlay from '../components/ExerciseDetailOverlay';
import ExerciseSearchBar from '../components/ExerciseSearchBar';

export const Route = createFileRoute('/library')({
  loader: async () => {
    console.log('loading exercises in library route');
    const displayedExercises =
      useExerciseLibraryStore.getState().displayedExercises;
    const isExercisesFetched =
      useExerciseLibraryStore.getState().isExercisesFetched;

    if (isExercisesFetched) {
      console.log('exercises alreaded fetched');
      return displayedExercises;
    }

    const supabaseSession = useAuthStore.getState().session;
    if (supabaseSession?.access_token) {
      console.time('fetch exercises in library');
      const exercises = await getExercises(supabaseSession.access_token);
      console.timeEnd('fetch exercises in library');
      return exercises;
    }
  },
  component: LibraryView,
});

function LibraryView() {
  const exercises: ExerciseResponse[] = Route.useLoaderData();

  const [exerciseDetail, setExerciseDetail] = useState<ExerciseResponse | null>(
    null,
  );

  const [filterOpened, filterHandler] = useDisclosure(false);
  const [detailOpened, detailHandlers] = useDisclosure(false);

  const isExercisesFetched = useExerciseLibraryStore(
    (state) => state.isExercisesFetched,
  );
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setIsExercisesFetched = useExerciseLibraryStore(
    (state) => state.setIsExercisesFetched,
  );

  const handleClickFilter = () => {
    filterHandler.open();
  };

  useEffect(() => {
    if (!isExercisesFetched) {
      console.log('setting exercises in useEffect');
      setExercises(exercises);
      setIsExercisesFetched(true);
    }
  }, [exercises, isExercisesFetched, setExercises, setIsExercisesFetched]);

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
            onClick={handleClickFilter}
          >
            <IoFilterOutline />
          </ActionIcon>
        </Group>
        <Stack align="center">
          <ExercisesList />
        </Stack>
        <ExercisesFilterOverlay opened={filterOpened} handler={filterHandler} />
        <ExerciseDetailOverlay />
      </Stack>
    </ExerciseDetailContext.Provider>
  );
}
