/***
 * Confirm a user using Supabase authentication.
 * @param {Object} supabase - The Supabase client instance.
 * @throws Will log an error confirmation fails.
 */
import { SupabaseClient } from "@supabase/supabase-js";

export const confirmUser = async (
  supabase: SupabaseClient,
  tokenHash: string,
) => {
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "email",
  });

  if (error) {
    console.error("Error confirming user:", error);
    return null;
  }
  return data.user;
};
