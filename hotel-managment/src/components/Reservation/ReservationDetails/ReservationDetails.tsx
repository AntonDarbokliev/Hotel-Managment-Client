import { useEffect, useState } from "react"
import { reserveServiceFactory } from "../../../services/reservation"
import { useParams } from "react-router-dom"
import { useLoading } from "../../../hooks/useLoading"
import { ReceivedRoomReservation } from "../../../types/ReceivedRoomReservation"
import Spinner from "../../Shared/LoadSpinner/LoadSpinner"
import styles from './ReservationDetails.module.scss'
import { InfoField } from "../../Shared/InfoField/InfoField"
import 
{
    faUser,
    faCircleInfo,
    faCalendarDays,
    faEarthAmericas,
    faLocationDot,
    faMarsAndVenus,
    faIdCard,
    faDollarSign
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const reservationService = reserveServiceFactory()

export const ReservationDetails = () => {
    const params = useParams()
    const {isLoading,requestWithLoading} = useLoading()
    const [reservation,setReservation] = useState<ReceivedRoomReservation>()

    useEffect(() => {
        requestWithLoading(() => reservationService.getOne(params.reservationId!))
        .then(data => setReservation(data.reservation))
    },[])

    return (
        <>
        {isLoading && 
            <Spinner></Spinner>
        }

        {!isLoading && reservation &&
        <div className={styles["container"]}>
            <InfoField>
                <div className={styles["info-div"]}>

                    <FontAwesomeIcon className={`${styles["icon"]} ${styles['full-width']}`} size="2x"  icon={faCircleInfo}/>

                    <p> <FontAwesomeIcon icon={faCalendarDays}/> From: {reservation.from}</p>
                    <p> <FontAwesomeIcon icon={faCalendarDays}/> To: {reservation.to}</p>
                    <p>ID: {reservation.id}</p>

                    <FontAwesomeIcon className={`${styles["icon"]} ${styles['full-width']}`} size="3x"  icon={faUser}/>

                    <p> <FontAwesomeIcon icon={faIdCard}/> Name: {reservation.guest.firstName} {reservation.guest.lastName}</p>
                    <p> <FontAwesomeIcon icon={faIdCard}/> EGN: {reservation.guest.egn}</p>
                    <p> <FontAwesomeIcon icon={faIdCard}/> IDN: {reservation.guest.identityDocumentNumber}</p>
                    <p> <FontAwesomeIcon icon={faMarsAndVenus}/> Gender: {reservation.guest.gender}</p>
                    <p> <FontAwesomeIcon icon={faEarthAmericas}/> Country: {reservation.guest.country}</p>
                    {reservation.guest.emailAddress && 
                    <p>Email: {reservation.guest.emailAddress}</p>
                    }
                    <p> <FontAwesomeIcon icon={faLocationDot}/> Address: {reservation.guest.address}</p>
                    <p> <FontAwesomeIcon icon={faDollarSign}/> Total: {reservation.totalPrice}</p>

                    {reservation.additionalInformation && 
                    <>
                        <h2>Additional Information</h2>
                        <p>{reservation.additionalInformation}</p>
                    </>
                    }
                </div>
            </InfoField>
        </div>
        }
        </>
    )
} 