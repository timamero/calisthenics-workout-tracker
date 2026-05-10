import { useState } from 'react';
import { Menu, ActionIcon } from '@mantine/core';
import {
  IoEllipsisVertical,
  IoTrashBin,
  IoChevronUpCircle,
  IoChevronDownCircle,
} from 'react-icons/io5';

interface WorkoutItemMenuProps {
  itemType: 'superset' | 'section' | 'exercise';
  isFirst: boolean;
  isLast: boolean;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleDeleteClick: () => void;
}

export default function WorkoutItemMenu({
  itemType,
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
          c="red"
          onClick={() => {
            setMenuOpened(false);
            handleDeleteClick();
          }}
          leftSection={<IoTrashBin size={18} />}
        >
          {`Delete ${itemType === 'section' ? 'Section' : itemType === 'superset' ? 'Superset' : 'Exercise'}`}
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
