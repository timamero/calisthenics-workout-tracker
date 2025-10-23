import { Button } from '@mantine/core';
import { LuSquareArrowUp, LuSquareArrowDown } from 'react-icons/lu';

interface ReorderButtonProps {
  handleUpClick: () => void;
  handleDownClick: () => void;
}

export default function ReorderButtonGroup({
  handleUpClick,
  handleDownClick,
}: ReorderButtonProps) {
  return (
    <Button.Group orientation="vertical">
      <Button
        onClick={() => handleUpClick()}
        variant="transparent"
        p={1}
        my={2}
      >
        <LuSquareArrowUp size={24} />
      </Button>
      <Button onClick={handleDownClick} variant="transparent" p={1} my={2}>
        <LuSquareArrowDown size={24} />
      </Button>
    </Button.Group>
  );
}
