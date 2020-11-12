// eslint-disable-next-line import/prefer-default-export
export const validation = (email, password, name) => {
  if (!email || !password || !name) {
    return 'All fields are required'
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long'
  }

  if (name.length < 2) {
    return 'Password must be at least 2 characters long'
  }
  return false
}
