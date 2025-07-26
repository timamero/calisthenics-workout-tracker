import * as React from 'react';
import { View } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  ActivityIndicator,
  Text,
} from 'react-native-paper';
import Navigation from './navigation';

// Assuming useAuthStore is a Zustand or similar store for global state management
import { useAuthStore } from '@cwt/state/auth';
import { supabase } from './services/supabaseClient'; // Ensure this correctly initializes Supabase
import { Subscription } from '@supabase/supabase-js';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'thistle',
    background: 'snow',
  },
};

export default function App() {
  const setSession = useAuthStore((state) => state.setSession);
  const loading = useAuthStore((state) => state.loading);
  const setLoading = useAuthStore((state) => state.setLoading);

  React.useEffect(() => {
    let authListener: {
      unsubscribe?: any;
      subscription?: Subscription;
    } | null = null; // Declare listener variable outside to ensure scope for cleanup

    const setupAuth = async () => {
      console.log(
        'Setting up Supabase authentication listener and initial session check...',
      );
      setLoading(true); // Start loading

      // 1. Get the initial session from Supabase's storage
      // This is crucial for handling app restarts, as Supabase automatically persists sessions.
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();
        setSession(initialSession);
        console.log(
          'Initial session retrieved:',
          initialSession ? 'present' : 'null',
        );
      } catch (error) {
        console.error('Error getting initial session:', error);
        setSession(null); // Ensure session is null on error
      }

      // 2. Set up the real-time auth state listener
      // This listener will fire on subsequent auth events (sign in, sign out, etc.)
      const { data } = supabase.auth.onAuthStateChange(
        (event, currentSession) => {
          console.log(
            'Auth event:',
            event,
            'Current Session:',
            currentSession ? 'present' : 'null',
          );

          switch (event) {
            case 'SIGNED_IN':
            case 'USER_UPDATED':
              // When a user signs in or their session updates, set the session in your store
              setSession(currentSession);
              console.log('User signed in or updated, session set.');
              break;
            case 'SIGNED_OUT':
              // When a user signs out, clear the session from your store
              setSession(null);
              console.log('User signed out, session cleared.');
              break;
            case 'PASSWORD_RECOVERY':
              console.log('Password recovery initiated.');
              // You might want to navigate to a password reset screen here
              break;
            case 'INITIAL_SESSION':
              // This event fires after getSession() if a session exists.
              // It's often redundant if you've already called getSession()
              // but good to log for debugging.
              console.log('Initial session event received.');
              setSession(currentSession);
              break;
            default:
              // Handle other events if necessary
              console.log(`Unhandled auth event: ${event}`);
              break;
          }
          // After handling any auth event, we can consider loading complete
          setLoading(false);
        },
      );
      authListener = data; // Assign the listener object to the variable for cleanup

      // Ensure loading is set to false after initial check and listener setup
      // This handles cases where no auth event fires immediately but initial session is known.
      setLoading(false);
    };

    setupAuth();

    // 3. Cleanup function: Unsubscribe from the listener when the component unmounts
    return () => {
      if (authListener) {
        authListener.unsubscribe();
        console.log('Supabase auth listener unsubscribed.');
      }
    };
  }, [setSession, setLoading]); // Dependencies: only re-run if these setter functions change (they usually don't)

  if (loading) {
    return (
      <PaperProvider theme={theme}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            gap: 16,
            paddingHorizontal: 16,
            alignItems: 'stretch',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ textAlign: 'center', marginTop: 10 }}>
            Loading authentication state...
          </Text>
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
}

// import * as React from 'react';
// import { View } from 'react-native';
// import {
//   MD3LightTheme as DefaultTheme,
//   PaperProvider,
//   ActivityIndicator,
// } from 'react-native-paper';
// import Navigation from './navigation';

// import { useAuthStore } from '@cwt/state/auth';
// // eslint-disable-next-line import/no-unresolved
// import { session } from '@cwt/auth/session';
// import { supabase } from './services/supabaseClient';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'tomato',
//     secondary: 'thistle',
//     background: 'snow',
//   },
// };

// export default function App() {
//   const supabaseSession = useAuthStore((state) => state.session);
//   const setSession = useAuthStore((state) => state.setSession);
//   const loading = useAuthStore((state) => state.loading);
//   const setLoading = useAuthStore((state) => state.setLoading);

//   React.useEffect(() => {
//     const initAuth = async () => {
//       console.log('Initializing auth...');
//       const currentSession = await session(supabase);
//       setSession(currentSession);
//       console.log('Current session set', currentSession);
//       setLoading(false);
//     };

//     if (!supabaseSession) {
//       console.log('No session found, initializing...');
//       initAuth();
//     }
//   }, [supabaseSession, setSession, setLoading]);

//   React.useEffect(() => {
//     // 2. Set up the real-time auth state listener
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (event, supabaseSession) => {
//         console.log('Auth event:', event, 'Session:', supabaseSession);

//         switch (event) {
//           case 'SIGNED_IN':
//             console.log('User signed in:', supabaseSession);
//             setSession(supabaseSession);
//             break;
//           case 'SIGNED_OUT':
//             console.log('User signed out');
//             setSession(null); // Clear the session
//             break;
//           case 'USER_UPDATED':
//             console.log('User updated:', supabaseSession);
//             setSession(supabaseSession);
//             break;
//           case 'PASSWORD_RECOVERY':
//             console.log('Password recovery initiated');
//             // You might want to navigate to a password reset screen here
//             break;
//           default:
//             // Handle other events if necessary
//             break;
//         }
//         setLoading(false); // Once we have an initial state or event, we're not loading auth state anymore
//       },
//     );

//     // 3. Cleanup function: Unsubscribe from the listener when the component unmounts
//     return () => {
//       authListener.subscription.unsubscribe();
//       console.log('Supabase auth listener unsubscribed.');
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (loading) {
//     return (
//       <PaperProvider theme={theme}>
//         <View
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             flex: 1,
//             gap: 16,
//             paddingHorizontal: 16,
//             alignItems: 'stretch',
//             justifyContent: 'center',
//             backgroundColor: theme.colors.background,
//           }}
//         >
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       </PaperProvider>
//     );
//   }

//   return (
//     <PaperProvider theme={theme}>
//       <Navigation />
//     </PaperProvider>
//   );
// }
