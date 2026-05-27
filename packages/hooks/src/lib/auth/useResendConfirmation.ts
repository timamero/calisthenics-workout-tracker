import { useState } from 'react';
import { type SupabaseClient } from '@supabase/supabase-js';
import { resendConfirmation } from '@cwt/auth';

export default function useResendConfirmation(supabase: SupabaseClient) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'sent' | 'error'>(
    'idle',
  );
  const handleResendConfirmation = async (email: string) => {
    setStatus('pending');
    try {
      const data = await resendConfirmation(supabase, email);
      if (!data) {
        setStatus('error');
        return null;
      } else {
        setStatus('sent');
      }
    } catch (error) {
      setStatus('error');
      console.error(error);
      return null;
    }
  };

  return {
    status,
    setStatus,
    handleResendConfirmation,
  };
}
