import { ReceivedEmployee } from "../../../../../types/ReceivedEmployee"
import { Modal } from "../../../../Shared/Modal/Modal"

interface Props {
    modalSetter :React.Dispatch<React.SetStateAction<boolean>>,
    employee: ReceivedEmployee
}

export const EmployeeDetails:React.FC<Props> = ({modalSetter,employee}) => {
    return (
        <Modal title="Employee Details" stateSetter={modalSetter}>
            <p>Name: {employee.firstName} {employee.middleName} {employee.lastName}</p>
            <p>Address: {employee.address}</p>
            <p>EGN: {employee.egn}</p>
            <p>Role: {employee.role}</p>
        </Modal>
    )
}
