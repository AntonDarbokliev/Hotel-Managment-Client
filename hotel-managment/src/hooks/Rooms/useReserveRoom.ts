import { useParams } from "react-router-dom"
import { reserveServiceFactory } from "../../services/reservation"
import { ReserveRoom } from "../../types/ReserveRoom"
import { useLoading } from "../useLoading"

    const reserveService = reserveServiceFactory()


export const useReserveRoom = (onFail: () => void,afterAdd?: (data: {id:string}) => void) => {

    const params = useParams()
    const roomId = params.id!
    const {isLoading,requestWithLoading} = useLoading()

    const reserveRoom = async (data: ReserveRoom) => {
        const formData = new FormData()

         Object.entries(data).forEach(([key,value]) => {
            formData.append(key,value)
         })

         formData.append('RoomId', roomId)

        try {
            const data = await requestWithLoading( () =>  reserveService.add(formData))
            if(afterAdd){
                afterAdd(data)
            }

        } catch (err) {
            onFail()
        }
    }

    return {
        reserveRoom,
        isLoading
    }
}