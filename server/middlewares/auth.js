const admin = require('../firebase')
const User = require('../models/user')

exports.authCheck = async (req, res, next) => {
  try {
    const {authorization} = req.headers
    const firebaseUser = await admin.auth().verifyIdToken(authorization)
    req.user = firebaseUser

    next()
  } catch (error) {
    res.status(401).json({message: 'Token is not valid'})
  }
}

exports.adminCheck = async (req, res, next) => {
    const {email} = req.user
    const adminUser = await User.findOne({email}).exec()
    if (adminUser.role === 'admin') {
      next()
    } else {
      res.status(401).json('Admin resourse. Access denied')
    }
}
