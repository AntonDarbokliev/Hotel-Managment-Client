import styles from './DayCard.module.scss'

interface Props {
    day: string | number,
    onClick?: () => void,
    isSelected?: boolean,
    isHighlighted?: boolean,
    hasPassed?: boolean,
}

export const DayCard: React.FC<Props> = ({day,onClick,isSelected,isHighlighted,hasPassed}) => {
    return (
        <div onClick={!hasPassed ? onClick: () => {}} 
        className={
            `${styles[`day-card`]} 
            ${isSelected ? styles[`selected`] : ''} 
            ${isHighlighted ? styles[`highlighted`] : ''}
            ${hasPassed ? styles[`has-passed`] : ''}
            `
            }>
            <p>{day}</p>
        </div>
    )
}
