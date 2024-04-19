import { faTriangleExclamation,faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './ToastNotification.module.scss'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
    text: string,
    timer? : number,
    setText?: (toastText: string) => void,
    positive?: boolean | null;
}

const toastVariant = {
    hidden: {
        opacity: 0,
        top: '-20vh'
    },
    visible: {
        opacity: 1,
        top: '1vh',
        transition: {
            type: 'spring',
            damping: 10,
            stiffness: 100,

        }
    },
    exit: {
        opacity: 0,
        top: '-20vh',
        

    }
}

export const ToastNotification: React.FC<Props> = ({text,timer,setText,positive}) => {
    useEffect(() => {
        if(timer && setText){
           const timeout = setTimeout(() => {
                setText('')
            },timer)

            return () => clearTimeout(timeout)
        }
    },[])
    return (
        <>
        <motion.div variants={toastVariant} key='toast-notification' className={`${styles["toast-notification"]} ${positive ? styles['positive'] : ''}`} 
        initial="hidden"
        animate="visible"
        exit="hidden">
            {!positive && 
            <FontAwesomeIcon size='2x' icon={faTriangleExclamation}></FontAwesomeIcon>
            }
            {positive && 
            <FontAwesomeIcon size='2x' icon={faCheck}></FontAwesomeIcon>
            }
            <p>{text}</p>
        </motion.div>
        </>
    )
}