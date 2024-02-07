import { FocusEventHandler, FormEvent, ReactNode } from 'react'
import styles from './InputField.module.scss'

export interface InputFieldProps {
    children : ReactNode,
    type?: string,
    value: string | number,
    name: string,
    onChange: (e:FormEvent)  => void,
    onBlurHandler?: FocusEventHandler<HTMLInputElement>,
    onFocusHandler?: FocusEventHandler<HTMLInputElement>,
    isValid?: {
        boolean: boolean,
        errorMessage: string
    }
} 

export const InputField = (props: InputFieldProps) => {
    return (
        <>
        <div className={styles['input-div']}>

            <label>{props.children}</label>

            <input 
            type={props.type} 
            className={styles["input-field"]} 
            value={props.value} 
            name={props.name}
            onChange={props.onChange}
            onFocus={props.onFocusHandler}
            onBlur={props.onBlurHandler}
            style={props.isValid?.boolean === false ?{border: 'red 1px solid'} : {} } 
            ></input>
            {!props.isValid?.boolean ? <p className={styles['error-message']}>{props.isValid?.errorMessage}</p>: <></> }
        </div>
        </>
    )   
}