import { useNavigate } from "react-router-dom"
import { authServiceFactory } from "../../services/auth"
import { makeFormData } from "../../utils/makeFormData"
import { useToastStore } from "../../stores/ToastStore"
import { extractErrors } from "../../utils/extractErrors"
import { ErrorObj } from "../../types/ErrorTypes"
import { useAuthStore } from "../../stores/Auth"
import { useEffect } from "react"
import { useGetTokenFromUrl } from "../useTokenFromUrl"

const authService = authServiceFactory()

export const useResetPass = () => {
    const navigate = useNavigate()
    const clearUser = useAuthStore(s => s.clearUser)

    useEffect(() => {
        clearUser()
    },[])
    const setToast = useToastStore(s => s.setToastText)

    const {token} = useGetTokenFromUrl()


    const resetPass = async (formValues: {[key:string]: string}) => {
        
        const formData = makeFormData(formValues)
        
        formData.delete('RepeatPassword')
        
        if(token) {            
            formData.append('ResetToken',token)
        }
        
        try{
            await authService.resetPass(formData)
            navigate('/login')
            
        }catch(error) {
             const errorText = extractErrors(error as ErrorObj)
             setToast(errorText)            
        }
        
    }
    return {resetPass}
}