import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
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
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/petitions">Всички петиции</NavLink>
                        </li>
                        <li className='search'>
                            <button id="search" onClick={handleSearchClick}>Търсене</button>
                        </li>
                        {isAuthenticated && <li>
                            <NavLink to="/create">Създай петиция</NavLink>
                        </li>}
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>

                        {!isAuthenticated && <li>
                            <NavLink to="/register">Регистрация</NavLink>
                        </li>}
                        {isAuthenticated ?
                            <li>
                                <NavLink to="/logout">Logout</NavLink>
                            </li>
                            :
                            <li>
                                <NavLink to="/login" >Вход</NavLink>
                            </li>
                        }
                    </ul>
                </nav>
                {isSearchVisible && <Search />}
            </header>
        </div>
    )
};