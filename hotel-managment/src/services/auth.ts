// import { RegisterData } from "../types/AuthTypes";
import { RequestFactory } from "./requester";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/Account`

export const authServiceFactory = ( ) => {
    const request = RequestFactory()
    
    return {
        register: (data: FormData) => request.post(baseUrl + '/Register',data),
        login: (data: FormData) => request.post(`${baseUrl}/Login`, data),
        resetPass: (data: FormData) => request.post(`${baseUrl}/PasswordReset`, data),
        changePass: (data: FormData) => request.post(`${baseUrl}/ChangePassword`, data),
        sendResetEmail: (data: FormData) => request.post(`${baseUrl}/SendReset`, data),  // Waiting for back-end to make the actual endpoint
    }   
}