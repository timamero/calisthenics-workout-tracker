import {
  Stack,
  Text,
  Group,
  ActionIcon,
  Checkbox,
  Divider,
} from '@mantine/core';
import { IoTrashBin } from 'react-icons/io5';

import type { Mode } from '@cwt/schema/workouts';

import FieldsList from './FieldsList';
import LeverageAssistFieldsList from './LeverageAssistFieldsList';

interface SetUIProps {
  mode: Mode;
  setsLength?: number;
  setIndex: number;
  isCompleted: boolean;
  showDeleteButton?: boolean;
  hasSupersetParentType?: boolean | null;
  handleToggleCompleted: (value: boolean) => void;
  handleDeleteSetClick: () => void;
}

export default function SetUI({
  mode,
  setsLength,
  setIndex,
  isCompleted,
  showDeleteButton,
  hasSupersetParentType,
  handleToggleCompleted,
  handleDeleteSetClick,
}: SetUIProps) {
  return (
    <Stack gap="xs" px="lg" mb="xs" w="100%">
      <Group w="100%" justify="space-between">
        {!hasSupersetParentType && (mode === 'build' || mode === 'edit') && (
          <Text size="lg" fw={900}>{`Set ${setIndex + 1}`}</Text>
        )}

        {showDeleteButton && (mode === 'build' || mode === 'edit') && (
          <ActionIcon
            variant="subtle"
            size="sm"
            c="red"
            onClick={() => handleDeleteSetClick()}
          >
            <IoTrashBin size={18} />
          </ActionIcon>
        )}
      </Group>
      <Stack align="center">
        <Stack align="flex-start" gap="0" w="max-content">
          <Group>
            <FieldsList />
          </Group>
          <LeverageAssistFieldsList />
        </Stack>
      </Stack>
      {mode === 'log' && (
        <Group justify="flex-end">
          <Checkbox
            label="Completed"
            color="lime.4"
            labelPosition="left"
            checked={isCompleted}
            onChange={(event) =>
              handleToggleCompleted(event.currentTarget.checked)
            }
          />
        </Group>
      )}
      {setsLength && setsLength > 0 && setIndex !== setsLength - 1 && (
        <Divider color="dark.2" />
      )}
    </Stack>
  );
}
