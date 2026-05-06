import type { ReactNode } from 'react';
import { Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { Menu, ActionIcon } from '@mantine/core';
import { IoAddOutline } from 'react-icons/io5';

import { useAddSuperset } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

function MenuLabel({ children }: { children: ReactNode }) {
  return (
    <Menu.Label style={{ display: 'flex', justifyContent: 'center' }}>
      {children}
    </Menu.Label>
  );
}

export default function AddWorkoutItemMenu() {
  const addSection = useWorkoutDraftStore((state) => state.addSection);
  const handleAddSupersetClick = useAddSuperset().handleAddSupersetClick;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          size="xxl"
          w="min-content"
          onClick={(event) => event.preventDefault()}
        >
          <IoAddOutline size={60} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown bg="gray.2">
        <MenuLabel>
          <Button
            variant="subtle"
            color="dark"
            component={Link}
            to="/workout/add-exercise"
          >
            Add Exercise
          </Button>
        </MenuLabel>

        <MenuLabel>
          <Button
            variant="subtle"
            color="dark"
            mx="auto"
            onClick={() => addSection()}
          >
            Add Section
          </Button>
        </MenuLabel>
        <MenuLabel>
          <Button
            variant="subtle"
            color="dark"
            mx="auto"
            onClick={() => handleAddSupersetClick()}
          >
            Add Superset
          </Button>
        </MenuLabel>
      </Menu.Dropdown>
    </Menu>
  );
}
