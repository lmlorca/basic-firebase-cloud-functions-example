const { db } = require('../admin')

exports.postsAll = async (req, res) => {
  const postsSnapshot = await db.collection('posts').get()

  const posts = postsSnapshot.docs.map((post) => {
    return {
      id: post.id,
      title: post.data().title,
      content: post.data().content,
      // ...post.data(),
      createdAt: post.data().createdAt.toDate(),
    }
  })

  return res.status(200).json(posts)
}
