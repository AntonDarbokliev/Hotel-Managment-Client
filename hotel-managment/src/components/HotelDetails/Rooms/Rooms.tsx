import { useState } from "react"
import { Dropdown } from "../../Shared/Dropdown/Dropdown"
import { RoomItem } from "./RoomItem/RoomItem"
import styles from './Rooms.module.scss'
import { Button } from "../../Shared/Button/Button"

export const Rooms = () => {
    const floorTestOptions = [1,2,3,4]

    const roomTestOptions = [101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107]

    const [rooms,setRooms ] = useState(roomTestOptions)

    return (
        <>
        <div className={styles["rooms"]}>
            <h1>Rooms</h1>
            <div className={styles["dropdowns"]}>
                <Dropdown options={floorTestOptions}>Floor</Dropdown>
                <Dropdown options={roomTestOptions}>Room</Dropdown>
            </div>
            {rooms && 
                <div className={styles["rooms-list"]}>
                    {rooms.map(room => <RoomItem key={room} number={room}/>)}    
            </div>
            }
            <div className={styles["buttons"]}>
                <Button width="90%">Add a Floor</Button>
                <Button width="90%">Add a Room</Button>
            </div>
        </div>
        </>
    )
}