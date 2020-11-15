const User = require('../models/user')

exports.createOrUpdateUser = async (req, res) => {
  const name = req.user.name || req.body.name
  const authtoken = req.headers.authorization
  try {
    const { email, picture } = req.user

    const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true })

    if (user) {
      res.json(user)
    } else {
      const newUser = await new User({
        name,
        email,
        picture,
        role: 'subscriber'
      }).save()
      res.json(newUser)
    }
  } catch (error) {
    res.status(401).json({ message: 'Error while creare/update user', error})
  }
}

exports.currentUser = (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error('Invalid token')
    res.json(user)
  })
}
