import { Button } from '@mantine/core';
import { LuSquareArrowUp, LuSquareArrowDown } from 'react-icons/lu';

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
          my={2}
        >
          <LuSquareArrowUp size={24} />
        </Button>
      )}
      {!isLast && (
        <Button onClick={handleDownClick} variant="transparent" p={1} my={2}>
          <LuSquareArrowDown size={24} />
        </Button>
      )}
    </Button.Group>
  );
}
