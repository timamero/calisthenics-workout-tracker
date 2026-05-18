import {
  Stack,
  Group,
  Title,
  Button,
  Box,
  useMatches,
  Paper,
} from '@mantine/core';
import { Link } from '@tanstack/react-router';

import type { Mode, Superset } from '@cwt/schema/workouts';

import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import ExerciseSetGroup from '../ExerciseSetGroup';
import ExercisesList from './ExercisesList';
import WorkoutItemMenu from '../WorkoutItemMenu';

interface SupersetItemUIProps {
  mode: Mode;
  superset: Superset;
  isFirst: boolean;
  isLast: boolean;
  parentType?: 'superset' | 'section' | null;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleDeleteSupersetClick: () => void;
  handleOpenAddExerciseClick: () => void;
}

export default function SupersetItemUI({
  mode,
  isFirst,
  isLast,
  parentType,
  handleUpClick,
  handleDownClick,
  handleDeleteSupersetClick,
  handleOpenAddExerciseClick,
}: SupersetItemUIProps) {
  const appliedTitleSize = useMatches({
    base: parentType === null ? 'h5' : 'h6',

    md: 'h3',
  });
  return (
    <Paper
      withBorder
      w="100%"
      radius="lg"
      bd="1px solid var(--mantine-color-violet-2)"
      my={parentType === null ? 'xl' : 0}
    >
      <Stack
        bdrs="md"
        // bd="2px solid dark.1"
        // bg="elevation.4"
        w="100%"
        // maw={600}
        align="center"
        gap={0}
        // my={parentType === null ? 'xl' : 0}
        // bd="1px solid var(--mantine-color-violet-2)"
      >
        <Group
          // bd="2px solid gray.3"
          // bdrs="lg"
          // mx="lg"
          wrap="nowrap"
          w="100%"
          // bg="red"
          style={{
            // borderTopLeftRadius: 'var(--mantine-radius-md)',
            // borderTopRightRadius: 'var(--mantine-radius-md)',
            borderBottom: '1px solid var(--mantine-color-violet-2)',
            // borderBottomColor: 'var(--mantine-color-red-3)',
          }}
        >
          <Group justify="space-between" wrap="nowrap" w="100%" p="xs">
            {(mode === 'edit' || mode === 'build') && (
              <ReorderButtonGroup
                handleUpClick={() => handleUpClick()}
                handleDownClick={() => handleDownClick()}
                isFirst={isFirst}
                isLast={isLast}
              />
            )}
            <Group flex={1} align="center" justify="center">
              <Title
                order={parentType === null ? 2 : 3}
                size={appliedTitleSize}
                c="dark.3"
              >
                Superset
              </Title>
            </Group>
          </Group>
          {(mode === 'edit' || mode === 'build') && (
            <Box p="xs">
              <WorkoutItemMenu
                itemType="superset"
                handleUpClick={handleUpClick}
                handleDownClick={handleDownClick}
                handleDeleteClick={handleDeleteSupersetClick}
                isFirst={isFirst}
                isLast={isLast}
              />
            </Box>
          )}
        </Group>
        {mode === 'edit' || mode === 'build' ? (
          <Box w="100%" px={{ base: 'xxs', md: 'lg' }}>
            <ExercisesList />
          </Box>
        ) : (
          <ExerciseSetGroup />
        )}
        {(mode === 'edit' || mode === 'build') && (
          <Stack my="sm">
            <Button
              variant="outline-violet"
              component={Link}
              to="/workout/add-exercise"
              onClick={() => handleOpenAddExerciseClick()}
            >
              Add Exercise
            </Button>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
