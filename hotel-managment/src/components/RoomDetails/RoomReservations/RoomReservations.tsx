import styles from './RoomReservations.module.scss'
import { Button } from "../../Shared/Button/Button"
import { useState } from 'react'
import { RoomReservationModal } from './RoomReservationModal/RoomReservationModal'
import { Calendar } from '../../Shared/Calendar/Calendar'
import { useCalendarData } from '../../../hooks/Calendar/useCalendarData'
import { AnimatePresence } from 'framer-motion'
import { useReservations } from '../../../hooks/Rooms/useReservations'
import Spinner from '../../Shared/LoadSpinner/LoadSpinner'



export const RoomReservartions = () => {
    const [ reserveModal, setReserveModal ] = useState(false)
    const {isLoading,reservations,setReservations} = useReservations()

    const calendarData = useCalendarData()
   
return (
        <div className={styles["container"]}>
            <AnimatePresence>
            {reserveModal && calendarData.from && calendarData.to && 
                <RoomReservationModal  date={{from: calendarData.from,to: calendarData.to}} modalSetter={setReserveModal}/>
            }
            </AnimatePresence>

            {!isLoading &&
            <>
                <Calendar reservations={reservations} {...calendarData} />
            </> 
            }
            {isLoading &&  
            <Spinner/>
              }

            
            {calendarData.from && calendarData.to && 
                <Button onClick={() => setReserveModal(true)}>Make a Reservation</Button>
            }
            
          
            { calendarData.from != undefined || calendarData.to != undefined  && 
                <p>Select two dates</p>
            }
            
        </div>
    )
}