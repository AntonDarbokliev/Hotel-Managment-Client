import { DayCard } from "../DayCard/DayCard"
import styles from './DaysList.module.scss'

interface Props {
    days: number[],
    from: {setFrom :React.Dispatch<React.SetStateAction<number>>,from: number },
    to: {setTo :React.Dispatch<React.SetStateAction<number>>,to: number },
}

export const DaysList:React.FC<Props> = ({days,from,to}) => {

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
        <div className={styles['days-list']}>
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
        </div>
    )
}
