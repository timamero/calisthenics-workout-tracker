/***
 * Confirm a user using Supabase authentication.
 * @param {Object} supabase - The Supabase client instance.
 * @throws Will log an error confirmation fails.
 */
import { SupabaseClient } from "@supabase/supabase-js";

export const confirmUser = async (
  supabase: SupabaseClient,
  email: string,
  token: string,
) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    console.error("Error confirming user:", error);
    return null;
  }
  return data.user;
};
