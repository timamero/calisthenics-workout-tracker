/***
 * Sign in a user using Supabase authentication.
 * @param {Object} supabase - The Supabase client instance.
 * @returns {Promise<Object|null>} The signed in user object or null if an error occurred.
 * @throws Will log an error if signing in fails.
 */
import { SupabaseClient } from "@supabase/supabase-js";

export const signIn = async (
  supabase: SupabaseClient,
  email: string,
  password: string,
) => {
  console.log("signIn || calling supabase.auth.ignInWithPassword");
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Error signing in user:", error);
    return null;
  }
  return data.user;
};
