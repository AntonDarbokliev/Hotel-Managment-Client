import styles from './Calendar.module.scss'
import { Button } from '../Button/Button';
import { DaysList } from './DaysList/DaysList';
import { useCalendarManipulation } from '../../../hooks/Calendar/useCalendarManipulation';
interface Props {
    year: number,
    month: number,
    setMonth: React.Dispatch<React.SetStateAction<number>>,
    setYear: React.Dispatch<React.SetStateAction<number>>,
    from :number,
    to: number,
    setFrom: React.Dispatch<React.SetStateAction<number>>,
    setTo: React.Dispatch<React.SetStateAction<number>>,
    days: number[],
    setDays:React.Dispatch<React.SetStateAction<number[]>>,
}

export const Calendar:React.FC<Props> = ({month,year,setMonth,setYear,from,setFrom,setTo,to,days,setDays}) => {

    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    
   const {handleNextMonth,handlePreviousMonth} = useCalendarManipulation({month,year,setMonth,setFrom,setYear,setTo,setDays})

    return (
        <div className={styles["calendar"]}>
            <div className={styles['selected-month']}>
                <Button width='2rem' onClick={handlePreviousMonth}>&larr;</Button>
                <div className={styles['selected-month-info']}>
                  <p>{monthNames[month - 1]}</p>
                  <p>{year}</p>
                </div>
                <Button width='2rem' onClick={handleNextMonth}>&rarr;</Button>
            </div>

            <DaysList days={days} to={{setTo,to}} from={{setFrom,from}}/>

        </div>
        )
} 