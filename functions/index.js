// Firebase Functions
const functions = require('firebase-functions')

const { postsNew } = require('./posts/postsNew')
const { postsAll } = require('./posts/postsAll')
const { usersNew } = require('./users/usersNew')
const { usersById } = require('./users/usersById')
const { usersLogin } = require('./users/usersLogin')
const { withAuth } = require('./with-auth')

// Initialize Express
const app = require('express')()
const cors = require('cors')
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

// users
app.post('/users/login', usersLogin)
app.get('/users/:userId', usersById)
app.post('/users/new', usersNew)

// Posts
app.post('/posts/new', withAuth, postsNew)
app.get('/posts/all', postsAll)

exports.api = functions.https.onRequest(app)
