import { useState } from 'react';
import { type SupabaseClient } from '@supabase/supabase-js';
import { confirmUser } from '@cwt/auth';

export default function useConfirmUser(supabase: SupabaseClient) {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'confirmed' | 'error'
  >('idle');
  const handleConfirmUser = async (tokenHash: string) => {
    // if (status === 'idle') {
    setStatus('pending');
    try {
      console.log('useConfirmUser || calling handleConfirmUser');
      const user = await confirmUser(supabase, tokenHash);
      if (!user) {
        // setStatus('error');
        console.error('Auth error at confirmation');
        return null;
      } else {
        console.log('useConfirmUser || setting status to confirmed');
        setStatus('confirmed');
        return user;
      }
    } catch (error) {
      setStatus('error');
      console.error(error);
      return null;
    }
    // }
  };

  return {
    status,
    setStatus,
    handleConfirmUser,
  };
}
