import './details.css'
import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PetitionContext } from '../../contexts/PetitionContext';
import { AuthContext } from '../../contexts/AuthContext';
import { deletePetition, edit } from '../../services/petitionService';
import { useNavigate } from 'react-router-dom';
import { updateFirebaseUser } from '../../services/authService';


export const Details = () => {
    const navigate = useNavigate();

    const { signPetitionHandler, petitions, deletePetitionHandler } = useContext(PetitionContext);
    const { user, isAuthenticated, userUpdate } = useContext(AuthContext);
    const { petitionId } = useParams();

    const [buttonText, setButtonText] = useState('Подпиши');

    const petition = petitions.find(p => p._id === petitionId);

    const onDeleteHandler = (e) => {
        e.preventDefault();
        deletePetition(petitionId)
            .then(deletePetitionHandler(petitionId))
            .then(navigate("/petitions"));
    };

    const onSignHandler = (e) => {
        e.preventDefault();
        setButtonText('Готово');
        e.target.disabled = true;

        //updates the petition in state
        signPetitionHandler(petitionId, `${user.firstName} ${user.lastName}`);

        //updates the user authentication state
        userUpdate(petitionId);

        //updates the firebase collection
        updateFirebaseUser(user._id, { ...user, signedPetitions: user.signedPetitions.push(petitionId) });

        //edits the petition in firebase collection
        edit(petitionId, {
            ...petition,
            signed: Number(petition.signed) + 1,
            signedBy: [...petition.signedBy, `${user.firstName} ${user.lastName}`],
        });
    };

    const timestamp = new Date(petition.createdAt);
    const formattedDate = timestamp.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });



    const isAuthor = user._id === petition.authorInfo._id;

    let didTheUserSignThePetition = false;
    if (Object.keys(user).length) {
        didTheUserSignThePetition = user?.signedPetitions?.includes(petitionId);
    };

    console.log(Object.keys(user).length);
    console.log(user?.signedPetitions);
    console.log(petitionId);

    return (

        <main>
            <section id="details-info">

                <div className="petition-image">
                    <img src={petition.image} alt="alt" />
                </div>
                <p className="progress-bar">
                    <span style={{
                        width: (petition.signed / petition.goal) * 100,
                        height: '10px',
                        backgroundColor: '#4568dc',
                        borderRadius: '5px',
                    }}></span>
                </p>
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
                    { didTheUserSignThePetition && 
                    <p>Вече сте подписали тази петиция!</p>
                    }
                    <div className="product-btn">
                        {isAuthenticated && !isAuthor &&
                            <input
                                type="button"
                                onClick={onSignHandler}
                                className="btn-delete"
                                value={buttonText}
                            />
                        }
                        {isAuthor &&
                            <div className="author">
                                <Link to={`/edit/${petition._id}`} className="btn-edit">Редактирай</Link>
                                <input
                                    type="button"
                                    onClick={onDeleteHandler}
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