import { useState } from "react"
import { Dropdown } from "../../Shared/Dropdown/Dropdown"
import styles from './Rooms.module.scss'
import { Button } from "../../Shared/Button/Button"
import { Modal } from "../../Shared/Modal/Modal"
import { InputField } from "../../Shared/InputField/InputField"
import { ToastNotification } from "../../Shared/ToastNotification/ToastNotification"
import { useRooms } from "./RoomsHook"
import { RoomsList } from "./RoomsList/RoomsList"
import Spinner from "../../Shared/LoadSpinner/LoadSpinner"
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSetRooms } from "../../../hooks/Rooms/useSetRooms"
import { useAddRoom } from "../../../hooks/Rooms/useAddRoom"
import { useForm } from "../../../hooks/useForm"
import { useSetFloors } from "../../../hooks/Floors/useSetFloors"
import { useAddFloor } from "../../../hooks/Floors/useAddFloor"
import { Floor } from "../../../types/FloorType"
import { useDeleteFloor } from "../../../hooks/Floors/useDeleteFloor"

import { AnimatePresence} from 'framer-motion'

export const Rooms = () => {
    
    const [roomModal,setRoomModal] = useState(false)
    const [floorModal, setFloorModal] = useState(false)
    const [deleteFloorModal, setDeleteFloorModal] = useState(false)
    const [toastText, setToastText] = useState('')

    const {formValues,onChangeHandler} = useForm({
        floorValue: '',
        roomNumber: '',
        },() => {})

    const onAddFail = () => {setToastText('An error occured, please try again later')}
    const afterAdd = () => {setRoomModal(false)}
    
    const { floors,floor,setFloors } = useSetFloors(formValues)
    const {noRoomsFound,rooms,setRooms} = useSetRooms(floors,formValues) 
    const {addRoom} = useAddRoom(setRooms,onAddFail,afterAdd)

    const onAddFloorSuccess = (data:Floor) => {
        setFloors((state) => [...state,data])
        setFloorModal(false)
    }
    const onAddFloorFail = () => {setToastText('An error occured while adding a floor, please try again later')}
    const {onAddFloor} = useAddFloor(floors.length + 1,onAddFloorSuccess,onAddFloorFail)

    const onDeleteFloorSuccess = () => {
        setFloors(state => state.filter(x => x.id !== floor!.id))
        setDeleteFloorModal(false)
    }
    const onDeleteFloorFail = () => {setToastText('An error occured while removing this floor, please try again later')}
    const { deleteFloor } = useDeleteFloor(floor.id,onDeleteFloorSuccess,onDeleteFloorFail)

    const {
        onAddRoomClick,
    } = useRooms(setRoomModal,formValues,setToastText)

    
    return (
        <>
        <AnimatePresence>
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
                    <Button width="12rem" disable={formValues.roomNumber == ''} onClick={(event) => addRoom(event!,floor!.id,formValues.roomNumber)}>Add Room</Button>
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

            {deleteFloorModal && 
                <Modal title="Are you sure you want to delete this Floor?" stateSetter={setDeleteFloorModal}>
                    <p className={styles["delete-warning"]} >This will delete the current floor, along with all the rooms inside it.</p>
                    <Button width="8rem" onClick={deleteFloor}>Yes</Button>
                    <br />
                    <Button width="8rem" onClick={() => setDeleteFloorModal(false)}>Cancel</Button>
                </Modal>
            }

            { toastText !== ''  && 
                <ToastNotification text={toastText} timer={3000} setText={setToastText}></ToastNotification>
            }
    </AnimatePresence>

        <div className={styles["rooms"]}>
            <h1>Rooms</h1>
            <div className={styles["dropdowns"]}>
                <Dropdown onChange={onChangeHandler} name="floorValue" value={formValues.floorValue} options={floors}>Floor</Dropdown>
                {formValues.floorValue !== '' && 
                <Button onClick={() => setDeleteFloorModal(true)}>
                    <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                </Button>}
            </div>


            { rooms.length > 0 && 
                <RoomsList rooms={rooms}/>
            }

            { rooms.length == 0 && !noRoomsFound && formValues.floorValue != '' && 
            <Spinner/>
            }

            { formValues.floorValue == '' &&
                <p>Select a floor to view rooms</p>
            }

            {noRoomsFound && 
                <p>No rooms added yet</p>
            }
            <div className={styles["buttons"]}>
                <Button width="90%" onClick={() => setFloorModal(true)}>Add a Floor</Button>
                <Button width="90%" onClick={onAddRoomClick}>Add a Room</Button>
            </div>
        </div>
    </>

    )
}   