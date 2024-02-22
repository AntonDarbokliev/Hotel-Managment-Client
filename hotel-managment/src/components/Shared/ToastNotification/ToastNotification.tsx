import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './ToastNotification.module.scss'
import { useEffect, useState } from 'react'
// import {  fa-faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

interface Props {
    text: string,
}

export const ToastNotification: React.FC<Props> = ({text}) => {
    const [showNotification, setShowNotification] = useState(true)
    
        useEffect(() => {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 3000); 

            return () => clearTimeout(timer);
        })
    return (
        <>
        {showNotification && 
        <div className={styles["toast-notification"]}>
            <FontAwesomeIcon size='2x' icon={faTriangleExclamation}></FontAwesomeIcon>
            <p>{text}</p>
        </div>
        }
        </>
    )
}