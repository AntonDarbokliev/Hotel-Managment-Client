import { useDisableValidations } from "../../../hooks/Validations/useDisableValidations";

interface FormValues {
    [key:string]: string,
}

interface ValidationValues {
    [key:string]: boolean,
}

export const useLoginValidations = (formValues: FormValues, validationValues: ValidationValues) => {

    let isCodeValid =  !/^.{3,}$/.test(formValues['hotelCode']) 
    && formValues.hotelCode !== '' 
    && validationValues.hotelCode === true

   if(formValues['LoginCode'] !== undefined) {
        isCodeValid =  !/^.{3,}$/.test(formValues['LoginCode']) 
        && formValues.LoginCode !== '' 
        && validationValues.LoginCode === true
      }
        
    
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