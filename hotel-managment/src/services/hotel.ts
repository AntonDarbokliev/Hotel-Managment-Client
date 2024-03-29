// import { RegisterData } from "../types/AuthTypes";
import { RequestFactory } from "./requester";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/Hotel`

export const hotelServiceFactory = ( ) => {
    const request = RequestFactory()
    
    return {
        add: (data: FormData) => request.post(baseUrl,data),
        getAll: () => request.get(baseUrl),
        getSingle: (id:string) => request.get(baseUrl + `/${id}`)
    }    
}