import { useEffect, useState } from "react";
import { roomServiceFactory } from "../../services/room";
import { extractErrors } from "../../utils/extractErrors";
import { ErrorObj } from "../../types/ErrorTypes";
import { useToastStore } from "../../stores/ToastStore";
import { Floor } from "../../types/FloorType";

export const useRooms = (floors: Floor[],floorValue:string ) => {
    const [rooms,setRooms ] = useState<{roomNumber: number,id: string}[]>([])
    const toastSetter = useToastStore(s => s.setToastText)   

    const roomService = roomServiceFactory()

    useEffect (() => {
        setRooms([])
        if(floorValue == ''){
            return;
        }
            const floorId = floors.find(x => String(x.floorNumber) == floorValue)?.id
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
    },[floorValue])

    
    return {
        rooms,
        setRooms
    }
}