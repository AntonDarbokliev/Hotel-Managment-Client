import { useParams } from "react-router-dom"
import { reserveServiceFactory } from "../../services/reservation"
import { useEffect, useState } from "react"
import { useLoading } from "../useLoading"
import { RoomReservation } from "../../types/RoomReservation"

const reserveService = reserveServiceFactory()

export const useReservations = () => {

    const [reservations, setReservations ] = useState<RoomReservation[]>([])
    const roomId = useParams().id!
    const {isLoading,requestWithLoading} = useLoading()
  
        useEffect(() => {
       
            requestWithLoading(() => reserveService.getAll(roomId))
            .then(data => setReservations(data.bookedDates))
           
        },[])

        return {
            reservations,
            isLoading,
            setReservations
        }
}