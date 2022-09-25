import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';


export const Header = () => {

    const {user} = useContext(AuthContext)
    
    return (
            <div>
        <header className="header">

                <nav>
                    <img src="../../public/images/logo.png" className="logo" alt='logo' />
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
                        {user.accessToken && <li>
                            <Link to="/create">Създай петиция</Link>
                        </li>}
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        
                        {!user.accessToken && <li>
                            <Link to="/register">Регистрация</Link>
                        </li>}
                       {user.accessToken ? 
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