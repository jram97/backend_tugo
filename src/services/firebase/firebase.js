const admin = require("firebase-admin");

const serviceAccount = require("./firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tugo-4bba8.firebaseio.com"
});
console.log("Firebase init");
