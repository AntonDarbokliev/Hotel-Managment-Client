import { useEffect, useState } from "react"
import { Button } from "../Shared/Button/Button"
import styles from './HotelsHome.module.scss'
import { HotelsHomeCard } from "./HotelsHomeCard/HotelsHomeCard"
import { hotelServiceFactory } from "../../services/hotel"
import { Hotel } from "../../types/HotelTypes"
import { useLoading } from "../../hooks/useLoading"
import Spinner from "../Shared/LoadSpinner/LoadSpinner"
const hotelService = hotelServiceFactory()

export const HotelsHome = () => {
    const [hotels, setHotels ] = useState<Hotel[]>([])

    const {isLoading,requestWithLoading } = useLoading()

    useEffect(() => {
        requestWithLoading(() => hotelService.getAll().then( data => setHotels(data)))
           
    },[])

    return (
        <>
        <div className={styles["container"]}>
            <div className={styles["hotels-home"]}>

                <div className={styles["button-wrapper"]}>
                    <p>You have more hotels?</p>
                    <Button >Add a Hotel</Button>
                </div>

                <div className={styles["hotels-list"]}>
                    {!isLoading &&
                    <>
                    {hotels.map((hotel) =><HotelsHomeCard key={hotel.id} hotel={hotel}/>)}
                    </>
                    }

                </div>
                    {isLoading && 
                    <Spinner></Spinner>
                    }
            </div> 
        </div>

        </>
    )
}