// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
<<<<<<< HEAD
import {getStorage} from 'firebase/storage';
=======
>>>>>>> ec1fc8ecf80d4c9da6e6dedb3bed2c9f30be26be
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4iC0cyOZX6QDNmyWvRTvSIJrcxsseluw",
  authDomain: "tikapp-ffc9b.firebaseapp.com",
  projectId: "tikapp-ffc9b",
  storageBucket: "tikapp-ffc9b.appspot.com",
  messagingSenderId: "54379057959",
  appId: "1:54379057959:web:9657dbb7bb8068203f4f02",
  measurementId: "G-W0FLC2R6ZP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
<<<<<<< HEAD
export const storage=getStorage(app);
=======
>>>>>>> ec1fc8ecf80d4c9da6e6dedb3bed2c9f30be26be
// const analytics = getAnalytics(app);