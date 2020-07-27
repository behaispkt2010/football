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
        let newValue = evt.target.value;
        let typeInput = evt.target.type;
        let data = { [name]: newValue };
        /*const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
          setState({
            ...state,
            [evt.target.name]: value
        });*/
        if(typeInput === 'checkbox') {
            
        }
        console.log(newValue);
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