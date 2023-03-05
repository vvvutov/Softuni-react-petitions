import { Routes, Route, } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext';

// import { Footer } from './components/Home/Footer';
import { Header } from './components/Home/Header';
import { Home } from './components/Home/Home';
import { Catalog } from './components/Catalog/Catalog';
import { CreatePetition } from './components/CreateAndEdit/CreatePetition'
import { Login } from './components/Authentication/Login'
import { Register } from './components/Authentication/Register'
import { Logout } from './components/Authentication/Logout'
import { Details } from './components/Details/Details';
import { About } from './components/AboutAndNotFound/About';
import { NotFound } from './components/AboutAndNotFound/NotFound';
import { Edit } from './components/CreateAndEdit/Edit';
import { Search } from './components/Search/Search';
import { PetitionProvider } from './contexts/PetitionContext';



function App() {


    // const [petitions, setPetitions] = useState([]);
    // useEffect(() => {
    //     petitionService.getAll()
    //         .then(res => { setPetitions(res) })
    // }, []);
    // const [auth, setAuth] = useLocalStorage('auth', {});
    // const userLogin = (authData) => {
    //     setAuth(authData);
    // };
    // const userLogout = () => {
    //     setAuth({});
    // };


    return (
        <>
            <AuthProvider>
                <main>
                    < Header />
                    <PetitionProvider>

                        <Routes>
                            <Route path='/' element={<Home/>} />
                            <Route path='/petitions' element={<Catalog />} />
                            <Route path='/create' element={<CreatePetition />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/404' element={< NotFound />} />
                            <Route path='/details/:petitionId' element={<Details />} />
                            <Route path='/search' element={<Search />} />

                            <Route path='/edit' element={<Edit />} />
                            <Route path='/about' element={<About />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </PetitionProvider>

                    {/* < Footer /> */}
                </main>
            </AuthProvider>
        </>

    );
}

export default App;
