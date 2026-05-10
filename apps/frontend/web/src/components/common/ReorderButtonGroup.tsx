import { Button } from '@mantine/core';
import {
  IoChevronUpCircleOutline,
  IoChevronDownCircleOutline,
} from 'react-icons/io5';

interface ReorderButtonProps {
  isFirst: boolean;
  isLast: boolean;
  handleUpClick: () => void;
  handleDownClick: () => void;
}

export default function ReorderButtonGroup({
  isFirst = false,
  isLast = false,
  handleUpClick,
  handleDownClick,
}: ReorderButtonProps) {
  return (
    <Button.Group orientation="vertical">
      {!isFirst && (
        <Button
          onClick={() => handleUpClick()}
          variant="transparent"
          p={1}
          bdrs="sm"
          h="min-content"
        >
          <IoChevronUpCircleOutline size={20} />
        </Button>
      )}
      {!isLast && (
        <Button
          h="min-content"
          onClick={handleDownClick}
          variant="transparent"
          bdrs="sm"
          p={1}
        >
          <IoChevronDownCircleOutline size={20} />
        </Button>
      )}
    </Button.Group>
  );
}
