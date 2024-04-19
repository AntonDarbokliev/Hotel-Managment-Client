import { authServiceFactory } from "../../services/auth"
import { useToastStore } from "../../stores/ToastStore"
import { ErrorObj } from "../../types/ErrorTypes"
import { extractErrors } from "../../utils/extractErrors"
import { makeFormData } from "../../utils/makeFormData"
import { useLoading } from "../useLoading"

const authService = authServiceFactory()

export const useChangeEmail =  (afterChange?: () => void) => {
    const {isLoading,requestWithLoading} = useLoading()
    const toastSetter = useToastStore(s => s.setToastText)

    const changeEmail = async (newEmail: string,token: string | null) => {
        try {
            if(!token) {
                throw 'Token is null'
            }
            const formData = makeFormData({newEmail,token})
            await requestWithLoading ( () => authService.changeEmail(formData))
            if(afterChange)
            afterChange()
        } catch (error) {
            if(error.error){
                console.error(error.error);
            }else {
                const errorTxt = extractErrors(error as ErrorObj)
                toastSetter(errorTxt)
            }
        }
    }
    return {
        changeEmail,
        isLoading
    }
}