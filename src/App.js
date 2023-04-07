import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
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
import { PetitionProvider } from './contexts/PetitionContext';
import { ErrorsProvider } from './contexts/ErrorsContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const toastOptions = {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      };

    return (
        <ErrorBoundary>
            <AuthProvider>
                <main>
                    <Header />
                    <ErrorsProvider>
                        <PetitionProvider>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/petitions" element={<Catalog />} />
                                <Route path="/create" element={<CreatePetition />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/404" element={<NotFound />} />
                                <Route path="/details/:petitionId" element={<Details />} />
                                <Route path="/edit/:petitionId" element={<CreatePetition />} />
                                <Route path="/about" element={<About />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </PetitionProvider>
                    </ErrorsProvider>
                    {/* < Footer /> */}
                    <ToastContainer {...toastOptions} />
                </main>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
