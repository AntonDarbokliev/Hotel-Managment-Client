import { useEffect, useState } from "react"
import { employeeServiceFactory } from "../../services/employee"
import { useLoading } from "../useLoading"
import { useParams } from "react-router-dom"
import { ReceivedEmployee } from "../../types/ReceivedEmployee"

const emlpoyeeService = employeeServiceFactory()

export const useEmployees = () => {
    const [employeesData,setEmployeesData] = useState<ReceivedEmployee[]>([])
    const {isLoading,requestWithLoading} = useLoading()
    const params = useParams()

    useEffect(() => {
        requestWithLoading(() => emlpoyeeService.getAll(params.id!)
        .then(data => setEmployeesData(data.employees))
        .catch(err => console.log(err)))
    },[])

    return {
        employeesData,
        isLoading
    }
} 