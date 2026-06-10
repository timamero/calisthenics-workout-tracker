import { useState } from 'react';
import { Menu, ActionIcon } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IoEllipsisVertical, IoTrashBin, IoPencil } from 'react-icons/io5';

interface WorkoutLogDetailMenuProps {
  handleUpdateClick: () => void;
  handleDeleteClick: () => void;
}

export default function WorkoutLogDetailMenu({
  handleUpdateClick,
  handleDeleteClick,
}: WorkoutLogDetailMenuProps) {
  const [menuOpened, setMenuOpened] = useState(false);
  const ref = useClickOutside(() => setMenuOpened(false));

  return (
    <Menu opened={menuOpened} shadow="md" width={200}>
      <Menu.Target ref={ref}>
        <ActionIcon
          variant="transparent"
          size="md"
          p="0"
          w="min-content"
          h="min-content"
          bdrs={24}
          onClick={() => setMenuOpened(!menuOpened)}
        >
          <IoEllipsisVertical size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown bg="gray.2">
        <Menu.Item
          // c="red"
          onClick={() => {
            setMenuOpened(false);
            handleUpdateClick();
          }}
          leftSection={<IoTrashBin size={18} />}
        >
          Update Log
        </Menu.Item>
        <Menu.Item
          // c="red"
          onClick={() => {
            setMenuOpened(false);
            handleDeleteClick();
          }}
          leftSection={<IoPencil size={18} />}
        >
          Delete Log
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
