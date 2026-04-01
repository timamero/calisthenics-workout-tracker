import { useEffect } from 'react';

import { useAuthStore, useLeveragesAssistsStore } from '@cwt/state/stores';

import { getLeveragesAssists } from '../services/leveragesAssistsService';

export function useFetchLeveragesAssists() {
  console.log('useFetchLeveragesAssists called');
  const supabaseSession = useAuthStore((state) => state.session);

  const isLeveragesAndAssistsSet = useLeveragesAssistsStore((state) =>
    state.leveragesAssists === null ? false : true,
  );
  const setLeveragesAssists = useLeveragesAssistsStore(
    (state) => state.setLeveragesAssists,
  );
  useEffect(() => {
    console.log('useFetchLeveragesAssists useEffect called');

    const asyncFetchData = async () => {
      console.log('useFetchLeveragesAssists');
      if (supabaseSession?.access_token && !isLeveragesAndAssistsSet) {
        console.log('fetching leverages and assists');
        const leveragesAssists = await getLeveragesAssists(
          supabaseSession.access_token,
        );
        if (leveragesAssists) {
          setLeveragesAssists(leveragesAssists);
        }
      }
    };

    if (!isLeveragesAndAssistsSet) {
      console.log(
        'calling asyn func for fetching and setting the leverages and assists',
      );
      asyncFetchData();
    }
  }, [setLeveragesAssists, supabaseSession, isLeveragesAndAssistsSet]);
}
