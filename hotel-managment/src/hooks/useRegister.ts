import { useState } from "react"
import { useForm } from "./useForm"
import { extractErrors } from "../utils/extractErrors"
import { ErrorObj } from "../types/ErrorTypes"
import { useLoading } from "./useLoading"
import { authServiceFactory } from "../services/auth"



export const useRegister = (onSuccess: () => void, onFail: (text: string) => void) => {
   
    const [userImage, setUserImage ] = useState<File | undefined>()
    const {isLoading,requestWithLoading} = useLoading()

    const authService = authServiceFactory()

    const register = async () => {
        if(userImage) {
            
            // eslint-disable-next-line @typescript-eslint/no-unused-vars  
            const { RepeatPassword, ...data} = formValues

            const formData = new FormData();

            const array = Object.entries(data)

            for (const [key,value] of array) {
                formData.append(key, value);
            }
            formData.append("ProfilePicture",userImage );

            try{
                await requestWithLoading( async () => await authService.register(formData))
                onSuccess()
            }catch(err){
                const error = extractErrors(err as ErrorObj)
                onFail(error)
            }
        }
    }

    const {formValues,onChangeHandler,onSubmit} = useForm({
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Address: '',
        EGN : '',
        Password: '',
        RepeatPassword:'',
        Email: '',
    },register)


    return {
        setUserImage,
        isLoading,
        onChangeHandler,
        onSubmit,
        formValues,
        }
}