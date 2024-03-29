import './create.css'

import { useState, useContext, useEffect } from 'react';
import { createPetition, getOne, editPetition } from '../../services/petitionService';

import { AuthContext } from '../../contexts/AuthContext';
import { PetitionContext } from '../../contexts/PetitionContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { generateRandomId, generatePetitionId } from '../../services/helpers';
import { toast } from 'react-toastify';



export const CreatePetition = () => {

    const navigate = useNavigate();
    const [currentPetition, setCurrentPetition] = useState({});

    const { petitionId } = useParams();
    useEffect(() => {
        if (petitionId) {
            getOne(petitionId)
                .then(petition => {
                    setCurrentPetition(petition)
                    setValues(petition)
                })
        }
    }, [petitionId])



    const { setPetitions, addPetitionHandler } = useContext(PetitionContext)
    const { user } = useContext(AuthContext)


    const [values, setValues] = useState({
        title: '',
        petitionText: '',
        category: 'none',
        other: '',
        goal: '',
        authorInfo: { ...user },
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
        },
        signed: '',
        signedBy: [],
        //in case of EDIT petition, it takes the current petition ID to overwrite it instead of generating new id for CREATE petition
        // _id: currentPetition._id || generatedID,
        petitionImage: '',
        hasFinished: false,
        comments: [],
    });

    const generatedID = generatePetitionId(values.title);

    const [errors, setErrors] = useState({});

    const uploadImageHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.files[0]
        })
        )
    }

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
        const submitBtn = e.target.querySelector('input[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.value = "Изчакайте";

        if (Object.keys(currentPetition).length === 0) {
            createPetition({
                ...values,
                _id: generatedID,
                // createdAt: new Date(Date.now()).toString(),
            })
                .then(addPetitionHandler({
                    ...values,
                    _id: generatedID,
                    // createdAt: new Date(Date.now()).toString(),
                }))
                .then
                (navigate("/petitions"))
            toast.success("Успешно публикувахте петиция")
        } else {
            setPetitions(state => state.map(p => p._id === currentPetition._id ? values : p))
            editPetition(petitionId, values)
            navigate(`/details/${petitionId}`)
            toast.success("Успешно променихте петицията си")
        }
    }

    const lengthCheck = (e, minLength, maxLength) => {
        if (values[e.target.name].length) {
            setErrors(state => ({
                ...state,
                [e.target.name]: values[e.target.name].length < minLength || values[e.target.name].length > maxLength
            }))
        }

    }



    const options = [

        {
            label: "Екология",
            value: "Екология",
        },
        {
            label: "Социална тематика",
            value: "Социална тематика",
        },
        {
            label: "Политика",
            value: "Политика",
        },
        {
            label: "Благотворителност",
            value: "Благотворителност",
        },
        {
            label: "Регионални",
            value: "Регионални",
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
                            onBlur={(e) => lengthCheck(e, 10, 80, errors, setErrors)}
                        />

                        <label htmlFor="petition-image">Качете изображение </label>
                        <input
                            type="file"
                            id="petitioн-image"
                            name="petitionImage"
                            accept="image/*"
                            placeholder="Изберете снимка или оставете полето празно"
                            onChange={uploadImageHandler}
                        />

                        <label htmlFor="description">Кратко описание <strong>  *</strong></label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Кратко описание"
                            rows="3"

                            value={values.description}
                            onChange={changeHandler}
                            onBlur={(e) => { lengthCheck(e, 10, 100) }}
                        />

                        <label htmlFor="petition-text">Вашия текст <strong>  *</strong></label>
                        <textarea
                            id="petition-text"
                            name="petitionText"
                            placeholder="Вашия текст"
                            rows="10"
                            value={values.petitionText}
                            onChange={changeHandler}
                            onBlur={(e) => { lengthCheck(e, 10, 1000) }}
                        />

                        <label htmlFor="category">Категория:</label>
                        <select
                            id="category"
                            name="category"
                            value={values.category}
                            onChange={changeHandler}
                            defaultValue={currentPetition.category}
                        >
                            <option value="none" disabled={true} hidden={true}>Изберете категория</option>
                            {options.map((o) => (
                                <option value={o.value} key={o.value} >{o.label}</option>
                            ))}
                        </select>
                        {values.category === 'other' &&
                            <div>
                                <label htmlFor="other" >Дайте кратко описание на категорията<strong>&nbsp;  *</strong> </label>

                                <input
                                    type="text"
                                    id="other"
                                    name="other"
                                    placeholder="Категория"
                                    value={values.other}
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
                            value={values.goal}
                            onChange={changeHandler}
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