import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import * as petitionService from '../services/petitionService'


export const PetitionContext = createContext()

export const PetitionProvider = ({ children }) => {

    // const navigate = useNavigate()

    const [petitions, setPetitions] = useState([]);

    useEffect(() => {
        petitionService.getAll()
            .then(res => { setPetitions(res) })
    }, []);

    return (
        <PetitionContext.Provider value={{
            petitions,
        }} >
            {children}
        </PetitionContext.Provider>
    );

};

