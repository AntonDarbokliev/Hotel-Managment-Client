import { useState } from "react"
import { useForm } from "../../../../hooks/useForm"
import { Room } from "../../../../types/RoomType"
import { Button } from "../../../Shared/Button/Button"
import { InputField } from "../../../Shared/InputField/InputField"
import { Modal } from "../../../Shared/Modal/Modal"
import { Toggle } from "../../../Shared/Toggle/Toggle"

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    room : Room
}

export const EditModal:React.FC<Props> = ({modalSetter,room}) => {
    const {formValues,onChangeHandler} = useForm({
        roomNumber: String(room.roomNumber),
    },() => {})
    const [toggle,setToggle ] = useState(room.isCleaned)
    
    return (
        <Modal stateSetter={modalSetter} title="Edit room">
            <InputField value={formValues.roomNumber} onChange={onChangeHandler} type="text" name="roomNumber">Room Number</InputField>
            <p>Cleaned</p>
            <Toggle toggleSetter={setToggle} toggleState={toggle}/>
            <Button>Save</Button>
        </Modal>
    )
}