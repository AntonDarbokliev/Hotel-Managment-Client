import { memo } from "react";
import { RoomItem } from "../RoomItem/RoomItem"
import styles from './RoomsList.module.scss';

interface Props {
    rooms: {floorId:string,roomNumber:number}[]
}

export const RoomsList:React.FC<Props> = memo(({rooms}) => {
    return (
        <div className={styles["rooms-list"]}>
            {rooms.map(room => <RoomItem key={room.roomNumber} number={room.roomNumber}/>)}    
        </div>
    )
})