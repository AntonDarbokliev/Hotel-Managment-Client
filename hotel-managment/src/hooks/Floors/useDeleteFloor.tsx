import { floorServiceFactory } from "../../services/floors"
import { useToastStore } from "../../stores/ToastStore"
import { ErrorObj } from "../../types/ErrorTypes"
import { extractErrors } from "../../utils/extractErrors"

export const useDeleteFloor = (floorId : string,onSuccess: () => void) => {
    const floorService = floorServiceFactory()
    const setToast = useToastStore(s => s.setToastText)

    const deleteFloor = async () => {
        try {
            floorService.delete(floorId)
            onSuccess()
        } catch (error) {
            const errorTxt = extractErrors(error as ErrorObj)
            setToast(errorTxt)
        }
    }


    return {
        deleteFloor
    }
}