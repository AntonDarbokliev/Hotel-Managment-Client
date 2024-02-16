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
        const regex = new RegExp(`^.{0,${desiredLength - 1}}$`);
        return formValues[formValue] !== '' && regex.test(String(formValues[formValue]));
    }

    const isFirstNameValid = (
        checkLengthValidation('FirstName',2) &&
        validationValues.FirstName === true
    ) 

    const isMiddleNameValid = (
        checkLengthValidation('MiddleName',2)  &&
        validationValues.MiddleName === true

    // const isEmailValid =  (
    //     !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
    //     .test(formValues['email']) 
    //     && formValues.email !== '' 
    //     && validationValues.email === true
    //     ) 

    // const isPhoneNumberValid = (
    //     !/^.{7,}$/.test(formValues['phoneNumber']) 
    //     && formValues.phoneNumber !== '' 
    //     && validationValues.phoneNumber === true

    )

    const isLastNameValid = (
        checkLengthValidation('LastName',2) &&
        validationValues.LastName === true
    )

    const isEGNValid = (
        checkLengthValidation('EGN',10) &&
        validationValues.EGN === true
    )

    // Test
    const isAddressValid = (
        checkLengthValidation('Address',5) &&
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
