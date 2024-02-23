import { useState } from "react"
import { Dropdown } from "../../Shared/Dropdown/Dropdown"
import { RoomItem } from "./RoomItem/RoomItem"
import styles from './Rooms.module.scss'
import { Button } from "../../Shared/Button/Button"
import { Modal } from "../../Shared/Modal/Modal"
import { InputField } from "../../Shared/InputField/InputField"
import { ToastNotification } from "../../Shared/ToastNotification/ToastNotification"
import { useForm } from "../../../hooks/useForm"

export const Rooms = () => {
    const floorTestOptions = [1,2,3,4]

    const roomTestOptions = [101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102
        ,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102
        ,103,104,105,106,107101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102
        ,103,104,105,106,107101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102
        ,103,104,105,106,107]

    const [rooms,setRooms ] = useState(roomTestOptions)
    const [roomModal,setRoomModal] = useState(false)
    const [isFloorSelected, setIsFloorSelected] = useState(true)

    const {formValues,onChangeHandler} = useForm({
        floorValue: '',
        roomValue: ''
    },() => {})

    const onAddRoomClick = () => {
        if(formValues.floorValue !== ''){
            setIsFloorSelected(true)
            setRoomModal(true)
        }else {
            setIsFloorSelected(false)
            setTimeout(() => setIsFloorSelected(true),3000)
            setRoomModal(false)
        }
    }

    return (
        <>
            {roomModal && 
            <Modal stateSetter={setRoomModal} title="Add a Room">
                <form action="">
                    <InputField type="number" name="roomNumber" onChange={() => {}}>Room Number</InputField>
                    <p>Floor: {formValues.floorValue}</p>
                    <Button>Add Room</Button>
                </form>
            </Modal>
            }

            { !isFloorSelected  && 
                <ToastNotification text="Please select a floor before adding a room"></ToastNotification>
            }
        <div className={styles["rooms"]}>
            <h1>Rooms</h1>
            <div className={styles["dropdowns"]}>
                <Dropdown onChange={onChangeHandler} name="floorValue" value={formValues.floorValue} options={floorTestOptions}>Floor</Dropdown>
                <Dropdown onChange={onChangeHandler} name="roomValue" value={formValues.roomValue} options={roomTestOptions}>Room</Dropdown>
            </div>
            {rooms && 
                <div className={styles["rooms-list"]}>
                    {rooms.map(room => <RoomItem key={room} number={room}/>)}    
            </div>
            }
            <div className={styles["buttons"]}>
                <Button width="90%">Add a Floor</Button>
                <Button width="90%" onClick={onAddRoomClick}>Add a Room</Button>
            </div>
        </div>
        </>
    )
}   