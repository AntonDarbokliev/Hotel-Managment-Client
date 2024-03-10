import { ReactNode } from "react"
import styles from './Modal.module.scss';
import { motion } from 'framer-motion'
import { backdrop } from "../../../animationVariants/backdrop";

interface Props {
    title: string,
    children: ReactNode,
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>;
}

const dropIn = {
    hidden: {
        y: '20vh',
        opacity: 0
    },
    visible: {
        y: '0',
        opacity: 1,

    },
    // exit: {
    //     y: '-100vh',
    //     opacity: 0,
    //     transition: {
    //         duration: 0.1
    //     }
    // }
}


export const Modal:React.FC<Props> = ({title,children,stateSetter}) => {

    return (
            
        <motion.div 
        className={styles["modal-backdrop"]} 
        onClick={() => stateSetter(false)}
        variants={backdrop} 
        initial="hidden"
        animate="visible"
        exit="hidden"
        >
                <motion.div  
                key="modal"
                className={styles["modal"]} 
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                >
                    <p className={styles["close-button"]} onClick={() => stateSetter(false)}>x</p>
                    <h1>{title}</h1>
                    <div className={styles["modal-content"]}>
                        {children}
                    </div>
                </motion.div>
            </motion.div>
    )
}