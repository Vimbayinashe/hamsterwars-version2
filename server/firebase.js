const admin = require("firebase-admin");
const { Storage } =  require('@google-cloud/storage');


const serviceAccount = require("./serviceAccount.json");



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hamster-vote-app.firebaseio.com",
    storageBucket: "hamster-vote-app.appspot.com"
});


// Firebase Code Hints
const auth = admin.auth();
const db = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket('hamsters');

//testing gcloud
// console.log(gcloud);

const  gcs =  new Storage({
    projectId: 'hamster-vote-app',
    keyFilename: "./serviceAccount.json"
});

const gcBucket = gcs.bucket('hamster-vote-app.appspot.com');


module.exports = { auth, db, storage, bucket, gcBucket  }