import { Variants, motion } from "framer-motion"
import { DayCard } from "../DayCard/DayCard"
import styles from './DaysList.module.scss'
import { useEffect, useState } from "react";

interface Props {
    days: number[],
    from: {setFrom :React.Dispatch<React.SetStateAction<number>>,from: number },
    to: {setTo :React.Dispatch<React.SetStateAction<number>>,to: number },
    animationVariant?: Variants,
}

export const DaysList:React.FC<Props> = ({days,from,to,animationVariant}) => {

  const [animationKey, setAnimationKey] = useState(0);

      useEffect(() => {
          setAnimationKey(animationKey + 1);
      }, [days]);

    const handleFrom = (day:number) => {
        from.setFrom(day)
      }

      const handleTo = (day:number) => {
        if(day > from.from) {
          to.setTo(day)
        }
        else {
          from.setFrom(day)
        }
      }


    return (
          <motion.div
          className={styles['days-list']}
          variants={animationVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          key={animationKey}
          >
                {days.map(day => <DayCard 
                isHighlighted={ !isNaN(to.to) && day > from.from && day < to.to } 
                isSelected={ day == from.from || day === to.to} 
                onClick={() =>{ 
                
                  if(!isNaN(from.from) && !isNaN(to.to)){
                    from.setFrom(NaN)
                    to.setTo(NaN)
                    return  handleFrom(day)
                  } else if(isNaN(from.from)) {
                    return  handleFrom(day)
                  }else {
                    return  handleTo(day)
                  }

                  }} 
                key={day} 
                day={day}/>)}
          </motion.div>
    )
}
