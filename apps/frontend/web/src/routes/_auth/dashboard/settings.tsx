import { createFileRoute } from '@tanstack/react-router';
import { Title, Button } from '@mantine/core';
import { signOut } from '@cwt/auth/signOut';
import { supabase } from '../../../services/supabaseClient';

export const Route = createFileRoute('/_auth/dashboard/settings')({
  component: SettingsView,
});

function SettingsView() {
  const handleSignOut = () => {
    signOut(supabase);
  };

  return (
    <div>
      <Title>Settings Page</Title>
      <p>This page will contain the app settings.</p>
      <Button onClick={handleSignOut} size="md">
        Log Out
      </Button>
    </div>
  );
}
