import { ReceivedEmployee } from "../../../../../types/ReceivedEmployee"
import { EmployeeForm } from "../../../../Shared/EmployeeForm/EmployeeForm"
import { Modal } from "../../../../Shared/Modal/Modal"

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    employeesSetter:  React.Dispatch<React.SetStateAction<ReceivedEmployee[]>>
}

export const AddEmployee: React.FC<Props> = ({modalSetter,employeesSetter}) => {

    return (
        <Modal stateSetter={modalSetter} title="Add Employee">
            <EmployeeForm 
            employeesSetter={employeesSetter} 
            modalSetter={modalSetter}
            type="Add"
            />
        </Modal>
    )
}