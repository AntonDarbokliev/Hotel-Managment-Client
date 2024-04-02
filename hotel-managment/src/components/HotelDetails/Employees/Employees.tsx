import { useState } from "react"
import { Button } from "../../Shared/Button/Button"
import { EmployeeList } from "./EmployeeList/EmployeeList"
import styles from './Employees.module.scss'
import { AddEmployee } from "./Modals/AddEmployee/AddEmployee"
import { AnimatePresence } from "framer-motion"
import { useEmployees } from "../../../hooks/Employees/useEmployees"
import Spinner from "../../Shared/LoadSpinner/LoadSpinner"

export const Employees = () => {
    const [addEmployee,setAddEmployee ] = useState(false)
    const {employees,setEmployees,isLoading} = useEmployees()

    return (
        <>
        <AnimatePresence>
            {addEmployee && 
                <AddEmployee employeesSetter={setEmployees} modalSetter={setAddEmployee}/>
            }
            
        </AnimatePresence>
        <div className={styles["container"]}>
            <h1>Employees</h1>
            {!isLoading && 
            <EmployeeList employees={employees!}></EmployeeList>
            }
            {isLoading && 
                <Spinner/>
            }
            <Button onClick={() => setAddEmployee(true)}>Add an Employee</Button>
        </div>
        </>
    )
}