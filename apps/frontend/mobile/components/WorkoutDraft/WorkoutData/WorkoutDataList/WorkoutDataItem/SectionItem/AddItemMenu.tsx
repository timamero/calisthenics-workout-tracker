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
          elevation={2}
          style={{
            backgroundColor: theme.colors.lime4,
            borderRadius: '50%',
          }}
        >
          <IconButton
            mode="contained"
            icon="plus"
            size={24}
            onPress={openMenu}
            iconColor={theme.colors.dark7}
            containerColor={theme.colors.lime4}
            rippleColor={theme.colors.lime2}
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
