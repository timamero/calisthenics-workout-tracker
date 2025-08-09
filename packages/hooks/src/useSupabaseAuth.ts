import * as React from 'react';
import { SupabaseClient, Session } from '@supabase/supabase-js';

export function useSupabaseAuth(client: SupabaseClient, setSession: (session: Session | null) => void) {

  React.useEffect(() => {
    (async () => {
      const {data: { session }} = await client.auth.getSession();
      setSession(session);

      const {data: listener} = client.auth.onAuthStateChange((_event, session) => {
        switch (_event) {
          case 'SIGNED_IN':
          case 'USER_UPDATED':
            setSession(session);
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
      });

      return () => listener.subscription.unsubscribe();
    })();
  }, [setSession])
}