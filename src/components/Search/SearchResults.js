import './searchResults.css'

export const SearchResults = ({ searchResults }) => {
    console.log(searchResults);
  return (
    // <div className="search-results-container">
    <ul className="search-results">
      {searchResults.map((petition) => (
        
        <li key={petition._id} className="search-result">
          <div className="result-image">
            <img src={petition.image} alt={petition.title} />
          </div>
          <div className="result-details">
            <h2>{petition.title}</h2>
            <p>{petition.description}</p>
          </div>
        </li>
      ))}
    </ul>
    // </div>
  );
};



