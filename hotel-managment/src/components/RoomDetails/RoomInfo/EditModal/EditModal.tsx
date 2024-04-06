import { useState } from "react"
import { useForm } from "../../../../hooks/useForm"
import { Room } from "../../../../types/RoomType"
import { Button } from "../../../Shared/Button/Button"
import { InputField } from "../../../Shared/InputField/InputField"
import { Modal } from "../../../Shared/Modal/Modal"
import { Toggle } from "../../../Shared/Toggle/Toggle"
import { useEditRoom } from "../../../../hooks/Rooms/useEditRoom"
import Spinner from "../../../Shared/LoadSpinner/LoadSpinner"

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    room : Room,
    roomSetter: React.Dispatch<React.SetStateAction<Room | undefined>>
}

export const EditModal:React.FC<Props> = ({modalSetter,room,roomSetter}) => {
    const {formValues,onChangeHandler} = useForm({
        roomNumber: String(room.roomNumber),
    },() => {})
    const [toggle,setToggle ] = useState(room.isCleaned)

    const {editRoom,isLoading} = useEditRoom(room,{newNumber:Number(formValues.roomNumber),newIsCleaned: toggle})
    const onEdit = () => editRoom(() => {
        modalSetter(false) 
        roomSetter({...room,isCleaned: toggle,roomNumber:Number(formValues.roomNumber)})
    })

    return (
        <Modal stateSetter={modalSetter} title="Edit room">
            {!isLoading && 
            <>
                <InputField value={formValues.roomNumber} onChange={onChangeHandler} type="text" name="roomNumber">
                    Room Number
                </InputField>
                <p style={{margin: '0 0 1rem 0 '}}>Cleaned</p>
                <Toggle toggleSetter={setToggle} toggleState={toggle}/>
                <br />
                <Button onClick={onEdit}>Save</Button>
            </>
            }

            {isLoading && 
                <Spinner/>
            }
        </Modal>
    )
}