const { firebaseConfig } = require('./config');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();    //for local use in frontend
const storage = firebase.storage();