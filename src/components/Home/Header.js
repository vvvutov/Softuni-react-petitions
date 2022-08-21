import { Link } from 'react-router-dom'


export const Header = () => {
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
                        <li>
                            <Link to="/create">Създай петиция</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/login">Вход</Link>
                        </li>
                        <li>
                            <Link to="/register">Регистрация</Link>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </ul>
                </nav>
        </header>
            </div>
    )
};