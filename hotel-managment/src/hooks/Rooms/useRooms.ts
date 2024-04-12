import { useEffect, useState } from "react";
import { roomServiceFactory } from "../../services/room";
import { FormValues } from "../../types/FormValues";
import { extractErrors } from "../../utils/extractErrors";
import { ErrorObj } from "../../types/ErrorTypes";
import { useToastStore } from "../../stores/ToastStore";

export const useRooms = (floors: {floorNumber:number,id:string }[],formValues:FormValues ) => {
    const [rooms,setRooms ] = useState<{roomNumber: number,id: string}[]>([])
    const toastSetter = useToastStore(s => s.setToastText)
    // const [noRoomsFound, setNoRoomsFound] = useState(false)

   

    const roomService = roomServiceFactory()

    useEffect (() => {
        setRooms([])
        if(formValues.floorValue == ''){
            return;
        }
            const floorId = floors.find(x => String(x.floorNumber) == formValues.floorValue)?.id
            if(floorId){
                roomService.get(floorId)
                .then(data => {
                    setRooms(data.rooms)
                })
                .catch(err => {
                    const errorTxt = extractErrors(err as ErrorObj)
                    toastSetter(errorTxt)
                })
            }
    },[formValues.floorValue])

    
    return {
        rooms,
        setRooms
    }
}