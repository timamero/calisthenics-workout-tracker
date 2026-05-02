import { createFileRoute } from '@tanstack/react-router';
import { Title, Button } from '@mantine/core';

import { signOut, updateUserName } from '@cwt/auth';
import { useUser } from '@cwt/hooks';

import { supabase } from '../../../services/supabaseClient';

import { TextInputWithEdit } from '../../../components/common/TextInputWithEdit';
// import { useAuthStore } from '@cwt/state/stores';

export const Route = createFileRoute('/_auth/dashboard/settings')({
  component: SettingsView,
});

function SettingsView() {
  const name = useUser().name;

  // const supabaseSession = useAuthStore((state) => state)!;

  const handleSignOut = () => {
    signOut(supabase);
  };

  const handleOnSave = (text: string) => {
    updateUserName(supabase, text);
  };

  return (
    <div>
      <Title>Settings</Title>
      <p>Name</p>
      <TextInputWithEdit
        initialValue={name ? name : ''}
        onSave={handleOnSave}
      />
      <Button onClick={handleSignOut} size="md">
        Log Out
      </Button>
    </div>
  );
}
