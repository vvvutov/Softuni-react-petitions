import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';

import { Search } from '../Search/Search';
import logo from './logo.png'
import './header.css'


export const Header = () => {

    const { isAuthenticated, isSignedWithGoogle } = useContext(AuthContext)

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleSearchClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleMenuClick = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    /* Add the following function to toggle the menu visibility */


    /* Add the following class name to the navigation element */


    return (
        <div>
            <header className="header">

                <nav className={isMenuVisible ? 'visible' : ''}>
                    <img src={logo} className="logo" alt='logo' />

                    <ul>
                        <li className='menu'>
                            <button id="menu" onClick={handleMenuClick}>
                                <span className="sr-only">Menu</span>
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                                    <path d="M3 12h18M3 6h18M3 18h18"></path>
                                </svg>
                            </button>
                        </li>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/petitions">Всички петиции</NavLink>
                        </li>
                        <li className='search'>
                            <button id="search" onClick={handleSearchClick}>Търсене</button>
                        </li>

                        {/* users signed in with google can not create petitions, 
                        because more user info is needed to create a petition */}
                        {isAuthenticated && !isSignedWithGoogle && <li>
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