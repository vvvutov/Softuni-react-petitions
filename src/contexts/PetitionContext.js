import { createContext, useEffect, useState } from "react";
import  logo  from "../components/Catalog/logo.gif"

import * as petitionService from '../services/petitionService'


export const PetitionContext = createContext();

export const PetitionProvider = ({ children }) => {


  const [petitions, setPetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    petitionService
      .getAll()
      .then((res) => {
        setPetitions(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const addPetitionHandler = (petitionData) => {
    setPetitions((state) => [...state, petitionData]);
  };

  const deletePetitionHandler = (petitionId) => {
    setPetitions((state) =>
      state.filter((petition) => petition._id !== petitionId)
    );
  };

  const signPetitionHandler = (petitionId, userThatSigned) => {
    setPetitions((state) => {
      const currentPetition = state.find((petition) => petition._id === petitionId);
      currentPetition.signedBy.push(userThatSigned);
      const signed = Number(currentPetition.signed) +1;
      const hasFinished =  Boolean(currentPetition.signed >= currentPetition.goal-1)
      return [
        {
          ...currentPetition,
          signed: signed,
          hasFinished: hasFinished,
        },
        ...state.filter((petition) => petition._id !== petitionId),
      ];
    });
  };

  

  if (isLoading) {
    return <div>React petitions platform for the Softuni ReactJS Course</div>;
  }
  
  return (
    <PetitionContext.Provider
      value={{
        setPetitions,
        petitions,
        addPetitionHandler,
        deletePetitionHandler,
        signPetitionHandler,
      }}
    >
      {children}
    </PetitionContext.Provider>
  );
};


