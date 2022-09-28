import './create.css'

import { useState, useContext } from 'react';
import { create } from '../../services/petitionService';

import { AuthContext } from '../../contexts/AuthContext';
import { PetitionContext } from '../../contexts/PetitionContext';


export const CreatePetition = () => {

    const { addPetitionHandler } = useContext(PetitionContext)
    const { user } = useContext(AuthContext)

    //TODO too many thing attached as authorInfo in values
    const [values, setValues] = useState({
        title: '',
        image: '',
        petitionText: '',
        category: 'none',
        other: '',
        goal: '',
        authorInfo: {...user},
        showMyFirstName: {
            checked: true
        },
        showMyLastName: {
            checked: true
        },
        showMyAge: {
            checked: false
        },
        showMyGender: {
            checked: false
        }
    });

    const [errors, setErrors] = useState({});


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
        if (values.category === 'other'){
           values.category = values.other
        }

        create(values)
        .then(result => addPetitionHandler(result))
    }

    const lengthCheck = (e, minLength, maxLength) => {

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

    const isHTML = (e) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: !/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(values[e.target.name])
        }))
    }

    const options = [

        {
            label: "Екология",
            value: "ecology",
        },
        {
            label: "Социална тематика",
            value: "social",
        },
        {
            label: "Политика",
            value: "politics",
        },
        {
            label: "Благотворителност",
            value: "charity",
        },
        {
            label: "Друго",
            value: "other",
        },

    ];

    return (
        <>

            <section id="create-container">
                <div className="create-container-info">
                    <h1>Създай петиция</h1>
                    <form onSubmit={onSubmit} >
                        <label htmlFor="title" >Заглавие <strong>  *</strong></label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Заглавие на вашата петиция"
                            value={values.title}
                            onChange={changeHandler}
                            onBlur={(e) => lengthCheck(e, 10, 80)}
                        />

                        <label htmlFor="image">Поставете URL към изображение</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            placeholder="http://..."
                            value={values.image}
                            onChange={changeHandler}
                            onBlur={(e) => isHTML}
                        />

                        <label htmlFor="description">Кратко описание <strong>  *</strong></label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Кратко описание"
                            rows="3"
                            onChange={changeHandler}
                            onBlur={(e) => { lengthCheck(e, 10, 100) }}

                        />

                        <label htmlFor="petition-text">Вашия текст <strong>  *</strong></label>
                        <textarea
                            id="petition-text"
                            name="petitionText"
                            placeholder="Вашия текст"
                            rows="10"
                            onChange={changeHandler}
                            onBlur={(e) => { lengthCheck(e, 10, 1000) }}
                        />

                        <label htmlFor="category">Категория:</label>
                        <select 
                        id="category" 
                        name="category"
                        value={values.category}
                        onChange={changeHandler}
                        >
                            <option value="none"  disabled={true} hidden={true}>Изберете категория</option>
                            {options.map((o) => (
                                <option value={o.value} key={o.value} >{o.label}</option>
                            ))}
                        </select>
                        { values.category === 'other' &&  
                        <div>
                        <label htmlFor="other" >Дайте кратко описание на категорията<strong>&nbsp;  *</strong> </label>
                        
                        <input
                        type="text"
                        id="other"
                        name="other"
                        placeholder="Категория"
                        value={values.other }
                        onChange={changeHandler}
                        />
                        </div>
                    }

                        <label htmlFor="goal" >Колко подписа целите да съберете? <strong>&nbsp;  *</strong></label>
                        <input
                            type="number"
                            id="goal"
                            name="goal"
                            placeholder="Колко подписа целите да съберете?"
                        />

                        <ul>
                            <li key={'firstName'} >
                                <label htmlFor="showMyFirstName" >Покажи името ми
                                    <input type="checkbox"
                                        id="showMyFirstName"
                                        name="showMyFirstName"
                                    checked={values.showMyFirstName.checked}
                                    onChange={checkboxHandler}
                                    />
                                </label>
                            </li>
                            <li key={'lastName'}>

                                <label htmlFor="showMyLastName" >Покажи фамилията ми
                                    <input type="checkbox"
                                        id="showMyLastName"
                                        name="showMyLastName"
                                    checked={values.showMyLastName.checked}
                                    onChange={checkboxHandler}
                                    />
                                </label>
                            </li>
                            <li key={'age'}>

                                <label htmlFor="showMyAge" >Покажи възрастта ми
                                    <input type="checkbox"
                                        id="showMyAge"
                                        name="showMyAge"
                                    checked={values.showMyAge.checked}
                                    onChange={checkboxHandler}
                                    />
                                </label>
                            </li>
                            <li key={'gender'}>

                                <label htmlFor="showMyGender" >Покажи пола ми
                                    <input type="checkbox"
                                        id="showMyGender"
                                        name="showMyGender"
                                    checked={values.showMyGender.checked}
                                    onChange={checkboxHandler}
                                    />
                                </label>

                            </li>
                        </ul>


                        <input type="submit" id="btn" value="submit" />
                    </form>
                </div>
            </section>
        </>
    )
};