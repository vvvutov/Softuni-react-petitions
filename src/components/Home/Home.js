// import styles from './home.module.css'
import { Link } from 'react-router-dom'

import './home.css'

import { PetitionItem } from './PetitionItem';

export const Home = () => {
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
                    <PetitionItem />
                    <PetitionItem />
                    <PetitionItem />
                </div>
     </>
     )
};