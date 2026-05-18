import {
  Stack,
  Text,
  Button,
  Group,
  Box,
  ThemeIcon,
  Paper,
  Divider,
} from '@mantine/core';
import { IoAdd, IoLink } from 'react-icons/io5';

import type { Mode } from '@cwt/schema/workouts';
import SetList from '../SetList';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import WorkoutItemMenu from '../WorkoutItemMenu';

interface ExerciseItemUIProps {
  mode: Mode;
  name: string;
  isFirst: boolean;
  isLast: boolean;
  parentType?: 'superset' | 'section' | null;
  parentItemsLength?: number;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleAddSetClick: () => void;
  handleDeleteExerciseClick: () => void;
}

export default function ExerciseItemUI({
  mode,
  name,
  isFirst,
  isLast,
  parentType,
  parentItemsLength,
  handleUpClick,
  handleDownClick,
  handleAddSetClick,
  handleDeleteExerciseClick,
}: ExerciseItemUIProps) {
  // const appliedStyle =
  //   parentType === 'superset'
  //     ? {
  //         borderBottom: '1px solid var(--mantine-color-dark-1)',
  //       }
  //     : {
  //         border: '1px solid var(--mantine-outline)',
  //       };
  return (
    <Paper
      withBorder={parentType !== 'superset'}
      shadow={parentType !== 'superset' ? 'xs' : '0'}
      radius="lg"
      w="100%"
      py={mode === 'edit' || mode === 'build' ? '0' : 'sm'}
      my={parentType === null ? 'xl' : 0}
    >
      <Stack
        w="100%"
        // bg="transparent"
        // bdrs={parentType === 'superset' ? 0 : 'var(--mantine-radius-lg)'}
        align="center"
        pos="relative"
        // style={appliedStyle}
        // my={parentType === null ? 'xl' : 0}
      >
        <Group w="100%" wrap="nowrap">
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
              <Text ff="heading" fz={{ base: 'lg', md: 'xl' }} fw={800}>
                {name}
              </Text>
            </Group>
          </Group>
          {(mode === 'edit' || mode === 'build') && (
            <Box p="xs">
              <WorkoutItemMenu
                itemType="exercise"
                handleUpClick={handleUpClick}
                handleDownClick={handleDownClick}
                handleDeleteClick={handleDeleteExerciseClick}
                isFirst={isFirst}
                isLast={isLast}
              />
            </Box>
          )}
        </Group>
        <Stack gap="0" w="100%" px="lg">
          <SetList />
        </Stack>
        {(mode === 'edit' || mode === 'build') && (
          <Group
            justify="flex-end"
            w="100%"
            px="sm"
            pb={parentType !== 'superset' ? 'sm' : '0'}
          >
            <Button
              variant="outline"
              color="lime"
              onClick={() => handleAddSetClick()}
              leftSection={<IoAdd size={16} />}
            >
              Set
            </Button>
          </Group>
        )}
        {parentType === 'superset' && !isLast && (
          <Stack w="100%">
            {/* <Stack w="100%" maw={360}> */}
            <Divider color="violet.2" />
            {/* </Stack> */}
          </Stack>
        )}
        {parentType === 'superset' && parentItemsLength! > 1 && !isLast && (
          <Box
            pos="absolute"
            bottom={0}
            bg="elevation.3"
            style={{ transform: 'translateY(18px' }}
          >
            <ThemeIcon variant="transparent">
              <IoLink
                size={24}
                style={{ color: 'var(--mantine-color-violet-4)' }}
              />
            </ThemeIcon>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
