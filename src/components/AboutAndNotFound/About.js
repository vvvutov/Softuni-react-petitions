import { Link } from "react-router-dom";
import { Register } from "../Authentication/Register";

export const About = () => {
    return (
        <>
            <div className="content">
                <h2>
                 Онлайн платформа за петиции
                </h2>
                <p >
                    Тази онлайн платформа е създадена единствено и само с учебни цели
                </p>
                <p>
                    Макар данните ви да са защитени, моля не използвайте реалните си електронни пощи
                </p>
                <p>
                    или пароли, които използвате в реалния живот.
                </p>
                <p>
                
                </p>
                <p>
                    Обратно към 
                    <Link to='/register' element={<Register/>} > формата за регистрация </Link>
                   {/* TODO: Use the state to fill the form after returning from ABOUT  */}
                </p>
            </div>
        </>
    )
};