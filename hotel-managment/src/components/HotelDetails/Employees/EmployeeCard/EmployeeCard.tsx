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
                    <EmployeeDetails employeeId={employee.id} modalSetter={setEmployeeDetails}/>
                }
            </AnimatePresence>
            <div className={styles["employee-card"]} onClick={() => setEmployeeDetails(true)}>
                
                <div className={styles["employee-info"]}>
                    <p>{employee.firstName} {employee.lastName}</p>
                    <p className="highlight">{employee.roles.join(' ')}</p>
                </div>
                <div className={`${styles['activity-circle']} ${ employee.isActive ? styles.active : styles.inactive}`}></div>
            </div>
        </>
    )
}