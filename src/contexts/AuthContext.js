import { createContext } from "react";
// import { useLocalStorage } from "../hooks/useLocalStorage";


export const AuthContext = createContext()

// export const AuthProvider = ({
//     children,
// }) => {
//     const [auth, setAuth] = useLocalStorage('auth', {});

//     const userLogin = (authData) => {
//         console.log(authData)
//         setAuth(authData);
//     };

//     const userLogout = () => {
//         setAuth({});
//     };

//     return (
//         <AuthContext.Provider value={{
//             user: auth,
//             userLogin,
//             userLogout,
//             isAuthenticated: !!auth.accessToken
//         }}>
//             {children}
//         </AuthContext.Provider>  
//     );
// };


// // export const useAuthContext = () => {
// //     const context = useContext(AuthContext);

// //     return context;
// // };


// // export const withAuth = (Component) => {
// //     const AuthWrapper = (props) => {
// //         const context = useContext(AuthContext);
        
// //         return <Component {...props} auth={context} />
// //     }

// //     return AuthWrapper;
// // } 