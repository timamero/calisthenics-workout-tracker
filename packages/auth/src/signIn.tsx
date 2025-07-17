/***
 * Sign in a user using Supabase authentication.
 * @param {Object} supabase - The Supabase client instance.
 * @returns {Promise<Object|null>} The signed in user object or null if an error occurred.
 * @throws Will log an error if signing in fails.
 */

export const signIn = async (supabase) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'example@email.com',
    password: 'example-password',
  })

  if (error) {
    console.error('Error signing in user:', error)
    return null
  }
  return data.user
}