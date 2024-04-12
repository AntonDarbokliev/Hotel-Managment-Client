import { roomServiceFactory } from "../../services/room";
import { useToastStore } from "../../stores/ToastStore";
import { ErrorObj } from "../../types/ErrorTypes";
import { extractErrors } from "../../utils/extractErrors";

export const useAddRoom = (
    roomSetter: React.Dispatch<React.SetStateAction<{roomNumber: number;id: string;}[]>>,
    afterAdd: () => void 
    ) => {
    
        const toastSetter = useToastStore(s => s.setToastText)
    const roomService = roomServiceFactory()

    const addRoom = async (floorId:string,roomNumber: string | number) => {

        const formData = new FormData()
        formData.append('RoomNumber',String(roomNumber))
        formData.append('FLoorId',floorId)
        try {
            const data = await roomService.add(formData)
            roomSetter(state => [...state,data.room])
        }catch(error) {
            const errorTxt = extractErrors(error as ErrorObj)
            toastSetter(errorTxt)
        }
        afterAdd()
        
    }

    return {
        addRoom
    }
}