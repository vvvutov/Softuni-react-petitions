import { auth, googleProvider } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from '../firebase/firebase';
import { doc, setDoc, collection } from "firebase/firestore";


const usersCollectionRef = collection(db, "users");

export const register = async (userData) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

        const userDocRef = doc(usersCollectionRef, user.uid);

        const desiredData = {
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            age: userData.age,
            gender: userData.gender,
            signedPetions: [],
            ownPetitions: [],
        }
        await setDoc(userDocRef, desiredData);

        return { _id: user.uid, ...desiredData };

    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const login = async (userData) => {
    try {
        return await signInWithEmailAndPassword(auth, userData.email, userData.password)
    } catch (error) {
        console.error(error);
    }
};


export const googleSignIn = async () => {
    try {
        return await signInWithPopup(auth, googleProvider)
    } catch (error) {
        console.error(error)
    }
};


export const updateFirebaseUser = async (userID, updateInfo) => {
   try {
       const userDocRef = doc(usersCollectionRef, userID);
       await setDoc(userDocRef, updateInfo);
   } catch (error) {
    console.log(error);
   }
};


export const logout = async () => {
    try {
        console.log(auth);

        const logoutData = await signOut(auth);
        console.log("Logout Data", logoutData);
    } catch (error) {
        console.error(error)
    }
};


