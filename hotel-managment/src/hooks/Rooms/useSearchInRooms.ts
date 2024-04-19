import { useEffect, useState } from "react";
import { useSearchIn } from "../useSearchIn"
import { SentRoom } from "../../types/SentRoom";


export const useSearchInRooms = (searchValue: string,rooms: SentRoom[]) => {

    const [searchedRooms,setSearchedRooms] = useState<SentRoom[]>()

    const filterRooms = (room: {[key:string]: string}) => {
        const regex = new RegExp(`${searchValue}`, 'i');
        
        const doesMatch = regex?.test(String(room.roomNumber))
        
        return doesMatch

    }

    const {searchedArr} = useSearchIn(rooms,filterRooms,searchValue)
    useEffect(() => {
        if(searchValue == '') {
            setSearchedRooms([])
        }else {            
            setSearchedRooms(searchedArr)
        }
    },[searchedArr])

    return {
        searchedRooms
    }
}