import { ReactNode } from 'react'
import styles from './InputField.module.scss'

interface Props {
    children : ReactNode
} 

export const InputField = (props: Props) => {
    return (
        <>
        <label>{props.children}</label>
        <input className={styles["input-field"]}></input>
        </>
    )
}