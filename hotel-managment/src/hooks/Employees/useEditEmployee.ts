import { employeeServiceFactory } from "../../services/employee"
import { useToastStore } from "../../stores/ToastStore"
import { ErrorObj } from "../../types/ErrorTypes"
import { ReceivedEmployee } from "../../types/ReceivedEmployee"
import { extractErrors } from "../../utils/extractErrors"
import { makeFormData } from "../../utils/makeFormData"
import { useLoading } from "../useLoading"

interface Props {
    formValues: {[key:string]: string},
    employeeId?: string,
    hotelId?: string
    onSuccess?: (updatedEmployee: { employee: ReceivedEmployee}) => void,
}
const employeeService =  employeeServiceFactory()
export const useEditEmployee = ({formValues,employeeId,onSuccess,hotelId}:Props) => {

    const setToastText = useToastStore(s => s.setToastText)
    const {isLoading,requestWithLoading} = useLoading()

    const editEmployee = async () => {
        try {
            if(!employeeId || !hotelId) throw new Error('No employee or hotel id found') 
            const data = makeFormData({...formValues,Id: employeeId,HotelId: hotelId})
            const editedEmployee = await requestWithLoading( () => employeeService.edit(data))
            if(onSuccess)
            onSuccess(editedEmployee)
            setToastText('Employee Edited',true)
        } catch (error) {
            const errorStr = extractErrors(error as ErrorObj)
            setToastText(errorStr)
    }
    }
    return {
        isLoading,
        editEmployee
    }

}