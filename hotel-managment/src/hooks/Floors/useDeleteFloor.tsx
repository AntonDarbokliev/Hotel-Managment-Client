import { floorServiceFactory } from "../../services/floors"

export const useDeleteFloor = (floorId : string,onSuccess: () => void,onFail: () => void) => {
    const floorService = floorServiceFactory()

    const deleteFloor = async () => {
        try {
            floorService.delete(floorId)
            onSuccess()
        } catch (error) {
            onFail()
        }
    }


    return {
        deleteFloor
    }
}