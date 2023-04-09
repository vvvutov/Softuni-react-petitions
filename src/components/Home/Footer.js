import { useState } from "react";


export const Footer = () => {

    const [showEmail, setShowEmail] = useState(false);

    const handleShowEmail = () => {
        setShowEmail(!showEmail)
    }

    return (
        <footer>
            <p>React petition platform</p>
            <p>Crappy design and good amount of functionalities by Vladislav Vutov</p>
            <span>For suggestions or problems do not hesitate to contact me at </span>
            {!showEmail
            ? <span onClick={handleShowEmail}> click here</span>
            : <span onClick={handleShowEmail}>webmaster@petition.best</span>
            }
            <p>Source code available at</p>
            
        </footer>
    )
};