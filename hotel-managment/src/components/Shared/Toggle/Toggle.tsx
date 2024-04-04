import styles from './Toggle.module.scss';
import { motion } from "framer-motion";

interface Props {
    toggleSetter: React.Dispatch<React.SetStateAction<boolean>>,
    toggleState: boolean
}

export const Toggle: React.FC<Props> = ({toggleSetter,toggleState}) => {
    
    return (
        <div className={`${styles["toggle-container"]}  ${toggleState ? styles.toggled : styles.untoggled}`}>
           <div className={`${styles['toggle']}`} onClick={() => toggleSetter(s => !s)}>
                <motion.div className={styles["toggle-ball"]} layout transition={spring}/>
           </div>
        </div>
    )
}

const spring = {
    type: "spring",
    stiffness: 400,
    damping: 30
};