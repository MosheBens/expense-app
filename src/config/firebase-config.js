// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional 
const firebaseConfig = {
  apiKey: "AIzaSyBwcFzthzimSBJ5AZ6-NyPjnyqw_hpXJUE",
  authDomain: "my-expense-tracker-40ab8.firebaseapp.com",
  projectId: "my-expense-tracker-40ab8",
  storageBucket: "my-expense-tracker-40ab8.appspot.com",
  messagingSenderId: "865331777883",
  appId: "1:865331777883:web:6c2cdce72f8c3bae948a7e",
  measurementId: "G-JPDX6L552Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);