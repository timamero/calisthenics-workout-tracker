import { Stack, Group, TextInput } from '@mantine/core';
// import type { Dispatch, SetStateAction } from 'react';

interface DurationInputProps {
  label: string;
  sec: string;
  // setSec: Dispatch<SetStateAction<string>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DurationInput({
  label,
  sec,
  handleChange,
}: DurationInputProps) {
  return (
    <Stack>
      <Group>
        <TextInput
          label={label}
          description="Seconds (0-300)"
          type="text"
          inputMode="numeric"
          pattern="^(0|[1-9][0-9]{0,2})$"
          min={0}
          max={300}
          value={sec}
          onChange={handleChange}
          maxLength={3}
          placeholder="0-300"
          autoComplete="off"
        />
      </Group>
    </Stack>
  );
}
