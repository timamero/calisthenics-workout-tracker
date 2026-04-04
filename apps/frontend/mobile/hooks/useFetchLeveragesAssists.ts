import { useEffect } from 'react';

import { useAuthStore, useLeveragesAssistsStore } from '@cwt/state/stores';

import { getLeveragesAssists } from '../services/leveragesAssistsService';

export function useFetchLeveragesAssists() {
  const supabaseSession = useAuthStore((state) => state.session);

  const isLeveragesAndAssistsSet = useLeveragesAssistsStore((state) =>
    state.leveragesAssists === null ? false : true,
  );
  const setLeveragesAssists = useLeveragesAssistsStore(
    (state) => state.setLeveragesAssists,
  );
  useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession?.access_token && !isLeveragesAndAssistsSet) {
        console.time('fetch leverages and assists');
        const leveragesAssists = await getLeveragesAssists(
          supabaseSession.access_token,
        );
        console.timeEnd('fetch leverages and assists');
        if (leveragesAssists) {
          setLeveragesAssists(leveragesAssists);
        }
      }
    };

    if (!isLeveragesAndAssistsSet) {
      asyncFetchData();
    }
  }, [setLeveragesAssists, supabaseSession, isLeveragesAndAssistsSet]);
}
