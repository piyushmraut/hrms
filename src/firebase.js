import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXbbb6ZTpqJDlxmm4uz-cL0axMQQjFFLg",
  authDomain: "hr-mgmt-a92c9.firebaseapp.com",
  projectId: "hr-mgmt-a92c9",
  storageBucket: "hr-mgmt-a92c9.firebasestorage.app",
  messagingSenderId: "432832537043",
  appId: "1:432832537043:web:167efedc0c46d17b2e4f26",
  measurementId: "G-CMNG3CKENE",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };