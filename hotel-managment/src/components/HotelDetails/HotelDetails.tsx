import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { hotelServiceFactory } from "../../services/hotel"
import { Hotel } from "../../types/HotelTypes"
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
        <h1>Details</h1>
        <p>{hotel.name}</p>
        </>
    )
}