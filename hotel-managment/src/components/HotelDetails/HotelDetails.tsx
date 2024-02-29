import { useEffect } from "react"
import {  useParams } from "react-router-dom"
import { hotelServiceFactory } from "../../services/hotel"
import { useLoading } from '../../hooks/useLoading'
import { Details } from '../Shared/Details/Details'
const hotelService = hotelServiceFactory()

export const HotelDetails = () => {
    const {id} = useParams()

    const {isLoading,requestWithLoading } = useLoading()

    useEffect(() => {
        requestWithLoading( () =>
        hotelService.getSingle(id!)
        .catch(err => console.error(err))
        )
    },[id])

    const tabs = ['Rooms', 'Employees']

    return (
        <>
        <Details isLoading={isLoading} title='Control your hotel' tabs={tabs}/>
        </>
    )
}