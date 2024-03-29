import { ReceivedEmployee } from "../../../../types/ReceivedEmployee"
import { EmployeeCard } from "../EmployeeCard/EmployeeCard"
import styles from './EmployeeList.module.scss'

interface Props {
    employees: ReceivedEmployee[],
}
export const EmployeeList:React.FC<Props> = ({employees}) => {    
    return (
        <div className={styles["employee-list"]}>
            {employees.map(emp => <EmployeeCard  key={emp.id} employee={emp}/>)}
        </div>
    )
}