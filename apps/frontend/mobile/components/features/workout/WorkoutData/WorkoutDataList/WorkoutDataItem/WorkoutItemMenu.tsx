import { useState } from 'react';
import { Menu, IconButton } from 'react-native-paper';

interface WorkoutItemMenuProps {
  itemType: 'superset' | 'section' | 'exercise';
  isFirst: boolean;
  isLast: boolean;
  handleUpPress: () => void;
  handleDownPress: () => void;
  handleDeletePress: () => void;
}

export default function WorkoutItemMenu({
  itemType,
  isFirst = false,
  isLast = false,
  handleUpPress,
  handleDownPress,
  handleDeletePress,
}: WorkoutItemMenuProps) {
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
        title={`Delete ${itemType === 'section' ? 'Section' : itemType === 'superset' ? 'Superset' : 'Exercise'}`}
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
  );
}
