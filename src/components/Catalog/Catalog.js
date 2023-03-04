import { CatalogPetitionItem } from "./CatalogPetitionItem";
import { useContext } from 'react';
import { PetitionContext } from '../../contexts/PetitionContext';


import './catalog.css'

export const Catalog = () => {
    const {petitions} = useContext(PetitionContext)

    return (

        <section className="petition-catalog-list">
            <h1>
                Всички петиции
            </h1>
            <div className="petitions-list">
            {petitions.map( p => 
                        <CatalogPetitionItem petition={p} key={p.title} />
                    )}

            </div>
            {/* <div class="no-petitions">
                <p>Няма намерени петиции</p>
            </div> */}
        </section>

    )
};