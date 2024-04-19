import { roomServiceFactory } from "../../services/room"
import { useToastStore } from "../../stores/ToastStore"
import { Amenity } from "../../types/AmenityType"
import { ErrorObj } from "../../types/ErrorTypes"
import { extractErrors } from "../../utils/extractErrors"
import { useLoading } from "../useLoading"

const roomService = roomServiceFactory()

export const useAddAmenity =  (afterAdd?: () => void) => {
    const toastSetter = useToastStore(s => s.setToastText)
    const {isLoading,requestWithLoading} = useLoading()

    const addAmenity = async (allAmenities: Amenity[]) => {
        try {
            await requestWithLoading( () => roomService.addAmenities(allAmenities))
            if(afterAdd)
            afterAdd()
            toastSetter('Amenities updated',true)
        } catch (error) {
            const errorTxt = extractErrors(error as ErrorObj) 
            toastSetter(errorTxt)
        }

    }

    return {
        addAmenity,
        isLoading
    }
}