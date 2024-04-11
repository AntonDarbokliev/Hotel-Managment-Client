import { Button } from "../Shared/Button/Button"
import styles from './HotelsHome.module.scss'
import { useNavigate } from "react-router-dom"
import { useHotels } from "../../hooks/Hotels/useHotels"
import { HotelsList } from "./HotelsList/HotelsList"

export const HotelsHome = () => {

    const navigate = useNavigate()
    const {hotels,isLoading } = useHotels()

    return (
        <>
        <div className={styles["container"]}>
            <div className={styles["hotels-home"]}>

                <div className={styles["button-wrapper"]}>
                    <p>You have more hotels?</p>
                    <Button onClick={() => navigate('/add')}>Add a Hotel</Button>
                </div>
                  
                <HotelsList isLoading={isLoading} hotels={hotels}/>
                  
            </div> 
        </div>

        </>
    )
}