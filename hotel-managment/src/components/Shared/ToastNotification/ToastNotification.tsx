import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './ToastNotification.module.scss'
import { useEffect } from 'react'
// import { useEffect, useState } from 'react'
// import {  fa-faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

interface Props {
    text: string,
    timer? : number,
    setText?: React.Dispatch<React.SetStateAction<string>>
}

export const ToastNotification: React.FC<Props> = ({text,timer,setText}) => {
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
        <div className={styles["toast-notification"]}>
            <FontAwesomeIcon size='2x' icon={faTriangleExclamation}></FontAwesomeIcon>
            <p>{text}</p>
        </div>
        </>
    )
}