
import { Link } from 'react-router-dom'

import './login.css'


export const Login = () => {



    return (
        
            <div className="login-box">
                <h1>Login</h1>
                <form  >
                    <label>Email</label>
                    <input type="text" name="email" placeholder="enter email" />
                    <label>Password</label>
                    <input type="password" name="password" placeholder="enter password" />
                    <input type="submit" defaultValue="Submit" />
                </form>
                <p>
                    Not have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        
    )
};