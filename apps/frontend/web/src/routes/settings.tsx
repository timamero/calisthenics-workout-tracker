import { createFileRoute } from '@tanstack/react-router';
import { Title, Button } from '@mantine/core';
import { signOut } from '@cwt/auth/signOut';
import { supabase } from '../supabaseClient';

import { useAuthStore } from '@cwt/state/auth';

export const Route = createFileRoute('/settings')({
  component: SettingsView,
});

function SettingsView() {
  const setSession = useAuthStore((state) => state.setSession);
  const handleSignOut = () => {
    signOut(supabase);
    setSession(null); // Clear the session in the store
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
