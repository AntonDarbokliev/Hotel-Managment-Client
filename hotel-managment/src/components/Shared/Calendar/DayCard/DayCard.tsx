import { AnimatePresence,motion } from 'framer-motion'
import styles from './DayCard.module.scss'

interface Props {
    day: string | number,
    onClick?: () => void,
    isSelected?: boolean,
    isHighlighted?: boolean,
    hasPassed?: boolean,
    isBooked?: boolean
}

const hoverDayVariant = {
    hidden: {
        scale: 0.8,
        y: '2vh',
        opacity: 0,
    },
    visible : {
        scale: 1,
        y: '0',
        opacity: 1
    },
    exit: {
        opacity: 0
    },
    
}

export const DayCard: React.FC<Props> = ({day,onClick,isSelected,isHighlighted,hasPassed,isBooked}) => {

    return (
        <motion.div 
        initial="hidden" 
        whileHover="visible" 
        onClick={ hasPassed || isBooked ?  () => {}: onClick } 
        className={
            `${styles[`day-card`]} 
            ${isSelected ? styles[`selected`] : ''} 
            ${isHighlighted ? styles[`highlighted`] : ''}
            ${hasPassed ? styles[`has-passed`] : ''}
            ${isBooked ? styles[`is-booked`] : ''}
            `
            }>

                <AnimatePresence>
                {isBooked && 
                    <motion.p 
                    variants={hoverDayVariant} 
                    className={styles['click-bubble']}
                    >Click to view reservation</motion.p>
                }
                </AnimatePresence>
                <p>{day}</p>
        </motion.div>
    )
}
