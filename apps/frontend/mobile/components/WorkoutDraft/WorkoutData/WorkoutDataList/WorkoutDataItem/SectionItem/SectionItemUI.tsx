// import { useContext } from 'react';
import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import type { Mode, Section } from '@cwt/schema/workouts';
import { useAddExerciseOverlayMobile, useAddSupersetMobile } from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import ExerciseItem from '../ExerciseItem';
import SupersetItem from '../SupersetItem';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import { CustomTheme } from '../../../../../../theme';
import { Text } from '../../../../../../customText';

interface SectionItemUIProps {
  mode: Mode;
  section: Section;
  isFirst: boolean;
  isLast: boolean;
  handleUpPress: () => void;
  handleDownPress: () => void;
  handleDeleteSectionPress: () => void;
}

export default function SectionItemUI({
  mode,
  section,
  isFirst,
  isLast,
  handleUpPress,
  handleDownPress,
  handleDeleteSectionPress,
}: SectionItemUIProps) {
  const theme = useTheme() as CustomTheme;

  const handleOpenAddExerciseOverlayPress =
    useAddExerciseOverlayMobile('section').handleOpenAddExerciseOverlayPress;
  const handleAddSupersetPress = useAddSupersetMobile(
    section.id,
  ).handleAddSupersetPress;
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
          {(mode === 'build' || mode === 'edit') && (
            <ReorderButtonGroup
              handleUpPress={() => handleUpPress()}
              handleDownPress={() => handleDownPress()}
              isFirst={isFirst}
              isLast={isLast}
            />
          )}
          <Text style={{ color: theme.colors.light }}>Section</Text>
        </View>
        {(mode === 'build' || mode === 'edit') && (
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
              <ExerciseItem />
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
            <SupersetItem />
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
            onPress={() => handleOpenAddExerciseOverlayPress()}
          >
            Add Exercise
          </Button>
          <Button
            mode="outlined"
            labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
            textColor={theme.colors.primary}
            style={{ borderColor: theme.colors.primary, flexShrink: 0 }}
            onPress={() => handleAddSupersetPress()}
          >
            Add Superset
          </Button>
        </View>
      )}
    </View>
  );
}
