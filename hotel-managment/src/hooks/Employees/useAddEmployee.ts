import { useParams } from "react-router-dom"
import { employeeServiceFactory } from "../../services/employee"
import { makeFormData } from "../../utils/makeFormData"
import { useLoading } from "../useLoading"
import { ReceivedEmployee } from "../../types/ReceivedEmployee"

const employeeService = employeeServiceFactory()

interface Props {
    formValues: {[key:string]: string},
    onSuccess?: (data: ReceivedEmployee) => void,
    onFail?: (text:string) => void
}

export const useAddEmployee = (props: Props) => {

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
        .catch((error) => onFail  ?  onFail(error): null)
    }
        
    return {
        isLoading,
        addEmployee
    }
}   