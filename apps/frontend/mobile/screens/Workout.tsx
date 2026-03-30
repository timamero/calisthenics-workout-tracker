import { useEffect } from 'react';

import {
  useExerciseLibraryStore,
  useAuthStore,
  useLeveragesAssistsStore,
} from '@cwt/state/stores';

import { getExercises } from '../services/exercisesService';
import { getLeveragesAssists } from '../services/leveragesAssistsService';

import WorkoutDraft from '../components/WorkoutDraft';

export default function WorkoutScreen() {
  const supabaseSession = useAuthStore((state) => state.session);
  const isExercisesFetched = useExerciseLibraryStore(
    (state) => state.isExercisesFetched,
  );
  const setIsExercisesFetched = useExerciseLibraryStore(
    (state) => state.setIsExercisesFetched,
  );
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);

  const setLeveragesAssists = useLeveragesAssistsStore(
    (state) => state.setLeveragesAssists,
  );
  useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession?.access_token && !isExercisesFetched) {
        const leveragesAssists = await getLeveragesAssists(
          supabaseSession.access_token,
        );
        if (leveragesAssists) {
          setLeveragesAssists(leveragesAssists);
        }
        const exercises = await getExercises(supabaseSession.access_token);
        if (exercises) {
          setExercises(exercises);
          setIsExercisesFetched(true);
        }
      }
    };
    asyncFetchData();
  }, [
    setExercises,
    supabaseSession,
    setLeveragesAssists,
    isExercisesFetched,
    setIsExercisesFetched,
  ]);
  return <WorkoutDraft />;
}
