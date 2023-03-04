import './catalog.css'
import { Link } from 'react-router-dom'


export const CatalogPetitionItem = ({ petition }) => {
    return (
        <div className="petition">
            <div className="petition-img">
                <img src="image" alt='alt' />
            </div>
            <div className="petition-info">
                <h1>{petition.title}</h1>
                <p>
                    <span>Категория</span>{petition.category}
                </p>
                <p>
                    <span>Описание: </span>{petition.description}
                </p>
            </div>
            <Link to="/details" className="btn-details"> Виж петицията</Link>
        </div>

    )
};