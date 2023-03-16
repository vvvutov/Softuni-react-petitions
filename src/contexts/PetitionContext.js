import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as petitionService from '../services/petitionService'


export const PetitionContext = createContext()

export const PetitionProvider = ({ children }) => {

    const navigate = useNavigate();

    const [petitions, setPetitions] = useState([]);

    useEffect(() => {
        petitionService.getAll()
            .then(res => { setPetitions(res) })
    }, []);

    const addPetitionHandler = (petitionData) => {
        setPetitions(state => [
            ...state,
            petitionData
        ]);
        navigate('/')
    }

    const deletePetitionHandler = (petitionId) => {
        setPetitions((prevState) =>
          prevState.filter((petition) => petition._id !== petitionId)
        );
        navigate("/petitions");
      };



    return (
        <PetitionContext.Provider value={{
            setPetitions,
            petitions,
            addPetitionHandler,
            deletePetitionHandler
        }} >
            {children}
        </PetitionContext.Provider>
    );

};

