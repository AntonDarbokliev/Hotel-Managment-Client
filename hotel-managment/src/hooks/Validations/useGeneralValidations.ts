import { checkLengthValidation } from "../../utils/sharedValidations"
import { useDisableValidations } from "./useDisableValidations"



interface FormValues {
    [key:string]: string,
}

interface ValidationValues {
    [key:string]: boolean,
}


export const useGeneralValidations = (formValues: FormValues,validationValues: ValidationValues) => {

    let isFirstNameValid = (
        checkLengthValidation('FirstName',formValues,2) &&
        validationValues.FirstName === true
    ) 

    if(formValues['Name']) {
        isFirstNameValid = (
            checkLengthValidation('Name',formValues,2) &&
            validationValues.Name === true
        ) 
    
    }

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

    let isPasswordValid = (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        .test(formValues.Password) &&
           validationValues.Password === true &&
           formValues.Password !== '' 
        )

        if(formValues['NewPassword']) {
            isPasswordValid = (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                .test(formValues.NewPassword) &&
                   validationValues.NewPassword === true &&
                   formValues.NewPassword !== '' 
                )
        }

        let isPhoneNumberValid = (
        checkLengthValidation("PhoneNumber",formValues, 5) &&
        validationValues.PhoneNumber === true &&
        formValues.PhoneNumber.length <= 15)

        if(formValues['TelephoneNumber']) {
            isPhoneNumberValid = (
                checkLengthValidation("TelephoneNumber",formValues, 5) &&
                validationValues.TelephoneNumber === true &&
                formValues.TelephoneNumber.length <= 15)
        }

    const isEmailValid =  (
        !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        .test(formValues['Email']) 
        && formValues.Email !== '' 
        && validationValues.Email === true 
        ) 
    const isNewEmailValid = (
        !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        .test(formValues['newEmail']) 
        && formValues.newEmail !== '' 
        && validationValues.newEmail === true 
    )
      
    const isEmailAddressValid =  (
        !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        .test(formValues['EmailAddress']) 
        && formValues.EmailAddress !== '' 
        && validationValues.EmailAddress === true
        ) 
        

    let isRepeatPasswordValid = (
        !(formValues['RepeatPassword'] == formValues['Password'])
        && formValues.Password !== '' 
        && validationValues.Password === true
    )

    if(formValues['ConfirmPassword']) {
        isRepeatPasswordValid =  !(formValues['ConfirmPassword'] == formValues['NewPassword'])
        && formValues.NewPassword !== '' 
        && validationValues.NewPassword === true
    }

    const isCodeValid =  (!/^.{4,}$/.test(formValues['loginCode']) 
    && formValues.loginCode !== '' 
    && validationValues.loginCode === true)

    const validations = [
        isAddressValid,
        isEGNValid,
        isEmailValid,
        isFirstNameValid,
        isLastNameValid,
        isMiddleNameValid,
        isPasswordValid,
        isRepeatPasswordValid,
        isEmailAddressValid,
        isPhoneNumberValid,
        isCodeValid,
        isNewEmailValid
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
        isEmailAddressValid,
        isPhoneNumberValid,
        isCodeValid,
        isNewEmailValid
    }
} 
