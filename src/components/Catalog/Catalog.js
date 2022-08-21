import { CatalogPetitionItem } from "./CatalogPetitionItem";

import './catalog.css'

export const Catalog = () => {
    return (

        <section className="petition-catalog-list">
            <h1>
                Всички петиции
            </h1>
            <div className="petitions-list">
                <CatalogPetitionItem />
                <CatalogPetitionItem />
                <CatalogPetitionItem />
                <CatalogPetitionItem />

                
            </div>
            {/* <div class="no-petitions">
                <p>Няма намерени петиции</p>
            </div> */}
        </section>

    )
};