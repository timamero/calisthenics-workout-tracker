import { useState } from 'react';
import { Menu, IconButton, useTheme } from 'react-native-paper';

import { CustomTheme } from '../../../../../../theme';

interface AddItemMenuProps {
  handleOpenAddExercisePress: () => void;
  handleAddSupersetPress: () => void;
}

export default function AddItemMenu({
  handleOpenAddExercisePress,
  handleAddSupersetPress,
}: AddItemMenuProps) {
  const theme = useTheme() as CustomTheme;
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton
          mode="outlined"
          icon="plus"
          size={24}
          onPress={openMenu}
          style={{ boxShadow: `${theme.colors.onBackground} 1px 3px 9px -6px` }}
          containerColor={theme.colors.onPrimary}
        />
      }
      anchorPosition="top"
    >
      <Menu.Item
        leadingIcon="plus"
        onPress={() => {
          closeMenu();
          handleOpenAddExercisePress();
        }}
        title="Exercise"
      />
      <Menu.Item
        leadingIcon="plus"
        onPress={() => {
          closeMenu();
          handleAddSupersetPress();
        }}
        title="Superset"
      />
    </Menu>
  );
}
