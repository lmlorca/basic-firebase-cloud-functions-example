const { db } = require('../admin')

exports.usersById = async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.userId)
        const userSnapshot = await userRef.get()
        const userData = userSnapshot.data()
        return res
            .status(200)
            .json({
                ...userData,
                createdAt: userData.createdAt.toDate(),
                updatedAt: userData.updatedAt.toDate(),
            })
    } catch (error) {
        return res.status(404).json({
            message: 'Error from Firebase Authentication: ' + error.message,
        })
    }
}
