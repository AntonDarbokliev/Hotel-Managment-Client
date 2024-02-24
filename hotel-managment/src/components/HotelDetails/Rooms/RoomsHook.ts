import { useParams } from "react-router-dom"
import { roomServiceFactory } from "../../../services/room"

interface FormValues {
    [name:string] : string 
}


export const useRooms = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    formValues: FormValues,
    toastSetter:React.Dispatch<React.SetStateAction<string>>
    ) => {

        const params = useParams()
        const roomService = roomServiceFactory()

    const onAddRoomClick = () => {
        if(formValues.floorValue !== ''){
            modalSetter(true)
        }else {
            toastSetter('Plase select a Floor before adding a Room')
            modalSetter(false)
        }
    }

    const onAddRoomHandler = async (e:React.MouseEvent) => {
        e.preventDefault()
        console.log('Room Number: ',formValues.roomNumber)
        const hotelId = params.id
        const formData = new FormData()
        formData.append('RoomNumber',formValues.roomNumber)
        formData.append('Floor',formValues.floorValue)
        formData.append('HotelId',String(hotelId))
        try {
            await roomService.add(formData)
        }catch(error) {
            console.log(error)
            toastSetter('An error occured, please try again later')
        }
        modalSetter(false)
        
    }
    return {
        onAddRoomClick,
        onAddRoomHandler
    }

} 