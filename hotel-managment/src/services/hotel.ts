// import { RegisterData } from "../types/AuthTypes";
import { RequestFactory } from "./requester";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/Hotel/Add` //?

export const hotelServiceFactory = ( ) => {
    const request = RequestFactory()
    
    return {
        add: (data: FormData) => request.post(baseUrl + '/Register/Hotel',data), //?
    }   
}