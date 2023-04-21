import './details.css'
import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PetitionContext } from '../../contexts/PetitionContext';
import { AuthContext } from '../../contexts/AuthContext';
import { deletePetition, editPetition } from '../../services/petitionService';
import { useNavigate } from 'react-router-dom';
import { updateFirebaseUser } from '../../services/authService';
import { googleSignIn } from '../../services/authService';

import { Comments } from './Comments';
import { ProgressBar } from './ProgressBar';

import { toast } from 'react-toastify';
import defaultPetitionPhoto from '../../../src/assets/default-petition-photo.jpg'
import { NotFound } from '../AboutAndNotFound/NotFound';


export const Details = () => {
    const navigate = useNavigate();

    const { signPetitionHandler, petitions, deletePetitionHandler } = useContext(PetitionContext);
    const { user, isAuthenticated, userUpdate, userLogin } = useContext(AuthContext);
    const { petitionId } = useParams();

    const [buttonText, setButtonText] = useState('Подпиши');

    const petition = petitions.find(p => p._id === petitionId);
    if(!petition) {
        return <NotFound/>
    }

    const onDeleteHandler = (e) => {
        e.preventDefault();
        deletePetition(petitionId)
            .then(deletePetitionHandler(petitionId))
            .then(navigate("/petitions"));
        toast.success("Петицията беше изтрита")
    };

    const handleGoogleSignIn = (e) => {
        e.preventDefault();

        googleSignIn()
            .then(authData => {
                userLogin(authData)
            })
            .then
            (toast.success("Вече може да подпишете петицията"))
    };

    const onSignHandler = (e) => {
        e.preventDefault();
        setButtonText('Готово');
        e.target.disabled = true;

        //updates the petition in state
        //TO-DO fix it so that the user ID is also added
        signPetitionHandler(petitionId, `${user.firstName} ${user.lastName}`);

        //updates the user auth state
        userUpdate(petitionId);

        //updates the user in the firebase collection
        updateFirebaseUser(user._id, {
            ...user,
            signedPetitions: [...user.signedPetitions, petitionId],
        });
        //edits the petition in firebase collection
        editPetition(petitionId, {
            ...petition,
            hasFinished: Boolean(petition.signed >= petition.goal-1),
            signed: Number(petition.signed) + 1,
            signedBy: [...petition.signedBy, `${user.firstName} ${user.lastName}`],
        });
        toast.success("Успешно подписахте петицията");
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

    let didTheUserSignThePetition;
    if (isAuthenticated) {
        if (user?.signedPetitions?.includes(petitionId)) {
            didTheUserSignThePetition = true;
        } else {
            didTheUserSignThePetition = false;
        }
    };


    return (
        <main>
            <section id="details-info">

                <div className="petition-image">
                    <img
                        src={petition?.image || defaultPetitionPhoto}
                   
                        alt="alt" />
                </div>
                <ProgressBar petition={petition} />
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
                            <span title={petition.signedBy.join(', ')}> {petition.signed ? petition.signed : 0}/{petition.goal}</span> подписа
                        </div>
                        <div className="petition-lower">
                            <p id="description">
                                {petition.description}
                            </p>
                            <p id="text">{petition.petitionText}</p>
                        </div>
                    </div>

                    <div className="buttons">
                        {Boolean(petition.signed >= petition.goal) &&
                            <h4>Тази петиция е приключила</h4>
                        }
                        {!Boolean(petition.signed >= petition.goal) && (
                            <>
                                {!isAuthenticated && (
                                    <button
                                        className="google-sign-in-button"
                                        onClick={handleGoogleSignIn}
                                    >
                                        <img
                                            src="https://developers.google.com/identity/images/g-logo.png"
                                            alt="Google sign-in"
                                        />
                                        Подпиши петицията с Google
                                    </button>
                                )}

                                {didTheUserSignThePetition ? (
                                    <h4>Вече сте подписали тази петиция!</h4>
                                ) : (
                                    isAuthenticated && !isAuthor && (
                                        <input
                                            type="button"
                                            onClick={onSignHandler}
                                            className="btn-delete"
                                            value={buttonText}
                                        />
                                    )
                                )}

                                {isAuthor && (
                                    <div className="author">
                                        <Link to={`/edit/${petition._id}`} className="btn-edit">
                                            Редактирай
                                        </Link>
                                        <input
                                            type="button"
                                            onClick={onDeleteHandler}
                                            className="btn-delete"
                                            value="Изтрий"
                                        />
                                    </div>
                                )}
                            </>
                        )}

                    </div>
                </div>
            </section>
            <Comments user={user} comments={petition.comments} petitionId={petitionId} />
        </main>
    )
};