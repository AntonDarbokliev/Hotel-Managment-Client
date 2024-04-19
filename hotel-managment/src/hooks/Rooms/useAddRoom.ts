import { roomServiceFactory } from "../../services/room";
import { useToastStore } from "../../stores/ToastStore";
import { ErrorObj } from "../../types/ErrorTypes";
import { Room } from "../../types/RoomType";
import { extractErrors } from "../../utils/extractErrors";
import { makeFormData } from "../../utils/makeFormData";
import { useLoading } from "../useLoading";

export const useAddRoom = (
    afterAdd: (data: {room: Room}) => void 
    ) => {
    const toastSetter = useToastStore(s => s.setToastText)
    const roomService = roomServiceFactory()
    const {isLoading,requestWithLoading} = useLoading()

    const addRoom = async (floorId:string,formValues: {[key:string] : string}) => {
        const formData = makeFormData(formValues)
        formData.append('FloorId',floorId)
        try {
            const data = await requestWithLoading( () => roomService.add(formData))
            afterAdd(data)
            toastSetter('Room Added',true)
        }catch(error) {

            const errorTxt = extractErrors(error as ErrorObj) 
            toastSetter(errorTxt)
        }
        
    }

    return {
        addRoom,
        isLoading
    }
}