import { ReactNode } from "react"
import styles from './Button.module.scss';
import { motion } from 'framer-motion'

interface Props {
    children: ReactNode,
    onClick?: (event?: React.MouseEvent) => void
    disable? : boolean,
    color?: string,
    width?: string
}

export const Button  = (props: Props) => {
    return (
        <motion.button 
        style={{width:props.width}}
        disabled={props.disable} 
        className={styles["shared-button"]}
        onClick={props.onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2}}
        >{props.children}</motion.button>
    )
}