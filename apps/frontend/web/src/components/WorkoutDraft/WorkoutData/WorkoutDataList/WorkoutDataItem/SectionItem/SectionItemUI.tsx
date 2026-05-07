import { useState } from 'react';
import {
  IoEllipsisVertical,
  IoTrashBin,
  IoChevronUpCircle,
  IoChevronDownCircle,
} from 'react-icons/io5';
import { Stack, Group, Button, Menu, ActionIcon, Box } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import type { Mode } from '@cwt/schema/workouts';

import ItemsList from './ItemsList';
import { TextInputWithEdit } from '../../../../../common/TextInputWithEdit';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';

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

// function MenuLabel({ children }: { children: ReactNode }) {
//   return (
//     <Menu.Label style={{ display: 'flex', justifyContent: 'center' }}>
//       {children}
//     </Menu.Label>
//   );
// }

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
  const [menuOpened, setMenuOpened] = useState(false);

  const onUpClick = () => {
    // setMenuOpened(() => false);
    // handleUpClick();
    setMenuOpened(false);
    setTimeout(() => {
      handleUpClick();
    }, 100);
  };
  const onDownClick = () => {
    // setMenuOpened(() => false);
    // handleDownClick();
    setMenuOpened(false);
    setTimeout(() => {
      handleDownClick();
    }, 100);
  };
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
        // p="md"
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
            <Menu opened={menuOpened} shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon
                  variant="transparent"
                  size="md"
                  p="xs"
                  w="min-content"
                  h="min-content"
                  onClick={() => setMenuOpened(!menuOpened)}
                >
                  <IoEllipsisVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown bg="gray.2">
                <Menu.Item
                  c="red"
                  onClick={() => {
                    setMenuOpened(false);
                    handleDeleteSectionClick();
                  }}
                  leftSection={<IoTrashBin size={18} />}
                >
                  Delete Section
                </Menu.Item>
                {!isFirst && (
                  <Menu.Item
                    onClick={() => onUpClick()}
                    leftSection={<IoChevronUpCircle size={18} />}
                  >
                    Move Up
                  </Menu.Item>
                )}
                {!isLast && (
                  <Menu.Item
                    onClick={() => onDownClick()}
                    leftSection={<IoChevronDownCircle size={18} />}
                  >
                    Move Down
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </Box>
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
