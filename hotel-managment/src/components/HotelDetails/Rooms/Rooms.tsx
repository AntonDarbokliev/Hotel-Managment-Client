import { useState } from "react"
import { Dropdown } from "../../Shared/Dropdown/Dropdown"
import styles from './Rooms.module.scss'
import { Button } from "../../Shared/Button/Button"
import { useRooms } from "./RoomsHook"
import { RoomsList } from "./RoomsList/RoomsList"
import Spinner from "../../Shared/LoadSpinner/LoadSpinner"
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSetRooms } from "../../../hooks/Rooms/useSetRooms"
import { useForm } from "../../../hooks/useForm"
import { useSetFloors } from "../../../hooks/Floors/useSetFloors"

import { AnimatePresence} from 'framer-motion'
import { useToastStore } from "../../../stores/ToastStore"
import { AddRoomModal } from "./modals/AddRoomModal/AddRoomModal"
import { AddFloorModal } from "./modals/AddFloorModal/AddFloorModal"
import { DeleteFloorModal } from "./modals/DeleteFloorModal/DeleteFloorModal"

export const Rooms = () => {
    
    const [roomModal,setRoomModal] = useState(false)
    const [floorModal, setFloorModal] = useState(false)
    const [deleteFloorModal, setDeleteFloorModal] = useState(false)
    const setToastText = useToastStore(s => s.setToastText)


    const {formValues,onChangeHandler} = useForm({
        floorValue: '',
        },() => {})

    const { floors,floor,setFloors } = useSetFloors(formValues)
    const {noRoomsFound,rooms,setRooms} = useSetRooms(floors,formValues) 

    const {
        onAddRoomClick,
    } = useRooms(setRoomModal,formValues,setToastText)

    
    return (
        <>
        <AnimatePresence>
            {roomModal && 
                <AddRoomModal 
                key={'add-room-modal'} 
                floor={floor} 
                modalSetter={setRoomModal} 
                roomSetter={setRooms}/>
            }

            { floorModal && 
                <AddFloorModal key={'add-floor-modal'} 
                floors={floors} 
                floorsSetter={setFloors} 
                floorModalSetter={setFloorModal}/>
            }

            {deleteFloorModal && 
                <DeleteFloorModal deleteFloorModalSetter={setDeleteFloorModal} floor={floor} 
                floorsSetter={setFloors}/>
            }
            
        <div className={styles["rooms"]}>
            <h1>Rooms</h1>
            <div className={styles["dropdowns"]}>
                <Dropdown onChange={onChangeHandler} name="floorValue" value={formValues.floorValue}>
                    <option>Select a Floor</option>
                    {floors.map(floor => <option key={floor.id}>{floor.floorNumber}</option>) }
                </Dropdown>
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

            {/* {noRoomsFound && 
                <p>No rooms added yet</p>
            } */}
            <div className={styles["buttons"]}>
                <Button width="90%" onClick={() => setFloorModal(true)}>Add a Floor</Button>
                <Button width="90%" onClick={onAddRoomClick}>Add a Room</Button>
            </div>
        </div>
    </AnimatePresence>

    </>

    )
}   