import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext';
import { login } from '../../services/authService';



import './login.css'


export const Login = () => {

    const navigate = useNavigate();

    const {userLogin} = useContext(AuthContext)

    const onSubmit = (e) => {
        e.preventDefault()

        const loginData = Object.fromEntries( new FormData(e.target))
        login(loginData)
        .then(userData =>  {
            userLogin(userData)
        })
         .then(navigate('/'))
    }


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