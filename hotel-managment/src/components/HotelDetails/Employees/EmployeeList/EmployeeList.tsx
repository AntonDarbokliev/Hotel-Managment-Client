import { Employee } from "../../../../types/Employee"
import { EmployeeCard } from "../EmployeeCard/EmployeeCard"
import styles from './EmployeeList.module.scss'

interface Props {
    employees: Employee[]
}

export const EmployeeList:React.FC<Props> = ({employees}) => {
    return (
        <div className={styles["employee-list"]}>
            {employees.map(emp => <EmployeeCard employee={emp}/>)}
        </div>
    )
}