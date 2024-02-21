import { useState } from "react"
import { Dropdown } from "../../Shared/Dropdown/Dropdown"
import { RoomItem } from "./RoomItem/RoomItem"
import styles from './Rooms.module.scss'
import { Button } from "../../Shared/Button/Button"
import { Modal } from "../../Shared/Modal/Modal"
import { InputField } from "../../Shared/InputField/InputField"

export const Rooms = () => {
    const floorTestOptions = [1,2,3,4]

    const roomTestOptions = [101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107]

    const [rooms,setRooms ] = useState(roomTestOptions)
    const [roomModal,setRoomModal] = useState(false)

    return (
        <>
            {roomModal && 
            <Modal stateSetter={setRoomModal} title="Add a Room">
                <form action="">
                    <InputField name="roomNumber" onChange={() => {}}>Room Number</InputField>
                    <p>Floor: 1</p>
                    <Button>Add Room</Button>
                </form>
            </Modal>
            }
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
                <Button width="90%" onClick={() => setRoomModal(true)}>Add a Room</Button>
            </div>
        </div>
        </>
    )
}