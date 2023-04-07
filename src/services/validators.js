export const lengthCheck = (e, minLength, maxLength, setErrors, values) => {
    setErrors(state => ({
        ...state,
        [e.target.name]: values[e.target.name].length < minLength || values[e.target.name].length > maxLength
    }))
};

export const isPositive = (e, setErrors, values) => {
    let number = Number(values[e.target.name]);
    setErrors(state => ({
        ...state,
        [e.target.name]: !(number > 0),
    }))
};

export const isHTML = (e, setErrors, values) => {
    setErrors(state => ({
        ...state,
        [e.target.name]: !/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(values[e.target.name])
    }))
};

export const validateEmail = (e, setErrors, values) => {

    setErrors(state => ({
        ...state,
        [e.target.name]: !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values[e.target.name]))
    }));
};

export const validateRePass = (e, setErrors, values) => {

    setErrors(state => ({
        ...state,
        [e.target.name]: [e.target.value] != values.password
    }))
};