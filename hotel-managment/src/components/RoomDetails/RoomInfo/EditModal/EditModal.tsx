import { useState } from "react"
import { useForm } from "../../../../hooks/useForm"
import { Room } from "../../../../types/RoomType"
import { Button } from "../../../Shared/Button/Button"
import { InputField } from "../../../Shared/InputField/InputField"
import { Modal } from "../../../Shared/Modal/Modal"

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    room : Room
}

export const EditModal:React.FC<Props> = ({modalSetter,room}) => {
    const {formValues,onChangeHandler} = useForm({
        roomNumber: String(room.roomNumber),
    },() => {})
    const [checkbox,setCheckbox ] = useState(room.isCleaned)
    return (
        <Modal stateSetter={modalSetter} title="Edit room">
            <InputField value={formValues.roomNumber} onChange={onChangeHandler} type="text" name="roomNumber">Room Number</InputField>
            <p>Cleaned</p>
            <input style={{height: '25px',width: '25px',margin: '1rem'}} type="checkbox" checked={checkbox} onClick={() => setCheckbox(s => !s)}></input>
            {/* TODO: Make a custom toggle component */}
            <Button>Save</Button>
        </Modal>
    )
}