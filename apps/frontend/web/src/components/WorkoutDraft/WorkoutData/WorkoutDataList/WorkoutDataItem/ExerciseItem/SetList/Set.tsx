import { Stack, Text, Group, Button, Checkbox, Divider } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';

import FieldsList from './FieldsList';
import LeverageAssistFieldsList from './LeverageAssistFieldsList';

interface SetProps {
  mode: Mode;
  setsLength?: number;
  setIndex: number;
  isCompleted: boolean;
  showDeleteButton?: boolean;
  handleToggleCompleted: (value: boolean) => void;
  handleDeleteSetClick: () => void;
}

export default function Set({
  mode,
  setsLength,
  setIndex,
  isCompleted,
  showDeleteButton,
  handleToggleCompleted,
  handleDeleteSetClick,
}: SetProps) {
  return (
    <Stack gap="xs" p="sm">
      <Group>
        <Text size="xs" fw={600}>{`Set ${setIndex + 1}`}</Text>
        {showDeleteButton && (mode === 'build' || mode === 'edit') && (
          <Button
            color="red"
            variant="white"
            onClick={() => handleDeleteSetClick()}
          >
            Delete
          </Button>
        )}
      </Group>
      <FieldsList />
      <LeverageAssistFieldsList />
      {mode === 'log' && (
        <Group justify="flex-end">
          <Checkbox
            label="Completed"
            labelPosition="left"
            checked={isCompleted}
            onChange={(event) =>
              handleToggleCompleted(event.currentTarget.checked)
            }
          />
        </Group>
      )}
      {setsLength && setsLength > 0 && setIndex !== setsLength - 1 && (
        <Divider />
      )}
    </Stack>
  );
}
