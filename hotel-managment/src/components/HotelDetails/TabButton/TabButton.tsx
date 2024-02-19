import { ReactNode } from "react"
import styles from './TabButton.module.scss'
interface Props {
    children:ReactNode
}


export const TabButton:React.FC<Props> = ({children}) => {
    return (
        <button className={styles["tab"]}>
            {children}
        </button>
    )
}