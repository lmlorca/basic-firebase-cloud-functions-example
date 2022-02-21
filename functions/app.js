// Firebase App
const { initializeApp: initializeClientApp } = require('firebase/app')
const { getAuth: getClientAuth } = require('firebase/auth')

// Initialize Client
const firebaseConfig = {
    apiKey: 'AIzaSyAliglk-99O0OpbCglAHIvX3H6OhBr5wmk',
    authDomain: 'basic-cda28.firebaseapp.com',
    projectId: 'basic-cda28',
    storageBucket: 'basic-cda28.appspot.com',
    messagingSenderId: '111960434047',
    appId: '1:111960434047:web:5a864b54005173ce02a64a',
}
initializeClientApp(firebaseConfig)
const auth = getClientAuth()

exports.auth = auth
