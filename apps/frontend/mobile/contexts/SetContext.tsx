import * as React from 'react';

import type { Set, SetFields } from '@cwt/schema/workouts';

interface SetContextType {
  set: Set;
  setIndex: number;
  handleSetFieldChange: (
    setIndex: number,
    updatedField: Partial<SetFields>,
  ) => void;
}

export const SetContext = React.createContext<SetContextType | null>(null);
