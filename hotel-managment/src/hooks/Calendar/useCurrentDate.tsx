import { useEffect, useState } from "react";

export const useCurrentDate = (monthProp:number,yearProp:number) => {

    const [today, setToday] = useState<{day: number, isMonthNow: boolean,month:number,year:number}>({day: 1, isMonthNow: true,month: 0,year:0})


    useEffect(() => {
        const now = new Date();
        const currentMonth = now.getMonth() + 1
        const day = now.getDate();
        const year = now.getFullYear()
        const todayObj = {
        isMonthNow: currentMonth == monthProp && today.year == yearProp ,
        day,
        month: currentMonth,
        year
        }
    
        setToday(todayObj)
       },[monthProp])

       return {
        today
       }
}