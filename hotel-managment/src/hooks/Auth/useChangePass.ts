import { useNavigate } from "react-router-dom"
import { authServiceFactory } from "../../services/auth"
import { makeFormData } from "../../utils/makeFormData"
import { useToastStore } from "../../stores/ToastStore"
// import { extractErrors } from "../../utils/extractErrors"
// import { ErrorObj } from "../../types/ErrorTypes"
import { useAuthStore } from "../../stores/Auth"
import { useLoading } from "../useLoading"

const authService = authServiceFactory()

export const useChangePass = () => {
    const navigate = useNavigate()
    const clearUser = useAuthStore(s => s.clearUser)

    const setToast = useToastStore(s => s.setToastText)

    const {isLoading,requestWithLoading} = useLoading()

    const resetPass = async (formValues: {[key:string]: string}) => {
        
        const formData = makeFormData(formValues)
        
        try{
            await requestWithLoading(() => authService.changePass(formData))
            
            clearUser()

            navigate('/login')
            
        }catch(error) {
             setToast(error.error)
        }
        
    }
    return {
        resetPass,
        isLoading
    }
}