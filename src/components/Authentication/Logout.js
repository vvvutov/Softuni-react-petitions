import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext"
import { logout } from "../../services/authService";

export const Logout = () => {
    const navigate = useNavigate();


    const { userLogin, user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            logout()
            userLogin({})
            navigate('/')
        }
    }, [])
    return null;
};