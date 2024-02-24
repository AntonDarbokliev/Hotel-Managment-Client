import { useState } from 'react';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/Auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const Navigation = () => {

    const [isSideBarClosed,setIsSideBarClosed ] = useState(true)
    const isLoggedIn = useAuthStore(s => s.isLoggedIn)
    const clearUser = useAuthStore(s => s.clearUser)
    const user = useAuthStore(s => s.user)

    const CloseOpenNavigation = () => {
        setIsSideBarClosed(!isSideBarClosed)
    }

    const logOutHandler = () => {
        clearUser()
        setIsSideBarClosed(true)
    }

    return (
        <>
            <button className={`${styles["navigation-button"]} 
            ${isSideBarClosed ? styles["navigation-button-closed"] : styles["navigation-button-opened"]} `}
            onClick={CloseOpenNavigation}>&#8801;</button>
            <div className={` ${isSideBarClosed?  styles["closed"] : styles["opened"]} ${styles["sideBar"]}`}>
            {isLoggedIn && 
            <>
                <div className={styles['hotelImage-container']}>
                    <img src="" alt="" className={styles['hotelImage']} />
                </div>
                <p>{user.fullName}</p>
            </>
            }

                <ul className={styles['sideBar-list']}>
                    {!isLoggedIn && 
                    <>
                    <li><Link to="/login" onClick={() => setIsSideBarClosed(true)}>Login</Link></li>
                    <li><Link to="/register" onClick={() => setIsSideBarClosed(true)}>Register</Link></li>
                    </>
                    }

                    {isLoggedIn && 
                    <>
                    <li><Link to="/hotels" onClick={() => setIsSideBarClosed(true)}>Home</Link></li>
                    <li><Link to="/add" onClick={() => setIsSideBarClosed(true)}>Add</Link></li>
                    <div className={styles['log-out__div']}>
                    <FontAwesomeIcon color='#ff0000' icon={faArrowRightFromBracket}></FontAwesomeIcon>
                    <li><Link className={styles['log-out']} to="/login" onClick={logOutHandler}>Log Out</Link></li>
                    </div>
                    </>
                    }
                </ul>
            </div>
        </>
    )
} 