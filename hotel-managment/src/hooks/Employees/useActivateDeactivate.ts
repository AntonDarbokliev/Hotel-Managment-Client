import { useEffect } from "react"
import { employeeServiceFactory } from "../../services/employee"

const employeeService = employeeServiceFactory()

export const useActivateDeactivate = (activeState: boolean | null,employeeId:string) => {
    
    useEffect(() => {

        if(activeState != null) {

            if(activeState) {
                employeeService.activate(employeeId)
            }else {
                employeeService.deactivate(employeeId)
            }
        }
    },[activeState])
}