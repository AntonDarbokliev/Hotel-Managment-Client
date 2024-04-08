import { useEffect, useState } from "react"
import { Button } from "../../Shared/Button/Button"
import { EmployeeList } from "./EmployeeList/EmployeeList"
import styles from './Employees.module.scss'
import { AddEmployee } from "./Modals/AddEmployee/AddEmployee"
import { AnimatePresence } from "framer-motion"
import { useEmployees } from "../../../hooks/Employees/useEmployees"
import Spinner from "../../Shared/LoadSpinner/LoadSpinner"
import { useEmployeeStore } from "../../../stores/EmployeeStore"

export const Employees = () => {
    const [addEmployee,setAddEmployee ] = useState(false)
    const {employeesData,isLoading} = useEmployees()

    const {setEmployees} = useEmployeeStore()

    useEffect(() => {
        setEmployees(employeesData)
        
    },[employeesData])

    return (
        <>
        <div className={styles["container"]}>

            <AnimatePresence>
                {addEmployee && 
                    <AddEmployee modalSetter={setAddEmployee}/>
                }    
            </AnimatePresence>

            <div className={styles["employees"]}>
                <h1>Employees</h1>
                {!isLoading && 
                <EmployeeList/>
            }
                {isLoading && 
                    <Spinner/>
                }
              <span className={styles["add-btn"]}> <Button onClick={() => setAddEmployee(true)}>Add an Employee</Button></span>
            </div>


            </div>
        </>
    )
}