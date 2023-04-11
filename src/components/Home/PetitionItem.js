// import { useContext } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import './petitionItem.css'


export const PetitionItem = ({petition}) => {

// const { user } = useContext(AuthContext)


return (
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
  );
};