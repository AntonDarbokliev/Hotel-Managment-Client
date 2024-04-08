import { useEffect } from "react"
import { employeeServiceFactory } from "../../services/employee"

const employeeService = employeeServiceFactory()

export const useActivateDeactivate = (activeState: boolean | null,employeeId:string) => {
    
    useEffect(() => {
console.log(activeState);

        if(activeState != null) {

            if(activeState) {
                employeeService.activate(employeeId)
            }else {
                employeeService.deactivate(employeeId)
            }
        }
    },[activeState])
}