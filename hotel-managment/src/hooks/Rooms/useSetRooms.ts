import { useEffect, useState } from "react";
import { roomServiceFactory } from "../../services/room";
import { FormValues } from "../../types/FormValues";
import { SentRoom } from "../../types/SentRoom";

export const useSetRooms = (floors: {floorNumber:number,id:string }[],formValues:FormValues ) => {
    const [rooms,setRooms ] = useState<SentRoom[]>([])
    const [noRoomsFound, setNoRoomsFound] = useState(false)

   

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
                    if(data.rooms.length === 0 ){
                        setNoRoomsFound(true)
                    }else {
                        setNoRoomsFound(false)
                    }
                })
            }
    },[formValues.floorValue])

    
    return {
        rooms,
        noRoomsFound,
        formValues,
        setRooms
    }
}