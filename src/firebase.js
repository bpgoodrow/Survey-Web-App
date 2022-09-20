import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGbcaGMfwTIsbPclPkHHrYvxYTBR4P91g",
  authDomain: "survey-web-app-900f2.firebaseapp.com",
  projectId: "survey-web-app-900f2",
  storageBucket: "survey-web-app-900f2.appspot.com",
  messagingSenderId: "143429109036",
  appId: "1:143429109036:web:d4dd7cad8087c69a6f1889"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };