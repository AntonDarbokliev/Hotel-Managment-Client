import { ErrorObj } from "../types/ErrorTypes"


export const extractErrors = (errorObj: ErrorObj) => {
        let text = ''
        Object.values(errorObj.errors).forEach((e) => e.forEach(x => text += `${x}\n`))
        return text
    }
