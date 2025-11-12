import * as React from 'react';
import { ScrollView } from 'react-native';

import { CombineExclusives } from '../../common';

export type AddExerciseOverlayProps = CombineExclusives<
  {
    opened?: boolean;
    isVisible?: boolean;

    handler?: { close: () => void };
    handleHideModal?: () => void;

    workoutDataScrollViewRef?: React.RefObject<ScrollView | null>;
  },
  [['opened', 'isVisible'], ['handler', 'handleHideModal']]
>;

export type AddExerciseOverlayUIProps = CombineExclusives<
  {
    opened?: boolean;
    isVisible?: boolean;

    handler?: { close: () => void };
    handleHideModal?: () => void;

    handleAddExerciseClick?: () => void;
    handleAddExercisePress?: () => void;

    selectedExerciseIDToAdd: number | null;
  },
  [
    ['opened', 'isVisible'],
    ['handler', 'handleHideModal'],
    ['handleAddExerciseClick', 'handleAddExercisePress'],
  ]
>;
