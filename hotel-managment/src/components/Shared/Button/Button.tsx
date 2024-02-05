import { ReactNode } from "react"
import styles from './Button.module.scss';

interface Props {
    children: ReactNode,
    onClick? : () => void
}

export const Button  = (props: Props) => {
    return (
        <>
        <button className={styles["shared-button"]}>{props.children}</button>
        </>
    )
}