import { useState } from 'react';
import { Menu, IconButton, useTheme, Surface } from 'react-native-paper';

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
        <Surface
          elevation={4}
          style={{
            backgroundColor: theme.colors.tertiary,
            borderRadius: '50%',
          }}
        >
          <IconButton
            mode="contained"
            icon="plus"
            size={24}
            onPress={openMenu}
            iconColor={theme.colors.onTertiary}
            containerColor={theme.colors.tertiary}
            rippleColor={theme.colors.violet2}
          />
        </Surface>
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
