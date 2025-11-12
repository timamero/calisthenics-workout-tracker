import { useContext } from 'react';
import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import type { Mode, Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutContext, WorkoutDataItemContext } from '@cwt/context';

import { ExerciseItemContainer } from '../ExerciseItem';
import { SupersetItemContainer } from '../SupersetItem';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import { CustomTheme } from '../../../../../../theme';
import { Text } from '../../../../../../customText';

interface SectionItemProps {
  mode: Mode;
  section: Section;
  isFirst: boolean;
  isLast: boolean;
  handleUpPress: () => void;
  handleDownPress: () => void;
  handleDeleteSectionPress: () => void;
}

export default function SectionItem({
  mode,
  section,
  isFirst,
  isLast,
  handleUpPress,
  handleDownPress,
  handleDeleteSectionPress,
}: SectionItemProps) {
  const theme = useTheme() as CustomTheme;

  const setIsAddExerciseDialogVisible =
    useContext(WorkoutContext)?.setIsAddExerciseDialogVisible;
  const setIsAddSupersetDialogVisible =
    useContext(WorkoutContext)?.setIsAddSupersetDialogVisible;
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const handleOpenAddExerciseOverlay = () => {
    setSectionIDToMod(section.id);
    if (setIsAddExerciseDialogVisible) setIsAddExerciseDialogVisible(true);
  };
  const handleOpenAddSupersetOverlay = () => {
    setSectionIDToMod(section.id);
    if (setIsAddSupersetDialogVisible) setIsAddSupersetDialogVisible(true);
  };
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.dark800,
        paddingInline: 16,
        paddingBlock: 16,
        marginBlock: 8,
        marginInline: 16,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          {mode !== 'log' && (
            <ReorderButtonGroup
              handleUpPress={() => handleUpPress()}
              handleDownPress={() => handleDownPress()}
              isFirst={isFirst}
              isLast={isLast}
            />
          )}
          <Text style={{ color: theme.colors.light }}>Section</Text>
        </View>
        {mode !== 'log' && (
          <Button
            mode="outlined"
            labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
            textColor={theme.colors.grey}
            style={{ borderColor: theme.colors.error, flexShrink: 0 }}
            onPress={() => handleDeleteSectionPress()}
          >
            Delete
          </Button>
        )}
      </View>
      {section.items.map((item) => {
        if (item.type === 'exercise') {
          return (
            <WorkoutDataItemContext.Provider
              key={item.id}
              value={{
                item: item,
                parentType: 'section',
                parentItemsLength: section.items.length,
                parentSectionID: section.id,
                parentSupersetID: null,
              }}
            >
              <ExerciseItemContainer />
            </WorkoutDataItemContext.Provider>
          );
        }
        return (
          <WorkoutDataItemContext.Provider
            key={item.id}
            value={{
              item: item,
              parentType: 'section',
              parentItemsLength: section.items.length,
              parentSectionID: section.id,
              parentSupersetID: null,
            }}
          >
            <SupersetItemContainer />
          </WorkoutDataItemContext.Provider>
        );
      })}
      {mode !== 'log' && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 8,
          }}
        >
          <Button
            mode="outlined"
            labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
            textColor={theme.colors.primary}
            style={{ borderColor: theme.colors.primary, flexShrink: 0 }}
            onPress={() => handleOpenAddExerciseOverlay()}
          >
            Add Exercise
          </Button>
          <Button
            mode="outlined"
            labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
            textColor={theme.colors.primary}
            style={{ borderColor: theme.colors.primary, flexShrink: 0 }}
            onPress={() => handleOpenAddSupersetOverlay()}
          >
            Add Superset
          </Button>
        </View>
      )}
    </View>
  );
}
