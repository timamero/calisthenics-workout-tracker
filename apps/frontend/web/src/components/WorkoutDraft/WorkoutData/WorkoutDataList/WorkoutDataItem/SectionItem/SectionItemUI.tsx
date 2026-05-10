import { Stack, Group, Box } from '@mantine/core';
// import { Link } from '@tanstack/react-router';

import type { Mode } from '@cwt/schema/workouts';

import ItemsList from './ItemsList';
import { TextInputWithEdit } from '../../../../../common/TextInputWithEdit';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
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
    <Stack
      bg="lime.0"
      bdrs="sm"
      bd="2px solid dark.4"
      w="100%"
      maw={1200}
      align="center"
    >
      <Group
        align="flex-start"
        justify="space-between"
        w="100%"
        wrap="nowrap"
        style={{ borderBottom: '1px solid var(--mantine-color-dark-7)' }}
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
          <Group flex={1} h={104} align="center" justify="center">
            <TextInputWithEdit
              initialValue={title}
              onSave={handleSetSectionTitle}
              hideEdit={mode === 'log' ? true : false}
              variant={'title'}
              maxLength={70}
            />
          </Group>
        </Group>
        {(mode === 'edit' || mode === 'build') && (
          <Box p="md">
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
      <ItemsList />
      {(mode === 'edit' || mode === 'build') && (
        <Stack align="flex-end" w="100%" p="sm">
          <AddItemMenu
            handleAddExerciseClick={handleAddExerciseClick}
            handleAddSupersetClick={handleAddSupersetClick}
          />
        </Stack>
      )}
    </Stack>
  );
}
