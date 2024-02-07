import { useEffect, useState } from "react";

interface FormValues {
    email: string;
    phoneNumber: string;
    location: string;
    hotelName: string;
    password: string;
    repeatPassword: string;
}

interface ValidationValues {
    email: boolean;
    phoneNumber: boolean;
    location: boolean;
    hotelName: boolean;
    password: boolean;
}

export const useRegisterValidations = (formValues: FormValues,validationValues: ValidationValues) => {

    const [disableButton,setDisableButton] = useState(true)


    const isEmailValid =  (
        !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        .test(formValues['email']) 
        && formValues.email !== '' 
        && validationValues.email === true
        ) 

    const isPhoneNumberValid = (
        !/^.{7,}$/.test(formValues['phoneNumber']) 
        && formValues.phoneNumber !== '' 
        && validationValues.phoneNumber === true

    )

    const isLocationValid = (
        !/^.{3,}$/.test(formValues['location']) 
        && formValues.location !== '' 
        && validationValues.location === true

    )

    const isHotelNameValid = (
        !/^.{3,}$/.test(formValues['hotelName']) 
        && formValues.hotelName !== '' 
        && validationValues.hotelName === true

    )

    const isPasswordValid = (
        !/^.{5,}$/.test(formValues['password']) 
        && formValues.password !== '' 
        && validationValues.password === true

    )

    const isRepeatPasswordValid = (
        !(formValues['repeatPassword'] == formValues['password'])
        && formValues.password !== '' 
        && validationValues.password === true

    )

    useEffect(() => {
        if(!isEmailValid && 
            !isHotelNameValid && 
            !isLocationValid && 
            !isPasswordValid && 
            !isRepeatPasswordValid && 
            Object.values(formValues).every(x => x.length != 0)){
            setDisableButton(false)
        }else {
            setDisableButton(true)
        }
    },[
        formValues,
        isEmailValid,
        isHotelNameValid,
        isLocationValid,
        isPasswordValid,
        isRepeatPasswordValid,
    ])

    return {
        isEmailValid,
        isHotelNameValid,
        isLocationValid,
        isPasswordValid,
        isPhoneNumberValid,
        isRepeatPasswordValid,
        disableButton
    }
} 