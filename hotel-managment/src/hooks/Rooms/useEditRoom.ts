import { roomServiceFactory } from '../../services/room'
import { useToastStore } from '../../stores/ToastStore'
import { ErrorObj } from '../../types/ErrorTypes'
import {Room} from '../../types/RoomType'
import { extractErrors } from '../../utils/extractErrors'
import { makeFormData } from '../../utils/makeFormData'
import { useLoading } from '../useLoading'

const roomService = roomServiceFactory()

export const useEditRoom = (room: Room,editValues: {newNumber:number,newIsCleaned: boolean}) => {

    const {isLoading,requestWithLoading} = useLoading()
    const toastSetter = useToastStore(s => s.setToastText)

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
            toastSetter('Room Edited',true)
        } catch (error) {
            const errorTxt = extractErrors(error as ErrorObj)
            toastSetter(errorTxt)
        }
    }
    return {
        editRoom,
        isLoading
    }
}