import { useEffect, useState } from "react"
import { useAddEmployee } from "../../../../../hooks/Employees/useAddEmployee"
import { useGeneralValidations } from "../../../../../hooks/Validations/useGeneralValidations"
import { useForm } from "../../../../../hooks/useForm"
import { useFormValidation } from "../../../../../hooks/useFormValidation"
import { InputFieldType } from "../../../../../types/InputField"
import { Button } from "../../../../Shared/Button/Button"
import { Dropdown } from "../../../../Shared/Dropdown/Dropdown"
import { InputFieldslist } from "../../../../Shared/InputFieldsList/InputFieldsList"
import { Modal } from "../../../../Shared/Modal/Modal"
import styles from './AddEmployee.module.scss'
import { employeeServiceFactory } from "../../../../../services/employee"
import { ReceivedEmployee } from "../../../../../types/ReceivedEmployee"

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    employeesSetter:  React.Dispatch<React.SetStateAction<ReceivedEmployee[]>>
}

const employeeService = employeeServiceFactory()

export const AddEmployee: React.FC<Props> = ({modalSetter,employeesSetter}) => {

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
        FirstName : '',
        MiddleName : '',
        LastName : '',
        EGN : '',
        Address : '',
        Role: '',
        Email : '',
    },() => {})

    const afterAdd = (addedEmployee: { employee: ReceivedEmployee}) => {
        employeesSetter(s => [...s,addedEmployee.employee])
        modalSetter(false)
    }

    const {addEmployee} = useAddEmployee({formValues,onSuccess: afterAdd})


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
        <Modal stateSetter={modalSetter} title="Add Employee">
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
                    <Button width="30%" onClick={addEmployee}>Add</Button>
            </div>
        </Modal>
    )
}