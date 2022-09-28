import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { PetitionContext } from '../../contexts/PetitionContext';

import './home.css'

import { PetitionItem } from './PetitionItem';


export const Home = () => {

    const {petitions} = useContext(PetitionContext)

     return(
     <>
     <div className="content">
                    <h1>
                        Създай, сподели, <br />
                        подпиши петиция
                    </h1>
                    <p>
                       Имаш силата да направиш промяна
                    </p>
                    <Link to="/create" className="create-petition">
                        Създай петиция
                    </Link>
                </div>
                <div className="petition-list">
                    {petitions.map( p => 
                        <PetitionItem petition={p} />
                    )}
                </div>
     </>
     )
};