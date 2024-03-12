import styles from './Calendar.module.scss'
import { Button } from '../Button/Button';
import { DaysList } from './DaysList/DaysList';
import { useCalendarManipulation } from '../../../hooks/Calendar/useCalendarManipulation';
import { useState } from 'react';
import { useCurrentDate } from '../../../hooks/Calendar/useCurrentDate';
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

    
   const {handleNextMonth,handlePreviousMonth} = useCalendarManipulation({month,year,setMonth,setFrom,setYear,setTo,setDays})

    return (
        <div className={styles["calendar"]}>
            <div className={styles['selected-month']}>
                {year === today.year ? (today.month <= month - 1 && (
                    <Button width='2rem' onClick={previousMonth}>&larr;</Button>
                  )) : (
                    <Button width='2rem' onClick={previousMonth}>&larr;</Button>
                  )}
                <div className={styles['selected-month-info']}>
                  <p>{monthNames[month - 1]}</p>
                  <p>{year}</p>
                </div>
                <Button width='2rem' onClick={nextMonth}>&rarr;</Button>
            </div>

            <DaysList today={today} days={days} to={{setTo,to}} from={{setFrom,from}} animationVariant={daysListVariant}/>

        </div>
        )
} 