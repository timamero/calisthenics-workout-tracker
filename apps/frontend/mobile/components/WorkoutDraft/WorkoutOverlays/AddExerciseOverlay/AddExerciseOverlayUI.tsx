import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import type { AddExerciseOverlayUIProps } from '@cwt/schema/workouts';

import { CustomTheme } from '../../../../theme';

import FullScreenModal from '../../../common/FullScreenModal';
import ExerciseList from './ExerciseList';

export default function AddExerciseOverlayUI({
  isVisible,
  selectedExerciseIDToAdd,
  setIsVisible,
  handleAddExercisePress,
}: AddExerciseOverlayUIProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <FullScreenModal
      title="Add Exercise"
      visible={isVisible!}
      setIsVisible={setIsVisible}
    >
      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
          paddingInline: 16,
          paddingBlock: 16,
        }}
      >
        <ExerciseList />
      </ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingTop: 20,
          borderTopWidth: 2,
          borderTopColor: theme.colors.orange1,
        }}
      >
        <Button
          mode="outlined"
          textColor={theme.colors.light}
          onPress={() => setIsVisible?.(false)}
          style={{
            borderColor: 'rgb(134, 142, 150)',
            borderRadius: 4,
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={selectedExerciseIDToAdd === null}
          mode="contained"
          onPress={() => handleAddExercisePress?.()}
          style={{
            borderRadius: 4,
          }}
          theme={{
            colors: {
              surfaceDisabled: theme.colors.dark400,
              onSurfaceDisabled: theme.colors.dark700,
            },
          }}
        >
          Add Exercise
        </Button>
      </View>
    </FullScreenModal>
  );
}
