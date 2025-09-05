import { Stack, Group, TextInput } from '@mantine/core';
import type { Dispatch, SetStateAction } from 'react';

// import type { Set } from '@cwt/schema/workouts';

interface DurationInputProps {
  label: string;
  sec: string;
  setSec: Dispatch<SetStateAction<string>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DurationInput({
  label,
  sec,
  // setSec,
  handleChange,
}: DurationInputProps) {
  // Only allow numbers between 0 and 300
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   // Allow empty string for controlled input
  //   if (value === '') {
  //     setSec('');
  //     return;
  //   }
  //   // Validate: only numbers, no leading zeros except for '0'
  //   if (/^(0|[1-9][0-9]{0,2})$/.test(value)) {
  //     const num = Number(value);
  //     if (num >= 0 && num <= 300) {
  //       setSec(num.toString());
  //     }
  //   }
  //   // Otherwise, do not update
  // };

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
