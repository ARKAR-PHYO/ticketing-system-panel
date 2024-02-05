importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: 'AIzaSyBMuELWS4JkHo-AQiXP-SaBUwBrnpEXSX8',
    authDomain: 'ticket-24c2a.firebaseapp.com',
    projectId: 'ticket-24c2a',
    storageBucket: 'ticket-24c2a.appspot.com',
    messagingSenderId: '827359891118',
    appId: '1:827359891118:web:f6d56ae6f5e859270a673f',
    measurementId: 'G-K45K85T0Q2',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()
