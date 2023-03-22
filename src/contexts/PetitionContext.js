import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as petitionService from '../services/petitionService'


export const PetitionContext = createContext();

export const PetitionProvider = ({ children }) => {

  const navigate = useNavigate();

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
    navigate("/petitions");
  };

  const deletePetitionHandler = (petitionId) => {
    setPetitions((state) =>
      state.filter((petition) => petition._id !== petitionId)
    );
  };

  const signPetitionHandler = (petitionId) => {
    setPetitions((state) => {
      const currentPetition = state.find((petition) => petition._id === petitionId);

      return [
        ...state.filter((petition) => petition._id !== petitionId),
        {
          ...currentPetition,
          signed: Number(currentPetition.signed) + 1,
        },
      ];
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
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


