import { useEffect, useState } from "react";
import { useEmployeeStore } from "../../stores/EmployeeStore"
import { useSearchIn } from "../useSearchIn"
import { ReceivedEmployee } from "../../types/ReceivedEmployee";


export const useSearchInEmployees = (searchValue: string) => {

    const [searchedEmployees,setSearchedEmployees] = useState<ReceivedEmployee[]>()

    const filterEmployees = (employee: {[key:string]: string}) => {
        const regex = new RegExp(`${searchValue}`, 'i');

        const employeeFullName = `${employee.firstName} ${employee.middleName} ${employee.lastName}`
        
        const doesMatch = regex?.test(employeeFullName)
        
        return doesMatch

    }

    const employees = useEmployeeStore(s => s.employees)
    const {searchedArr} = useSearchIn(employees,filterEmployees,searchValue)
    
    useEffect(() => {        
        console.log('searcharr',searchedArr);
        
        if(searchValue == '') {
            setSearchedEmployees([])
        }else {            
            setSearchedEmployees(searchedArr)
        }
    },[searchedArr])

    return {
       searchedEmployees
    }
}