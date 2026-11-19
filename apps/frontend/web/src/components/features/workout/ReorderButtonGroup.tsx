import { useContext } from 'react';
import { Stack, ActionIcon, useMatches } from '@mantine/core';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';

import { WorkoutDataItemContext } from '@cwt/context';

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
  const parentType = useContext(WorkoutDataItemContext)?.parentType;

  const appliedVariant =
    parentType === 'superset'
      ? 'transparent-violet'
      : parentType === 'section'
        ? 'filled-gray'
        : 'filled';

  const appliedSize = useMatches({ base: 'xs', md: 'md' });

  return (
    <Stack gap="xxs">
      {!isFirst && (
        <ActionIcon
          size={appliedSize}
          variant={appliedVariant}
          onClick={() => handleUpClick()}
        >
          <IoChevronUp style={{ width: '80%', height: '80%' }} />
        </ActionIcon>
      )}
      {!isLast && (
        <ActionIcon
          size={appliedSize}
          variant={appliedVariant}
          onClick={() => handleDownClick()}
        >
          <IoChevronDown style={{ width: '80%', height: '80%' }} />
        </ActionIcon>
      )}
    </Stack>
  );
}
