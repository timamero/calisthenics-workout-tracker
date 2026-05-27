/***
 * Resend confirmation email using Supabase authentication.
 * @param {Object} supabase - The Supabase client instance.
 * @throws Will log an error resending fails.
 */
import { SupabaseClient } from '@supabase/supabase-js';

export const resendConfirmation = async (
  supabase: SupabaseClient,
  email: string,
) => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  });

  if (error) {
    console.error('Error resending confirmation:', error);
    return null;
  }

  return true;
};
