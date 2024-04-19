import { useState } from "react"
import { useForm } from "../useForm"
import { extractErrors } from "../../utils/extractErrors"
import { ErrorObj } from "../../types/ErrorTypes"
import { useLoading } from "../useLoading"
import { authServiceFactory } from "../../services/auth"
import { useToastStore } from "../../stores/ToastStore"

export const useRegister = (onSuccess: () => void) => {
   
    const [userImage, setUserImage ] = useState<File | undefined>()
    const {isLoading,requestWithLoading} = useLoading()

    const authService = authServiceFactory()
    const toastSetter = useToastStore(s => s.setToastText)

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
                toastSetter('Successfully Registered',true)
            }catch(err){
                const errorTxt = extractErrors(err as ErrorObj)
                toastSetter(errorTxt)
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