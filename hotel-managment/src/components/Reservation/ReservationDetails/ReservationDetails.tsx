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
            <InfoField height="60%" width="50%">
                <ul className={styles["info-list"]}>

                    <FontAwesomeIcon className={`${styles["icon"]} ${styles['full-width']}`} size="2x"  icon={faCircleInfo}/>

                    <li> <FontAwesomeIcon icon={faCalendarDays}/> From: {reservation.from}</li>
                    <li> <FontAwesomeIcon icon={faCalendarDays}/> To: {reservation.to}</li>
                    <li>ID: {reservation.id}</li>

                    <FontAwesomeIcon className={`${styles["icon"]} ${styles['full-width']}`} size="3x"  icon={faUser}/>

                    <li> <FontAwesomeIcon icon={faIdCard}/> Name: {reservation.guest.firstName} {reservation.guest.lastName}</li>
                    <li> <FontAwesomeIcon icon={faIdCard}/> EGN: {reservation.guest.egn}</li>
                    <li> <FontAwesomeIcon icon={faIdCard}/> IDN: {reservation.guest.identityDocumentNumber}</li>
                    <li> <FontAwesomeIcon icon={faMarsAndVenus}/> Gender: {reservation.guest.gender}</li>
                    <li> <FontAwesomeIcon icon={faEarthAmericas}/> Country: {reservation.guest.country}</li>
                    {reservation.guest.emailAddress && 
                    <li>Email: {reservation.guest.emailAddress}</li>
                    }
                    <li> <FontAwesomeIcon icon={faLocationDot}/> Address: {reservation.guest.address}</li>
                    <li> <FontAwesomeIcon icon={faDollarSign}/> Total: {reservation.totalPrice}</li>

                    {reservation.additionalInformation && 
                    <>
                        <h2>Additional Information</h2>
                        <li>{reservation.additionalInformation}</li>
                    </>
                    }
                </ul>
            </InfoField>
        </div>
        }
        </>
    )
} 