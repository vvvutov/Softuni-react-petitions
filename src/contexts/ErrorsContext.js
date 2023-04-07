import { createContext } from "react";
import { useState } from "react";

export const ErrorsContext = createContext()

export function ErrorsProvider({children}) {

    const [errors, setErrors] = useState({});

    return (
        <ErrorsContext.Provider value={{
            errors,
            setErrors
        }}
        > {children}
        </ErrorsContext.Provider>);
}