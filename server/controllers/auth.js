const User = require('../models/user')

exports.createOrUpdateUser = async (req, res) => {
  const name = req.user.name || req.body.name
  try {
    const { email, picture } = req.user

    const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true })

    if (user) {
      res.json(user)
    } else {
      const newUser = await new User({
        name,
        email,
        picture
      }).save()
      res.json(newUser)
    }
  } catch (error) {
    res.status(401).json({ message: 'Error while creare/update user', error})
  }
}