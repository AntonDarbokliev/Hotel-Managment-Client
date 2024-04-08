import { useEffect, useState } from "react"
import { Button } from "../../../../Shared/Button/Button"
import { Modal } from "../../../../Shared/Modal/Modal"
import styles from './EmployeeDetails.module.scss'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { EmployeeForm } from "../../../../Shared/EmployeeForm/EmployeeForm"
import { useSingleEmployee } from "../../../../../hooks/Employees/useSingleEmployee"
import Spinner from "../../../../Shared/LoadSpinner/LoadSpinner"
import { Toggle } from "../../../../Shared/Toggle/Toggle"
import { useEmployeeStore } from "../../../../../stores/EmployeeStore"
import { useCreateSalaryReport } from "../../../../../hooks/Employees/useCreateSalaryReport"
import { CreateSalaryReport } from "./CreateSalaryReport/CreateSalaryReport"
import { ReportCard } from "./ReportCard/ReportCard"
import { employeeServiceFactory } from "../../../../../services/employee"

interface Props {
    modalSetter :React.Dispatch<React.SetStateAction<boolean>>,
    employeeId: string
}

const employeeService = employeeServiceFactory()

export const EmployeeDetails:React.FC<Props> = ({modalSetter,employeeId}) => {
    const [stage, setStage] = useState(1);
    const {employee,isLoading} = useSingleEmployee(employeeId) 
    const {employees,setEmployees} = useEmployeeStore()
    const { createReport} = useCreateSalaryReport(employeeId)
       
    const [isActive,setIsActive] = useState<boolean | null>(null)

    useEffect(() => {
        if(employee) {
            setIsActive(employee.isActive)
        }
    },[employee])

    const onToggle = () => {

        if(!isActive) {
            employeeService.activate(employeeId)
        }else {
            employeeService.deactivate(employeeId)
        }
        setIsActive(s => !s)
        const updatedEmployees = [...employees]
        const employeeToUpdate = updatedEmployees.find(emp => emp.id == employeeId)
        if(employeeToUpdate){

            employeeToUpdate.isActive = !employeeToUpdate.isActive
            
            setEmployees(updatedEmployees)
        }
    }

    return (
        <Modal title="Employee Details" stateSetter={modalSetter}>
            {stage == 1 && 
            <>
                {isLoading && 
                    <Spinner/>
                }
                {!isLoading && employee && isActive !== null &&
                <div className={styles["employee-details"]}>
                    <Button onClick={ () => setStage(2)}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                    <div className={styles["activity-div"]}>
                    <p>Active: </p>
                    <Toggle onToggle={onToggle} toggleState={isActive!}/>
                    </div>
                    
                    <p>Name: {employee.firstName} {employee.middleName} {employee.lastName}</p>
                    <p>Address: {employee.address}</p>
                    <p>EGN: {employee.egn}</p>
                    <p>Email: {employee.email}</p>
                    <p>Salary: {employee.salary}</p>
                    <p>Salary Reports: {employee.salaryReports.length == 0 ? 'No reports' : null} </p>
                    {employee.salaryReports.map(report => <ReportCard key={report.id} report={report}/>)}
                    <Button onClick={ () => setStage(3)}>Create Report</Button>
                </div>
                }
            </>
            }

            {stage == 2 && 
                <EmployeeForm type="Edit" modalSetter={modalSetter} employee={employee}/>
            }

            {stage == 3 && 
                <CreateSalaryReport onCancel={() => setStage(1)} createReport={() => createReport(() => setStage(1))}/>
            }
        </Modal>
    )
}
