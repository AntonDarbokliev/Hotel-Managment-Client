import { useEmployeeStore } from "../../../../stores/EmployeeStore"
import { EmployeeCard } from "../EmployeeCard/EmployeeCard"
import styles from './EmployeeList.module.scss'

export const EmployeeList = () => {    
    const {employees} = useEmployeeStore()
    
    return (
        <div className={styles["employee-list"]}>
            {employees?.map(emp => <EmployeeCard  key={emp.id} employee={emp}/>)}
        </div>
    )
}