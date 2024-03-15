import { useEffect } from "react";

interface Props  {
    month:number,
    setMonth: React.Dispatch<React.SetStateAction<number>>,
    setYear: React.Dispatch<React.SetStateAction<number>>,
    year: number,
    setDays : React.Dispatch<React.SetStateAction<number[]>>
}

export const useCalendarManipulation = (props:Props) => {
    const {month,setMonth,setYear,setDays,year} = props

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


  useEffect(() => {
    const daysArr = []
    const totalDays = new Date(year, month, 0).getDate()

    for(let i = 0;i < totalDays ; i++ ){
        daysArr.push(i + 1)
    }

  setDays([...daysArr])

  },[month])

  return {
    handleNextMonth,
    handlePreviousMonth,
  }
}
