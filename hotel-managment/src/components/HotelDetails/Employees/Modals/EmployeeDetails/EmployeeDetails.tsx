import { useState } from "react"
import { ReceivedEmployee } from "../../../../../types/ReceivedEmployee"
import { Button } from "../../../../Shared/Button/Button"
import { Modal } from "../../../../Shared/Modal/Modal"
import styles from './EmployeeDetails.module.scss'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { EmployeeForm } from "../../../../Shared/EmployeeForm/EmployeeForm"

interface Props {
    modalSetter :React.Dispatch<React.SetStateAction<boolean>>,
    employee: ReceivedEmployee
}

export const EmployeeDetails:React.FC<Props> = ({modalSetter,employee}) => {
    const [stage, setStage] = useState(1)

    

    return (
        <Modal title="Employee Details" stateSetter={modalSetter}>
            {stage == 1 && 
            <div className={styles["employee-details"]}>
                <Button onClick={ () => setStage(2)}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                <p>Name: {employee.firstName} {employee.middleName} {employee.lastName}</p>
                <p>Address: {employee.address}</p>
                <p>EGN: {employee.egn}</p>
                <p>Role: {employee.role}</p>
            </div>
            }

            {stage == 2 && 
                <EmployeeForm type="Edit" modalSetter={modalSetter} employee={employee}/>
            }
        </Modal>
    )
}
