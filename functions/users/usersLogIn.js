const { signInWithEmailAndPassword } = require('firebase/auth')
const { auth } = require('../app')

exports.usersLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: 'que te peines',
        })
    }

    console.log(email)
    console.log(password)

    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )

        console.log('user ', userCredential.user)

        const token = await userCredential.user.getIdToken()

        return res.status(200).json({
            token,
        })
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: error.message,
        })
    }
}
