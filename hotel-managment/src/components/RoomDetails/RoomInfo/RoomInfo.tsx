import { useEffect, useState } from "react"
import { roomServiceFactory } from "../../../services/room"
import { useParams } from "react-router-dom"
import { AmenityCard } from "./AmenityCard/AmenityCard"
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import {AnimatePresence} from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './RoomInfo.module.scss'
import { Button } from "../../Shared/Button/Button"
import { AmenityModal } from "./AmenityModal/AmenityModal"
import { useLoading } from "../../../hooks/useLoading"
import Spinner from "../../Shared/LoadSpinner/LoadSpinner"
import { Room } from "../../../types/RoomType"

export const RoomInfo = () => {
    const roomService = roomServiceFactory()
    const params = useParams()
    const [room,setRoom] = useState<Room>()
    const [amenityModal, setAmenityModal] = useState(false)

    const { requestWithLoading,isLoading } = useLoading()

    useEffect(() => {
        requestWithLoading(() => roomService.getSingle(params.id!).then((data: {room: Room}) => setRoom(data.room)))
    },[])

    return (
        <>
        <div className={styles["container"]}>

        <AnimatePresence>
        { amenityModal && 
            <AmenityModal currentAmenities={room!.roomExtras} roomSetter={setRoom} modalSetter={setAmenityModal}/>
        } 
        </AnimatePresence>

        {!isLoading && 
        
        <div className={styles["room-info"]}>

                <div className={styles["info"]}>
                    <FontAwesomeIcon icon={faCircleInfo} color="#4844bf"/>
                    <p>Floor: 1</p>
                    <p>Number: {room?.roomNumber}</p>
                    <p>Status: Free</p>
                    <p>Cleaned: Yes</p>

                </div>


                <h1>Amenities</h1>
                <div className={styles["amenities"]}>
                    {room?.roomExtras.map( extra => 
                    <AmenityCard key={extra.name} name={extra.name}/>
                    )}
                </div>
                <Button onClick={() => setAmenityModal(true)}>Add Amenities</Button>
                <br />
        </div>
    
        }

        {isLoading && 
        <Spinner/>
        }
        </div>
        </>

    )
}