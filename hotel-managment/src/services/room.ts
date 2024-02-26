import { RequestFactory } from "./requester"

const baseUrl = `${import.meta.env.VITE_BASE_URL}/Room`

export const roomServiceFactory = () => {
    const request = RequestFactory()

    return {
        add: (data: FormData) => request.post(baseUrl,data),
        get: (floorId:string) => request.get(baseUrl + `/floor/${floorId}`)
    }
}