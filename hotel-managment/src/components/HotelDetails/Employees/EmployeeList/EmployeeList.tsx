import { useEmployeeStore } from "../../../../stores/EmployeeStore"
import { ReceivedEmployee } from "../../../../types/ReceivedEmployee"
import { EmployeeCard } from "../EmployeeCard/EmployeeCard"
import styles from './EmployeeList.module.scss'

interface Props {
    searchedEmployees?: ReceivedEmployee[]
}

export const EmployeeList:React.FC<Props> = ({searchedEmployees}) => {    
    const {employees} = useEmployeeStore()

    return (
        <div className={styles["employee-list"]}>
            {searchedEmployees !== undefined && searchedEmployees.length > 0 &&
             searchedEmployees?.map(emp => <EmployeeCard  key={emp.id} employee={emp}/>)
            }
            {( searchedEmployees == undefined || searchedEmployees.length == 0) &&
             employees?.map(emp => <EmployeeCard  key={emp.id} employee={emp}/>)
             }
        </div>
    )
}