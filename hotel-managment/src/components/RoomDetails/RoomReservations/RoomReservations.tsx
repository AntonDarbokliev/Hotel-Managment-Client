import styles from './RoomReservations.module.scss'
import { Button } from "../../Shared/Button/Button"
import { useState } from 'react'
import { RoomReservationModal } from './RoomReservationModal/RoomReservationModal'
import { Calendar } from '../../Shared/Calendar/Calendar'
import { useCalendarData } from '../../../hooks/Calendar/useCalendarData'
import { AnimatePresence } from 'framer-motion'



export const RoomReservartions = () => {
    const [ reserveModal, setReserveModal ] = useState(false)
    
    const calendarData = useCalendarData()
   
    return (
        <div className={styles["container"]}>
            <AnimatePresence>
            {reserveModal && 
                <RoomReservationModal date={{...calendarData}} modalSetter={setReserveModal}/>
            }
            </AnimatePresence>

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