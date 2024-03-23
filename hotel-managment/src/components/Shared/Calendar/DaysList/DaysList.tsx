import { Variants, motion } from "framer-motion"
import { DayCard } from "../DayCard/DayCard"
import styles from './DaysList.module.scss'
import { useEffect, useState } from "react";
import { RoomReservation } from "../../../../types/RoomReservation";
import { FromTo } from "../../../../types/CalendarFromTo";
import { useInteractiveCalendar } from "../../../../hooks/Calendar/useInteractiveCalendar";

interface Today {
  day: number;
  isMonthNow: boolean;
  month: number;
  year: number;
}

interface Props {
    days: number[],
    from: {setFrom? :React.Dispatch<React.SetStateAction<FromTo | undefined>>,from?: FromTo },
    to: {setTo? :React.Dispatch<React.SetStateAction<FromTo | undefined>>,to?: FromTo },
    animationVariant?: Variants,
    today : Today,
    reservations? : RoomReservation[],
    month: number,
    year: number
}


export const DaysList:React.FC<Props> = ({days,from,to,animationVariant,today,reservations,month,year}) => {

    const [animationKey, setAnimationKey] = useState(0);

      useEffect(() => {
          setAnimationKey(animationKey + 1);
      }, [days]);


      const hasDayPassed = (today: Today,day: number) => {
       return today.isMonthNow ? today.day > day : false
      }

    const {handleDayClick,isDayBooked,isDayHighlighted,isDaySelected} = useInteractiveCalendar(from,to,month,year,reservations)

    return (
          <motion.div
          className={styles['days-list']}
          variants={animationVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          key={animationKey}
          >
            {days.map(day => 
            <DayCard 
            isHighlighted={isDayHighlighted(day)} 
            isSelected={ isDaySelected(day)} 
            hasPassed= {hasDayPassed(today,day)}
            isBooked = {isDayBooked(day)}
            onClick={() => handleDayClick(day)} 
            key={day} 
            day={day}
            />)}
          </motion.div>
    )
}