import * as React from 'react';
import { ScrollView } from 'react-native';

import { ExactlyOne } from '../../common';

export type AddExerciseOverlayProps = ExactlyOne<
  {
    opened?: boolean; // Web
    isVisible?: boolean; // Mobile
  },
  'opened' | 'isVisible'
> &
  ExactlyOne<
    {
      handler?: { close: () => void }; // Web
      handleHideModal?: () => void; // Mobile
    },
    'handler' | 'handleHideModal'
  > & {
    workoutDataScrollViewRef?: React.RefObject<ScrollView | null>;
  };

export type AddExerciseOverlayUIProps = ExactlyOne<
  {
    opened?: boolean; // Web
    isVisible?: boolean; // Mobile
  },
  'opened' | 'isVisible'
> &
  ExactlyOne<
    {
      handler?: { close: () => void }; // Web
      handleHideModal?: () => void; // Mobile
    },
    'handler' | 'handleHideModal'
  > &
  ExactlyOne<
    {
      handleAddExerciseClick?: () => void; // Web
      handleAddExercisePress?: () => void; // Mobile
    },
    'handleAddExerciseClick' | 'handleAddExercisePress'
  > & {
    selectedExerciseIDToAdd: number | null;
  };
