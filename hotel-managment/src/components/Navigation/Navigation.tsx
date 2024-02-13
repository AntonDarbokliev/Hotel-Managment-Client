import { useState } from 'react';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom';

export const Navigation = () => {

    const [isSideBarClosed,setIsSideBarClosed ] = useState(true)

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
                    <li><Link to="/hotels" onClick={() => setIsSideBarClosed(true)}>Home</Link></li>
                    <li><Link to="/login" onClick={() => setIsSideBarClosed(true)}>Login</Link></li>
                    <li><Link to="/register" onClick={() => setIsSideBarClosed(true)}>Register</Link></li>
                </ul>
            </div>
        </>
    )
} 