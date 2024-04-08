import { roomServiceFactory } from '../../services/room'
import {Room} from '../../types/RoomType'
import { makeFormData } from '../../utils/makeFormData'
import { useLoading } from '../useLoading'

const roomService = roomServiceFactory()

export const useEditRoom = (room: Room,editValues: {newNumber:number,newIsCleaned: boolean}) => {

    const {isLoading,requestWithLoading} = useLoading()

    const editRoom = async (afterEdit: () => void) => {
        const roomData = {
            id: room.id,
            roomNumber: editValues.newNumber,
            floorId: room.floor.id,
            isCleaned: editValues.newIsCleaned
        }
       const formData = makeFormData(roomData)

        try {
           await requestWithLoading(() => roomService.edit(formData))
            afterEdit()
        } catch (error) {
            console.error(error);
            
        }
    }
    return {
        editRoom,
        isLoading
    }
}