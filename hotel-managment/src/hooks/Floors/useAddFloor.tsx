import { useParams } from "react-router-dom"
import { floorServiceFactory } from "../../services/floors"
import { Floor } from "../../types/FloorType"
import { useToastStore } from "../../stores/ToastStore"

export const useAddFloor = (
    newFloor: number,
    onSuccess: (data:Floor) => void,
    onFail: () => void,
) => {

    const params = useParams()

    const floorService = floorServiceFactory()
    const toastSetter = useToastStore(s => s.setToastText)
    const onAddFloor = async () => {
        const formData = new FormData()
        formData.append('HotelId',String(params.id)) 
        formData.append('FloorNumber',String(newFloor))
        try {
            const data = await floorService.add(formData)
            onSuccess(data.currentFloor)
            toastSetter('Floor Added',true)
        } catch (error) {
            onFail()
        } 
    }

    return {
        onAddFloor
    }

}