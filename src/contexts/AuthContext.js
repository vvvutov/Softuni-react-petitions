import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
   
    const [auth, setAuth] = useLocalStorage('auth', {});

    let isAuthenticated;

    const userLogin = (authData) => {
        setAuth(authData, {});
    };

    const userLogout = () => {
        setAuth({});
    };

    if (auth?.user?.accessToken === undefined) {
        isAuthenticated = false
    } else {
        isAuthenticated = true
    }
    console.log(isAuthenticated);
    return (

        <AuthContext.Provider value={{
            user: auth,
            userLogin,
            userLogout,
            isAuthenticated
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