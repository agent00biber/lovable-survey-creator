import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

/*
Add your initials here
const config = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
*/

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;
const fieldValue = firebase.firestore.FieldValue;

// firebase collections
const testersCollection = db.collection("testers");
const feedbackCollection = db.collection("feedback");
const commentsCollection = db.collection("comments");
const surveyCollection = db.collection("surveys");
const usersCollection = db.collection("users");

export {
  auth,
  currentUser,
  fieldValue,
  testersCollection,
  feedbackCollection,
  commentsCollection,
  surveyCollection,
  usersCollection
};
