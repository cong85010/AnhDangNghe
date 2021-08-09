import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyCIXj2JbGCFXTb5uzJa64Ji3hJqnR4VagU",
  authDomain: "anhdangnghe-99d82.firebaseapp.com",
  databaseURL: "https://anhdangnghe-99d82-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "anhdangnghe-99d82",
  storageBucket: "anhdangnghe-99d82.appspot.com",
  messagingSenderId: "357574528306",
  appId: "1:357574528306:web:c056804d85cb5182bd1b2b",
  measurementId: "G-N0P6SR37PS"
};
  
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default db;