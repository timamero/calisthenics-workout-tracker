/***
 * Create a user in Supabase and return the user object.
 * @param {Object} supabase - The Supabase client instance.
 * @returns {Promise<Object|null>} The created user object or null if an error occurred.
 * @throws Will log an error if user creation fails.
 */

export const createUser = async (supabase) => {
  const { data, error } = await supabase.auth.signUp({
    email: 'example@email.com',
    password: 'example-password',
  })

  if (error) {
    console.error('Error creating user:', error)
    return null
  }
  return data.user
}