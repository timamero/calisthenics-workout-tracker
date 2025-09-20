import DurationInput from '../../common/DurationInput';
import { getSecondsInDuration } from '../../../utils/durationUtils';

interface DurationFieldProps {
  index: number;
  value: string;
  fieldName: 'rest' | 'time';
  handleSetFieldChange: (
    setIndex: number,
    updatedField: {
      reps?: number | undefined;
      weight?: number | undefined;
      time?: string | undefined;
      rest?: string | undefined;
    },
  ) => void;
  label?: string;
}

export default function DurationField({
  index,
  value,
  fieldName,
  handleSetFieldChange,
  label,
}: DurationFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string for controlled input
    if (value === '') {
      const updatedField: {
        reps?: number | undefined;
        weight?: number | undefined;
        time?: string | undefined;
        rest?: string | undefined;
      } = {
        [fieldName]: '',
      };
      handleSetFieldChange(index, updatedField);
      return;
    }
    // Validate: only numbers, no leading zeros except for '0'
    if (/^(0|[1-9][0-9]{0,2})$/.test(value)) {
      const num = Number(value);
      if (num >= 0 && num <= 300) {
        const updatedField: {
          reps?: number | undefined;
          weight?: number | undefined;
          time?: string | undefined;
          rest?: string | undefined;
        } = {
          [fieldName]: 'PT' + event.currentTarget.value + 'S',
        };
        handleSetFieldChange(index, updatedField);
      }
    }
    // Otherwise, do not update
  };
  return (
    <DurationInput
      label={label || (fieldName === 'rest' ? 'Rest' : 'Time')}
      sec={getSecondsInDuration(value)}
      handleChange={handleChange}
    />
  );
}
