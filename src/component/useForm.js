import { useState, useEffect, useReducer } from 'react';
import Validator from "../Utils/Validator";

const useForm = (callback, rulesValidate, initialUserInput) => {

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialUserInput
    );
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const validator = new Validator(rulesValidate);
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
          callback();
        }
    }, [errors]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors(validator.validate(userInput));
        setIsSubmitting(true);
    };

    const handleChange = evt => {
        const name = evt.target.name;
        let newValue = "";
        let typeInput = evt.target.type;
        if(typeInput === 'checkbox') {
            const nameCheck = name;
            if(evt.target.checked === true) {
                newValue = [...userInput[`${nameCheck}`], evt.target.value];
            } else {
                let newCheck = [...userInput[`${nameCheck}`]];
                var index = newCheck.indexOf(evt.target.value)
                newCheck.splice(index, 1);
                newValue = newCheck;
            }
        } else {
            newValue = evt.target.value;
        }
        let data = { [name]: newValue };
        setUserInput(data);
    };

    return {
        handleChange,
        handleSubmit,
        userInput,
        errors,
        setUserInput
    }
};

export default useForm;