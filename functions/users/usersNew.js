const { Timestamp } = require('firebase-admin/firestore')
const { db } = require('../admin')
const { createUserWithEmailAndPassword } = require('firebase/auth')
const { auth } = require('../app')

exports.usersNew = async (req, res) => {
    const { username, email, password, confirmationPassword } = req.body
    if (!username || !email || !password || !confirmationPassword) {
        return res.status(400).json({
            message: 'Missing required fields',
        })
    }

    if (password !== confirmationPassword) {
        return res.status(400).json({
            message: 'Passwords do not match',
        })
    }

    try {
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )

        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', user.uid)

        await db.collection('users').doc(user.uid).set({
            id: user.uid,
            username,
            email,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        })

        return res.status(200).json({
            message: 'Successfully created new user:',
            user_uid: user.uid,
            userData: user.toJSON(),
        })
    } catch (error) {
        console.log('Error creating new user:', error)
        return res.status(500).json({ message: error.message })
    }
}
