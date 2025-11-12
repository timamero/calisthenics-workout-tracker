import * as React from 'react';
import { ScrollView } from 'react-native';

export type AddExerciseOverlayProps = {
  opened?: boolean; // Web
  isVisible?: boolean; // Mobile

  handler?: { close: () => void }; // Web
  handleHideModal?: () => void; // Mobile

  workoutDataScrollViewRef?: React.RefObject<ScrollView | null>;
};

export type AddExerciseOverlayUIProps = {
  opened?: boolean; // Web
  isVisible?: boolean; // Mobile

  handler?: { close: () => void }; // Web
  handleHideModal?: () => void; // Mobile

  handleAddExerciseClick?: () => void; // Web
  handleAddExercisePress?: () => void; // Mobile

  selectedExerciseIDToAdd: number | null;
};
