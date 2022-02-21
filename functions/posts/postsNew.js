const { Timestamp } = require('firebase-admin/firestore')
const { db } = require('../admin')

exports.postsNew = async (req, res) => {
  console.log(req.user)

  if (!req.body.title || !req.body.content) {
    return res.status(400).json({
      error: 'Title and content are required',
    })
  }

  const docRef = await db.collection('posts').add({
    title: req.body.title,
    content: req.body.content,
    author: req.user.id,
    createdAt: Timestamp.now(),
  })

  const postSnapshot = await docRef.get()

  const post = {
    id: postSnapshot.id,
    ...postSnapshot.data(),
    createdAt: postSnapshot.data().createdAt.toDate(),
  }

  return res.status(200).json(post)
}
