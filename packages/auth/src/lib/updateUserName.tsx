/***
 * Create a user in Supabase and return the user object.
 * @param {Object} supabase - The Supabase client instance.
 * @returns {Promise<Object|null>} The created user object or null if an error occurred.
 * @throws Will log an error if user creation fails.
 */
import { SupabaseClient } from "@supabase/supabase-js";

export const updateUserName = async (
  supabase: SupabaseClient,
  name: string,
) => {
  const data = {
    display_name: name,
  };
  const { error } = await supabase.auth.updateUser({
    data,
  });

  if (error) {
    console.error("Error creating user:", error);
  }
};
