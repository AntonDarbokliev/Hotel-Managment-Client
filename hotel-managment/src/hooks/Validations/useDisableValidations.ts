import { useEffect, useState } from "react";

interface FormValues {
    [key:string]: string
}

export const useDisableValidations = (formValues: FormValues,validations:boolean[]) => {
    
    const [disableButton,setDisableButton] = useState(true)

    useEffect(() => {
        if(
            validations.every(validation => !validation) && 
            Object.entries(formValues).every(([key,value]) => key.length != 0 || value == 'AdditionalInformation'))
            {
            setDisableButton(false)
        }else {
            setDisableButton(true)
        }
    },[
        [...validations],
        formValues,
    ])

    return {
       disableButton
    }
} 
