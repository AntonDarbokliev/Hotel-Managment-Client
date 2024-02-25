import { useEffect, useState } from "react"
import { Dropdown } from "../../Shared/Dropdown/Dropdown"
import styles from './Rooms.module.scss'
import { Button } from "../../Shared/Button/Button"
import { Modal } from "../../Shared/Modal/Modal"
import { InputField } from "../../Shared/InputField/InputField"
import { ToastNotification } from "../../Shared/ToastNotification/ToastNotification"
import { useForm } from "../../../hooks/useForm"
import { useRooms } from "./RoomsHook"
import { RoomsList } from "./RoomsList/RoomsList"
import { floorServiceFactory } from "../../../services/floors"
import { useParams } from "react-router-dom"
import { roomServiceFactory } from "../../../services/room"

export const Rooms = () => {
    
        const [rooms,setRooms ] = useState<{roomNumber: number,floorId: string}[]>([])
        const [roomModal,setRoomModal] = useState(false)
        const [floorModal, setFloorModal] = useState(false)
        const [toastText, setToastText] = useState('')
        const [floors, setFloors ] = useState<{floorNumber:number,id:string }[]>([]) 

        const floorService = floorServiceFactory()
        const roomService = roomServiceFactory()

        const params = useParams()

        useEffect(() => {
            floorService.get(String(params.id))
            .then( data => setFloors(data.floors))
            .catch(err => console.error(err))
        },[])
    
        const {formValues,onChangeHandler} = useForm({
        floorValue: '',
        roomValue: '',
        roomNumber: '',
    },() => {})

    useEffect (() => {
        if(formValues.floorValue == ''){
            setRooms([])
            return;
        }
            const floorId = floors.find(x => String(x.floorNumber) == formValues.floorValue)?.id
            if(floorId){
                roomService.get(floorId)
                .then(data => setRooms(data.rooms))
            }
    },[formValues.floorValue])

    const {
        onAddRoomClick,
        onAddRoomHandler,
        onAddFloor
    } = useRooms(setRoomModal,formValues,setToastText,setRooms,setFloors,floors,setFloorModal)

    return (
        <>
            {roomModal && 
            <Modal stateSetter={setRoomModal} title="Add a Room">
                <form action="" className={styles["room-modal-form"]}>
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

            { floorModal && 
                <Modal stateSetter={setFloorModal} title="Are you sure you want to add a Floor?">
                    <div className={styles["floor-modal-buttons"]}>
                    <Button width="8rem" onClick={onAddFloor}>Yes</Button>
                    <Button width="8rem" onClick={() => setFloorModal(false)}>Cancel</Button>
                    </div>
                </Modal>
            }

            { toastText !== ''  && 
                <ToastNotification text={toastText} timer={3000} setText={setToastText}></ToastNotification>
            }

        <div className={styles["rooms"]}>
            <h1>Rooms</h1>
            <div className={styles["dropdowns"]}>
                <Dropdown onChange={onChangeHandler} name="floorValue" value={formValues.floorValue} options={floors}>Floor</Dropdown>
                {/* <Dropdown onChange={onChangeHandler} name="roomValue" value={formValues.roomValue} options={roomTestOptions}>Room</Dropdown> */}
                {/* DONT REMOVE YET */}
            </div>
            {rooms && 
                <RoomsList rooms={rooms}/>
            }
            <div className={styles["buttons"]}>
                <Button width="90%" onClick={() => setFloorModal(true)}>Add a Floor</Button>
                <Button width="90%" onClick={onAddRoomClick}>Add a Room</Button>
            </div>
        </div>
        </>
    )
}   