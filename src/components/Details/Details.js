import './details.css'
import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PetitionContext } from '../../contexts/PetitionContext';
import { AuthContext } from '../../contexts/AuthContext';
import { deletePetition, editPetition } from '../../services/petitionService';
import { useNavigate } from 'react-router-dom';
import { updateFirebaseUser } from '../../services/authService';
import { googleSignIn, signInWithFacebook } from '../../services/authService';

import { Comments } from './Comments';
import { ProgressBar } from './ProgressBar';

import { toast } from 'react-toastify';
import defaultPetitionPhoto from '../../../src/assets/default-petition-photo.jpg'
import { formattedDate } from '../../services/helpers';
import { NotFound } from '../AboutAndNotFound/NotFound';
// import { auth } from '../../firebase/firebase';


export const Details = () => {
    const navigate = useNavigate();

    const { signPetitionHandler, petitions, deletePetitionHandler } = useContext(PetitionContext);
    const { user, isAuthenticated, userUpdate, userLogin } = useContext(AuthContext);
    const { petitionId } = useParams();

    const [deepLink, setDeepLink] = useState(null);

    const [buttonText, setButtonText] = useState('Подпиши');



    const petition = petitions.find(p => p._id === petitionId);
    if (!petition) {
        return <NotFound />
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
            .then(authData =>
                (`Добре дошли, ${authData.username} !`)
            )
    };

    const handleFacebookSignIn = (e) => {
        e.preventDefault();

        signInWithFacebook()
            .then(authData => {
                userLogin(authData)
                console.log(authData);
                toast.success(`Добре дошли, ${authData.username} !`)
            })
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
            hasFinished: Boolean(petition.signed >= petition.goal - 1),
            signed: Number(petition.signed) + 1,
            signedBy: [...petition.signedBy, `${user.firstName} ${user.lastName}`],
        });
        toast.success("Успешно подписахте петицията");
    };


    const timestamp = new Date(petition.createdAt);

    const isAuthor = user._id === petition.authorInfo._id;

    let didTheUserSignThePetition;
    if (isAuthenticated) {
        if (user?.signedPetitions?.includes(petitionId)) {
            didTheUserSignThePetition = true;
        } else {
            didTheUserSignThePetition = false;
        }
    };

// A LOT OF WASTED TIME FROM HERE BELOW!
//TO DO - facebook login

    // const handleCopyLink = () => {
    //     const el = document.createElement('textarea');
    //     el.value = window.location.href;

    //     document.body.appendChild(el);
    //     el.select();
    //     document.execCommand('copy');
    //     document.body.removeChild(el);
    //     toast.success("Копирахте линка")
    // };

    // const isEmbeddedBrowser = /FBAN|FBAV|FBMS|FB_IAB|FB4A|FBAN\/Messenger/.test(navigator.userAgent);

    // const handleOpenInNewTab = (e) => {
    //     e.preventDefault()
    //     const url = window.location.href;
    //     window.open(url, '_system');
    // };

    // //deep link

    // // const createDeepLink = (petitionId) => {
    // //   const appLink = `petitions://details/${petitionId}`; 
    // //   const webLink = `https://petitions.vutov.org/details/${petitionId}`; 
    // //   const redirectUrl = encodeURIComponent(`${appLink}?fallback_url=${webLink}`);

    // //   return redirectUrl
    // // };
    
    // const redirectURL = encodeURIComponent(`petitions://details/${petitionId}?fallback_url=https://petitions.vutov.org/details/${petitionId}`);
    // const handleOpenLink = () => {
    //     window.open(decodeURIComponent(redirectURL), "_system");
    //   };

    window.addEventListener('load', function(event) {
        document.body.addEventListener('click', function(event) {
          let target = event.target;
      
          if (target.href.includes('petitions://') ) {
            
            event.preventDefault();
      
            window.open(target.href, '_system');
            
          }
        });
      });

    // console.log(isEmbeddedBrowser);

    

    return (
        <main>
            <section id="details-info">

                <div className="petition-image">
                    <img
                        src={petition?.image || defaultPetitionPhoto}
                        alt="alt-petition" />
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
                            <h3>{formattedDate(timestamp)}&nbsp;</h3>
                        </div>
                        <div className="petition-lower">
                            <p id="description">
                                {petition.description}
                            </p>
                            <p id="text">{petition.petitionText}</p>
                        </div>
                    </div>

                    {Boolean(petition.signed >= petition.goal) &&
                        <h4>Тази петиция е приключила</h4>
                    }
                    {!Boolean(petition.signed >= petition.goal) && (
                        <div className="buttons">

                            {!isAuthenticated && 
                            (
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

                            {/* <h1>{isEmbeddedBrowser.toString()}</h1> */}

                            {/* {!isAuthenticated &&
                                <div
                                    className="fb-login-button"
                                    data-size="large"
                                    data-button-type="login_with"
                                    data-layout="default"
                                    data-auto-logout-link="false"
                                    data-use-continue-as="true"
                                    data-scope="email"
                                    onClick={handleFacebookSignIn}
                                >
                                    Log in with Facebook
                                </div>
                            } */}

                            {didTheUserSignThePetition ? (
                                <h4>Вече сте подписали тази петиция!</h4>
                            ) : (
                                isAuthenticated && !isAuthor && (
                                    <input
                                        type="button"
                                        onClick={onSignHandler}
                                        className="btn"
                                        value={buttonText}
                                    />
                                )
                            )}

                            {isAuthor && (
                                <div className="author">
                                    <Link to={`/edit/${petition._id}`} className="btn">
                                        Редактирай
                                    </Link>
                                    <input
                                        type="button"
                                        onClick={onDeleteHandler}
                                        className="btn"
                                        value="Изтрий"
                                    />
                                </div>
                            )}
                            {/* it isn't quite working yet
                            <div className="fb-share-button" data-href="https://your-petition-link.com" data-layout="button_count" data-size="small">
                                <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F${encodeURIComponent(
                                    window.location.href
                                )}&amp;src=sdkpreparse`} className="fb-xfbml-parse-ignore">Share with Messenger</a>
                            </div> */}
                            {/* <button onClick={handleCopyLink}>Copy Link</button> */}
                            {/* <button onClick={handleOpenInNewTab}>open in new</button> */}
                            {/* <button onClick={handleOpenLink}>OPEN IN NEW</button> */}


                        </div>
                    )}

                </div>
            </section>
            <Comments user={user} comments={petition.comments} petitionId={petitionId} />
        </main>
    )
};