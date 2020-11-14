const admin = require('../firebase')

const authCheck = async (req, res, next) => {
  try {
    const {authorization} = req.headers
    const firebaseUser = await admin.auth().verifyIdToken(authorization)
    req.user = firebaseUser
    console.log('server: ', req.user)
    next()
  } catch (error) {
    res.status(401).json({message: 'Token is not valid'})
  }
}

module.exports = authCheck
