import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Menu, ActionIcon } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IoAddOutline, IoAdd } from 'react-icons/io5';

import { useAddSuperset } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

export default function AddWorkoutItemMenu() {
  const navigate = useNavigate();
  const addSection = useWorkoutDraftStore((state) => state.addSection);
  const handleAddSupersetClick = useAddSuperset().handleAddSupersetClick;

  const [menuOpened, setMenuOpened] = useState(false);
  const ref = useClickOutside(() => setMenuOpened(false));

  const handleAddExerciseClick = () => {
    navigate({
      to: '/workout/add-exercise',
    });
  };

  return (
    <Menu opened={menuOpened} shadow="md" width={200}>
      <Menu.Target ref={ref}>
        <ActionIcon
          variant="filled-violet"
          size="xxl"
          w="min-content"
          onClick={() => setMenuOpened(!menuOpened)}
        >
          <IoAddOutline size={60} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown bg="gray.2">
        <Menu.Item
          onClick={() => {
            setMenuOpened(false);
            handleAddExerciseClick();
          }}
          leftSection={<IoAdd size={18} />}
        >
          Add Exercise
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setMenuOpened(false);
            handleAddSupersetClick();
          }}
          leftSection={<IoAdd size={18} />}
        >
          Add Superset
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            setMenuOpened(false);
            addSection();
          }}
          leftSection={<IoAdd size={18} />}
        >
          Add Section
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
