import { useState } from 'react';
import DurationInput from '../common/DurationInput';

export default function RestField() {
  const [sec, setSec] = useState<string>("");
  return <DurationInput label="Rest" sec={sec} setSec={setSec} />;
}
