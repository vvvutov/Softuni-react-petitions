import { auth, googleProvider } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut} from "firebase/auth";


export const login = async (userData) => {
    try {
        return await signInWithEmailAndPassword(auth, userData.email, userData.password)
    } catch(error) {
        console.error(error);
    }
}

export const googleSignIn = async () => {
    try {
        return await signInWithPopup(auth, googleProvider)
    } catch (error) {
        console.error(error)
    }
};

export const register = async (userData) => {
    try {
        return await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    } catch (error) {
        console.error(error)
    }
};


export const logout= async () => {
    try {
        console.log(auth);

        const logoutData =  await signOut(auth);
        console.log( "Logout Data", logoutData);
    } catch (error) {
        console.error(error)
    }
};



//OLD AUTH FUNCTIONS JUST IN CASE FIREBASE FAILS
// export const login = async (userData) => {
//     return await request(`${baseUrl}/users/login`, 'POST', userData)
// };
// export const register = async (userData) => {
//     return await request(`${baseUrl}/users/register`, 'POST', userData)
// };

// export const logout = async (accessToken) => {
//     try {
//         const response = await fetch(`${baseUrl}/users/logout`, {
//             headers: {
//                 'X-Authorization': accessToken
//             }
//         })
//         return response
//     } catch (error) {
//         console.log(error);
//     }
// };