import * as React from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { useAuthStore } from '@cwt/state/stores';

/**
 *
 * @param client - Supabase client instance
 *
 * Custom hook to manage Supabase authentication state.
 * It listens for authentication state changes and updates the global auth store accordingly.
 */
export function useSupabaseAuth(client: SupabaseClient) {
  const setLoading = useAuthStore((state) => state.setLoading);
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);
  React.useEffect(() => {
    // Use mounted flag to prevent state updates after unmount
    let mounted = true;

    const getSession = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await client.auth.getSession();
      if (mounted) {
        setSession(session);
        setUser(session!.user);
      }
    };

    getSession();

    const { data: listener } = client.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setLoading(true);

          switch (_event) {
            case 'SIGNED_IN':
            case 'USER_UPDATED':
              setSession(session);
              setUser(session!.user);
              console.log('User signed in or updated, session set.');
              break;
            case 'SIGNED_OUT':
              setSession(null);
              console.log('User signed out, session cleared.');
              break;
            case 'PASSWORD_RECOVERY':
              console.log('Password recovery initiated.');
              // TODO: Initiate password recovery here
              break;
            default:
              // TODO: Handle other events
              console.log(`Unhandled auth event: ${_event}`);
              break;
          }

          setLoading(false);
        }
      }
    );

    setLoading(false);
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [setSession, client]);
}
