import { TimePicker } from '@mantine/dates';

export default function TimeField() {
  return <TimePicker label="Time" min="00:00" max="99:60" />;
}
