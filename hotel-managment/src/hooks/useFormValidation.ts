import { useState } from "react";

export const useFormValidation = <T>(initialValue: T) => {
    const [validationValues, setValidationValues] = useState(initialValue);

    const onFocusBlurHandler = (boolean: boolean, name: string ) => {
        setValidationValues(state => ({...state,[name]: boolean}))
    }

    const onBlurHandler = onFocusBlurHandler.bind(null,true)
    const onFocusHandler = onFocusBlurHandler.bind(null,false)

    return {
        onBlurHandler,
        onFocusHandler,
        validationValues
    }
}