import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useLocalStorage('auth', {});

    console.log("auth", auth);

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


    return (
        <AuthContext.Provider value={{
            user: auth,
            userLogin,
            userLogout,
            isAuthenticated: Boolean(auth?._id)
        }}>
            {children}
        </AuthContext.Provider>
    );
};

