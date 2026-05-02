import { View, Text } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import { signOut, updateUserName } from '@cwt/auth';
import { useUser } from '@cwt/hooks';

import { supabase } from '../services/supabaseClient';
import TextInputWithEdit from '../components/common/TextInputWithEdit';

export default function SettingsScreen() {
  const theme = useTheme();

  const name = useUser().name;

  const handleLogOut = async () => {
    await signOut(supabase);
  };

  const handleOnSave = (text: string) => {
    updateUserName(supabase, text);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text>Settings</Text>
      <Text>Name</Text>
      <TextInputWithEdit
        initialValue={name ? name : ''}
        onSave={handleOnSave}
      />
      <Button
        mode="outlined"
        textColor={theme.colors.outline}
        onPress={() => handleLogOut()}
      >
        Log out
      </Button>
    </View>
  );
}
