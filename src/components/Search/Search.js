import { useState, useEffect, useRef } from "react";
import { searchPetitions } from "../../services/petitionService";
import { SearchResults } from "./SearchResults";
import { useDebounce } from "../../hooks/useDebounce";
import "./search.css";
import "../Catalog/catalog.css";

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchResultsRef = useRef(null);

    const debouncedSearchQuery = useDebounce(searchQuery, 800);

    useEffect(() => {
        if (debouncedSearchQuery) {
            setIsLoading(true);
            searchPetitions(debouncedSearchQuery).then((result) => {
                setSearchResults(result);
                setIsLoading(false);
            });
        } else {
            setSearchResults([]);
            setIsLoading(false);
        }
    }, [debouncedSearchQuery]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        searchPetitions(searchQuery).then((result) => {
            setSearchResults(result);
            setIsLoading(false);
        });
        setSearchQuery("");
    };

    const handleSearchQueryChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    };

    const handleClick = () => {
        setSearchResults([]);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
                setSearchResults([]);
                setSearchQuery("");
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <section className="petition-search" onClick={handleClick}>
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="search-petition"
                    name=""
                    placeholder="Търси петиция"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />

            </form>
            <div className="search-results-container" ref={searchResultsRef}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : searchResults.length > 0 ? (
                    <SearchResults
                        searchResults={searchResults}
                        onClick={() => setSearchResults([])}
                    />
                ) : (
                    debouncedSearchQuery && <p>Няма намерени петиции</p>
                )}
            </div>
        </section>
    );
};
