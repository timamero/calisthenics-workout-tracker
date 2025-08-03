import { useEffect } from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from '@mantine/core';
import { supabase } from '../supabaseClient';
import type { Subscription } from '@supabase/auth-js';

import { useAuthStore } from '@cwt/state/auth';
// import { useExercisesStore } from '@cwt/state/exercises';
import { useStore } from '@cwt/state/store'
import { Exercise } from '@cwt/schema/exerciseSchema';

const sampleExercises: Exercise[] = [
  {
    id: 1,
    name: 'Standard Push-Up',
    target_muscles: ['chest', 'triceps', 'shoulders'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['push', 'upper'],
    instructions: [
      '1. Start in a strong plank position. Hands slightly wider than shoulders. Fingers forward.',
      '2. Lower your chest towards the floor, keeping elbows close to your body and core tight.',
      '3. Push through your palms, extending arms fully to return to the plank.',
      '4. Keep your body straight throughout the movement.',
    ],
  },
  {
    id: 2,
    name: 'Knee Push-Up',
    target_muscles: ['chest', 'triceps', 'shoulders'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['push', 'upper'],
    instructions: [
      '1. Begin on hands and knees with hands under shoulders, bracing your core. Maintain a straight line from knees to head.',
      "2. Lower your chest until it's just above the floor, keeping elbows tucked.",
      '3. Push back up, engaging your chest and triceps to extend your arms.',
      '4. Control the movement throughout the entire repetition.',
    ],
  },
  {
    id: 3,
    name: 'Incline Push-Up',
    target_muscles: ['chest', 'triceps', 'shoulders'],
    required_equipment: ['bar'],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['push', 'upper'],
    instructions: [
      '1. Place hands on a sturdy elevated surface. Step back to form a straight line from head to heels.',
      '2. Lower your chest towards the surface, keeping your core engaged.',
      '3. Push powerfully back to the starting position, extending your arms fully.',
      '4. Maintain a straight body line throughout the movement.',
    ],
  },
  {
    id: 4,
    name: 'Decline Push-Up',
    target_muscles: ['chest', 'triceps', 'shoulders'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['push', 'upper'],
    instructions: [
      '1. Elevate your feet on a bench or sturdy surface. Hands on the floor under shoulders.',
      '2. Maintain a tight core and straight body as you lower your chest towards the floor.',
      '3. Push back up strongly, extending your arms fully.',
      '4. Control your descent and ascent throughout the movement.',
    ],
  },
  {
    id: 5,
    name: 'Diamond Push-Up',
    target_muscles: ['triceps', 'chest', 'shoulders'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['push', 'upper'],
    instructions: [
      '1. Form a diamond with your thumbs and index fingers under your chest. Extend legs into a plank.',
      '2. Lower your chest towards your hands, bringing elbows out to the sides.',
      '3. Push up, squeezing your triceps at the top to fully extend your arms.',
      '4. Keep your core tight and body straight throughout the movement.',
    ],
  },
  {
    id: 6,
    name: 'Archer Push-Up',
    target_muscles: ['chest', 'triceps', 'shoulders'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'advanced',
    tags: ['push', 'upper'],
    instructions: [
      '1. Assume a wide push-up stance with one arm slightly bent and the other extended straight to the side.',
      '2. As you lower, shift your weight, bending the working arm and extending the other.',
      '3. Push up, focusing power through the bent arm to return to the start.',
      '4. Alternate sides each rep, keeping your core locked.',
    ],
  },
  {
    id: 7,
    name: 'Pike Push-Up',
    target_muscles: ['shoulders', 'triceps'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['push', 'upper'],
    instructions: [
      '1. Start in an inverted V-shape. Hips high. Hands shoulder-width apart.',
      '2. Bend elbows, lowering the crown of your head towards the floor between your hands.',
      '3. Push powerfully through your shoulders and triceps to return to the start.',
      '4. Keep your neck relaxed and maintain the inverted V-shape.',
    ],
  },
  {
    id: 8,
    name: 'Wall Handstand Push-Up (Assisted)',
    target_muscles: ['shoulders', 'triceps'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'advanced',
    tags: ['push', 'upper'],
    instructions: [
      '1. Kick up into a handstand against a wall, controlling your balance.',
      '2. Slowly bend your elbows, lowering your head towards the floor until it lightly taps.',
      '3. Push strongly through your hands, pressing back up to full extension.',
      '4. Keep your core super tight and body straight throughout the movement.',
    ],
  },
  {
    id: 9,
    name: 'Squat',
    target_muscles: ['quadriceps', 'glutes', 'hamstrings'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['leg day', 'lower'],
    instructions: [
      '1. Stand tall with feet shoulder-width apart and toes slightly out.',
      '2. Initiate by pushing hips back and bending knees as if sitting in a chair, keeping chest up and back straight.',
      '3. Descend to at least parallel with your thighs to the floor.',
      '4. Drive through your heels to stand, squeezing glutes at the top.',
    ],
  },
  {
    id: 10,
    name: 'Lunge',
    target_muscles: ['quadriceps', 'glutes', 'hamstrings'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['leg day', 'lower'],
    instructions: [
      '1. Stand tall with feet together, then step forward with one leg.',
      '2. Lower your hips until both knees are bent at 90 degrees; ensure front knee is over ankle, back knee hovers.',
      '3. Push off your front foot to return to standing.',
      '4. Alternate legs, keeping your torso upright and balanced.',
    ],
  },
  {
    id: 11,
    name: 'Bulgarian Split Squat',
    target_muscles: ['quadriceps', 'glutes', 'hamstrings'],
    required_equipment: ['bench'],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['leg day', 'lower'],
    instructions: [
      '1. Stand facing away from a low bench, placing the top of one foot on the surface behind you.',
      "2. Descend by bending your front knee until it's at 90 degrees.",
      '3. Push through your front heel to stand up, engaging your glutes and quads.',
      '4. Keep your torso straight and balanced throughout the movement.',
    ],
  },
  {
    id: 12,
    name: 'Pistol Squat (Assisted)',
    target_muscles: ['quadriceps', 'glutes', 'hamstrings'],
    required_equipment: ['resistance bands'],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['leg day', 'lower'],
    instructions: [
      '1. Stand tall on one leg, extending the other forward, and hold onto a sturdy support or resistance band.',
      '2. Slowly lower into a deep single-leg squat, maintaining your balance.',
      '3. Drive through your heel to stand up, controlling the entire movement.',
      '4. Maintain a fluid motion.',
    ],
  },
  {
    id: 13,
    name: 'Calf Raise',
    target_muscles: ['calf'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['leg day', 'lower'],
    instructions: [
      '1. Stand tall with feet hip-width apart, ensuring your weight is balanced.',
      '2. Rise onto your tiptoes, lifting heels high and squeezing your calves.',
      '3. Lower with control, feeling the stretch in your calves.',
      '4. Perform smooth and controlled repetitions.',
    ],
  },
  {
    id: 14,
    name: 'Glute Bridge',
    target_muscles: ['glutes', 'hamstrings', 'lower back'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['lower'],
    instructions: [
      '1. Lie on your back with knees bent, feet flat on the floor close to your glutes.',
      '2. Drive through your heels, lifting your hips towards the ceiling until your body forms a straight line.',
      '3. Squeeze your glutes hard at the top of the movement.',
      '4. Lower with control back to the starting position.',
    ],
  },
  {
    id: 15,
    name: 'Single-Leg Glute Bridge',
    target_muscles: ['glutes', 'hamstrings', 'lower back'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['lower'],
    instructions: [
      '1. Lie on your back with one knee bent and foot flat, extending the other leg straight up.',
      '2. Drive through the heel of your planted foot, lifting your hips high.',
      '3. Squeeze the glute of your working leg at the top.',
      '4. Lower slowly, focusing on stability and control.',
    ],
  },
  {
    id: 16,
    name: 'Plank',
    target_muscles: ['abs', 'obliques', 'lower back'],
    required_equipment: [],
    emphasis: 'endurance',
    difficulty: 'beginner',
    tags: ['core'],
    instructions: [
      '1. Start on your forearms and toes, forming a straight line from head to heels.',
      '2. Engage your core tightly, pulling your belly button towards your spine.',
      '3. Avoid sagging hips or arching your back, maintaining a neutral spine.',
      '4. Breathe steadily and hold strong for the desired duration.',
    ],
  },
  {
    id: 17,
    name: 'Side Plank',
    target_muscles: ['obliques', 'abs'],
    required_equipment: [],
    emphasis: 'endurance',
    difficulty: 'beginner',
    tags: ['core'],
    instructions: [
      '1. Support your body on one forearm, stacking feet or placing one in front.',
      '2. Lift your hips, forming a straight line from head to heels.',
      '3. Engage your obliques to prevent sagging.',
      '4. Keep your neck neutral and hold the position.',
    ],
  },
  {
    id: 18,
    name: 'Crunches',
    target_muscles: ['abs'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'beginner',
    tags: ['core'],
    instructions: [
      '1. Lie on your back with knees bent, feet flat on the floor, and hands lightly behind your head.',
      '2. Engage your abs, lifting your head and shoulders off the floor, bringing ribs towards hips.',
      '3. Lower with control back to the starting position.',
      '4. Focus on a strong abdominal contraction, avoiding neck pulling.',
    ],
  },
  {
    id: 19,
    name: 'Leg Raises',
    target_muscles: ['abs'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'intermediate',
    tags: ['core'],
    instructions: [
      '1. Lie on your back with legs straight, keeping your lower back pressed firmly into the floor.',
      '2. Slowly lift your legs towards the ceiling, or until perpendicular to the floor.',
      '3. Lower with control, stopping just before your feet touch the floor.',
      '4. Feel your lower abs work to control the movement.',
    ],
  },
  {
    id: 20,
    name: 'Flutter Kicks',
    target_muscles: ['abs'],
    required_equipment: [],
    emphasis: 'endurance',
    difficulty: 'intermediate',
    tags: ['core'],
    instructions: [
      '1. Lie on your back with hands tucked under your glutes for support, lifting both legs slightly off the floor.',
      '2. Keep your legs straight and begin small, rapid up-and-down movements, alternating legs.',
      '3. Keep your lower back glued to the floor throughout the exercise.',
      '4. Breathe consistently and maintain a steady pace.',
    ],
  },
  {
    id: 21,
    name: 'V-Ups',
    target_muscles: ['abs', 'obliques', 'full body'],
    required_equipment: [],
    emphasis: 'strength',
    difficulty: 'advanced',
    tags: ['core', 'full body'],
    instructions: [
      '1. Lie flat on your back with arms extended overhead and legs straight.',
      "2. Simultaneously lift your legs and torso, reaching your hands towards your feet to form a 'V' shape.",
      '3. Control the descent back to the starting position.',
      '4. Focus on a strong core contraction throughout the movement.',
    ],
  },
];

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [opened, { toggle }] = useDisclosure();

  const setExercises = useStore((state) => state.setExercises);
  // const setExercises = useExercisesStore((state) => state.setExercises);

  const supabaseSession = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);
  // const loading = useAuthStore((state) => state.loading);
  // const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    if (supabaseSession) {
      setExercises(sampleExercises);
    }
  }, [setExercises, supabaseSession]);

  useEffect(() => {
    let authListener: {
      unsubscribe: () => void;
      subscription: Subscription;
    } | null = null;

    const setupAuth = async () => {
      console.log(
        'Setting up Supabase authentication listener and initial session check...',
      );
      // setLoading(true);

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
          // setLoading(false);
        },
      );
      authListener = {
        subscription: data.subscription,
        unsubscribe: () => data.subscription.unsubscribe(),
      }; // Assign the listener object to the variable for cleanup

      // Ensure loading is set to false after initial check and listener setup
      // This handles cases where no auth event fires immediately but initial session is known.
      // setLoading(false);
    };

    setupAuth();

    return () => {
      if (authListener) {
        authListener.unsubscribe();
        console.log('Supabase auth listener unsubscribed.');
      }
    };
  }, [setSession]);

  if (!supabaseSession) {
    return (
      <div>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  }
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Home" component={Link} to="/" onClick={toggle} />
        {/* <NavLink label="About" component={Link} to="/about" onClick={toggle} /> */}
        <NavLink
          label="Start Workout"
          component={Link}
          to="/startWorkout"
          onClick={toggle}
        />
        <NavLink
          label="Library"
          component={Link}
          to="/library"
          onClick={toggle}
        />
        <NavLink
          label="Past Workouts"
          component={Link}
          to="/history"
          onClick={toggle}
        />
        <NavLink label="Profile" component={Link} to="/user" onClick={toggle} />
        <NavLink
          label="Settings"
          component={Link}
          to="/settings"
          onClick={toggle}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
        <TanStackRouterDevtools />
      </AppShell.Main>
    </AppShell>
  );
}
