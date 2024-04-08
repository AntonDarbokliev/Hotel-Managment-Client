import { useLocation, useNavigate } from "react-router-dom"
import { authServiceFactory } from "../../services/auth"
import { makeFormData } from "../../utils/makeFormData"
import { useToastStore } from "../../stores/ToastStore"
import { extractErrors } from "../../utils/extractErrors"
import { ErrorObj } from "../../types/ErrorTypes"
import { useAuthStore } from "../../stores/Auth"
import { useEffect } from "react"

const authService = authServiceFactory()

export const useResetPass = () => {
    const navigate = useNavigate()
    const clearUser = useAuthStore(s => s.clearUser)

    useEffect(() => {
        clearUser()
    },[])
    const setToast = useToastStore(s => s.setToastText)
    const location = useLocation()

    const resetPass = async (formValues: {[key:string]: string}) => {


        const match = location.search.match(/[?&]token=([^&]+)/);
        
        const formData = makeFormData(formValues)
        
        formData.delete('RepeatPassword')
        
        if(match) {
            const token = match[1]
            
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