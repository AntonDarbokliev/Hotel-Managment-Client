import styles from './DayCard.module.scss'

interface Props {
    day: string | number,
    onClick?: () => void,
    isSelected?: boolean,
    isHighlighted?: boolean
}

export const DayCard: React.FC<Props> = ({day,onClick,isSelected,isHighlighted}) => {
    return (
        <div onClick={onClick} 
        className={
            `${styles[`day-card`]} 
            ${isSelected ? styles[`selected`] : ''} 
            ${isHighlighted ? styles[`highlighted`] : ''}`
            }>
            <p>{day}</p>
        </div>
    )
}
