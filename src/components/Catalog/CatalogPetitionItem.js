import './catalog.css'
import { Link } from 'react-router-dom'


export const CatalogPetitionItem = ({ petition }) => {
    return (
        <article className="petition">
            <div className="upper-container">

                <div className="petition-img">
                    <img src={petition.image} alt={petition.image} />
                </div>

                <div className="petition-info-top">
                    <p>{petition.signed ? petition.signed : 0}/{petition.goal} подписа </p>
                    <p>
                        <span>Категория</span>{petition.category}
                    </p>

                    {petition.showMyFirstName.checked
                        ? <p>Автор :{petition.authorInfo.firstName} {petition.authorInfo.lastName}</p>
                        : <p>Автор :{petition.authorInfo.username}</p>
                    }
                </div>
            </div>
            <div className="petition-info bottom">
                <h1>{petition.title}</h1>
                <p>
                    <span>Описание: </span>{petition.description}
                </p>
            <Link to={`/details/${petition._id}`} className="btn-details"> Виж петицията</Link>
            </div>

        </article>

    )
};