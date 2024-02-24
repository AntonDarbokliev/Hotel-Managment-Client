import { useState } from "react"
import { Dropdown } from "../../Shared/Dropdown/Dropdown"
import { RoomItem } from "./RoomItem/RoomItem"
import styles from './Rooms.module.scss'
import { Button } from "../../Shared/Button/Button"
import { Modal } from "../../Shared/Modal/Modal"
import { InputField } from "../../Shared/InputField/InputField"
import { ToastNotification } from "../../Shared/ToastNotification/ToastNotification"
import { useForm } from "../../../hooks/useForm"
import { useParams } from "react-router-dom"
import { roomServiceFactory } from "../../../services/room"

export const Rooms = () => {
    const floorTestOptions = [1,2,3,4]

    const roomTestOptions = [101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102
        ,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102
        ,103,104,105,106,107101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102
        ,103,104,105,106,107101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102,103,104,105,106,107,101,102
        ,103,104,105,106,107]
    
        const [rooms,setRooms ] = useState(roomTestOptions)
        const [roomModal,setRoomModal] = useState(false)
        const [toastText, setToastText] = useState('')

        const params = useParams()
        const roomService = roomServiceFactory()
    
        const {formValues,onChangeHandler} = useForm({
        floorValue: '',
        roomValue: '',
        roomNumber: '',
    },() => {})

    const onAddRoomClick = () => {
        if(formValues.floorValue !== ''){
            setRoomModal(true)
        }else {
            setToastText('Plase select a Floor before adding a Room')
            setRoomModal(false)
        }
    }

    const onAddRoomHandler = async (e:React.MouseEvent) => {
        e.preventDefault()
        console.log('Room Number: ',formValues.roomNumber)
        const hotelId = params.id
        const formData = new FormData()
        formData.append('RoomNumber',formValues.roomNumber)
        formData.append('Floor',formValues.floorValue)
        formData.append('HotelId',String(hotelId))
        try {
            await roomService.add(formData)
        }catch(error) {
            console.log(error)
            setToastText('An error occured, please try again later')
        }
        setRoomModal(false)
        
    }

    return (
        <>
            {roomModal && 
            <Modal stateSetter={setRoomModal} title="Add a Room">
                <form action="">
                    <InputField type="number" 
                    name="roomNumber" 
                    value={formValues.roomNumber}
                    onChange={onChangeHandler}
                    >Room Number</InputField>
                    <p>Floor: {formValues.floorValue}</p>
                    <br />
                    <Button width="12rem" disable={formValues.roomNumber == ''} onClick={(event) => onAddRoomHandler(event!)}>Add Room</Button>
                </form>
            </Modal>
            }

            { toastText !== ''  && 
                <ToastNotification text={toastText} timer={3000} setText={setToastText}></ToastNotification>
            }

        <div className={styles["rooms"]}>
            <h1>Rooms</h1>
            <div className={styles["dropdowns"]}>
                <Dropdown onChange={onChangeHandler} name="floorValue" value={formValues.floorValue} options={floorTestOptions}>Floor</Dropdown>
                {/* <Dropdown onChange={onChangeHandler} name="roomValue" value={formValues.roomValue} options={roomTestOptions}>Room</Dropdown> */}
                {/* DONT REMOVE YET */}
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