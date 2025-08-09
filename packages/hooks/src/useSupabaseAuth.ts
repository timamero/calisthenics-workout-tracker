import * as React from 'react';
import { useAuthStore } from '@cwt/state/auth';
import { SupabaseClient } from '@supabase/supabase-js';

export function useSupabaseAuth(client: SupabaseClient) {
  const setSession = useAuthStore((state) => state.setSession);

  React.useEffect(() => {
    (async () => {
      const {data: { session }} = await client.auth.getSession();
      setSession(session);

      const {data: listener} = client.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => listener.subscription.unsubscribe();
    })
  }, [setSession])
}