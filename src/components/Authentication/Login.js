import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext';
import { login } from '../../services/authService';

import { toast } from 'react-toastify';

import './login.css'



export const Login = () => {

    const navigate = useNavigate();

    const { userLogin } = useContext(AuthContext)


    const onSubmit = async (e) => {
        e.preventDefault();

        const loginData = Object.fromEntries(new FormData(e.target));
        try {
            const userData = await login(loginData);
            userLogin(userData);
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (

        <div className="login-box">
            <h1>Login</h1>
            <form onSubmit={onSubmit} >
                <label>Потребителско име</label>
                <input type="text" name="email" placeholder="Потребителско име" />
                <label>Парола</label>
                <input type="password" name="password" placeholder="Парола" />
                <input type="submit" value="Submit" />
            </form>
            <p>
                Нямате акаунт? <Link to="/register">Регистрирай се</Link>
            </p>
        </div>

    )
};