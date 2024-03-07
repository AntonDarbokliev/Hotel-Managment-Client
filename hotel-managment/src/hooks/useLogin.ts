import { authServiceFactory } from "../services/auth";
import { useAuthStore } from "../stores/Auth";
import { useForm } from "./useForm";
import { useLoading } from "./useLoading";

export const useLogin = (onSuccess: () => void, onFail: (text: string) => void) => {

    const {isLoading,requestWithLoading} =  useLoading()

    const updateUser = useAuthStore((s) => s.updateUser)

    const authService = authServiceFactory();

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
          if(typeof error == 'object'){
            onFail((error as {error:string}).error)
        }
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