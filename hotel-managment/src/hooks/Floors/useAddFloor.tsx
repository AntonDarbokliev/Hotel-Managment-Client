import { useParams } from "react-router-dom"
import { floorServiceFactory } from "../../services/floors"
import { Floor } from "../../types/FloorType"
import { extractErrors } from "../../utils/extractErrors"
import { ErrorObj } from "../../types/ErrorTypes"
import { useToastStore } from "../../stores/ToastStore"

export const useAddFloor = (
    totalFloors: number,
    onSuccess: (data:Floor) => void,
) => {

    const params = useParams()
    const setToast = useToastStore(s => s.setToastText)

    const floorService = floorServiceFactory()
    const toastSetter = useToastStore(s => s.setToastText)
    const onAddFloor = async () => {
        const formData = new FormData()
        formData.append('HotelId',String(params.id)) 
        formData.append('FloorNumber',String(totalFloors + 1))
        try {
            const data = await floorService.add(formData)
            onSuccess(data.currentFloor)
            toastSetter('Floor Added',true)
        } catch (error) {
            const errorTxt = extractErrors(error as ErrorObj)
            setToast(errorTxt)
        } 
    }

    return {
        onAddFloor
    }

}