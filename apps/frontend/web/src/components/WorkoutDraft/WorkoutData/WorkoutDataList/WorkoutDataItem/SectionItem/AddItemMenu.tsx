import { useState } from 'react';
import { Menu, ActionIcon } from '@mantine/core';
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

  // const onUpClick = () => {
  //   setMenuOpened(false);
  //   setTimeout(() => {
  //     handleUpClick();
  //   }, 100);
  // };
  // const onDownClick = () => {
  //   setMenuOpened(false);
  //   setTimeout(() => {
  //     handleDownClick();
  //   }, 100);
  // };

  return (
    <Menu opened={menuOpened} shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          variant="filled"
          size="md"
          p="xs"
          w="min-content"
          h="min-content"
          onClick={() => setMenuOpened(!menuOpened)}
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
