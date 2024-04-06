import { useEffect, useState } from "react"

import styles from './EmployeeForm.module.scss'
import { ReceivedEmployee } from "../../../types/ReceivedEmployee"
import { employeeServiceFactory } from "../../../services/employee"
import { useFormValidation } from "../../../hooks/useFormValidation"
import { useForm } from "../../../hooks/useForm"
import { useAddEmployee } from "../../../hooks/Employees/useAddEmployee"
import { useGeneralValidations } from "../../../hooks/Validations/useGeneralValidations"
import { InputFieldType } from "../../../types/InputField"
import { InputFieldslist } from "../InputFieldsList/InputFieldsList"
import { Dropdown } from "../Dropdown/Dropdown"
import { Button } from "../Button/Button"
import { useEditEmployee } from "../../../hooks/Employees/useEditEmployee"
import { useEmployeeStore } from "../../../stores/EmployeeStore"

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    // employeesSetter?:  React.Dispatch<React.SetStateAction<ReceivedEmployee[]>>,
    type: 'Edit' | 'Add',
    employee? : ReceivedEmployee
}

const employeeService = employeeServiceFactory()

export const EmployeeForm: React.FC<Props> = ({modalSetter,type,employee}) => {

    const {setEmployees,employees} = useEmployeeStore()
    const [roles,setRoles] = useState<string[]>([])
    
    useEffect(() => {
        employeeService.getRoles()
        .then(obj => setRoles(obj.roles))
    },[])

    const {onBlurHandler,onFocusHandler,validationValues} = useFormValidation({
        FirstName : false,
        MiddleName : false,
        LastName : false,
        EGN : false,
        Address : false,
        Role: false,
        Email : false,
    })

    const {formValues,onChangeHandler} = useForm({
        FirstName : type == 'Edit' ? `${employee?.firstName}`: '',
        MiddleName : type == 'Edit' ? `${employee?.middleName}`: '',
        LastName : type == 'Edit' ? `${employee?.lastName}`: '',
        EGN : type == 'Edit' ? `${employee?.egn}`: '',
        Address : type == 'Edit' ? `${employee?.address}`: '',
        Role: type == 'Edit' ? `${employee?.role}`: '',
        Email : type == 'Edit' ? `${employee?.email}`: '',
    },() => {})

    const afterAdd = (addedEmployee: { employee: ReceivedEmployee}) => {
        setEmployees!([...employees,addedEmployee.employee])
        modalSetter(false)
    }
    const {addEmployee} = useAddEmployee({formValues,onSuccess: afterAdd})
    const {editEmployee} = useEditEmployee({formValues})


    const {
        isFirstNameValid,
        isMiddleNameValid,
        isLastNameValid,
        isEGNValid,
        isAddressValid,
        isEmailValid,
    } = useGeneralValidations(formValues,validationValues)


    const inputs = [
        { name: 'FirstName',errorMessage: 'First Name should be at least 2 characters long' ,validation: !isFirstNameValid, display: 'First Name'},
        { name: 'MiddleName',errorMessage: 'MiddleName should be at least 2 characters long' ,validation: !isMiddleNameValid, display: 'Middle Name'},
        { name: 'LastName',errorMessage: 'LastName should be at least 2 characters long' ,validation: !isLastNameValid, display: 'Last Name'},
        { name: 'EGN',errorMessage: 'EGN should be at least 10 characters long' ,validation: !isEGNValid, maxLength: 10},
        { name: 'Email',errorMessage: 'Invalid Email' ,validation: !isEmailValid},
        { name: 'Address',errorMessage: 'Address should be at least 5 characters long' ,validation: !isAddressValid},
    ] as InputFieldType[]

    return (
            <div className={styles["container"]}> 
                <form action="">
                    <InputFieldslist 
                    formValues={formValues} 
                    onBlurHandler={onBlurHandler} 
                    onChangeHandler={onChangeHandler} 
                    inputs={inputs}
                    onFocusHandler={onFocusHandler}
                    />
                    <p>Role</p>
                    <Dropdown onChange={onChangeHandler} name="Role" value={formValues.Role}>
                        <option value="">Select a Role</option>
                        {roles.map(role => <option key={role} value={role}>{role}</option>)}
                    </Dropdown>
                </form>
                {type == "Add" && 
                    <Button width="30%" onClick={addEmployee}>Add</Button>
                }
                {type == 'Edit' && 
                    <Button width="30%" onClick={editEmployee}>Save</Button>
                }
            </div>
    )
}