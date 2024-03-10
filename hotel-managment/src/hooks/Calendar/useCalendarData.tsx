import { useState } from "react";

export const useCalendarData = () => {
    const now = new Date();

    const [month, setMonth ] = useState(now.getMonth() + 1)
    const [year, setYear ]  = useState(now.getFullYear())

    const [days, setDays ] = useState<number[]>([]) 
    const [from, setFrom] = useState<number>(NaN)
    const [to, setTo] = useState<number>(NaN)


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