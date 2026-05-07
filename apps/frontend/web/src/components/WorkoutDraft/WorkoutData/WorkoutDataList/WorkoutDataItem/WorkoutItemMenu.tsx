import { useState } from 'react';
import { Menu, ActionIcon } from '@mantine/core';
import {
  IoEllipsisVertical,
  IoTrashBin,
  IoChevronUpCircle,
  IoChevronDownCircle,
} from 'react-icons/io5';

interface WorkoutItemMenuProps {
  isFirst: boolean;
  isLast: boolean;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleDeleteClick: () => void;
}

export default function WorkoutItemMenu({
  isFirst = false,
  isLast = false,
  handleUpClick,
  handleDownClick,
  handleDeleteClick,
}: WorkoutItemMenuProps) {
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
            handleDeleteClick();
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
  );
}
