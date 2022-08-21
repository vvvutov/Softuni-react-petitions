// import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// import { AuthContext } from "../contexts/AuthContext";
// import { logout } from "../services/authService";

export const Logout = () => {
    const navigate = useNavigate();

    navigate('/')

    
    
    // const {user, userLogin} = useContext(AuthContext);

    // useEffect(() => {
    //     logout(user.accessToken)
    //     .then(() => {
    //         userLogin({})
    //         navigate('/')
    //     })
    //     .catch(() =>{
    //         navigate('/')
    //     })
    // }) 
    
    return null;
};