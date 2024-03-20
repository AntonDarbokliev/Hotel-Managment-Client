import { RequestFactory } from "./requester"

const baseUrl = `${import.meta.env.VITE_BASE_URL}/Reservation`

export const reserveServiceFactory = () => {
    const request = RequestFactory()

    return {
        add: (data: FormData) => request.post(baseUrl,data),
        getAll: (roomId:string) => request.get(`${baseUrl}/calendar/${roomId}`)
    }
}