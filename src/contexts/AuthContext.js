import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useLocalStorage('auth', {});

    console.log("auth", auth);

    const userLogin = (authData) => {
        if (authData !== undefined) {
            console.log(authData);
            setAuth(authData, {});
        } else {
            setAuth({})
        }
    };

    const userLogout = () => {
        setAuth({});
    };

    const userUpdate = (updatedInfo) => {
        setAuth(updatedInfo)
    };

    console.log("isAuthenticated", Boolean(auth?._id));

    return (
        <AuthContext.Provider value={{
            user: auth,
            userLogin,
            userLogout,
            userUpdate,
            isAuthenticated: Boolean(auth?._id)
        }}>
            {children}
        </AuthContext.Provider>
    );
};

