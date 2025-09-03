import { Stack } from '@mantine/core';
import { TimePicker } from '@mantine/dates';

export default function TimeField() {
  return (
    <Stack>
      <TimePicker label="Time" min="00:00" max="99:60" />
    </Stack>
  );
}
