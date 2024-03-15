import { useParams } from "react-router-dom"
import { reserveServiceFactory } from "../../services/reservation"
import { ReserveRoom } from "../../types/ReserveRoom"

    const reserveService = reserveServiceFactory()


export const useReserveRoom = (onFail: () => void,afterAdd?: () => void) => {

    const params = useParams()
    const roomId = params.id!

    const reserveRoom = async (data: ReserveRoom) => {
        const formData = new FormData()

         Object.entries(data).forEach(([key,value]) => {
            formData.append(key,value)
         })

         formData.append('RoomId', roomId)

        try {
             await reserveService.add(formData)
            if(afterAdd)
            afterAdd()
        } catch ( err) {
            onFail()
        }
    }

    return {
        reserveRoom
    }
}