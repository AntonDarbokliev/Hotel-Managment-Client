import { useState } from 'react';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {AnimatePresence, motion} from 'framer-motion'
import { backdrop } from '../../animationVariants/backdrop';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';


export const Navigation = () => {

    const [isSideBarClosed,setIsSideBarClosed ] = useState(true)
    const isLoggedIn = useAuthStore(s => s.isLoggedIn)
    const clearUser = useAuthStore(s => s.clearUser)
    const user = useAuthStore(s => s.user)

    const {width} = useWindowDimensions()


    const CloseOpenNavigation = () => {
        setIsSideBarClosed(!isSideBarClosed)
    }

    const logOutHandler = () => {
        clearUser()
        setIsSideBarClosed(true)
    }


    const button = {
        closed: {
            x: '0vw',
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
        opened: {
            x: width >= 880 ? '-15vw' : '-40vw',
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
    }

    const nav = {
        hidden: {
            x: '15vw',
        },
        visible: {
            x: '0vw',
        },
    }

    return (
        <>
            
    <AnimatePresence>
            <motion.button 
            key='nav-button'
            className={`${styles["navigation-button"]} 
            ${isSideBarClosed ? styles["navigation-button-closed"] : styles["navigation-button-opened"]}`}
            variants={button}
            animate={isSideBarClosed ? 'closed' : 'opened'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={CloseOpenNavigation}>
                &#8801;
            </motion.button>

        {!isSideBarClosed && 
        <motion.div 
        className={`${styles['sidebar-backdrop']} 
        ${isSideBarClosed?  styles["closed"] : styles["opened"]}`} 
        onClick={CloseOpenNavigation}
        variants={backdrop} 
        initial="hidden"
        animate="visible"
        exit="hidden"
        >
            <motion.div 
            variants={nav}
            key="nav"
            transition={{duration: 0.3,ease: 'easeInOut',}}
            onClick={(e) => e.stopPropagation()} className={` ${styles["sideBar"]}`}>
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
                    <li><Link to="/login" onClick={CloseOpenNavigation}>Login</Link></li>
                    <li><Link to="/register" onClick={CloseOpenNavigation}>Register</Link></li>
                    </>
                    }

                    {isLoggedIn && 
                    <>
                    <li><Link to="/hotels" onClick={CloseOpenNavigation}>Home</Link></li>
                    <li><Link to="/add" onClick={CloseOpenNavigation}>Add</Link></li>
                    <div className={styles['log-out__div']}>
                    <FontAwesomeIcon color='#ff0000' icon={faArrowRightFromBracket}></FontAwesomeIcon>
                    <li><Link className={styles['log-out']} to="/login" onClick={logOutHandler}>Log Out</Link></li>
                    </div>
                    </>
                    }
                </ul>
            </motion.div>
        </motion.div>
        }
        </AnimatePresence>

        </>
    )
} 