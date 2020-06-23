// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/analytics");
require("firebase/auth");
require("firebase/firestore");
require("firebase/functions");

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  appId: process.env.VUE_APP_APPID,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET
};

firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const firestore = firebase.firestore;
const functions = firebase.functions();
firebase.analytics();

// firebase collections
const usersCollection = db.collection("users");
const cluesCollection = db.collection("clues");

export { db, auth, firestore, usersCollection, cluesCollection, functions };
