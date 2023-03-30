import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import logo from './logo.png'


export const Header = () => {

    const {isAuthenticated} = useContext(AuthContext)
    
    return (
            <div>
        <header className="header">

                <nav>
                    <img src={logo} className="logo" alt='logo' />
                    
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/petitions">Всички петиции</Link>
                        </li>
                        <li>
                            <Link to="/search">Търсене</Link>
                        </li>
                        {isAuthenticated && <li>
                            <Link to="/create">Създай петиция</Link>
                        </li>}
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        
                        {!isAuthenticated && <li>
                            <Link to="/register">Регистрация</Link>
                        </li>}
                       {isAuthenticated ? 
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                        : 
                        <li>
                            <Link to="/login">Вход</Link>
                        </li>
                       }
                    </ul>
                </nav>
        </header>
            </div>
    )
};