import { Link } from 'react-router-dom';

import './searchResults.css'

export const SearchResults = ({ searchResults }) => {

  
    return (
      <ul className="search-results">
        {searchResults.map((petition) => (
          <Link to={`/details/${petition._id}`}>
            <li key={petition._id} className="search-result">
              <div className="result-image">
                <img src={petition.image} alt={petition.title} />
              </div>
              <div className="result-details">
                <h2>{petition.title}</h2>
                <p>{petition.description}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    );
  };
  



