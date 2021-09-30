import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtfN9qimFXWnckayfjBDMG9XlWmhrm-Io",
  authDomain: "message-app-a5be1.firebaseapp.com",
  projectId: "message-app-a5be1",
  storageBucket: "message-app-a5be1.appspot.com",
  messagingSenderId: "546652757070",
  appId: "1:546652757070:web:4a30090882b90ced4e371f",
  measurementId: "G-1TPJENCHBM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider}
export default db