import { auth, googleProvider, facebookProvider } from "../firebase/firebase"
import {
  createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect,
  getRedirectResult, signInWithEmailAndPassword, signOut, GoogleAuthProvider
} from "firebase/auth";
import { db } from '../firebase/firebase';
import { getDoc, doc, setDoc, collection } from "firebase/firestore";

import { getSignedPetitions } from "./petitionService";

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
      signedWithGoogle: false,
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
    return {
      ...userSnapData,
      _id: loginInfo.user.uid,
      signedPetitions: userSnapData.signedPetitions || [],
      signedWithGoogle: false,
    }
  } catch (error) {
    throw new Error(error);
  }
};
//Not used
export const googleSignInWithRedirect = async () => {
  try {
    const provider = new GoogleAuthProvider();

    // Start the Google sign-in process with redirect
    await signInWithRedirect(auth, provider);

    // The code execution will continue after the redirect
    // Handle the redirect result to get user information
    const result = await getRedirectResult(auth);

    if (result.user) {
      const googleInfo = {
        username: result.user.email.split('@')[0],
        firstName: result.user.displayName.split(' ')[0],
        lastName: result.user.displayName.split(' ')[1],
        _id: result.user.uid,
        email: result.user.email,
        confirmation: {
          checked: true
        },
        photo: result.user.photoURL,
      };

      const userDocRef = doc(usersCollectionRef, googleInfo._id);

      // Set the user info in the database if it doesn't exist yet
      await setDoc(userDocRef, googleInfo);

      // Get the full user info from the database
      const userSnap = await getDoc(userDocRef);
      const userSnapData = userSnap.data();

      // Fetch the signed petitions for the user and include them in the returned user object
      const signedPetitions = await getSignedPetitions(result.user.displayName);

      return {
        ...userSnapData,
        signedPetitions: signedPetitions || [],
        signedWithGoogle: true,
      };
    } else {
      // Handle the case where the redirect result does not contain user information
      console.error('Google sign-in redirect result does not contain user information');
      throw new Error('Google sign-in failed');
    }
  } catch (error) {
    console.error('Error during Google sign-in with redirect:', error);
    throw new Error(error.message);
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
    };

    const userDocRef = doc(usersCollectionRef, googleInfo._id);
    console.log(userDocRef, googleInfo);
    // Set the user info in the database if it doesn't exist yet
    await setDoc(userDocRef, googleInfo);

    // Get the full user info from the database
    const userSnap = await getDoc(userDocRef);
    const userSnapData = userSnap.data();

    // Fetch the signed petitions for the user and include them in the returned user object
    const signedPetitions = await getSignedPetitions(googleSignInInfo.user.displayName);
    return {
      ...userSnapData,
      signedPetitions: signedPetitions || [],
      signedWithGoogle: true,
    };
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw new Error(error.message);
  }
};

export const signInWithFacebook = async () => {
  
  
try {
    const facebookSignInInfo = await signInWithPopup(auth, facebookProvider)
    
    const facebookInfo = {
      username: facebookSignInInfo.user.displayName,
      firstName: facebookSignInInfo.user.displayName.split(' ')[0],
      lastName: facebookSignInInfo.user.displayName.split(' ')[1],
      _id: facebookSignInInfo.user.uid,
      email: facebookSignInInfo.user.providerData[0].email,
      confirmation: {
        checked: true
      },
      photo: facebookSignInInfo.user.photoURL,
    };
  
    console.log("facebookInfo", facebookInfo);
  
    const userDocRef = doc(usersCollectionRef, facebookInfo._id);
    await setDoc(userDocRef, facebookInfo);
    const userSnap = await getDoc(userDocRef);
    const userSnapData = userSnap.data();
    console.log(userSnapData);
   
    const signedPetitions = await getSignedPetitions(facebookInfo.username);
    console.log({
      ...userSnapData,
      signedPetitions: signedPetitions || [],
      signedWithFacebook: true,
    });
    return {
      ...userSnapData,
      signedPetitions: signedPetitions || [],
      signedWithFacebook: true,
    };
  
} catch (error) {
  throw new Error(error)
}
}
//Not used
export const facebookSignIn = async () => {
  try {
    // Initialize the Facebook provider object
    

    // Trigger the Facebook sign-in flow with a redirect
    await signInWithRedirect(auth, facebookProvider);

    // Wait for the user to complete the Facebook login flow and be redirected back to your app
    const credentials = await getRedirectResult(auth);
    console.log(credentials);
    // Extract the user information from the credentials object
    const facebookInfo = {
      username: credentials.additionalUserInfo.profile.first_name,
      firstName: credentials.additionalUserInfo.profile.first_name,
      lastName: credentials.additionalUserInfo.profile.last_name,
      _id: credentials.user.uid,
      email: credentials.user.email,
      confirmation: {
        checked: true
      },
      photo: credentials.additionalUserInfo.profile.picture.data.url,
    };

    const userDocRef = doc(usersCollectionRef, facebookInfo._id);

    // Set the user info in the database if it doesn't exist yet
    await setDoc(userDocRef, facebookInfo);

    // Get the full user info from the database
    const userSnap = await getDoc(userDocRef);
    const userSnapData = userSnap.data();

    // Fetch the signed petitions for the user and include them in the returned user object
    const signedPetitions = await getSignedPetitions(facebookInfo.username);
    return {
      ...userSnapData,
      signedPetitions: signedPetitions || [],
      signedWithFacebook: true,
    };
  } catch (error) {
    throw new Error(error.message);
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


