/***
 * Create a user in Supabase and return the user object.
 * @param {Object} supabase - The Supabase client instance.
 * @returns {Promise<Object|null>} The created user object or null if an error occurred.
 * @throws Will log an error if user creation fails.
 */
import { SupabaseClient } from "@supabase/supabase-js";

export const createUser = async (
  supabase: SupabaseClient,
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
) => {
  const options = {
    data: {
      first_name: firstName,
      last_name: lastName,
    },
  };

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: options,
  });

  if (error) {
    console.error("Error creating user:", error);
    return null;
  }
  return data.user;
};
