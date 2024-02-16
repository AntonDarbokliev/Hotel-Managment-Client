import { useEffect, useState } from "react";
import { checkLengthValidation } from "../../utils/sharedValidations.ts";

interface FormValues {
    [key: string]: string
    Name: string,
    Email: string,
    Address: string,
    TelephoneNumber: string,
}

interface ValidationValues {
    Name: boolean,
    Email: boolean,
    Address: boolean,
    TelephoneNumber: boolean
}

export const useAddHotelValidations = (formValues: FormValues, validationValues: ValidationValues) => {

    const [disableButton, setDisableButton] = useState(true)

    const isHotelNameValid = (
        checkLengthValidation('Name', 2, formValues) &&
        validationValues.Name === true
    )

    const isEmailValid = (
        !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
            .test(formValues['Email'])
        && formValues.Email !== ''
        && validationValues.Email === true
    )

    const isAddressValid = (
        checkLengthValidation('Address', 5, formValues) &&
        validationValues.Address === true
    )

    const isTelephoneNumberValid = (
        checkLengthValidation('TelephoneNumber',10, formValues) &&
        validationValues.TelephoneNumber === true
    )

    useEffect(() => {
        if (!isHotelNameValid &&
            !isEmailValid &&
            !isAddressValid &&
            !isTelephoneNumberValid &&
            Object.values(formValues).every(x => x.length !== 0)) {
            setDisableButton(false)
        } else {
            setDisableButton(true);
        }
    }, [
        formValues,
        isHotelNameValid,
        isEmailValid,
        isAddressValid,
        isTelephoneNumberValid
    ]);

    return {
        isHotelNameValid,
        isEmailValid,
        isTelephoneNumberValid,
        isAddressValid,
        disableButton,
    }
}

