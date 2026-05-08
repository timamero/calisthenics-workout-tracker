import { useState } from 'react';
import { View } from 'react-native';
import { useTheme, Button, Menu, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import type { Mode, Section } from '@cwt/schema/workouts';
import { useAddSupersetMobile } from '@cwt/hooks';
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
  handleOpenAddExercisePress: () => void;
}

export default function SectionItemUI({
  mode,
  section,
  isFirst,
  isLast,
  handleUpPress,
  handleDownPress,
  handleDeleteSectionPress,
  handleOpenAddExercisePress,
}: SectionItemUIProps) {
  const theme = useTheme() as CustomTheme;

  const handleAddSupersetPress = useAddSupersetMobile(
    section.id,
  ).handleAddSupersetPress;

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
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
          <Text style={{ color: theme.colors.onBackground }}>Section</Text>
        </View>
        {(mode === 'build' || mode === 'edit') && (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button onPress={openMenu} style={{ height: 40, width: 32 }}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={24}
                  color={theme.colors.secondary}
                />
              </Button>
            }
          >
            <Menu.Item
              leadingIcon="trash-can"
              onPress={() => {
                closeMenu();
                handleDeleteSectionPress();
              }}
              title="Delete"
            />
            {!isFirst && (
              <Menu.Item
                leadingIcon="chevron-up-circle"
                onPress={() => {
                  closeMenu();
                  handleUpPress();
                }}
                title="Move Up"
              />
            )}
            {!isLast && (
              <Menu.Item
                leadingIcon="chevron-down-circle"
                onPress={() => {
                  closeMenu();
                  handleDownPress();
                }}
                title="Move Down"
              />
            )}
          </Menu>
        )}
        {/* {(mode === 'build' || mode === 'edit') && (
          <Button
            mode="outlined"
            labelStyle={{ marginVertical: 8, marginHorizontal: 16 }}
            textColor={theme.colors.onBackground}
            style={{ borderColor: theme.colors.error, flexShrink: 0 }}
            onPress={() => handleDeleteSectionPress()}
          >
            Delete
          </Button> */}
        {/* )} */}
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
