import { createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
   
    const [auth, setAuth] = useLocalStorage('auth', {});

    console.log("auth", auth);

    const userLogin = (authData) => {
        setAuth(authData, {});
    };

    const userLogout = () => {
        setAuth({});
    };

 
    console.log("authenticated", Boolean(auth?.user?.stsTokenManager?.accessToken));
    return (

        <AuthContext.Provider value={{
            user: auth,
            userLogin,
            userLogout,
            isAuthenticated: Boolean(auth?.user?.stsTokenManager?.accessToken)
        }}>
            {children}
        </AuthContext.Provider>  
    );
};


// export const useAuthContext = () => {
//     const context = useContext(AuthContext);

//     return context;
// };


// // export const withAuth = (Component) => {
// //     const AuthWrapper = (props) => {
// //         const context = useContext(AuthContext);
        
// //         return <Component {...props} auth={context} />
// //     }

// //     return AuthWrapper;
// // } 