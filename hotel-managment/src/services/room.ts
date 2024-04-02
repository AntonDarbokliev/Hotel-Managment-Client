import { Amenity } from "../types/AmenityType"
import { RequestFactory } from "./requester"

const baseUrl = `${import.meta.env.VITE_BASE_URL}/Room`

export const roomServiceFactory = () => {
    const request = RequestFactory()

    return {
        add: (data: FormData) => request.post(baseUrl,data),
        get: (floorId:string) => request.get(baseUrl + `/floor/${floorId}`),
        getSingle: (roomId: string) => request.get(baseUrl + `/${roomId}`),
        addAmenities: (data: Amenity[]) => request.post(baseUrl + '/AddExtra',data),
        edit: (data: FormData ) => request.put(baseUrl,data)
    }
}