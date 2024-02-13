import { Button } from "../Shared/Button/Button"
import styles from './HotelsHome.module.scss'

export const HotelsHome = () => {
    
    return (
        <>
        <div className={styles["container"]}>
            <div className={styles["hotels-home"]}>

                <div className={styles["button-wrapper"]}>
                    <p>You have more hotels?</p>
                    <Button>Add a Hotel</Button>
                </div>

                <div className={styles["hotels-list"]}>
                    <li>Hotel Cards Here</li>
                </div>
            </div> 
        </div>

        </>
    )
}