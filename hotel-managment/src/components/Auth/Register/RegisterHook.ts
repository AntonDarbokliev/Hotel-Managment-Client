import { useEffect, useState } from "react";

interface FormValues {
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Address: string,
    EGN : string,
    Password: string,
    RepeatPassword:string,
    Email: string,
}

interface ValidationValues {
    FirstName: boolean,
    MiddleName: boolean,
    LastName: boolean,
    Address: boolean,
    EGN : boolean,
    Password: boolean,
    RepeatPassword:boolean,
    Email: boolean,
}


export const useRegisterValidations = (formValues: FormValues,validationValues: ValidationValues) => {
    
    const [disableButton,setDisableButton] = useState(true)
    
    const checkLengthValidation = <K extends keyof FormValues>(formValue: K, desiredLength: number) => {
        const regex = new RegExp(`^.{${desiredLength},}$`);
        return  regex.test(String(formValues[formValue])) 
        && formValues[formValue] !== '' 
        && validationValues[formValue] === true
    }

    const isFirstNameValid = (
        checkLengthValidation('FirstName',2)
    ) 

    const isMiddleNameValid = (
        checkLengthValidation('MiddleName',2)
    )

    const isLastNameValid = (
        checkLengthValidation('LastName',2)
    )

    const isEGNValid = (
        checkLengthValidation('EGN',10)
    )

    const isAddressValid = (
        checkLengthValidation('Address',5)
        )

    const isPasswordValid = (
           checkLengthValidation('Password',5)
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

    useEffect(() => {
        if(
            !isFirstNameValid && 
            !isMiddleNameValid && 
            !isLastNameValid && 
            !isEGNValid && 
            !isAddressValid && 
            !isPasswordValid && 
            !isRepeatPasswordValid && 
            !isEmailValid && 
            Object.values(formValues).every(x => x.length != 0)){
            setDisableButton(false)
        }else {
            setDisableButton(true)
        }
    },[
        isFirstNameValid,
        isMiddleNameValid,
        isLastNameValid,
        isEGNValid,
        isAddressValid,
        isPasswordValid,
        isRepeatPasswordValid,
        isEmailValid,
        formValues,
    ])

    return {
        isFirstNameValid,
        isMiddleNameValid,
        isLastNameValid,
        isEGNValid,
        isAddressValid,
        isPasswordValid,
        isRepeatPasswordValid,
        isEmailValid,
        disableButton
    }
} 