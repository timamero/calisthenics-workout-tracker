import * as React from 'react';
// import { useAuthStore } from '@cwt/state/auth';
import { SupabaseClient, Session } from '@supabase/supabase-js';

export function useSupabaseAuth(client: SupabaseClient, setSession: (session: Session | null) => void) {
  // const setSession = useAuthStore((state) => state.setSession);

  React.useEffect(() => {
    (async () => {
      const {data: { session }} = await client.auth.getSession();
      setSession(session);
        //     // Get the initial session from Supabase's storage
      // try {
      //   const {
      //     data: { session: initialSession },
      //   } = await client.auth.getSession();
      //   setSession(initialSession);
      //   console.log(
      //     'Initial session retrieved:',
      //     initialSession ? 'present' : 'null',
      //   );
      // } catch (error) {
      //   console.error('Error getting initial session:', error);
      //   setSession(null); // Ensure session is null on error
      // }

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
          // case 'INITIAL_SESSION':
          //   // This event fires after getSession() if a session exists.
          //   // It's often redundant if you've already called getSession()
          //   // but good to log for debugging.
          //   console.log('Initial session event received.');
          //   setSession(session);
          //   break;
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