import { initializeApp } from "firebase/app";
import  { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyD1t9usMmzBBo7TMeIFbOUgCPy8Ilg_M8w",
  authDomain:  "petitions-2f2b0.firebaseapp.com",
  projectId: "petitions-2f2b0",
  storageBucket: "petitions-2f2b0.appspot.com",
  messagingSenderId: "460242636813",
  appId: "1:460242636813:web:2abc63e98ccc7f52334544",
  measurementId: "G-1EC893TLMM"
};


const app = initializeApp(firebaseConfig);
export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);