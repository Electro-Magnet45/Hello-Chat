import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDQpEcYTniVuW1ZH9E41e8Dcmy55CCeAZs",
  authDomain: "twitter-clone-5444f.firebaseapp.com",
  projectId: "twitter-clone-5444f",
  storageBucket: "twitter-clone-5444f.appspot.com",
  messagingSenderId: "833560824291",
  appId: "1:833560824291:web:ef734eb7e75a6b4087b8d6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
var forDate = firebase.firestore;

export { db, firebase, forDate };
