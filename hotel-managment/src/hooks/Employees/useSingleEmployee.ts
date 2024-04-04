import { useEffect, useState } from "react"
import { employeeServiceFactory } from "../../services/employee"
import { ReceivedEmployee } from "../../types/ReceivedEmployee"
import { useLoading } from "../useLoading"

const employeeService = employeeServiceFactory()

export const useSingleEmployee = (employeeId: string) => {
    const [employee,setEmployee] = useState<ReceivedEmployee>()
    const {isLoading,requestWithLoading} = useLoading()

    useEffect(() => {
        requestWithLoading(() => employeeService.getOne(employeeId))
        .then(employeeObj => setEmployee(employeeObj.employee))
    },[])

    return {
        employee,
        isLoading
    }
}