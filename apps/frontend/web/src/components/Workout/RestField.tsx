import { TimePicker } from '@mantine/dates';

export default function RestField() {
  return <TimePicker label="Rest" min="00:00" max="99:60" />;
}
