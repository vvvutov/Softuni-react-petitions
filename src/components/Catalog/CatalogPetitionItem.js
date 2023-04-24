import './catalogPetitionItem.css'
import { Link } from 'react-router-dom'

import defaultPetitionPhoto from '../../../src/assets/default-petition-photo.jpg'
import { formattedDate } from '../../services/helpers';


export const CatalogPetitionItem = ({ petition }) => {

    const timestamp = new Date(petition.createdAt);

    return (
        <article className="petition">
            <div className="upper-container">
                <div className="petition-img">
                    <img
                        src={petition?.image || defaultPetitionPhoto}
                        alt="petition img"
                    />
                </div>
                <div className="petition-info-top">
                    <p>
                        Категория: {petition.category}
                    </p>
                    {petition.showMyFirstName.checked ? (
                        <p>
                            Автор: {petition.authorInfo.firstName} {petition.authorInfo.lastName}
                        </p>
                    ) : (
                        <p>Автор: {petition.authorInfo.username}</p>
                    )}
                    <p>{formattedDate(timestamp)}</p>
                    <p>
                        {petition.signed ? petition.signed : 0}/{petition.goal} подписа
                    </p>
                </div>
            </div>
            <div className="lower-container">
                <div className="petition-info-bottom">
                    <h3>{petition.title}</h3>
                    <p>
                        {petition.description}
                    </p>
                </div>
                <Link to={`/details/${petition._id}`} className="btn-details">
                    Виж петицията
                </Link>
            </div>
        </article>
    );
}



