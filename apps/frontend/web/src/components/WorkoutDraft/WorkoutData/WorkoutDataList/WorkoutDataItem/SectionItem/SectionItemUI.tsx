import { Stack, Group, Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import type { Mode } from '@cwt/schema/workouts';

import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import ItemsList from './ItemsList';
import { TextInputWithEdit } from '../../../../../common/TextInputWithEdit';

interface SectionItemUIProps {
  mode: Mode;
  isFirst: boolean;
  isLast: boolean;
  title: string;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleDeleteSectionClick: () => void;
  handleOpenAddExerciseClick: () => void;
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
  handleOpenAddExerciseClick,
  handleAddSupersetClick,
  handleSetSectionTitle,
}: SectionItemUIProps) {
  return (
    <Stack bg="lime.0" p="xl" bdrs="sm" bd="2px solid dark.4" w="100%">
      <Group>
        {(mode === 'edit' || mode === 'build') && (
          <ReorderButtonGroup
            handleUpClick={() => handleUpClick()}
            handleDownClick={() => handleDownClick()}
            isFirst={isFirst}
            isLast={isLast}
          />
        )}
        <TextInputWithEdit
          initialValue={title}
          onSave={handleSetSectionTitle}
          hideEdit={mode === 'log' ? true : false}
          variant={'title'}
          maxLength={70}
        />
        {(mode === 'edit' || mode === 'build') && (
          <Button
            color="red"
            variant="white"
            onClick={() => handleDeleteSectionClick()}
          >
            Delete
          </Button>
        )}
      </Group>
      <ItemsList />
      {(mode === 'edit' || mode === 'build') && (
        <Stack>
          <Button
            variant="filled"
            color="orange.9"
            component={Link}
            to="/workout/add-exercise"
            onClick={() => handleOpenAddExerciseClick()}
          >
            Add Exercise
          </Button>
          <Button
            variant="filled"
            color="orange.9"
            onClick={() => handleAddSupersetClick()}
          >
            Add Superset
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
