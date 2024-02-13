// import { RegisterData } from "../types/AuthTypes";
import { RequestFactory } from "./requester";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/Account`

export const authServiceFactory = ( ) => {
    const request = RequestFactory()
    
    return {
        register: (data: FormData) => request.post(baseUrl + '/Register/Hotel',data),
        login: (data: FormData) => request.post(`${baseUrl}/Login/Hotel`, data),
    }   
}