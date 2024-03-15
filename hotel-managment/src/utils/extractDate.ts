export const extractDate = (date:string) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    return {
        year,
        month,
        day
    }
}