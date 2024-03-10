import { useEffect } from "react";

interface Props  {
    month:number,
    setMonth: React.Dispatch<React.SetStateAction<number>>,
    setYear: React.Dispatch<React.SetStateAction<number>>,
    year: number,
    setFrom: React.Dispatch<React.SetStateAction<number>>,
    setTo: React.Dispatch<React.SetStateAction<number>>,
    setDays : React.Dispatch<React.SetStateAction<number[]>>
}

export const useCalendarManipulation = (props:Props) => {
    const {month,setMonth,setYear,setDays,setFrom,setTo,year} = props

const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handlePreviousMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const reset = () => {
    setFrom(NaN)
    setTo(NaN)
  }

  useEffect(() => {
    console.log('fetch reservations for month now')
    const daysArr = []
    const totalDays = new Date(year, month, 0).getDate()

    for(let i = 0;i < totalDays ; i++ ){
        daysArr.push(i + 1)
    }

  setDays([...daysArr])
  reset()

  },[month])

  return {
    handleNextMonth,
    handlePreviousMonth,
  }
}
