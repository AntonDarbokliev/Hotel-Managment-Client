import { roomServiceFactory } from "../../services/room";

export const useAddRoom = (
    roomSetter: React.Dispatch<React.SetStateAction<{roomNumber: number;id: string;}[]>>,
    onAddFail: () => void, 
    afterAdd: () => void 
    ) => {
    
    const roomService = roomServiceFactory()

    const addRoom = async (e:React.MouseEvent,floorId:string,roomNumber: string | number) => {
        e.preventDefault()
        // const floorId = floors.find(x => String(x.floorNumber) == formValues.floorValue)!.id
        const formData = new FormData()
        formData.append('RoomNumber',String(roomNumber))
        formData.append('FLoorId',floorId)
        try {
            const data = await roomService.add(formData)
            roomSetter(state => [...state,data.room])
        }catch(error) {
            onAddFail()
        }
        afterAdd()
        
    }

    return {
        addRoom
    }
}