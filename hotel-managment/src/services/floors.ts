import { RequestFactory } from "./requester"

const baseUrl = `${import.meta.env.VITE_BASE_URL}/Floor`

export const floorServiceFactory = () => {
    const request = RequestFactory()

    return {
        get: (id: string) => request.get(baseUrl + `/${id}`),
        add: (data: FormData) => request.post(baseUrl,data)
    }
}