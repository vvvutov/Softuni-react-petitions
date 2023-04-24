import { Link } from 'react-router-dom';
import './petitionItem.css'


export const PetitionItem = ({ petition }) => {

  return (
    <Link to={`/details/${petition._id}`}>
      <div className="latest-petitions">
        <div className="petition-item" >
          <div className="petition-item-left">
            <img
              src={petition.image}
              alt={petition.title}
              className="petition-image"
            />
          </div>
          <div className="petition-item-right">
            <h3 className="petition-title">{petition.title}</h3>
            <p className="petition-description">{petition.description}</p>
          </div>
        </div>
      </div>
      </Link>
      );
};