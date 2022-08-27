import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext"
import { logout } from "../../services/authService";

export const Logout = () => {
    const navigate = useNavigate();


    const { userLogin, auth } = useContext(AuthContext);


    if (auth.accessToken) {
        logout(auth.accessToken)
            .then(userLogin({}))
            .finally(navigate('/'))
    }
    return null;
};