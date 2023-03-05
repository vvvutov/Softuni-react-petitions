import './details.css'
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PetitionContext } from '../../contexts/PetitionContext';
import { AuthContext } from '../../contexts/AuthContext';


export const Details = () => {

    const { petitions } = useContext(PetitionContext);
    console.log("all petitions", petitions);

    const { petitionId } = useParams();

    const petition = petitions.find(p => p._id == petitionId);
    console.log('petition', petition);

    const date = new Date(petition._createdOn);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

    const { user, isAuthenticated } = useContext(AuthContext)

    const isAuthor = user._id == petition.authorInfo._id



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
                            <h3 >{petition.category},&nbsp;</h3>
                            <h3>{formattedDateTime}&nbsp;</h3>
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
                             <a href="#" class="btn-sign">Подпиши</a>
                        }
                        {isAuthor &&
                             <div class="author">
                            <a href="#" class="btn-edit">Редактирай</a>
                            <a href="#" class="btn-delete">Изтрий</a>
                            </div>
                        }

                    </div>
                </div>
            </section>
        </main>

    )
};