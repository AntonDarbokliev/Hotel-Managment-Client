import { authServiceFactory } from "../../services/auth";
import { useAuthStore } from "../../stores/Auth";
import { useToastStore } from "../../stores/ToastStore";
import { ErrorObj } from "../../types/ErrorTypes";
import { extractErrors } from "../../utils/extractErrors";
import { useForm } from "../useForm";
import { useLoading } from "../useLoading";

export const useLogin = (onSuccess: () => void) => {

    const {isLoading,requestWithLoading} =  useLoading()

    const updateUser = useAuthStore((s) => s.updateUser)

    const authService = authServiceFactory();
    const toastSetter = useToastStore(s => s.setToastText)

    const onLogin = async () => {
        const data = new FormData();
        data.append("LoginCode", formValues.hotelCode);
        data.append("Password", formValues.password);
        try {
          const response =  await requestWithLoading( () => authService.login(data));
          const token = response.success; 
          localStorage.setItem("token", token);
          
          updateUser()
        
          onSuccess()
        } catch (error) {
         const errorTxt = extractErrors(error as ErrorObj)
         toastSetter(errorTxt)
      } finally {
        resetForm()
      }
};

      const {  onChangeHandler, onSubmit,resetForm,formValues } = useForm({
          hotelCode: "",
          password: "",
        }, onLogin);
    

    return {
        isLoading,
        onChangeHandler,
        onSubmit,
        formValues
    }
}