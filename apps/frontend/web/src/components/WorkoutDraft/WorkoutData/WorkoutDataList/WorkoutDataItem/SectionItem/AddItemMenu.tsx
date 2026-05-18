import { useState } from 'react';
import { Menu, ActionIcon } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IoAdd } from 'react-icons/io5';

interface WorkoutItemMenuProps {
  handleAddExerciseClick: () => void;
  handleAddSupersetClick: () => void;
}

export default function AddItemMenu({
  handleAddExerciseClick,
  handleAddSupersetClick,
}: WorkoutItemMenuProps) {
  const [menuOpened, setMenuOpened] = useState(false);
  const ref = useClickOutside(() => setMenuOpened(false));

  return (
    <Menu opened={menuOpened} shadow="md" width={200}>
      <Menu.Target ref={ref}>
        <ActionIcon
          variant="filled-lime"
          size="md"
          p={{ base: 'xxs', md: 'xs' }}
          w="min-content"
          h="min-content"
          onClick={() => setMenuOpened(!menuOpened)}
          aria-label="Add exercise or superset to section"
        >
          <IoAdd size={24} />
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
      </Menu.Dropdown>
    </Menu>
  );
}
