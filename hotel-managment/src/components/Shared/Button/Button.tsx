import { ReactNode } from "react"
import styles from './Button.module.scss';

interface Props {
    children: ReactNode,
    onClick? : () => void,
    disable? : boolean
}

export const Button  = (props: Props) => {
    return (
        <>
        <button disabled={props.disable} className={styles["shared-button"]}>{props.children}</button>
        </>
    )
}