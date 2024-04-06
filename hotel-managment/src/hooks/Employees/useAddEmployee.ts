import { useParams } from "react-router-dom"
import { employeeServiceFactory } from "../../services/employee"
import { makeFormData } from "../../utils/makeFormData"
import { useLoading } from "../useLoading"
import { ReceivedEmployee } from "../../types/ReceivedEmployee"
import { useToastStore } from "../../stores/ToastStore"
import { extractErrors } from "../../utils/extractErrors"

const employeeService = employeeServiceFactory()

interface Props {
    formValues: {[key:string]: string},
    onSuccess?: (addedEmployee: { employee: ReceivedEmployee}) => void,
    onFail?: (text:string) => void
}

export const useAddEmployee = (props: Props) => {
    const setToastText = useToastStore(s => s.setToastText)

    const {formValues,onFail,onSuccess} = props

    const {id} = useParams()
    if(!id) {
        const msg = 'We had a problem identifying the hotel, please try again later.'
        if(onFail){
            onFail(msg)   
        }
            
        throw msg
    }
        
        const {isLoading,requestWithLoading} = useLoading()
        
        const addEmployee = () => {
            const formData = makeFormData({...formValues,HotelId: id})
            
            requestWithLoading(() => employeeService.add(formData))
        .then((data) => onSuccess ?  onSuccess(data): null)
        .catch((error) => {
            const errorStr = extractErrors(error)
            setToastText(errorStr)
        })
    }
        
    return {
        isLoading,
        addEmployee
    }
}   