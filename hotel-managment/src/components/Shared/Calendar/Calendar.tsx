import styles from './Calendar.module.scss'
import { Button } from '../Button/Button';
import { DaysList } from './DaysList/DaysList';
import { useCalendarManipulation } from '../../../hooks/Calendar/useCalendarManipulation';
import { useState } from 'react';
import { useCurrentDate } from '../../../hooks/Calendar/useCurrentDate';
import { RoomReservation } from '../../../types/RoomReservation';
import { FromTo } from '../../../types/CalendarFromTo';
interface Props {
    year: number,
    month: number,
    setMonth: React.Dispatch<React.SetStateAction<number>>,
    setYear: React.Dispatch<React.SetStateAction<number>>,
    from? :FromTo,
    to?: FromTo,
    setFrom?: React.Dispatch<React.SetStateAction<FromTo | undefined>>,
    setTo?: React.Dispatch<React.SetStateAction<FromTo | undefined>>,
    days: number[],
    setDays:React.Dispatch<React.SetStateAction<number[]>>,
    reservations?: RoomReservation[]
}



export const Calendar:React.FC<Props> = ({month,year,setMonth,setYear,from,setFrom,setTo,to,days,setDays,reservations}) => {

    const [ animationDirection, setAnimationDirection ] = useState<'left' | 'right'>()

    const {today} = useCurrentDate(month,year)

    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const daysListVariant = {
        hidden: {
          x: animationDirection == 'right' ? '20vw' : '-20vw',
          opacity: 0
      },
      visible: {
          x: '0',
          opacity: 1,
        transition: {
            duration: 0.3
        }
      },
      }

      const previousMonth = ( ) => {
        handlePreviousMonth()
        setAnimationDirection('left')
      }
      
      const nextMonth = () => {
        handleNextMonth()
        setAnimationDirection('right')
      }

    
   const {handleNextMonth,handlePreviousMonth} = useCalendarManipulation({month,year,setMonth,setYear,setDays})

    return (
        <div className={styles["calendar"]}>
            <div className={styles['selected-month']}>
                {year === today.year ? (today.month <= month - 1 && (
                    <Button width='2rem' testId='previous-month' onClick={previousMonth}>&larr;</Button>
                  )) : (
                    <Button width='2rem' testId='previous-month' onClick={previousMonth}>&larr;</Button>
                  )}
                <div className={styles['selected-month-info']}>
                  <p data-testid='month'>{monthNames[month - 1]}</p>
                  <p data-testid='year'>{year}</p>
                </div>
                <Button width='2rem' testId='next-month' onClick={nextMonth}>&rarr;</Button>
            </div>
                <DaysList 
                month={month} 
                year={year} 
                reservations={reservations} 
                today={today} 
                days={days} 
                to={{setTo,to}} 
                from={{setFrom,from}} 
                animationVariant={daysListVariant}/>

        </div>
        )
} 