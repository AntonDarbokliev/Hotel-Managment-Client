import { authServiceFactory } from "../../services/auth";
import { useAuthStore } from "../../stores/Auth";
import { useToastStore } from "../../stores/ToastStore";
import { ErrorObj } from "../../types/ErrorTypes";
import { extractErrors } from "../../utils/extractErrors";
import { makeFormData } from "../../utils/makeFormData";
import { useLoading } from "../useLoading";

export const useLogin = (formValues: {[key:string] : string},onSuccess: () => void,resetForm:() => void) => {

    const {isLoading,requestWithLoading} =  useLoading()

    const updateUser = useAuthStore((s) => s.updateUser)

    const authService = authServiceFactory();
    const toastSetter = useToastStore(s => s.setToastText)

    const login = async () => {
        const data = makeFormData(formValues)

        try {
          const response =  await requestWithLoading( () => authService.login(data));
          const token = response.success; 
          localStorage.setItem("token", token);
          
          updateUser()
        
          onSuccess()
          toastSetter('Logged in',true)
        } catch (error) {
         const errorTxt = extractErrors(error as ErrorObj)
         toastSetter(errorTxt)
      } finally {
        resetForm()
      }
};

    return {
        isLoading,
        login
    }
}