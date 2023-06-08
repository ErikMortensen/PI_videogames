
export const validateInput = (form, setErrors, errors) => {
    let validated = true;

    // Valido el name, no acepta caracteres especiales, tiene que tener entre 4 y 25 caracteres
    if ((!(/^[a-zA-Z0-9\s]+$/.test(form.name)) && form.name.length !== 0) || (form.name.length < 4 && form.name.length > 0) || (form.name.length > 25)) {
        errors = { ...errors, name: 'Invalid name, must be between 4 and 25 letters, no special characters.' };
        setErrors(errors);
        validated = false;
    } else {
        errors = { ...errors, name: '' };
        setErrors(errors);
    }

    // valido el released, la fecha no puede ser mayor que la actual
    if (!compareDates(form.released) && form.released.length !== 0) {
        errors = { ...errors, released: 'Cannot be later than the current date.' };
        setErrors(errors);
        validated = false;
    } else {
        errors = { ...errors, released: '' };
        setErrors(errors);
    }

    // valido el rating, deben ser números del 1 al 10, no pueden tener más de 2 decimales
    if (!(/^(?:10|[1-9](?:\.\d{1,2})?)$/.test(form.rating)) && form.rating.length !== 0) {
        errors = { ...errors, rating: 'Number between 0 and 10, with a maximum of 2 decimal places.' };
        setErrors(errors);
        validated = false;
    } else {
        errors = { ...errors, rating: '' };
        setErrors(errors);
    }

    //valido los genres, no pueden ser más de 5
    if (form.genres.length > 5) {
        errors = { ...errors, genres: 'You cannot select more than 5 genres.' };
        setErrors(errors);
        validated = false;
    } else {
        errors = { ...errors, genres: '' };
        setErrors(errors);
    }

    // valido que la url de la imagen tenga entre 6 y 150 caracteres
    if ((form.image.length < 6 && form.image.length !== 0) || form.image.length > 150) {
        errors = { ...errors, image: 'Image url must be between 6 and 150 characters.' };
        setErrors(errors);
        validated = false;
    } else {
        errors = { ...errors, image: '' };
        setErrors(errors);
    }

    // valido que description tenga entre 10 y 250 caracteres
    if ((form.description.length < 10 && form.description.length !== 0) || form.description.length > 250) {
        errors = { ...errors, description: 'The description must have between 10 and 250 characters.' };
        setErrors(errors);
        validated = false;
    } else {
        errors = { ...errors, description: '' };
        setErrors(errors);
    }

    return validated;
};

// valida que esten todos los campos del formulario cargados y que no haya errores
export const validateForm = (form, errors) => {
    return !hasEmptyProperty(form) && hasAllEmptyProperty(errors);
};

/**
 * 
 * @param {*} date 
 * @returns true si date es menor o igual a la fecha actual, false caso contrario.
 */
const compareDates = (date) => {
    const currentDate = new Date();
    const arrayDate = date.split('-');

    const selectedDate = new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2]);

    return selectedDate <= currentDate;
};


/**
 * 
 * @param {*} obj 
 * @returns true si tiene alguna propiedad sin valor, false en caso contrario.
 */
function hasEmptyProperty(obj) {
    for (let key in obj) {
        if (Array.isArray(obj[key]) && obj[key].length === 0) {
            return true;
        }
        if (obj[key] === "") {
            return true;
        }
    }
    return false;
}

/**
 * 
 * @param {*} obj 
 * @returns true si todas las propiedades del objeto son "", false en caso contrario
 */
function hasAllEmptyProperty(obj) {
    for (let key in obj) {
        if (obj[key] !== "") {
            return false;
        }
    }
    return true;
}