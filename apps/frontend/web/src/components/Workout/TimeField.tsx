import { useState } from 'react';
import DurationInput from '../common/DurationInput';

export default function TimeField() {
  const [sec, setSec] = useState<string>("");
  return <DurationInput label="Time" sec={sec} setSec={setSec} />;
}
