import * as React from 'react';
import { View } from 'react-native';
import { PaperProvider, ActivityIndicator, Text } from 'react-native-paper';
import { Subscription } from '@supabase/supabase-js';

import { useAuthStore } from '@cwt/state/auth';
// import { Exercise } from '@cwt/schema/exerciseSchema';
import { useStore } from '@cwt/state/store';

import theme from './theme';
import { supabase } from './services/supabaseClient';
import Navigation from './navigation';
import { getExercises } from './services/exerciseService';

export default function App() {
  const loading = useAuthStore((state) => state.loading);
  const supabaseSession = useAuthStore((state) => state.session);

  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setExercises = useStore((state) => state.setExercises);

  React.useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession) {
        const exercises = await getExercises(supabaseSession.access_token);
        if (exercises) {
          setExercises(exercises);
        }
      }
    };
    asyncFetchData();
    // if (supabaseSession) {
    //   setExercises(sampleExercises);
    // }
  }, [setExercises, supabaseSession]);

  React.useEffect(() => {
    let authListener: {
      unsubscribe?: any;
      subscription?: Subscription;
    } | null = null;

    const setupAuth = async () => {
      console.log(
        'Setting up Supabase authentication listener and initial session check...',
      );
      setLoading(true);

      // Get the initial session from Supabase's storage
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

      // Set up the real-time auth state listener
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
              setSession(currentSession);
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
          setLoading(false);
        },
      );
      authListener = data; // Assign the listener object to the variable for cleanup

      // Ensure loading is set to false after initial check and listener setup
      // This handles cases where no auth event fires immediately but initial session is known.
      setLoading(false);
    };

    setupAuth();

    return () => {
      if (authListener) {
        authListener.unsubscribe();
        console.log('Supabase auth listener unsubscribed.');
      }
    };
  }, [setSession, setLoading]);

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
