import styles  from './HotelDetails.module.scss'
import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import { hotelServiceFactory } from "../../services/hotel"
import { TabButton } from './TabButton/TabButton'
import { useLoading } from '../../hooks/useLoading'
import Spinner from '../Shared/LoadSpinner/LoadSpinner'
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

    return (
        <>
        <div className={styles['container']}>
            {!isLoading && 
            <>
                <h1>Control your hotel</h1>
            <div className={styles["details"]}>
                <div className={styles["tabs"]}>
                        <TabButton>Rooms</TabButton>
                        <TabButton>Employees</TabButton>
                </div>
                <div className={styles["tab-content"]}>
                    <Outlet/>
                </div>
            </div>
            </>
            }

            {isLoading && 
                <Spinner/>
            }

        </div>
        </>
    )
}