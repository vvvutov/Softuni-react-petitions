import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useLocalStorage('auth', {});


    const userLogin = (authData) => {
        if (authData !== undefined) {
            setAuth(authData, {});
        } else {
            setAuth({})
        }
    };

    const userLogout = () => {
        setAuth({});
    };

    const userUpdate = (petitionId) => {
        auth.signedPetitions.push(petitionId)
      setAuth(auth)
    };


    return (
        <AuthContext.Provider value={{
            user: auth,
            userLogin,
            userLogout,
            userUpdate,
            isAuthenticated: Boolean(auth?._id),
            isSignedWithGoogle: auth.signedWithGoogle,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

