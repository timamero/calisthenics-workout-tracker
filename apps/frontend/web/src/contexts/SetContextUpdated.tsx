import * as React from 'react';

import type { Leverage, Set, SetFields } from '@cwt/schema/workouts';

interface SetContextType {
  set: Set;
  setIndex: number;
  handleSetFieldChange: (
    setID: string,
    updatedField: Partial<SetFields> | Pick<Leverage, 'value'>,
  ) => void;
}

export const SetContext = React.createContext<SetContextType | null>(null);
