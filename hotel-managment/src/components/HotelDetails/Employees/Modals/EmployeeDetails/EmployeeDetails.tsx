import { useState } from "react"
import { Button } from "../../../../Shared/Button/Button"
import { Modal } from "../../../../Shared/Modal/Modal"
import styles from './EmployeeDetails.module.scss'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { EmployeeForm } from "../../../../Shared/EmployeeForm/EmployeeForm"
import { useSingleEmployee } from "../../../../../hooks/Employees/useSingleEmployee"
import Spinner from "../../../../Shared/LoadSpinner/LoadSpinner"

interface Props {
    modalSetter :React.Dispatch<React.SetStateAction<boolean>>,
    employeeId: string
}

export const EmployeeDetails:React.FC<Props> = ({modalSetter,employeeId}) => {
    const [stage, setStage] = useState(1);

    const {employee,isLoading} = useSingleEmployee(employeeId)

    return (
        <Modal title="Employee Details" stateSetter={modalSetter}>
            {stage == 1 && 
            <>
                {isLoading && 
                    <Spinner/>
                }
                {!isLoading && employee && 
                <div className={styles["employee-details"]}>
                    <Button onClick={ () => setStage(2)}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                    <p>Name: {employee.firstName} {employee.middleName} {employee.lastName}</p>
                    <p>Address: {employee.address}</p>
                    <p>EGN: {employee.egn}</p>
                    <p>Email: {employee.email}</p>
                    <p>Currently Active: {employee.isActive ? 'Yes': 'No'}</p>
                    <p>Salary: {employee.salary}</p>
                    <p>Salary Reports: {employee.salaryReports.length == 0 ? 'No reports' : null} </p>
                    {employee.salaryReports.map(report => <p>{report}</p>)}
                </div>
                }
            </>
            }

            {stage == 2 && 
                <EmployeeForm type="Edit" modalSetter={modalSetter} employee={employee}/>
            }
        </Modal>
    )
}
