import { RefObject, Dispatch, SetStateAction } from 'react';
import { ScrollView } from 'react-native';
import { type UseDisclosureHandlers } from '@mantine/hooks';

import { ExactlyOne } from '../../common';

export type AddExerciseOverlayProps = {
  workoutDataScrollViewRef?: RefObject<ScrollView | null>; // Mobile only
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
      handler?: UseDisclosureHandlers; // Web only
      setIsVisible?: Dispatch<SetStateAction<boolean>>; // Mobile only
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
