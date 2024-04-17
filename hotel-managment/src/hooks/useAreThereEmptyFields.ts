import { useEffect, useState } from "react";

export const useAreThereEmptyFields = (formValues : { [key:string]: string}) => {
    const [areThereEmptyFields, setAreThereEmptyFields] = useState(false)

    useEffect(() => {
        setAreThereEmptyFields(false)
        Object.entries(formValues).forEach(([key,value]) => {
            
            if(value == '' && key !== 'AdditionalInformation'){ 
            setAreThereEmptyFields(true)
                return;
            }
        })

    },[formValues])

    return {areThereEmptyFields}
}