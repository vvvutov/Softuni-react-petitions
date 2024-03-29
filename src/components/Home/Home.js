import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { PetitionContext } from '../../contexts/PetitionContext';
import { AuthContext } from '../../contexts/AuthContext';

import './home.css'

import { PetitionItem } from './PetitionItem';
import { CatalogPetitionItem } from '../Catalog/CatalogPetitionItem';



export const Home = () => {

    const { petitions } = useContext(PetitionContext)
    const { isAuthenticated, isSignedWithGoogle } = useContext(AuthContext)

    const finishedPetitions = petitions.filter(p => p.hasFinished === true);

    const latestPetitions = petitions.sort((a, b) => b.nativeTimestamp - a.nativeTimestamp);
    const latestFivePetitions = latestPetitions.slice(0, 5)

    return (
        <>
            <div className="content">
                <h1>
                    Създай, сподели, <br />
                    подпиши петиция
                </h1>
                <p>
                    Имаш силата да направиш промяна
                </p>
                {!isAuthenticated || isSignedWithGoogle
                    ? <Link to="/login" className="create-petition">
                        Създай петиция
                    </Link>
                    : <Link to="/create" className="create-petition">
                        Създай петиция
                    </Link>
                }
            </div>
            <div className="petition-list">
                <h3>Завършили петиции</h3>
                <div className="finished-petitions">
                    {finishedPetitions.map(p =>
                        <CatalogPetitionItem petition={p} key={p._id} />
                    )}
                </div>
                <h3>Последни петиции</h3>
                <div className="latest-petitions">
                    {latestFivePetitions.map(p =>
                        <PetitionItem petition={p} key={p.title} />
                    )}
                </div>
            </div>
        </>
    )
};