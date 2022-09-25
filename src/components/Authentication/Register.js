import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext} from "react";

import { AuthContext } from '../../contexts/AuthContext';

import './register.css'

import { register } from '../../services/authService'
import { About } from '../AboutAndNotFound/About';



export const Register = () => {


    const {userLogin} = useContext(AuthContext)

    const [values, setValues] = useState({
        username: '',
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        email: '',
        password: '',
        rePassword: '',
        confirmation: {
            checked: false
        }
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const checkboxHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: { checked: e.target.checked },
        }))
    }

    const changeHandler = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
    });
    }
   

    const onSubmit = (e) => {
        e.preventDefault();
        
        register({ ...values })
            .then(authData => {
                console.log(authData)
                userLogin(authData)
                navigate('/')
            })
    }
     
    
    
    
    const lenghtCheck = (e, minLength, maxLength) => {

        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < minLength || values[e.target.name].length > maxLength
        }))

    }

    const isPositive = (e) => {
        let number = Number(values[e.target.name]);
        setErrors(state => ({
            ...state,
            [e.target.name]: !(number > 0),
        }))
    }

    const validateEmail = (e) => {

        setErrors(state => ({
            ...state,
            [e.target.name]: !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values[e.target.name]))
        }));
    }

    const validateRePass = (e) => {

        setErrors(state => ({
            ...state,
            [e.target.name]: [e.target.value] != values.password
        }))
    }


    return (

        <div className="register-box">
            <h1>Регистрация</h1>
            <form onSubmit={onSubmit} >
                <label htmlFor="username">Потребителско име</label>
                <input type="text"
                    id="username"
                    name="username"
                    placeholder="Потребителско име"
                    // defaultValue={values.username}
                    value={values.username}
                    onChange={changeHandler}
                    onBlur={(e) =>{ (lenghtCheck(e, 3, 12))}}
                />
                {errors.username &&
                    <p className="error">
                        Потребителското име трябва да е между 3 и 12 символа
                    </p>
                }
                <label htmlFor="firstName">Име</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Име"
                    // defaultValue={values.firstName}
                    value={values.firstName}
                    onChange={changeHandler}
                    onBlur={(e) => lenghtCheck(e, 3, 15)}
                />
                {errors.firstName &&
                    <p className="error">
                        Името трябва да е между 3 и 15 символа
                    </p>
                }
                <label htmlFor="lastName">Фамилия</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Фамилия"
                    // defaultValue={values.lastName}
                    value={values.lastName}
                    onChange={changeHandler}
                    onBlur={(e) => lenghtCheck(e, 3, 15)}
                />
                {errors.lastName &&
                    <p className="error">
                        Фамилията трябва да е между 3 и 15 символа
                    </p>
                }
                <label htmlFor="age">Възраст</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Възраст"
                    // defaultValue={values.age}
                    value={values.age}
                    onChange={changeHandler}
                    onBlur={isPositive}
                />
                {errors.age &&
                    <p className="error">
                        Невалидна възраст
                    </p>
                }

                <label htmlFor="gender">Пол</label>
                <div className='gender'>
                    <input
                        type="radio"
                        value="male"
                        name="gender"
                        // value = {values.gender.checked}
                        checked={values.gender.checked}
                        onChange={changeHandler }
                        onBlur={(e) => lenghtCheck(e, 3, 7)}
                    /> Мъж

                    <input
                        type="radio"
                        value="female"
                        name="gender"
                        // value = {values.gender.checked}
                        checked={values.gender.checked}
                        onChange={changeHandler}
                        onBlur={(e) => lenghtCheck(e, 3, 7)}
                    />
                        Жена
                </div>
                {errors.gender &&
                    <p className="error">
                        Моля отбележете вашия пол
                    </p>
                }

                <label htmlFor="email">Електронна поща</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Електронна поща"
                    value={values.email}
                    // defaultValue = {values.email}
                    onChange={changeHandler}
                    onBlur={validateEmail}
                />
                {errors.email &&
                    <p className="error">
                        Невалиден email
                    </p>
                }
                <label htmlFor="password">Парола</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Парола"
                    // defaultValue = {values.password}
                    value={values.password}
                    onChange={changeHandler}
                    onBlur={(e) => lenghtCheck(e, 6, 20)}
                />
                {errors.password &&
                    <p className="error">
                        Паролата трябва да е между 6 и 20 символа
                    </p>
                }
                <label htmlFor="rePassword">Повторете паролата</label>
                <input
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    placeholder="Повторете паролата"
                    // defaultValue = {values.rePassword}
                    value={values.rePassword}
                    onChange={changeHandler}
                    onBlur={validateRePass}
                />
                {errors.rePassword &&
                    <p className="error">
                        Паролите не съвпадат
                    </p>
                }
                <div style={{ "display": "flex" }}>
                    <label htmlFor="confirmation"> Прочетох
                        <Link to='/about' element={<About />}> &nbsp;About</Link>
                    </label>
                    <input
                        type="checkbox"
                        id="confirmation"
                        name="confirmation"
                        value={values.confirmation.checked}
                        checked={values.confirmation.checked}
                        onChange={checkboxHandler}
                    />
                </div>

                {(!Object.values(errors).some((v) => v === true)
                    && !Object.values(values).some((v) => v.length === 0)
                    && values.gender !== ''
                    && values.confirmation.checked)
                    ? <input type="submit" value="Регистрирай ме" />
                    : <input type="submit" value="Всички полета са задължителни" disabled={true} />

                }
            </form>
            <p>
                <Link to="/login">Вече имате акаунт?</Link>
            </p>
        </div>
    )
};