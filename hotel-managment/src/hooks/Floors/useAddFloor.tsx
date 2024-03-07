import { useParams } from "react-router-dom"
import { floorServiceFactory } from "../../services/floors"
import { Floor } from "../../types/FloorType"

export const useAddFloor = (
    newFloor: number,
    onSuccess: (data:Floor) => void,
    onFail: () => void,
) => {

    const params = useParams()

    const floorService = floorServiceFactory()

    const onAddFloor = async () => {
        const formData = new FormData()
        formData.append('HotelId',String(params.id)) 
        formData.append('FloorNumber',String(newFloor))
        try {
            const data = await floorService.add(formData)
            onSuccess(data.currentFloor)
        } catch (error) {
            onFail()
        } 
    }

    return {
        onAddFloor
    }

}