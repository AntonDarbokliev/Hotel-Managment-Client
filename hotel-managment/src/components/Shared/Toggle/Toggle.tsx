import styles from './Toggle.module.scss';
import { motion } from "framer-motion";

interface Props {
    toggleSetter?: React.Dispatch<React.SetStateAction<boolean>>,
    toggleState: boolean,
    onToggle?: () => void,
}

export const Toggle: React.FC<Props> = ({toggleSetter,toggleState,onToggle}) => {
    
        const onClick = () => {
            if(toggleSetter){
                toggleSetter(s => !s)
            }
            if(onToggle){
                onToggle()
            }
        };
    
    return (
        <div className={`${styles["toggle-container"]}  ${toggleState ? styles.toggled : styles.untoggled}`}>
           <div className={`${styles['toggle']}`} onClick={onClick}>
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