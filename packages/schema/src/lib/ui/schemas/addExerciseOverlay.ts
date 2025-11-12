import { CombineExclusives } from '../../common';

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
