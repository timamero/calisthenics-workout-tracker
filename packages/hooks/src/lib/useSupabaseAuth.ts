import * as React from 'react';
import { SupabaseClient, Session, User } from '@supabase/supabase-js';
import { useAuthStore } from '@cwt/state/stores';

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
              // You might want to navigate to a password reset screen here
              break;
            default:
              // Handle other events if necessary
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
