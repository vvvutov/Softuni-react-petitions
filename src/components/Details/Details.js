import './details.css'
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PetitionContext } from '../../contexts/PetitionContext';
import { AuthContext } from '../../contexts/AuthContext';


export const Details = () => {

    const { petitions } = useContext(PetitionContext);

    const { petitionId } = useParams();

    const petition = petitions.find(p => p._id == petitionId);

    const date = new Date(petition._createdOn);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

    const { user, isAuthenticated } = useContext(AuthContext)

    const isAuthor = user._id == petition.authorInfo._id

//TODO create the edit the simple way, please. redirect to create petition, pass the petitionId(useState to save the petition in the details page (getOne)), check if there is such ID in the state, 
//use the values from the state to fill the fields
//on submit check if petition with the id exists in the state. rewrite state redirect back to detailspage  

    return (
        //getOne
        //useState currentPetition
        //petitionService.editPetition



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
                           <Link to={`/edit/${petition._id}`} className="btn-edit">Редактирай</Link>
                           <Link to={`/delete/${petition._id}`} className="btn-delete">Изтрий</Link>

                            </div>
                        }

                    </div>
                </div>
            </section>
        </main>

    )
};