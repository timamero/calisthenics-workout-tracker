/***
 * Retrieve the current user from Supabase authentication.
 * @param {Object} supabase - The Supabase client instance.
 * @returns {Promise<Object|null>} The current user object or null if an error occurred.
 */

export const user = async (supabase) => {
  const { data: { user } } = await supabase.auth.getUser()

  return user
}