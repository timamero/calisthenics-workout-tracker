import { useState, useContext } from 'react';
import { createFileRoute, useBlocker } from '@tanstack/react-router';
import { Title, Stack, Group, ActionIcon, Container, Box } from '@mantine/core';
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
  // --- UI Hooks ---
  const [detailOpened, detailHandlers] = useDisclosure(false);

  // --- Logic Hooks ---
  const { clearExerciseSearch, clearExerciseFilters } =
    useClearExerciseSearchAndFilters();

  // --- State Management ---
  const filters = useExercisesFilterStore(
    (state) => state.appliedFilterSelections,
  );
  const search = useExercisesSearchStore(
    (state) => state.appliedExerciseSearch,
  );

  // --- Local State ---
  const [exerciseDetail, setExerciseDetail] = useState<ExerciseResponse | null>(
    null,
  );

  // --- Context ---
  const exerciseFilterOverlayHandler =
    useContext(WorkoutDraftContext)?.exerciseFilterOverlayHandler;

  // --- Effects ---
  useBlocker({
    shouldBlockFn: () => {
      if ((filters.length === 0 || filters === undefined) && !search) {
        return false;
      }

      clearExerciseFilters();
      clearExerciseSearch();
      return false;
    },
  });

  return (
    <ExerciseDetailContext.Provider
      value={{
        exercise: exerciseDetail,
        setExercise: setExerciseDetail,
        opened: detailOpened,
        handlers: detailHandlers,
      }}
    >
      <Box pos="relative">
        <Container py="md">
          <Title
            order={1}
            mb="md"
            fz={{ base: 'h3', md: 'h2' }}
            lh="xxs"
            ta="center"
            style={(theme) => ({
              letterSpacing: theme.other.letterSpacing.tight,
            })}
          >
            Exercise Library
          </Title>
        </Container>
        <Container
          py="md"
          pos="sticky"
          top={58}
          bg="white"
          style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}
        >
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
        </Container>
        <Container p="md">
          <Stack align="center">
            <ExercisesList />
          </Stack>
        </Container>
      </Box>
      <ExercisesFilterOverlay />
      {exerciseDetail && <ExerciseDetailOverlay />}
    </ExerciseDetailContext.Provider>
  );
}
