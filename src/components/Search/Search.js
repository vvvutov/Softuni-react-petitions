import { useState, useEffect, useRef } from "react";
import { searchPetitions } from "../../services/petitionService";
import { SearchResults } from "./SearchResults";

import "./search.css";
import "../Catalog/catalog.css";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchResultsRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    searchPetitions(searchQuery).then((result) => {
      setSearchResults(result);
      setIsLoading(false);
    });
  };

  const handleSearchQueryChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
      <div className="search-results-container" ref={searchResultsRef}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <SearchResults searchResults={searchResults} />
        )}
      </div>
    </section>
  );
};