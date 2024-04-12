import { useEmployeeStore } from "../../../../stores/EmployeeStore"
import { EmployeeCard } from "../EmployeeCard/EmployeeCard"
import styles from './EmployeeList.module.scss'

export const EmployeeList = () => {    
    const employees = useEmployeeStore(s => s.employees)
    
    return (
        <div className={styles["employee-list"]}>
            {employees.length > 0 && 
                <>
                    {employees?.map(emp => <EmployeeCard  key={emp.id} employee={emp}/>)}
                </>
            } 
            {employees.length == 0 && 
                <p>No employees added yet</p>
            }
        </div>
    )
}