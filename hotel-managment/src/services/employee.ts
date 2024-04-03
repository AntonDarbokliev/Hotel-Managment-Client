import { RequestFactory } from "./requester";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/Employee`


export const employeeServiceFactory = ( ) => {
    const request = RequestFactory()

    return {
        getAll: (hotelId:string) => request.get(baseUrl + `?hotelId=${hotelId}`),
        add: (data: FormData) => request.post(baseUrl,data),
        getRoles: () => request.get(baseUrl + '/Roles'),
        edit: (data: FormData) => request.put(baseUrl,data) 
    }   
}