import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import type { Mode, Section } from '@cwt/schema/workouts';
import { useAddSupersetMobile } from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import { CustomTheme } from '../../../../../../theme';
// import { Text } from '../../../../../../customText';

import ExerciseItem from '../ExerciseItem';
import SupersetItem from '../SupersetItem';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';
import WorkoutItemMenu from '../WorkoutItemMenu';
import TextInputWithEdit from '../../../../../common/TextInputWithEdit';

interface SectionItemUIProps {
  mode: Mode;
  section: Section;
  isFirst: boolean;
  isLast: boolean;
  title: string;
  handleUpPress: () => void;
  handleDownPress: () => void;
  handleDeleteSectionPress: () => void;
  handleOpenAddExercisePress: () => void;
  handleSetSectionTitle: (title: string) => void;
}

export default function SectionItemUI({
  mode,
  section,
  isFirst,
  isLast,
  title,
  handleUpPress,
  handleDownPress,
  handleDeleteSectionPress,
  handleOpenAddExercisePress,
  handleSetSectionTitle,
}: SectionItemUIProps) {
  const theme = useTheme() as CustomTheme;

  const handleAddSupersetPress = useAddSupersetMobile(
    section.id,
  ).handleAddSupersetPress;

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: theme.colors.outline,
        backgroundColor: theme.colors.background,
        paddingInline: 4,
        paddingBlock: 16,
        marginBlock: 8,
        marginInline: 4,
        borderRadius: 8,
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
          {/* <Text style={{ color: theme.colors.onBackground }}>Section</Text> */}
          <TextInputWithEdit
            initialValue={title}
            onSave={handleSetSectionTitle}
            hideEdit={mode === 'log' ? true : false}
            variant={'title'}
            maxLength={70}
          />
        </View>
        {(mode === 'build' || mode === 'edit') && (
          <WorkoutItemMenu
            itemType="section"
            isFirst={isFirst}
            isLast={isLast}
            handleUpPress={handleUpPress}
            handleDownPress={handleDownPress}
            handleDeletePress={handleDeleteSectionPress}
          />
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
      {(mode === 'build' || mode === 'edit') && (
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
            onPress={() => handleOpenAddExercisePress()}
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
