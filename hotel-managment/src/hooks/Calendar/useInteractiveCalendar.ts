import { FromTo } from "../../types/CalendarFromTo";
import { RoomReservation } from "../../types/RoomReservation";
import { extractDate } from "../../utils/extractDate";

export const useInteractiveCalendar = (
    fromObj: {setFrom? :React.Dispatch<React.SetStateAction<FromTo | undefined>>,from?: FromTo },
    toObj: {setTo? :React.Dispatch<React.SetStateAction<FromTo | undefined>>,to?: FromTo }, 
    month:number,
    year: number,
    reservations: RoomReservation[] | undefined
    ) => {
    const from = fromObj.from
    const to = toObj.to 
    const setFrom = fromObj.setFrom
    const setTo = toObj.setTo

    const handleDayClick = (day:number,) => {
          
          if(setFrom && setTo ){
            if(from  && !to){
              if((day > from.day && month >= from.month) || month > from.month) {
                setTo({day,month,year});
              }else {
                setFrom({day,month,year})
              }
            }else if (from && to) {
              setTo(undefined)
              setFrom({day,month,year})
            }else if(!from && !to) {
              setFrom({day,month,year})
            }
          }else {
            return
          }
      }

      const isDayHighlighted = (day:number) => {
        if(to?.day && from?.day){            
            if(to.month > from.month && month == from.month){
              return day > from.day
            }else if (from.month == to.month && month == from.month) {
              return day > from.day && day < to.day
            }else if(month > from.month && month < to.month){
            return true
            }else if (month == to.month) {
            return day < to.day 
            } 
            else {
            return false
            }
        }else {
          return false
        }
      }

      const isDaySelected = (
        day:number
        ) => { 
        if(from || (from && to))
        return (day == from.day && month == from.month) || (day === to?.day && month == to.month)
      }


      const isDayBooked = (day: number,) => {
        if(reservations){

            let shouldColor = false
            let dayReservation: RoomReservation = {from: '',id: '', to: ''};
            reservations.some(reservation => {
                const from = extractDate(reservation.from)
                const to = extractDate(reservation.to)          
                
                if (to.month == from.month && month == from.month){
                    shouldColor = day <= to.day && day >= from.day
                }else if(from.month < to.month && month === from.month ) {
                    shouldColor = day >= from.day
                }else if(from.month < to.month && month == to.month) {
                    shouldColor = day <= to.day
                }else if ( from.month < to.month && month > from.month && month < to.month){
                    shouldColor = true
                }else {
                    false
                }
                if(shouldColor) {
                  dayReservation = reservation
                  return true
                }else {
                  return false
                }
                
            })
            if(shouldColor) {
              return dayReservation
            }else {
              return false
            }
        }
} 

    return {
        handleDayClick,
        isDayBooked,
        isDayHighlighted,
        isDaySelected
    }
}