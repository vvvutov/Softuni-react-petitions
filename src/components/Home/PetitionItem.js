// import { useContext } from "react";
// import { AuthContext } from "../../contexts/AuthContext";


export const PetitionItem = ({petition}) => {

// const { user } = useContext(AuthContext)


    return (
        <>
            <article className="petition">
                <img src={petition.image} alt='alt' />
                <div>
                    <h3>{petition.category}</h3>
                    <p>{petition.description}</p>
                </div>
                <div>
                    <p>{petition.authorInfo.firstName}</p>
                </div>
            </article>
        </>
    )
};