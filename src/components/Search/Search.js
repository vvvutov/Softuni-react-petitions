import { CatalogPetitionItem } from '../Catalog/CatalogPetitionItem';
import './search.css'
import '../Catalog/catalog.css'


export const Search = () => {
    return (
        <section className="petition-search">
            <h1>Search</h1>
            <form className="search-form" action="#" method="">
                <input
                    type="text"
                    className="search-petition"
                    name=""
                    placeholder="Search here..."
                />
                <select id="category" name="category">
                            <option value="none" selected disabled hidden>Изберете категория</option>
                            <option value="ecology">Екология</option>
                            <option value="social">Социална тематика</option>
                            <option value="politics">Политика</option>
                            <option value="charity">Благотворителност</option>
                            <option value="other">Друго...</option>
                        </select>
                <button type="submit" className="btn-search">
                    Search
                </button>
            </form>
            <div className="petition-catalog-list">
                <div className="petitions-list">
                   <CatalogPetitionItem/>
                   <CatalogPetitionItem/>
                   <CatalogPetitionItem/>
                   <CatalogPetitionItem/>

                </div>
            </div>
            {/* <div class="no-match">
                <p>No match was found!</p>
            </div> */}
        </section>

    )
};