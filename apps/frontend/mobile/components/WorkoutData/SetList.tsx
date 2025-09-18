import * as React from 'react';
import { View } from 'react-native';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import SetContainer from './SetContainer';

interface SetListProps {
  exerciseIndex: number;
}

export default function SetList({ exerciseIndex }: SetListProps) {
  const sets = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].sets;

  const setList = sets.map((set, i) => {
    return <SetContainer key={set.id} setIndex={i} />;
  });
  return <View>{setList}</View>;
}
