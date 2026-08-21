import { useState } from 'react';
import { Menu, IconButton } from 'react-native-paper';

interface WorkoutLogDetailProps {
  // handleUpdatePress: () => void;
  handleDeletePress: () => void;
}

export default function WorkoutLogDetailMenu({
  // handleUpdatePress,
  handleDeletePress,
}: WorkoutLogDetailProps) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="dots-vertical" size={24} onPress={openMenu} />}
      anchorPosition="bottom"
    >
      <Menu.Item
        leadingIcon="trash-can"
        onPress={() => {
          closeMenu();
          handleDeletePress();
        }}
        title="Delete Log"
      />
    </Menu>
  );
}
