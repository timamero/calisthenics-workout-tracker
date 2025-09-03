import { useState } from 'react';
import DurationInput from '../common/DurationInput';

export default function TimeField() {
  const [sec, setSec] = useState<number | string>(0);
  return <DurationInput label="Time" sec={sec} setSec={setSec} />;
}
