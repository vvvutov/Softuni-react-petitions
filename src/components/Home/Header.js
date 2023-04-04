import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';

import { Search } from '../Search/Search';
import logo from './logo.png'


export const Header = () => {

    const { isAuthenticated } = useContext(AuthContext)

    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleSearchClick = () => {
      setIsSearchVisible(!isSearchVisible);
    };

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
                        <li className='search'>
                            <button id="search" onClick={handleSearchClick}>Търсене</button>
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
                {isSearchVisible && <Search />}
            </header>
        </div>
    )
};