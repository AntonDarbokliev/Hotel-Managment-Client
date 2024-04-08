import { useEffect, useState } from "react"
import { employeeServiceFactory } from "../../services/employee"

const employeeService = employeeServiceFactory()

export const useRoles = () => {
    const [roles,setRoles] = useState<string[]>([])

    useEffect(() => {
        employeeService.getRoles()
        .then(obj => setRoles(obj.roles))
    },[])
    return {
        roles
    }
}