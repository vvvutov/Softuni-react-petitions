import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext';
import { login, googleSignIn } from '../../services/authService';

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
            toast.error("Грешен потребител/парола");
        }
    };

    const handleGoogleSignIn = (e) => {
        e.preventDefault();

        googleSignIn()
            .then(authData => {
                userLogin(authData)
                navigate('/')
            })
    };


    return (

        <div className="login-box">
            <h1>Вход</h1>
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
            <p>Или</p>
            <p>
                <button
                    className="google-sign-in-button"
                    onClick={handleGoogleSignIn}
                >

                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google sign-in"
                    />
                    Sign in with Google
                </button>
            </p>
        </div>

    )
};