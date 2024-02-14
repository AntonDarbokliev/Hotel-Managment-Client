import { useEffect, useState } from "react"

interface FormValues {
    hotelName: string,
    email: string,
    location: string,
    addInfo: string
}

interface ValidationValues {
    hotelName: boolean,
    email: boolean,
    location: boolean,
    addInfo: boolean
}

export const addHotelValidations = (formValues: FormValues, validationValues: ValidationValues) => {

    const [disableButton, setDisableButton] = useState(true)

    const isHotelNameValid = (
        !/^.{3,}$/.test(formValues['hotelName'])
        && formValues.hotelName !== ''
        && validationValues.hotelName === true
    )

    const isEmailValid = (
        !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
            .test(formValues['email'])
        && formValues.email !== ''
        && validationValues.email === true
    );

    const isLocationValid = (
        !/^.{3,}$/.test(formValues['location'])
        && formValues.location !== ''
        && validationValues.location === true
    );

    const isAddInfoValid = formValues.addInfo.length >= 300;

    useEffect(() => {
        if (!isHotelNameValid &&
            !isEmailValid &&
            !isLocationValid &&
            !isAddInfoValid &&
            Object.values(formValues).every(x => x.length != 0)) {
            setDisableButton(false)
        } else {
            setDisableButton(true);
        }
    }, [
        formValues,
        isHotelNameValid,
        isEmailValid,
        isLocationValid,
        isAddInfoValid,
    ]);

    return {
        isHotelNameValid,
        isEmailValid,
        isLocationValid,
        isAddInfoValid,
        disableButton
    }
}

