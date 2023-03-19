import { CatalogPetitionItem } from "./CatalogPetitionItem";
import { useContext, useEffect } from 'react';
import { PetitionContext } from '../../contexts/PetitionContext';
import { getAll } from "../../services/petitionService";


import './catalog.css'

export const Catalog = () => {
    useEffect(() => {
        getAll()
            .then(res => { setPetitions(res) })
    }, []);

    const { petitions, setPetitions } = useContext(PetitionContext);
    console.log(petitions);

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
                <><h1 key={`category-${category}-${index}`}>
                    {category}
                </h1><div className="petitions-list">
                        {groupedPetitions[category].map(p => <CatalogPetitionItem petition={p} key={p._id} />
                        )}
                    </div></>
            ))};
        </section>

    )
};