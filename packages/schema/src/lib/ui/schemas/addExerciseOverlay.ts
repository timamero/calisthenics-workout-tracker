import * as React from 'react';
import { ScrollView } from 'react-native';

import { ExactlyOne } from '../../common';

// export type AddExerciseOverlayProps = ExactlyOne<
//   {
//     opened?: boolean; // Web
//     isVisible?: boolean; // Mobile
//   },
//   'opened' | 'isVisible'
// > &
//   ExactlyOne<
//     {
//       handler?: { close: () => void }; // Web
//       handleHideModal?: () => void; // Mobile
//     },
//     'handler' | 'handleHideModal'
//   > & {
//     workoutDataScrollViewRef?: React.RefObject<ScrollView | null>;
//   };
export type AddExerciseOverlayProps = {
  workoutDataScrollViewRef?: React.RefObject<ScrollView | null>; // Mobile only
};

export type AddExerciseOverlayUIProps = ExactlyOne<
  {
    opened?: boolean; // Web only
    isVisible?: boolean; // Mobile only
  },
  'opened' | 'isVisible'
> &
  ExactlyOne<
    {
      handler?: { close: () => void }; // Web only
      setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>; // Mobile only
    },
    'handler' | 'setIsVisible'
  > &
  ExactlyOne<
    {
      handleAddExerciseClick?: () => void; // Web only
      handleAddExercisePress?: () => void; // Mobile only
    },
    'handleAddExerciseClick' | 'handleAddExercisePress'
  > & {
    selectedExerciseIDToAdd: number | null;
  };
