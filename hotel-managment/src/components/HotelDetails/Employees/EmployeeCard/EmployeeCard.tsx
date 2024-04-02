import { Button } from "../../../Shared/Button/Button"
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styles from './EmployeeCard.module.scss'
import { useState } from "react"
import { EmployeeDetails } from "../Modals/EmployeeDetails/EmployeeDetails"
import { AnimatePresence } from "framer-motion"
import { ReceivedEmployee } from "../../../../types/ReceivedEmployee"

interface Props {
    employee: ReceivedEmployee,
}

export const EmployeeCard: React.FC<Props> = ({employee}) => {
    const [employeeDetails, setEmployeeDetails] = useState(false)

    return (
        <>
            <AnimatePresence>
                {employeeDetails &&
                    <EmployeeDetails employee={employee} modalSetter={setEmployeeDetails}/>
                }
            </AnimatePresence>
            <div className={styles["employee-card"]} onClick={() => setEmployeeDetails(true)}>
                
                <div className={styles["employee-info"]}>
                    <p>{employee.firstName} {employee.lastName}</p>
                    <p className="highlight">{employee.role}</p>
                    {/* <p className="highlight">Receptionist</p> */}
                </div>
                <Button><FontAwesomeIcon icon={faTrashCan}/></Button>
            </div>
        </>
    )
}