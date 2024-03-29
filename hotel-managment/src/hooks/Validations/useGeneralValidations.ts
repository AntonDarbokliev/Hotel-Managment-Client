import { checkLengthValidation } from "../../utils/sharedValidations"
import { useDisableValidations } from "./useDisableValidations"



interface FormValues {
    [key:string]: string,
}

interface ValidationValues {
    [key:string]: boolean,

    // FirstName?: boolean,
    // MiddleName?: boolean,
    // LastName?: boolean,
    // Address?: boolean,
    // EGN ?: boolean,
    // Password?: boolean,
    // RepeatPassword?:boolean,
    // Email?: boolean,
}


export const useGeneralValidations = (formValues: FormValues,validationValues: ValidationValues) => {

    const isFirstNameValid = (
        checkLengthValidation('FirstName',formValues,2) &&
        validationValues.FirstName === true
    ) 

    const isMiddleNameValid = (
        checkLengthValidation('MiddleName',formValues,2)  &&
        validationValues.MiddleName === true
    )

    const isLastNameValid = (
        checkLengthValidation('LastName',formValues,2) &&
        validationValues.LastName === true
    )

    const isEGNValid = (
        checkLengthValidation('EGN',formValues,10) &&
        validationValues.EGN === true
    )

    const isAddressValid = (
        checkLengthValidation('Address',formValues,5) &&
        validationValues.Address === true
        )

    const isPasswordValid = (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        .test(formValues.Password) &&
           validationValues.Password === true &&
           formValues.Password !== '' 
        )

    const isEmailValid =  (
        !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        .test(formValues['Email']) 
        && formValues.Email !== '' 
        && validationValues.Email === true
        ) 
        

    const isRepeatPasswordValid = (
        !(formValues['RepeatPassword'] == formValues['Password'])
        && formValues.Password !== '' 
        && validationValues.Password === true

    )

    const validations = [
        isAddressValid,
        isEGNValid,
        isEmailValid,
        isFirstNameValid,
        isLastNameValid,
        isMiddleNameValid,
        isPasswordValid,
        isRepeatPasswordValid,
    ]

    const {disableButton } = useDisableValidations(formValues,validations)


    return {
        isFirstNameValid,
        isMiddleNameValid,
        isLastNameValid,
        isEGNValid,
        isAddressValid,
        isPasswordValid,
        isRepeatPasswordValid,
        isEmailValid,
        disableButton,
    }
} 
