import { useEffect, useState } from "react";

interface FormValues {
    hotelCode: string;
    password: string;
}

interface ValidationValues {
    hotelCode: boolean;
    password: boolean;
}

export const useLoginValidations = (formValues: FormValues, validationValues: ValidationValues) => {

    const [disableButton,setDisableButton] = useState(true)

    const isCodeValid =  (
        !/^.{3,}$/.test(formValues['hotelCode']) 
        && formValues.hotelCode !== '' 
        && validationValues.hotelCode === true
        )
    
        const isPasswordValid = (
            !/^.{5,}$/.test(formValues['password']) 
            && formValues.password !== '' 
            && validationValues.password === true
        )

        useEffect(() => {
            if(!isPasswordValid && !isCodeValid && Object.values(formValues).every(x => x.length != 0)){
                setDisableButton(false)
            }else {
                setDisableButton(true)
            }
        },[formValues,isPasswordValid,isCodeValid])

        

        return {
            isCodeValid,
            isPasswordValid,
            disableButton
        }
}