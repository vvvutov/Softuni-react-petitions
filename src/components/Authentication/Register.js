import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from "react";

import { AuthContext } from '../../contexts/AuthContext';
import { ErrorsContext } from '../../contexts/ErrorsContext';

import './register.css'

import { register } from '../../services/authService'
import { About } from '../AboutAndNotFound/About';
import * as validate from '../../services/validators';

import { toast } from 'react-toastify';


export const Register = () => {

    const { errors, setErrors } = useContext(ErrorsContext)
    const { userLogin } = useContext(AuthContext)
    
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
        },
    });
    
    const navigate = useNavigate();

    const checkboxHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: { checked: e.target.checked },
        }))
    };

    const changeHandler = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        register({ ...values })
            .then(authData => {
                userLogin(authData)
                navigate('/')
            }).catch((error) => {
                toast.error("Потребител с тази електронна поща вече съществува")
            })
    };


    return (

        <div className="register-box">
            <h1>Регистрация</h1>
            <form onSubmit={onSubmit} >
                <label htmlFor="username">Потребителско име</label>
                <input type="text"
                    id="username"
                    name="username"
                    placeholder="Потребителско име"
                    value={values.username}
                    onChange={changeHandler}
                    onBlur={(e) => { (validate.lengthCheck(e, 3, 15, setErrors, values)) }}
                />
                {errors.username &&
                    <p className="error">
                        Потребителското име трябва да е между 3 и 15 символа
                    </p>
                }
                <label htmlFor="firstName">Име</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Име"
                    value={values.firstName}
                    onChange={changeHandler}
                    onBlur={(e) => validate.lengthCheck(e, 3, 15, setErrors, values)}
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
                    value={values.lastName}
                    onChange={changeHandler}
                    onBlur={(e) => validate.lengthCheck(e, 3, 15, setErrors, values)}
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
                    value={values.age}
                    onChange={changeHandler}
                    onBlur={(e) => validate.isPositive(e, setErrors, values)}
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
                        checked={values.gender.checked}
                        onChange={changeHandler}
                        onBlur={(e) => validate.lengthCheck(e, 3, 7, setErrors, values)}
                    /> Мъж

                    <input
                        type="radio"
                        value="female"
                        name="gender"
                        checked={values.gender.checked}
                        onChange={changeHandler}
                        onBlur={(e) => validate.lengthCheck(e, 3, 7, setErrors, values)}
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
                    onChange={changeHandler}
                    onBlur={(e) => validate.validateEmail(e, setErrors, values)}
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
                    value={values.password}
                    onChange={changeHandler}
                    onBlur={(e) => validate.lengthCheck(e, 6, 20, setErrors, values)}
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
                    value={values.rePassword}
                    onChange={changeHandler}
                    onBlur={(e) => validate.validateRePass(e, setErrors, values)}
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