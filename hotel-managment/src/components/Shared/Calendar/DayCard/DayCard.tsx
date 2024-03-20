import styles from './DayCard.module.scss'

interface Props {
    day: string | number,
    onClick?: () => void,
    isSelected?: boolean,
    isHighlighted?: boolean,
    hasPassed?: boolean,
    isBooked?: boolean
}

export const DayCard: React.FC<Props> = ({day,onClick,isSelected,isHighlighted,hasPassed,isBooked}) => {
    return (
        // <div onClick={!hasPassed ? onClick: () => {}} 
        <div onClick={ hasPassed || isBooked ?  () => {}: onClick } 
        className={
            `${styles[`day-card`]} 
            ${isSelected ? styles[`selected`] : ''} 
            ${isHighlighted ? styles[`highlighted`] : ''}
            ${hasPassed ? styles[`has-passed`] : ''}
            ${isBooked ? styles[`is-booked`] : ''}
            `
            }>
            <p>{day}</p>
        </div>
    )
}
