import { Employee } from "../../../../types/Employee"
import { Button } from "../../../Shared/Button/Button"
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styles from './EmployeeCard.module.scss'

interface Props {
    employee: Employee
}

export const EmployeeCard: React.FC<Props> = ({employee}) => {
    return (
        <div className={styles["employee-card"]}>
            <div className={styles["employee-info"]}>
                <p>{employee.firstName} {employee.lastName}</p>
                <p className="highlight">Manager</p>
            </div>
            <Button><FontAwesomeIcon icon={faTrashCan}/></Button>
        </div>
    )
}