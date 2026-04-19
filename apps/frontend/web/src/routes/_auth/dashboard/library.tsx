import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Group, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoFilterOutline } from 'react-icons/io5';

import type { ExerciseResponse } from '@cwt/schema/exercises';
import { ExerciseDetailContext } from '@cwt/context';

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

  const [filterOpened, filterHandler] = useDisclosure(false);
  const [detailOpened, detailHandlers] = useDisclosure(false);

  const handleClickFilter = () => {
    filterHandler.open();
  };

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
