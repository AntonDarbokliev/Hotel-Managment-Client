import { useEffect } from "react"
import { employeeServiceFactory } from "../../services/employee"
import { useLoading } from "../useLoading"
import { useParams } from "react-router-dom"
import { useEmployeeStore } from "../../stores/EmployeeStore"

const emlpoyeeService = employeeServiceFactory()

export const useEmployees = () => {
    const {isLoading,requestWithLoading} = useLoading()
    const params = useParams()
    const setEmployees = useEmployeeStore(s => s.setEmployees)

    useEffect(() => {
        requestWithLoading(() => emlpoyeeService.getAll(params.id!)
        .then(data => setEmployees(data.employees))
        .catch(err => console.log(err)))
    },[])

    return {
        isLoading
    }
} 