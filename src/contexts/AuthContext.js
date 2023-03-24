import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
   
    const [auth, setAuth] = useLocalStorage('auth', {});

    console.log("auth", auth);

    const userLogin = (authData) => {
        if(authData !== undefined){
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