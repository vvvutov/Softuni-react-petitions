import './details.css'
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PetitionContext } from '../../contexts/PetitionContext';
import { AuthContext } from '../../contexts/AuthContext';
import { deletePetition, edit } from '../../services/petitionService';
import { useNavigate } from 'react-router-dom';


export const Details = () => {
    const navigate = useNavigate();

    const { petitions, deletePetitionHandler } = useContext(PetitionContext);
    const { user, isAuthenticated } = useContext(AuthContext);

    const { petitionId } = useParams();

    const petition = petitions.find(p => p._id === petitionId);

    const onDelete = (e) => {
        e.preventDefault();
        deletePetition(petitionId)
            .then(deletePetitionHandler(petitionId))
            .then(navigate("/petitions"));
    }

    const onSign = (e) => {
        e.preventDefault();
        edit(petitionId, {...petition, 
            signed: Number(petition.signed) +1} )

    }

    const timestamp = new Date(petition.createdAt);
    const formattedDate = timestamp.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });



    const isAuthor = user._id === petition.authorInfo._id


    return (

        <main>
            <section id="details-info">

                <div className="petition-image">
                    <img src={petition.image} alt="alt" />
                </div>
                <div className="petition-info">
                    <div className="petition-text">
                        <h1 id="title">{petition.title}</h1>
                        <div className="info">
                            {petition.showMyFirstName.checked
                                ? <h3>Автор :{petition.authorInfo.firstName} {petition.authorInfo.lastName}, &nbsp;</h3>
                                : <h3>Автор :{petition.authorInfo.username},&nbsp; </h3>
                            }
                            <h3 >{petition.other ? petition.other : petition.category},&nbsp;</h3>
                            <h3>{formattedDate}&nbsp;</h3>
                            <p>{petition.signed ? petition.signed : 0}/{petition.goal}</p>
                        </div>
                        <div className="petition-lower">
                            <p id="description">
                                {petition.description}
                            </p>
                            <p id="text">{petition.petitionText}</p>
                        </div>
                    </div>
                    <div className="product-btn">
                        {isAuthenticated && !isAuthor &&
                            <input
                            type="button"
                            onClick={onSign}
                            className="btn-delete"
                            value="Подпиши"
                    />
                        }
                        {isAuthor &&
                            <div className="author">
                                <Link to={`/edit/${petition._id}`} className="btn-edit">Редактирай</Link>
                                <input
                                    type="button"
                                    onClick={onDelete}
                                    className="btn-delete"
                                    value="Изтрий"
                            />
                            </div>
                        }

                    </div>
                </div>
            </section>
        </main>

    )
};