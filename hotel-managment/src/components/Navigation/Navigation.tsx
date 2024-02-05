import { useState } from 'react';
import styles from './Navigation.module.scss';

export const Navigation = () => {

    const [isSideBarClosed,setIsSideBarClosed ] = useState(false)

    const CloseOpenNavigation = () => {
        setIsSideBarClosed(!isSideBarClosed)
    }

    return (
        <>
            <button className={`${styles["navigation-button"]} 
            ${isSideBarClosed ? styles["navigation-button-closed"] : styles["navigation-button-opened"]} `}
            onClick={CloseOpenNavigation}>&#8801;</button>
            <div className={` ${isSideBarClosed?  styles["closed"] : styles["opened"]} ${styles["sideBar"]}`}>
                <div className={styles['hotelImage-container']}>
                    <img src="" alt="" className={styles['hotelImage']} />
                </div>
                    <p>Hotel Bulgaria</p>

                <ul className={styles['sideBar-list']}>
                    <li><a href="">Home</a></li>
                    <li><a href="">Login</a></li>
                    <li><a href="">Register</a></li>
                </ul>
            </div>
        </>
    )
} 