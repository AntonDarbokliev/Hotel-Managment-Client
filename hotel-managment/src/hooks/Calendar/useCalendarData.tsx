import { useState } from "react";
import { FromTo } from "../../types/CalendarFromTo";

export const useCalendarData = () => {
    const now = new Date();

    const [month, setMonth ] = useState(now.getMonth() + 1)
    const [year, setYear ]  = useState(now.getFullYear())

    const [days, setDays ] = useState<number[]>([]) 
    const [from, setFrom] = useState<FromTo>()
    const [to, setTo] = useState<FromTo>()


    return {
        month, 
        setMonth,
        year, 
        setYear ,
        days, 
        setDays,
        from, 
        setFrom,
        to, 
        setTo
    }
}