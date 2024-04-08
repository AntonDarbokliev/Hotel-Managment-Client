import { EmployeeForm } from "../../../../Shared/EmployeeForm/EmployeeForm"
import { Modal } from "../../../../Shared/Modal/Modal"

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AddEmployee: React.FC<Props> = ({modalSetter}) => {

    return (
        <Modal stateSetter={modalSetter} title="Add Employee">
            <EmployeeForm 
            modalSetter={modalSetter}
            type="Add"
            />
        </Modal>
    )
}