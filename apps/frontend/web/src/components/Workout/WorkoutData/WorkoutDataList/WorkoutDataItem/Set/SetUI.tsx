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
    <Stack gap="xs" px="sm" mb="xs" w="100%">
      <Stack w="100%" align="center">
        <Group w="100%" justify="space-between" maw={360}>
          {!hasSupersetParentType &&
            (mode === 'build' || mode === 'edit' || mode === 'read') && (
              <Text
                fz={{ base: 'sm', md: 'md' }}
                fw={700}
              >{`Set ${setIndex + 1}`}</Text>
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
      </Stack>
      <Stack align="center">
        <Stack align="flex-start" gap="0">
          <Group justify="center" gap="xs" wrap="wrap">
            <FieldsList />
            <LeverageAssistFieldsList />
          </Group>
        </Stack>
      </Stack>
      {mode === 'log' && (
        <Stack w="100%" align="center">
          <Group justify="flex-end" w="100%" maw={360}>
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
        </Stack>
      )}
      {setsLength && setsLength > 0 && setIndex !== setsLength - 1 && (
        <Stack w="100%" align="center">
          <Stack w="100%" maw={360}>
            <Divider color="gray.3" />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
