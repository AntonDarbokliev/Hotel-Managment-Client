import { useAddRoom } from "../../../../../hooks/Rooms/useAddRoom";
import { useForm } from "../../../../../hooks/useForm";
import { useToastStore } from "../../../../../stores/ToastStore";
import { Floor } from "../../../../../types/FloorType";
import { SentRoom } from "../../../../../types/SentRoom";
import { Button } from "../../../../Shared/Button/Button";
import { InputField } from "../../../../Shared/InputField/InputField";
import Spinner from "../../../../Shared/LoadSpinner/LoadSpinner";
import { Modal } from "../../../../Shared/Modal/Modal"
import styles from './AddRoomModal.module.scss';

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    roomSetter: React.Dispatch<React.SetStateAction<SentRoom[]>>,
    floor: Floor
}

export const AddRoomModal:React.FC<Props> = ({modalSetter,roomSetter,floor}) => {
    
    
    const {formValues,onChangeHandler} = useForm({
        roomNumber: '',
        },() => {})

    const toastSetter = useToastStore(s => s.setToastText)

    const onAddFail = () => {toastSetter('An error occured, please try again later')}
    const afterAdd = () => {modalSetter(false)}
    const {addRoom,isLoading} = useAddRoom(roomSetter,onAddFail,afterAdd)


    return (
        <Modal key={'room-modal'} stateSetter={modalSetter} title="Add a Room">
            {!isLoading && 
            <>
                <form action="" className={styles["room-modal-form"]}>
                    <InputField type="number" 
                    name="roomNumber" 
                    value={formValues.roomNumber}
                    onChange={onChangeHandler}
                    >Room Number</InputField>
                    <p>Floor: {floor.floorNumber}</p>
                    <br />
                </form>
                    <Button width="12rem" disable={formValues.roomNumber == ''} 
                    onClick={() => addRoom(floor.id,formValues.roomNumber)}>
                    Add Room
                    </Button>
            </>
            }

            {isLoading && 
                <Spinner/>
            }
            </Modal>
    )
}