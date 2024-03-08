import { memo } from "react";
import { RoomItem } from "../RoomItem/RoomItem"
import styles from './RoomsList.module.scss';

interface Props {
    rooms: {id:string,roomNumber:number}[]
}

export const RoomsList:React.FC<Props> = memo(({rooms}) => {
    return (
        <div className={styles["rooms-list"]}>
            {rooms.map(room => <RoomItem id={room.id} key={room.roomNumber} number={room.roomNumber}/>)}    
        </div>
    )
})