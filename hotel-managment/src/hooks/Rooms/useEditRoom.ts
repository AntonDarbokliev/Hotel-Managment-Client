import { roomServiceFactory } from '../../services/room'
import {Room} from '../../types/RoomType'
import { makeFormData } from '../../utils/makeFormData'

const roomService = roomServiceFactory()

export const useEditRoom = (
    onAddFail: () => void, 
    afterAdd: () => void 
) => {
    const editRoom = (room: Room) => {
        makeFormData(room)
        roomService.edit()
    }
}