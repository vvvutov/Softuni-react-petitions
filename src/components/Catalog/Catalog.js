import { CatalogPetitionItem } from "./CatalogPetitionItem";
import { useContext } from 'react';
import { PetitionContext } from '../../contexts/PetitionContext';

import { generateRandomId } from "../../services/helpers";

import './catalog.css'

export const Catalog = () => {

    const { petitions } = useContext(PetitionContext);
    console.log("petitions from context", petitions);

    const groupedPetitions = petitions.reduce((acc, petition) => {
        const category = petition.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(petition);
        return acc;
    }, {});


    return (

        <section className="petition-catalog-list">

            {Object.keys(groupedPetitions).map((category, index) => (
                <div key={`${category}-${generateRandomId(5)}`}>
                    <h1>{category}</h1>
                    {groupedPetitions[category].length > 0 && (
                        <div className="petitions-list">
                            {groupedPetitions[category].map((p) => (
                                <CatalogPetitionItem petition={p} key={p._id} />
                            ))}
                        </div>
                    )}
                </div>
            ))}

        </section>

    )
};