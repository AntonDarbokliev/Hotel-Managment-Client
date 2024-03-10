import { useDisableValidations } from "../../../hooks/Validations/useDisableValidations";

interface FormValues {
    [key:string]: string,
    hotelCode: string;
    password: string;
}

interface ValidationValues {
    hotelCode: boolean;
    password: boolean;
}

export const useLoginValidations = (formValues: FormValues, validationValues: ValidationValues) => {

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

        const {disableButton} = useDisableValidations(formValues,[isCodeValid,isPasswordValid]) 

        return {
            isCodeValid,
            isPasswordValid,
            disableButton
        }
}