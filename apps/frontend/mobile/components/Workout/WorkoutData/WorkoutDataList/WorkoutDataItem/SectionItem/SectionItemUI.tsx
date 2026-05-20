import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import type { Mode, Section } from '@cwt/schema/workouts';
import { useAddSupersetMobile } from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import { CustomTheme } from '../../../../../../theme';
// import { Text } from '../../../../../../customText';

import ExerciseItem from '../ExerciseItem';
import SupersetItem from '../SupersetItem';
import ReorderButtonGroup from '../../../../ReorderButtonGroup';
import WorkoutItemMenu from '../WorkoutItemMenu';
import TextInputWithEdit from '../../../../../common/TextInputWithEdit';
import AddItemMenu from './AddItemMenu';

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
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.lime2,
        backgroundColor: theme.colors.limeElevation3,
        paddingBottom: mode === 'edit' || mode === 'build' ? 0 : 24,
        marginTop: 44,
        marginBottom: isLast ? 44 : 0,
        overflow: 'hidden',
        width: 'auto',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: 'auto',
          borderBottomColor: theme.colors.lime2,
          borderBottomWidth: 1,
          paddingInline: 4,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
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
          <View
            style={{
              flexShrink: 1,
              width: '100%',
            }}
          >
            <TextInputWithEdit
              initialValue={title}
              onSave={handleSetSectionTitle}
              hideEdit={mode === 'log' || mode === 'read' ? true : false}
              hideEditLabel={true}
              variant={'title'}
              maxLength={70}
              size="md"
            />
          </View>
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
            margin: 8,
          }}
        >
          <AddItemMenu
            handleOpenAddExercisePress={handleOpenAddExercisePress}
            handleAddSupersetPress={handleAddSupersetPress}
          />
        </View>
      )}
    </View>
  );
}
