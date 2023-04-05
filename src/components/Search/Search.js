import { useState } from "react";
import { searchPetitions } from "../../services/petitionService";
import { SearchResults } from "./SearchResults";


import './search.css'
import '../Catalog/catalog.css'


export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        searchPetitions(searchQuery)
            .then((result) => {
                setSearchResults(result)
                setIsLoading(false)
            }
            )
    };

    const handleSearchQueryChange = (e) => {
        e.preventDefault()
        setSearchQuery(e.target.value);
    };


    return (
        <section className="petition-search">
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="search-petition"
                    name=""
                    placeholder="Търси петиция"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />

                <button type="submit" className="btn-search">
                    Search
                </button>
            </form>
            <div className="search-results-container">

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <SearchResults searchResults={searchResults} />
                )}
            </div>
        </section>
    );
};
