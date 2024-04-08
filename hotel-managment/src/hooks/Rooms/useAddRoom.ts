import { roomServiceFactory } from "../../services/room";
import { useLoading } from "../useLoading";

export const useAddRoom = (
    roomSetter: React.Dispatch<React.SetStateAction<{roomNumber: number;id: string;}[]>>,
    onAddFail: () => void, 
    afterAdd: () => void 
    ) => {
    
    const roomService = roomServiceFactory()
    const {isLoading,requestWithLoading} = useLoading()

    const addRoom = async (floorId:string,roomNumber: string | number) => {
        const formData = new FormData()
        formData.append('RoomNumber',String(roomNumber))
        formData.append('FLoorId',floorId)
        try {
            const data = await requestWithLoading( () => roomService.add(formData))
            roomSetter(state => [...state,data.room])
        }catch(error) {
            onAddFail()
        }
        afterAdd()
        
    }

    return {
        addRoom,
        isLoading
    }
}