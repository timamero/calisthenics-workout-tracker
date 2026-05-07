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
          // color="dark"
          onClick={() => handleUpClick()}
          variant="transparent"
          p={1}
          // my={1}
          bdrs="sm"
        >
          <IoChevronUpCircleOutline size={24} />
        </Button>
      )}
      {!isLast && (
        <Button onClick={handleDownClick} variant="transparent" p={1}>
          <IoChevronDownCircleOutline size={24} />
        </Button>
      )}
    </Button.Group>
  );
}
