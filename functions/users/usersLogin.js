const { signInWithEmailAndPassword } = require('firebase/auth')
const { auth } = require('../app')

const isValidEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

exports.usersLogin = async (req, res) => {
  const { email, password } = req.body

  const errors = {}

  if (!email) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(email)) {
    errors.email = 'Email is invalid'
  }

  if (!password) {
    errors.password = 'Password is required'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors })
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    return res.status(200).json({
      accessToken: userCredential.user.stsToken?.accessToken,
      ...userCredential.user,
    })
  } catch (error) {
    if (error.message?.includes('wrong-password')) {
      errors.password = 'Wrong password'
    }
    if (error.message?.includes('user-not-found')) {
      errors.general = 'User not found'
    }

    return res.status(400).json({ errors })
  }
}
