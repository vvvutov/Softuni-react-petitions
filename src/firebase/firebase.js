import { initializeApp } from "firebase/app";
import  { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD1t9usMmzBBo7TMeIFbOUgCPy8Ilg_M8w",
  authDomain:  "petitions-2f2b0.firebaseapp.com",
  projectId: "petitions-2f2b0",
  storageBucket: "petitions-2f2b0.appspot.com",
  messagingSenderId: "460242636813",
  appId: "1:460242636813:web:2abc63e98ccc7f52334544",
  measurementId: "G-1EC893TLMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app)
export const db = getFirestore(app);