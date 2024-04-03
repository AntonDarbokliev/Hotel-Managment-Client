import { employeeServiceFactory } from "../../services/employee"
import { useToastStore } from "../../stores/ToastStore"
import { ErrorObj } from "../../types/ErrorTypes"
import { ReceivedEmployee } from "../../types/ReceivedEmployee"
import { extractErrors } from "../../utils/extractErrors"
import { makeFormData } from "../../utils/makeFormData"
import { useLoading } from "../useLoading"

interface Props {
    formValues: {[key:string]: string},
    onSuccess?: (data: ReceivedEmployee) => void,
}
const employeeService =  employeeServiceFactory()
export const useEditEmployee = ({formValues,onSuccess}:Props) => {

    const setToastText = useToastStore(s => s.setToastText)
    const {isLoading,requestWithLoading} = useLoading()

    const editEmployee = async () => {
        try {
            const data = makeFormData(formValues)
            const editedEmployee = await requestWithLoading( () => employeeService.edit(data))
            if(onSuccess)
            onSuccess(editedEmployee)
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