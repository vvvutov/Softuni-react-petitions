import { auth, googleProvider } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from '../firebase/firebase';
import { getDoc, doc, setDoc, collection } from "firebase/firestore";

// import { toast } from "react-toastify";


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
            signedPetitions: [],
            ownPetitions: {},
        };
        await setDoc(userDocRef, desiredData);

        return { _id: user.uid, ...desiredData };

    } catch (error) {
        throw new Error(error.message);
    }
};

export const login = async (userData) => {
    try {
        const loginInfo = await signInWithEmailAndPassword(auth, userData.email, userData.password)
        const userDocRef = doc(usersCollectionRef, loginInfo.user.uid);
        const userSnap = await getDoc(userDocRef);
        const userSnapData = userSnap.data();
        console.log(userSnapData);
        return {
            ...userSnapData,
            _id: loginInfo.user.uid,
            signedPetitions: userSnapData.signedPetitions || [],
        }
    } catch (error) {
        throw new Error(error);
    }
};


export const googleSignIn = async () => {
    try {
        const googleSignInInfo = await signInWithPopup(auth, googleProvider);

        const googleInfo = {
            username: googleSignInInfo.user.email.split('@')[0],
            firstName: googleSignInInfo.user.displayName.split(' ')[0],
            lastName: googleSignInInfo.user.displayName.split(' ')[1],
            _id: googleSignInInfo.user.uid,
            email: googleSignInInfo.user.email,
            confirmation: {
                checked: true
            },
            photo: googleSignInInfo.user.photoURL,
        }
        //After signing in with google, the functions gets the full user info from db
        const userDocRef = doc(usersCollectionRef, googleInfo._id);
        const userSnap = await getDoc(userDocRef);
        const userSnapData = userSnap.data();
        return userSnapData

    } catch (error) {
        throw new Error(error.message)
    }
};


export const updateFirebaseUser = async (userID, updateInfo) => {
    try {
        const userDocRef = doc(usersCollectionRef, userID);
        await setDoc(userDocRef, updateInfo);
    } catch (error) {
        throw new Error(error.message);
    }
};


export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message);
    }
};


