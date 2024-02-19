import styles  from './HotelDetails.module.scss'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { hotelServiceFactory } from "../../services/hotel"
import { Hotel } from "../../types/HotelTypes"
import { TabButton } from './TabButton/TabButton'
const hotelService = hotelServiceFactory()

export const HotelDetails = () => {
    const [hotel,setHotel] = useState<Hotel | null>(null)
    const {id} = useParams()

    useEffect(() => {
        hotelService.getSingle(id!)
        .then(data => setHotel(data))
        .catch(err => console.error(err))
    },[id])

    if(!hotel) {
        return(
            <h1>Loading Hotel...</h1>
        )
    }

    return (
        <>
        <div className={styles['container']}>
                <h1>Control your hotel</h1>
            <div className={styles["details"]}>
                <div className={styles["tabs"]}>
                        <TabButton>Rooms</TabButton>
                        <TabButton>Employees</TabButton>
                </div>
                <div className={styles["tab-content"]}>
                    <p>Content goes here</p>
                </div>
            </div>
        </div>
        </>
    )
}