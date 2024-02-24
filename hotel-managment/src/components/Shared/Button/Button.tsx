import { ReactNode } from "react"
import styles from './Button.module.scss';

interface Props {
    children: ReactNode,
    onClick?: (event?: React.MouseEvent) => void
    disable? : boolean,
    color?: string,
    width?: string
}

export const Button  = (props: Props) => {
    return (
        <button 
        style={{width:props.width}}
        disabled={props.disable} 
        className={styles["shared-button"]}
        onClick={props.onClick}
        >{props.children}</button>
    )
}