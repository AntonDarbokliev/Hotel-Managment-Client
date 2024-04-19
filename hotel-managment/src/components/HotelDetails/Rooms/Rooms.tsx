import { useState } from "react"
import { Dropdown } from "../../Shared/Dropdown/Dropdown"
import styles from './Rooms.module.scss'
import { Button } from "../../Shared/Button/Button"

import { RoomsList } from "./RoomsList/RoomsList"
import Spinner from "../../Shared/LoadSpinner/LoadSpinner"
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useRooms } from "../../../hooks/Rooms/useRooms"
import { useForm } from "../../../hooks/useForm"
import { useFloors } from "../../../hooks/Floors/useFloors"

import { AnimatePresence} from 'framer-motion'
import { useToastStore } from "../../../stores/ToastStore"
import { RoomModal } from "./modals/RoomModal/RoomModal"
import { FloorModal } from "./modals/FloorModal/FloorModal"
import { DeleteModal } from "./modals/DeleteModal/DeleteModal"
import { SearchBar } from "../../Shared/SearchBar/SearchBar"
import { useSearchInRooms } from "../../../hooks/Rooms/useSearchInRooms"

export const Rooms = () => {
    
    const [roomModal,setRoomModal] = useState(false)
    const [floorModal, setFloorModal] = useState(false)
    const [deleteFloorModal, setDeleteFloorModal] = useState(false)
    const setToastText = useToastStore(s => s.setToastText)
    const [searchValue, setSearchValue] = useState('')


    const {formValues,onChangeHandler} = useForm({
        floorValue: '',
        },() => {})

    const { floors,floor,setFloors } = useFloors(formValues)
    const {rooms,setRooms} = useRooms(floors,formValues.floorValue) 

    const onAddRoomClick = () => {
        if(formValues.floorValue !== ''){
            setRoomModal(true)
        }else {
            setToastText('Plase select a Floor before adding a Room')
            setRoomModal(false)
        }
    }
    const {searchedRooms} = useSearchInRooms(searchValue,rooms)


    
    return (
        <>
        <AnimatePresence>
            {roomModal && 
                <RoomModal key={'room-modal'} floor={floor} modalSetter={setRoomModal} roomsSetter={setRooms}/>
            }

            { floorModal && 
               <FloorModal key={'floor-modal'} floorSetter={setFloors} modalSetter={setFloorModal} totalFloors={floors.length}/>
            }

            {deleteFloorModal && 
              <DeleteModal floorId={floor.id} floorsSetter={setFloors} modalSetter={setDeleteFloorModal} />

            }

        </AnimatePresence>

            
        <div className={styles["rooms"]}>
            <h1>Rooms</h1>
            <div className={styles["dropdowns"]}>
                <Dropdown onChange={onChangeHandler} name="floorValue" value={formValues.floorValue}>
                    <option value=''>Select a Floor</option>
                    {floors.map(floor => <option key={floor.id}>{floor.floorNumber}</option>) }
                </Dropdown>
                <SearchBar searchText={searchValue} setSearchText={setSearchValue}/>
            </div>
                {formValues.floorValue !== '' && 
                 <Button width="2.3rem" onClick={() => setDeleteFloorModal(true)}>
                    <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                </Button>}

            { rooms.length > 0 && 
                <RoomsList rooms={searchedRooms && searchedRooms?.length > 0 ? searchedRooms :rooms}/>
            }

            { rooms.length == 0 && formValues.floorValue != '' && 
            <Spinner/>
            }

            { formValues.floorValue == '' &&
                <p>Select a floor to view rooms</p>
            }

            <div className={styles["buttons"]}>
                <Button width="90%" onClick={() => setFloorModal(true)}>Add a Floor</Button>
                <Button width="90%" onClick={onAddRoomClick}>Add a Room</Button>
            </div>
        </div>

    </>

    )
}   