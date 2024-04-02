import { AnimatePresence,motion } from 'framer-motion'
import styles from './DayCard.module.scss'
import { RoomReservation } from '../../../../types/RoomReservation'
import { useNavigate } from 'react-router-dom'

interface Props {
    day: string | number,
    onClick?: () => void,
    isSelected?: boolean,
    isHighlighted?: boolean,
    hasPassed?: boolean,
    isBooked?: false | undefined | RoomReservation
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
    const navigate = useNavigate()
    
    return (
        <motion.div 
        initial="hidden" 
        whileHover="visible" 
        onClick={ hasPassed || isBooked ?  () => {
            if(isBooked)  navigate(`${isBooked.id}`)
            
        }: onClick } 
        className={
            `${styles[`day-card`]} 
            ${isSelected ? styles[`selected`] : ''} 
            ${isHighlighted ? styles[`highlighted`] : ''}
            ${hasPassed ? styles[`has-passed`] : ''}
            ${isBooked  ? styles[`is-booked`] : ''}
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
