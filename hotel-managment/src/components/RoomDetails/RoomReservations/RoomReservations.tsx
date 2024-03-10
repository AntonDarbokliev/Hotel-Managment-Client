import styles from './RoomReservations.module.scss'
import { Button } from "../../Shared/Button/Button"
import { useState } from 'react'
import { RoomReservationModal } from './RoomReservationModal/RoomReservationModal'
import { Calendar } from '../../Shared/Calendar/Calendar'
import { useCalendarData } from '../../../hooks/Calendar/useCalendarData'


export const RoomReservartions = () => {
    const [ reserveModal, setReserveModal ] = useState(false)
    
    const calendarData = useCalendarData()
   
    return (
        <div className={styles["container"]}>
            {reserveModal && 
                <RoomReservationModal date={{...calendarData}} modalSetter={setReserveModal}/>
            }

            <Calendar {...calendarData} />
            {!isNaN(calendarData.from) && !isNaN(calendarData.to) && 
                <Button onClick={() => setReserveModal(true)}>Make a Reservation</Button>
            }

            {isNaN(calendarData.from) || isNaN(calendarData.to)  && 
                <p>Select two dates</p>
            }
            
        </div>
    )
}