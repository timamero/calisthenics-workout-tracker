import * as React from "react";

import type { Leverage, Assist, Set, SetFields } from "@cwt/schema/workouts";

interface SetContextType {
  set: Set;
  setIndex: number;
  handleSetFieldChange: (
    setID: string,
    updatedField:
      | Partial<SetFields>
      | Pick<Leverage, "value">
      | Pick<Assist, "value">,
    exerciseID?: string
  ) => void;
}

export const SetContext = React.createContext<SetContextType | null>(null);
