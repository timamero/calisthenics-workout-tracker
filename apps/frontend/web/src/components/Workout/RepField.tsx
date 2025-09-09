import { TextInput } from '@mantine/core';

interface RepFieldProps {
  index: number;
  value: number;
  handleSetFieldChange: (
    setIndex: number,
    updatedField: {
      reps?: number | undefined;
      weight?: number | undefined;
      time?: string | undefined;
      rest?: string | undefined;
    },
  ) => void;
}

export default function RepField({
  index,
  value,
  handleSetFieldChange,
}: RepFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value == '') {
      const updatedField: {
        reps?: number | undefined;
        weight?: number | undefined;
        time?: string | undefined;
        rest?: string | undefined;
      } = {
        reps: undefined,
      };
      handleSetFieldChange(index, updatedField);
    } else {
      const updatedField: {
        reps?: number | undefined;
        weight?: number | undefined;
        time?: string | undefined;
        rest?: string | undefined;
      } = {
        reps: Number(event.currentTarget.value),
      };
      handleSetFieldChange(index, updatedField);
    }
  };
  return (
    <TextInput
      label="Reps"
      placeholder={'0'}
      value={value === undefined ? '' : value.toString()}
      onChange={handleChange}
    />
  );
}
