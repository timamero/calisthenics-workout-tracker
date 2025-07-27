import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title, Button } from '@mantine/core';
import { signOut } from '@cwt/auth/signOut';
import { supabase } from '../supabaseClient';

import { useAuthStore } from '@cwt/state/auth';
import { getProtectedData } from '@cwt/api/protectedData';

export const Route = createFileRoute('/settings')({
  component: SettingsView,
});

function SettingsView() {
  const session = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);
  const handleSignOut = () => {
    signOut(supabase);
    setSession(null); // Clear the session in the store
  };

  useEffect(() => {
    console.log('Fetching data from protected route in settings...');
    const baseUrl = 'http://127.0.0.1:8000';

    const asyncFetchProtectedData = async () => {
      if (session) {
        await getProtectedData(baseUrl, session.access_token);
      }
    };
    asyncFetchProtectedData();
  }, [session]);
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
