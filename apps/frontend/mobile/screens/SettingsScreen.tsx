import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import { signOut, updateUserName } from '@cwt/auth';
import { useUser } from '@cwt/hooks';

import { CustomTheme } from '../theme';
import { globalStyles } from '../styles/global';
import { supabase } from '../services/supabaseClient';

import { Text } from '../customText';
import TextInputWithEdit from '../components/common/TextInputWithEdit';

export default function SettingsScreen() {
  const theme = useTheme() as CustomTheme;
  const styles = globalStyles(theme);

  const name = useUser().name;

  const handleLogOut = async () => {
    await signOut(supabase);
  };

  const handleOnSave = (text: string) => {
    updateUserName(supabase, text);
  };

  return (
    <View style={{ ...styles.container, flex: 1, gap: 24 }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: theme.colors.elevation.level3,
          borderRadius: 16,
          padding: 16,
          gap: 16,
        }}
      >
        <Text
          variant="headlineMedium"
          style={{
            color: theme.colors.onBackground,
          }}
        >
          User Settings
        </Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            variant="headlineSmall"
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
