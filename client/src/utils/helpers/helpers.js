import constants from '../../constants/general'

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

export const redirectUserByRole = (role, history) => {
  constants.log('history: ', history)
  const intended = history.location.state;
  if (intended) {
    history.push(intended.from);
  }
  if (role === constants.ADMIN) {
    return history.push('/admin/dashboard')
  }
  return history.push('/user/history')
}

export const searchCategory = (search, categories) => {
  return categories.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
}

export const capitalize = str => {
  if (str && str !== '') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return '';
};

export const ratingValue = ratings => {
  const starCount = ratings.reduce((acc, item) => acc + item.star, 0)
  const averageCount = starCount / ratings.length

  return averageCount
}

export const totalCost = cart => {
  return cart.reduce((acc, item) => acc + item.count * item.price, 0)
}
