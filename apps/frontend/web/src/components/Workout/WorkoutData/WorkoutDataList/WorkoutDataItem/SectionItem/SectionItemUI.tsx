import { Stack, Group, Box, Paper } from '@mantine/core';
// import { Link } from '@tanstack/react-router';

import type { Mode } from '@cwt/schema/workouts';

import ItemsList from './ItemsList';
import { TextInputWithEdit } from '../../../../../common/TextInputWithEdit';
import ReorderButtonGroup from '../../../../ReorderButtonGroup';
import WorkoutItemMenu from '../WorkoutItemMenu';
import AddItemMenu from './AddItemMenu';

interface SectionItemUIProps {
  mode: Mode;
  isFirst: boolean;
  isLast: boolean;
  title: string;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleDeleteSectionClick: () => void;
  handleAddExerciseClick: () => void;
  handleAddSupersetClick: () => void;
  handleSetSectionTitle: (title: string) => void;
}

export default function SectionItemUI({
  mode,
  isFirst,
  isLast,
  title,
  handleUpClick,
  handleDownClick,
  handleDeleteSectionClick,
  handleAddExerciseClick,
  handleAddSupersetClick,
  handleSetSectionTitle,
}: SectionItemUIProps) {
  return (
    <Paper
      my={{ base: 0, md: 'xs' }}
      radius="md"
      w="100%"
      shadow="sm"
      bg="var(--mantine-color-lime-elevation-3)"
      bd="1px solid var(--mantine-color-lime-2)"
    >
      <Stack
        w="100%"
        align="center"
        pb={mode === 'edit' || mode === 'build' ? 0 : 'lg'}
      >
        <Group
          align="flex-start"
          justify="space-between"
          w="100%"
          wrap="nowrap"
          style={{ borderBottom: '1px solid var(--mantine-color-lime-2)' }}
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
            <Group flex={1} h="max-content" align="center" justify="center">
              <TextInputWithEdit
                initialValue={title}
                onSave={handleSetSectionTitle}
                hideEdit={mode === 'log' ? true : false}
                variant={'title'}
                maxLength={70}
                titleOrder={2}
                titleSize="h3"
                hideEditLabel={true}
              />
            </Group>
          </Group>
          {(mode === 'edit' || mode === 'build') && (
            <Box p="xs">
              <WorkoutItemMenu
                itemType="section"
                handleUpClick={handleUpClick}
                handleDownClick={handleDownClick}
                handleDeleteClick={handleDeleteSectionClick}
                isFirst={isFirst}
                isLast={isLast}
              />
            </Box>
          )}
        </Group>
        <Stack w="100%" px={{ base: 'xxs', md: 'xl' }} gap="lg">
          <ItemsList />
        </Stack>
        {(mode === 'edit' || mode === 'build') && (
          <Stack align="flex-end" w="100%" p="sm">
            <AddItemMenu
              handleAddExerciseClick={handleAddExerciseClick}
              handleAddSupersetClick={handleAddSupersetClick}
            />
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
