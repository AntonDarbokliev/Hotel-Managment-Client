import { useEffect, useState } from "react"
import { reserveServiceFactory } from "../../../services/reservation"
import { useParams } from "react-router-dom"
import { useLoading } from "../../../hooks/useLoading"
import { ReceivedRoomReservation } from "../../../types/ReceivedRoomReservation"
import Spinner from "../../Shared/LoadSpinner/LoadSpinner"

const reservationService = reserveServiceFactory()

export const ReservationDetails = () => {
    const params = useParams()
    const {isLoading,requestWithLoading} = useLoading()
    const [reservation,setReservation] = useState<ReceivedRoomReservation>()

    useEffect(() => {
        requestWithLoading(() => reservationService.getOne(params.reservationId!))
        .then(data => setReservation(data.reservation))
        .then( () => console.log(reservation))
    },[])

    return (
        <>
        {isLoading && 
            <Spinner></Spinner>
        }

        {!isLoading && reservation !== undefined &&
        <>
            <h1>{reservation!.guest.firstName} {reservation!.guest.lastName}</h1>
        </> 
        }
        </>
    )
} 