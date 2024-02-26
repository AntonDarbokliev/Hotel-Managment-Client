import { useParams } from "react-router-dom"
import { roomServiceFactory } from "../../../services/room"
import { floorServiceFactory } from "../../../services/floors";

interface FormValues {
    [name:string] : string 
}

export const useRooms = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    formValues: FormValues,
    toastSetter:React.Dispatch<React.SetStateAction<string>>,
    roomsSetter: React.Dispatch<React.SetStateAction<{roomNumber:number,floorId:string}[]>>,
    floorSetter: React.Dispatch<React.SetStateAction<{
        floorNumber: number;
        id: string;
    }[]>>,
    floors: {floorNumber:number,id:string }[],
    floorModalSetter: React.Dispatch<React.SetStateAction<boolean>>
    ) => {

        const params = useParams()
        const roomService = roomServiceFactory()
        const floorService = floorServiceFactory()


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
        const floorId = floors.find(x => String(x.floorNumber) == formValues.floorValue)!.id
        const formData = new FormData()
        formData.append('RoomNumber',formValues.roomNumber)
        formData.append('FLoorId',floorId)
        try {
            const data = await roomService.add(formData)
            roomsSetter(state => [...state,data.room])
        }catch(error) {
            console.log(error)
            toastSetter('An error occured, please try again later')
        }
        modalSetter(false)
        
    }

    const onAddFloor = async () => {
        const formData = new FormData()
        formData.append('HotelId',String(params.id)) 
        formData.append('FloorNumber',String(floors.length + 1))
        try {
            const data = await floorService.add(formData)
            floorSetter(state => [...state,{floorNumber:  data.currentFloor.floorNumber,id: data.currentFloor.id}]) 
            floorModalSetter(false)
        } catch (error) {
            toastSetter('An error occured while adding a floor, please try again later')
        } 
    }


    return {
        onAddRoomClick,
        onAddRoomHandler,
        onAddFloor
    }

} 