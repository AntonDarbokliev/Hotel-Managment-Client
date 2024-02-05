import { FormEvent, ReactNode } from 'react'
import styles from './InputField.module.scss'

interface Props {
    children : ReactNode,
    type?: string,
    value: string | number,
    name: string,
    onChange: (e:FormEvent)  => void,
} 

export const InputField = (props: Props) => {
    return (
        <>
        <label>{props.children}</label>

        <input 
        type={props.type} 
        className={styles["input-field"]} 
        value={props.value} 
        name={props.name}
        onChange={props.onChange}
        ></input>
        </>
    )
}