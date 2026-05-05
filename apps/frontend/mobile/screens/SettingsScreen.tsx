import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import { signOut, updateUserName } from '@cwt/auth';
import { useUser } from '@cwt/hooks';

import { CustomTheme } from '../theme';
import { Text } from '../customText';
import { supabase } from '../services/supabaseClient';
import TextInputWithEdit from '../components/common/TextInputWithEdit';

export default function SettingsScreen() {
  const theme = useTheme() as CustomTheme;

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
        backgroundColor: theme.colors.background,
        paddingBlock: 40,
      }}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flex: 1,
          paddingInline: 24,
        }}
      >
        <Text
          variant="headlineMedium"
          style={{
            color: theme.colors.onBackground,
          }}
        >
          Name
        </Text>
        <TextInputWithEdit
          initialValue={name ? name : ''}
          onSave={handleOnSave}
        />
      </View>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          mode="outlined"
          theme={{
            colors: {
              primary: theme.colors.error,
              outline: theme.colors.error,
            },
          }}
          onPress={() => handleLogOut()}
        >
          Log out
        </Button>
      </View>
    </View>
  );
}
